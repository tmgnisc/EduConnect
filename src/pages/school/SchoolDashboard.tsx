import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usersApi, booksApi, ordersApi } from '@/services/api';
import { User, Book, Order } from '@/types';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ShoppingCart, Users, BookOpen, LibraryBig, Loader2, Upload, User as UserIcon, Lock } from 'lucide-react';

export default function SchoolDashboard() {
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const addToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const [publishers, setPublishers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedPublisherId, setSelectedPublisherId] = useState<string | null>(null);
  const [loadingPublishers, setLoadingPublishers] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const fetchPublishers = async () => {
    try {
      setLoadingPublishers(true);
      const response = await usersApi.getPublishers();
      const availablePublishers = response.data || [];
      setPublishers(availablePublishers);
      if (availablePublishers.length && !selectedPublisherId) {
        setSelectedPublisherId(availablePublishers[0].id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load publishers');
    } finally {
      setLoadingPublishers(false);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoadingBooks(true);
      const response = await booksApi.getAll();
      setBooks(response.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load books');
    } finally {
      setLoadingBooks(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await ordersApi.getAll();
      setOrders(response.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProfileImageUpload = async () => {
    if (!profileImageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      setUploadingImage(true);
      const response = await usersApi.uploadProfileImage(profileImageFile);
      if (response.data && currentUser) {
        setUser({ ...currentUser, profileImage: response.data.profileImage });
        toast.success('Profile image updated successfully');
        setProfileImageFile(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    try {
      setChangingPassword(true);
      await usersApi.changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully');
      setChangePasswordOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
    fetchBooks();
    fetchOrders();
  }, []);

  const selectedPublisherBooks = useMemo(() => {
    if (!selectedPublisherId) return [];
    return books.filter((book) => book.publisherId === selectedPublisherId);
  }, [books, selectedPublisherId]);

  const stats = useMemo(
    () => [
      {
        title: 'Available Publishers',
        value: loadingPublishers ? '—' : publishers.length.toString(),
        icon: Users,
        color: 'bg-primary-light text-primary',
      },
      {
        title: 'Total Books',
        value: loadingBooks ? '—' : books.length.toString(),
        icon: BookOpen,
        color: 'bg-secondary-light text-secondary',
      },
      {
        title: 'My Orders',
        value: loadingOrders ? '—' : orders.length.toString(),
        icon: LibraryBig,
        color: 'bg-accent-light text-accent',
      },
      {
        title: 'In Cart',
        value: cartItems.reduce((sum, item) => sum + item.quantity, 0).toString(),
        icon: ShoppingCart,
        color: 'bg-accent-light text-accent',
      },
    ],
    [books.length, cartItems, loadingBooks, loadingPublishers, publishers.length]
  );

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">School Dashboard</h1>
          <p className="text-muted-foreground mt-2">Browse publishers, explore their catalogs, and place orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedPublisherId(null)}>
            Browse Publishers
          </Button>
          <Button variant="default" onClick={() => (window.location.href = '/school/cart')}>
            View Cart ({cartItems.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="profileImage">Upload Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImageFile(e.target.files?.[0] || null)}
                  disabled={uploadingImage}
                />
                {profileImageFile && (
                  <Button
                    onClick={handleProfileImageUpload}
                    disabled={uploadingImage}
                    size="sm"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </Button>
                )}
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Name</Label>
                <p className="text-lg font-semibold">{currentUser?.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="text-lg">{currentUser?.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">School</Label>
                <p className="text-lg">{currentUser?.organizationName || 'N/A'}</p>
              </div>
              <Button
                onClick={() => setChangePasswordOpen(true)}
                variant="outline"
                className="mt-4"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Publishers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {loadingPublishers ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading publishers...
              </div>
            ) : publishers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No publishers are available yet.</p>
            ) : (
              publishers.map((publisher) => {
                const publisherBookCount = books.filter((book) => book.publisherId === publisher.id).length;
                const isSelected = selectedPublisherId === publisher.id;

                return (
                  <button
                    key={publisher.id}
                    className={`w-full text-left p-4 border rounded-xl transition ${
                      isSelected ? 'border-primary bg-primary-light/40' : 'hover:border-muted-foreground/40'
                    }`}
                    onClick={() => setSelectedPublisherId(publisher.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{publisher.organizationName || publisher.name}</p>
                        <p className="text-xs text-muted-foreground">{publisher.email}</p>
                      </div>
                      <Badge variant="outline">{publisherBookCount} books</Badge>
                    </div>
                  </button>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>
                {publishers.find((pub) => pub.id === selectedPublisherId)?.organizationName ||
                  publishers.find((pub) => pub.id === selectedPublisherId)?.name ||
                  'Select a publisher'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedPublisherId
                  ? 'Here are the books this publisher offers.'
                  : 'Choose a publisher to view their catalog.'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {loadingBooks ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading books...
              </div>
            ) : !selectedPublisherId ? (
              <div className="text-center py-12 text-muted-foreground">
                <LibraryBig className="w-10 h-10 mx-auto mb-3" />
                Select a publisher to explore their books.
              </div>
            ) : selectedPublisherBooks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">This publisher hasn't added any books yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {selectedPublisherBooks.map((book) => (
                  <Card key={book.id} className="border">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="h-40 w-full object-cover rounded-t-xl" />
                    ) : (
                      <div className="h-40 w-full bg-muted flex items-center justify-center rounded-t-xl">
                        <BookOpen className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <CardContent className="space-y-3 py-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline">Grade {book.grade}</Badge>
                        <Badge variant="outline">{book.subject}</Badge>
                      </div>
                      <p className="text-lg font-semibold text-primary">NPR {book.price.toFixed(2)}</p>
                      {book.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
                      )}
                      <Button className="w-full" onClick={() => handleAddToCart(book)}>
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No orders placed yet.</div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-foreground">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} • {(order.items?.length ?? 0)} items
                    </p>
                    <div className="text-sm text-muted-foreground mt-1">
                      Total:{' '}
                      <span className="font-medium text-foreground">
                        NPR {Number(order.total ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="capitalize">
                      {order.status}
                    </Badge>
                    <Badge className="bg-primary-light text-primary capitalize">
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setChangePasswordOpen(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                className="flex-1"
                disabled={changingPassword}
              >
                {changingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
