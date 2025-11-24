import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '156',
      icon: Users,
      change: '+12%',
      color: 'bg-primary-light text-primary',
    },
    {
      title: 'Total Books',
      value: '342',
      icon: BookOpen,
      change: '+8%',
      color: 'bg-secondary-light text-secondary',
    },
    {
      title: 'Total Orders',
      value: '89',
      icon: ShoppingCart,
      change: '+23%',
      color: 'bg-accent-light text-accent',
    },
    {
      title: 'Revenue',
      value: 'NPR 2.4M',
      icon: TrendingUp,
      change: '+18%',
      color: 'bg-primary-light text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System overview and management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-primary font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Sample User {i}</p>
                    <p className="text-sm text-muted-foreground">sample{i}@example.com</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary-light text-secondary rounded-full text-sm font-medium">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">School ABC</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
                    Processing
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
