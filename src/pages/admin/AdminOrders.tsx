import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Eye } from 'lucide-react';
import { useState } from 'react';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-001',
      schoolName: 'ABC School',
      items: 3,
      total: 1500,
      status: 'confirmed',
      paymentStatus: 'completed',
      createdAt: '2024-01-20',
    },
    {
      id: 'ORD-002',
      schoolName: 'XYZ School',
      items: 5,
      total: 2500,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-01-21',
    },
    {
      id: 'ORD-003',
      schoolName: 'DEF School',
      items: 2,
      total: 1000,
      status: 'delivered',
      paymentStatus: 'completed',
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

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary-light text-primary';
      case 'pending':
        return 'bg-secondary-light text-secondary';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      default:
        return '';
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Orders</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all platform orders
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Order Management</CardTitle>
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
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {order.items} items • {order.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                    <Badge className={`text-xs ${getPaymentColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
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

