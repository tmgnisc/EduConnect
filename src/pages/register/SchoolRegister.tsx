import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolRegisterSchema } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building } from 'lucide-react';
import { z } from 'zod';

type RegisterForm = z.infer<typeof schoolRegisterSchema>;

export default function SchoolRegister() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schoolRegisterSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { confirmPassword, ...rest } = data;
      await register({
        email: rest.email,
        password: rest.password,
        name: rest.name,
        role: 'school',
        organizationName: rest.organizationName,
        phone: rest.phone,
        address: rest.address,
      });
      toast.success('Registration successful! Awaiting admin approval.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-background to-accent-light p-4">
      <Card className="w-full max-w-2xl shadow-large">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center">
            <Building className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-3xl font-bold">School Registration</CardTitle>
          <CardDescription>Join EduConnect as a school</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Contact Person Name</Label>
                <Input
                  id="name"
                  {...registerField('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...registerField('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationName">School Name</Label>
              <Input
                id="organizationName"
                {...registerField('organizationName')}
                className={errors.organizationName ? 'border-destructive' : ''}
              />
              {errors.organizationName && (
                <p className="text-sm text-destructive">{errors.organizationName.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...registerField('phone')}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerField('password')}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerField('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">School Address</Label>
              <Textarea
                id="address"
                {...registerField('address')}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/register')} className="flex-1">
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
