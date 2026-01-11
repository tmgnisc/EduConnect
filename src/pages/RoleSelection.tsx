import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, BookOpen, GraduationCap } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      value: 'publisher',
      label: 'Publisher',
      description: 'Publish and manage educational books',
      icon: BookOpen,
      color: 'bg-primary-light text-primary',
    },
    {
      value: 'school',
      label: 'School',
      description: 'Browse books and manage learning activities',
      icon: Building,
      color: 'bg-secondary-light text-secondary',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-background to-accent-light p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/logo.jpeg" alt="EduConnect Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold">Join EduConnect</h1>
          <p className="text-lg text-muted-foreground">
            Select your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card
              key={role.value}
              className="cursor-pointer transition-all duration-300 hover:shadow-large hover:scale-105"
              onClick={() => navigate(`/register/${role.value}`)}
            >
              <CardHeader className="space-y-4">
                <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center`}>
                  <role.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">{role.label}</CardTitle>
                <CardDescription className="text-base">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Register as {role.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
