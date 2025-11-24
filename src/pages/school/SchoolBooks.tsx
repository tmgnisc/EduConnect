import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function SchoolBooks() {
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      id: '1',
      title: 'Mathematics Grade 8',
      grade: 'Grade 8',
      subject: 'Mathematics',
      publisherName: 'ABC Publishers',
      price: 500,
      inLibrary: false,
    },
    {
      id: '2',
      title: 'Science Grade 9',
      grade: 'Grade 9',
      subject: 'Science',
      publisherName: 'XYZ Publishers',
      price: 550,
      inLibrary: true,
    },
    {
      id: '3',
      title: 'English Grade 7',
      grade: 'Grade 7',
      subject: 'English',
      publisherName: 'ABC Publishers',
      price: 480,
      inLibrary: false,
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Books</h1>
          <p className="text-muted-foreground mt-2">
            Discover and purchase educational books
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Available Books</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {book.grade}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {book.subject}
                    </Badge>
                    {book.inLibrary && (
                      <Badge className="text-xs bg-primary-light text-primary">
                        In Library
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {book.publisherName}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">
                      NPR {book.price}
                    </span>
                    <Button size="sm" variant={book.inLibrary ? 'outline' : 'default'}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {book.inLibrary ? 'View' : 'Add to Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

