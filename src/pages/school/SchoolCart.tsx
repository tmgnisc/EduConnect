import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function SchoolCart() {
  const cartItems = [
    {
      id: '1',
      title: 'Mathematics Grade 8',
      grade: 'Grade 8',
      subject: 'Mathematics',
      price: 500,
      quantity: 2,
    },
    {
      id: '2',
      title: 'Science Grade 9',
      grade: 'Grade 9',
      subject: 'Science',
      price: 550,
      quantity: 1,
    },
    {
      id: '3',
      title: 'English Grade 7',
      grade: 'Grade 7',
      subject: 'English',
      price: 480,
      quantity: 3,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13; // 13% tax
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">
          Review your selected books
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start adding books to your cart
                </p>
                <Button>Browse Books</Button>
              </CardContent>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-20 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-lg">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.grade}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.subject}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold text-foreground mt-2">
                          NPR {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-soft sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">NPR {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (13%)</span>
                  <span className="font-medium">NPR {tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-foreground">NPR {total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

