import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { GraduationCap, Info } from 'lucide-react';
import { z } from 'zod';
import { useState } from 'react';

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showDummyCredentials, setShowDummyCredentials] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      
      // Get user after login to determine redirect
      const currentUser = useAuthStore.getState().user;
      const redirectPath = 
        currentUser?.role === 'admin' ? '/admin' :
        currentUser?.role === 'publisher' ? '/publisher' :
        '/school';
      
      navigate(redirectPath);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-background to-accent-light p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to EduConnect</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-muted border-border">
            <Info className="h-4 w-4" />
            <AlertTitle className="text-sm font-medium">Dummy Login Credentials</AlertTitle>
            <AlertDescription className="text-xs mt-1">
              <button
                type="button"
                onClick={() => setShowDummyCredentials(!showDummyCredentials)}
                className="text-primary hover:underline"
              >
                {showDummyCredentials ? 'Hide' : 'Show'} test credentials
              </button>
              {showDummyCredentials && (
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p><strong>Admin:</strong> admin@educonnect.com / password123</p>
                  <p><strong>Publisher:</strong> publisher@educonnect.com / password123</p>
                  <p><strong>School:</strong> school@educonnect.com / password123</p>
                </div>
              )}
            </AlertDescription>
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">Don't have an account?</p>
            <Link to="/register">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
