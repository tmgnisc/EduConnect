import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  Plus,
  FilePenLine,
  Trash2,
  Layers,
  BookMarked,
  ImageIcon,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { booksApi } from '@/services/api';
import { Book } from '@/types';
import { bookSchema } from '@/lib/validations';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { z } from 'zod';

type BookFormValues = z.infer<typeof bookSchema>;

const defaultValues: BookFormValues = {
  title: '',
  author: '',
  grade: '',
  subject: '',
  isbn: '',
  price: 0,
  description: '',
};

export default function PublisherDashboard() {
  const currentUser = useAuthStore((state) => state.user);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues,
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksApi.getAll();
      setBooks(response.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const myBooks = useMemo(
    () => books.filter((book) => book.publisherId === currentUser?.id),
    [books, currentUser?.id]
  );

  const stats = useMemo(
    () => [
      {
        title: 'Books Published',
        value: myBooks.length,
        icon: BookOpen,
        color: 'bg-primary-light text-primary',
      },
      {
        title: 'Subjects Covered',
        value: new Set(myBooks.map((book) => book.subject)).size,
        icon: Layers,
        color: 'bg-secondary-light text-secondary',
      },
      {
        title: 'Grades Served',
        value: new Set(myBooks.map((book) => book.grade)).size,
        icon: BookMarked,
        color: 'bg-accent-light text-accent',
      },
    ],
    [myBooks]
  );

  const openDialog = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      reset({
        title: book.title,
        author: book.author,
        grade: book.grade,
        subject: book.subject,
        isbn: book.isbn,
        price: book.price,
        description: book.description ?? '',
      });
    } else {
      setEditingBook(null);
      reset(defaultValues);
    }
    setCoverFile(null);
    setDialogOpen(true);
  };

  const onSubmit = async (values: BookFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('grade', values.grade);
    formData.append('subject', values.subject);
    formData.append('isbn', values.isbn);
    formData.append('price', String(values.price));
    if (values.description) {
      formData.append('description', values.description);
    }
    if (coverFile) {
      formData.append('cover', coverFile);
    }

    try {
      if (editingBook) {
        await booksApi.update(editingBook.id, formData);
        toast.success('Book updated successfully');
      } else {
        await booksApi.create(formData);
        toast.success('Book added successfully');
      }
      setDialogOpen(false);
      setEditingBook(null);
      reset(defaultValues);
      setCoverFile(null);
      fetchBooks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Unable to save book');
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      await booksApi.delete(bookId);
      toast.success('Book deleted');
      fetchBooks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publisher Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your catalog and keep it up to date.</p>
        </div>
        <Button onClick={() => openDialog()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Book
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

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Your Books</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading books...</p>
          ) : myBooks.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              You have not published any books yet. Start by adding your first book.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks.map((book) => (
                <Card key={book.id} className="border shadow-sm flex flex-col">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-48 w-full object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="h-48 w-full bg-muted flex items-center justify-center rounded-t-xl">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="flex flex-col gap-3 py-4 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">Grade {book.grade}</Badge>
                      <Badge variant="outline">{book.subject}</Badge>
                      <Badge variant="secondary">NPR {book.price.toFixed(2)}</Badge>
                    </div>
                    {book.description && <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>}
                    <div className="mt-auto flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openDialog(book)}>
                        <FilePenLine className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(book.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingBook(null);
            reset(defaultValues);
            setCoverFile(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input id="title" {...register('title')} className={errors.title ? 'border-destructive' : ''} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register('author')} className={errors.author ? 'border-destructive' : ''} />
                {errors.author && <p className="text-sm text-destructive">{errors.author.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" {...register('grade')} className={errors.grade ? 'border-destructive' : ''} />
                  {errors.grade && <p className="text-sm text-destructive">{errors.grade.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...register('subject')} className={errors.subject ? 'border-destructive' : ''} />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" {...register('isbn')} className={errors.isbn ? 'border-destructive' : ''} />
                {errors.isbn && <p className="text-sm text-destructive">{errors.isbn.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (NPR)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={errors.price ? 'border-destructive' : ''}
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={3} {...register('description')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image</Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setCoverFile(file);
                  }}
                />
                <p className="text-xs text-muted-foreground">Upload a cover image (JPG/PNG, max 5MB).</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : editingBook ? 'Update Book' : 'Create Book'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
