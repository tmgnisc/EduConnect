import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Eye, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function AdminBooks() {
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      id: '1',
      title: 'Mathematics Grade 8',
      grade: 'Grade 8',
      subject: 'Mathematics',
      isbn: '978-1234567890',
      price: 500,
      publisherName: 'ABC Publishers',
      status: 'active',
    },
    {
      id: '2',
      title: 'Science Grade 9',
      grade: 'Grade 9',
      subject: 'Science',
      isbn: '978-1234567891',
      price: 550,
      publisherName: 'XYZ Publishers',
      status: 'active',
    },
    {
      id: '3',
      title: 'English Grade 7',
      grade: 'Grade 7',
      subject: 'English',
      isbn: '978-1234567892',
      price: 480,
      publisherName: 'ABC Publishers',
      status: 'pending',
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Books</h1>
          <p className="text-muted-foreground mt-2">
            Manage all books in the platform
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Book Catalog</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-muted rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-20 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-lg">{book.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {book.subject} • {book.grade}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">ISBN: {book.isbn}</span>
                      <Badge variant="outline" className="text-xs">
                        {book.publisherName}
                      </Badge>
                      <Badge
                        className={`text-xs ${
                          book.status === 'active'
                            ? 'bg-primary-light text-primary'
                            : 'bg-secondary-light text-secondary'
                        }`}
                      >
                        {book.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">NPR {book.price}</span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

