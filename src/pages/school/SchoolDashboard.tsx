import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShoppingCart, CheckSquare, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SchoolDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Books in Library',
      value: '18',
      icon: BookOpen,
      change: '3 subjects',
      color: 'bg-primary-light text-primary',
    },
    {
      title: 'Cart Items',
      value: '5',
      icon: ShoppingCart,
      change: 'View cart',
      color: 'bg-secondary-light text-secondary',
      action: () => navigate('/school/cart'),
    },
    {
      title: 'Lessons Completed',
      value: '12/18',
      icon: CheckSquare,
      change: '67% progress',
      color: 'bg-accent-light text-accent',
    },
    {
      title: 'Activities Uploaded',
      value: '24',
      icon: Upload,
      change: 'This month',
      color: 'bg-primary-light text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">School Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Track your learning journey
          </p>
        </div>
        <Button onClick={() => navigate('/school/books')} className="shadow-soft">
          Browse Books
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
            onClick={stat.action}
          >
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
            <CardTitle>Current Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { book: 'Mathematics Grade 8', progress: 75 },
                { book: 'Science Grade 8', progress: 60 },
                { book: 'English Grade 8', progress: 90 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.book}</span>
                    <span className="text-muted-foreground">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">{i + 2} books</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
                    {i === 1 ? 'Delivered' : 'Processing'}
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
