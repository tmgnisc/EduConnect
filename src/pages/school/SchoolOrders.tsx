import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Package } from 'lucide-react';

export default function SchoolOrders() {
  const orders = [
    {
      id: 'ORD-001',
      items: 3,
      total: 1500,
      status: 'delivered',
      paymentStatus: 'completed',
      createdAt: '2024-01-20',
      deliveredAt: '2024-01-25',
    },
    {
      id: 'ORD-002',
      items: 5,
      total: 2500,
      status: 'confirmed',
      paymentStatus: 'completed',
      createdAt: '2024-01-21',
    },
    {
      id: 'ORD-003',
      items: 2,
      total: 1000,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-01-22',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track your book orders
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-lg">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items} items • Ordered on {order.createdAt}
                    </p>
                    {order.deliveredAt && (
                      <p className="text-sm text-muted-foreground">
                        Delivered on {order.deliveredAt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                      <Badge className={`text-xs ${getPaymentColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      NPR {order.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

