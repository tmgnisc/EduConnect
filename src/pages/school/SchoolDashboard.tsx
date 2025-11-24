import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usersApi, booksApi } from '@/services/api';
import { User, Book } from '@/types';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Users, BookOpen, LibraryBig, Loader2 } from 'lucide-react';

export default function SchoolDashboard() {
  const addToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const [publishers, setPublishers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedPublisherId, setSelectedPublisherId] = useState<string | null>(null);
  const [loadingPublishers, setLoadingPublishers] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const fetchPublishers = async () => {
    try {
      setLoadingPublishers(true);
      const response = await usersApi.getAll();
      const approvedPublishers = (response.data || []).filter(
        (user: User) => user.role === 'publisher' && user.status === 'approved'
      );
      setPublishers(approvedPublishers);
      if (approvedPublishers.length && !selectedPublisherId) {
        setSelectedPublisherId(approvedPublishers[0].id);
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

  useEffect(() => {
    fetchPublishers();
    fetchBooks();
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
        <Button variant="outline" onClick={() => (window.location.href = '/school/cart')}>
          View Cart ({cartItems.length})
        </Button>
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
    </div>
  );
}
