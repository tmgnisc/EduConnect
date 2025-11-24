import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'publisher',
      status: 'approved',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'school',
      status: 'pending',
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'ABC School',
      email: 'abc@school.com',
      role: 'school',
      status: 'approved',
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      name: 'XYZ Publishers',
      email: 'xyz@publishers.com',
      role: 'publisher',
      status: 'rejected',
      createdAt: '2024-01-05',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary-light text-primary';
      case 'pending':
        return 'bg-secondary-light text-secondary';
      case 'rejected':
        return 'bg-destructive/10 text-destructive';
      default:
        return '';
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all platform users
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>All Users</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-muted rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {user.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-primary">
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

