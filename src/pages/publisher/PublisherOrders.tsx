import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Eye } from 'lucide-react';
import { useState } from 'react';

export default function PublisherOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-001',
      schoolName: 'ABC School',
      bookTitle: 'Mathematics Grade 8',
      quantity: 25,
      total: 12500,
      status: 'confirmed',
      createdAt: '2024-01-20',
    },
    {
      id: 'ORD-002',
      schoolName: 'XYZ School',
      bookTitle: 'Science Grade 9',
      quantity: 30,
      total: 16500,
      status: 'pending',
      createdAt: '2024-01-21',
    },
    {
      id: 'ORD-003',
      schoolName: 'DEF School',
      bookTitle: 'Mathematics Grade 8',
      quantity: 20,
      total: 10000,
      status: 'delivered',
      createdAt: '2024-01-18',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return 'bg-primary-light text-primary';
      case 'pending':
        return 'bg-secondary-light text-secondary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return '';
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">
            View and manage orders for your books
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Order History</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-muted rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.schoolName}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.bookTitle} • Qty: {order.quantity} • {order.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      NPR {order.total}
                    </span>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

