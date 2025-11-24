import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PublisherDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Books',
      value: '24',
      icon: BookOpen,
      change: '+3 this month',
      color: 'bg-primary-light text-primary',
    },
    {
      title: 'Active Orders',
      value: '12',
      icon: ShoppingCart,
      change: '8 pending',
      color: 'bg-secondary-light text-secondary',
    },
    {
      title: 'Schools Reached',
      value: '45',
      icon: Users,
      change: '+5 new',
      color: 'bg-accent-light text-accent',
    },
    {
      title: 'Total Revenue',
      value: 'NPR 845K',
      icon: TrendingUp,
      change: '+18% growth',
      color: 'bg-primary-light text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publisher Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your books and track performance
          </p>
        </div>
        <Button onClick={() => navigate('/publisher/books/new')} className="shadow-soft">
          Add New Book
        </Button>
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
              <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Sample School {i}</p>
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
            <CardTitle>Popular Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Sample Book {i}</p>
                    <p className="text-sm text-muted-foreground">Grade {i + 5} • Science</p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {10 + i} orders
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
