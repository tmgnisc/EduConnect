import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Rich Content Library',
      description: 'Access thousands of educational resources from trusted publishers',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with schools, publishers, and educators in one platform',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor student performance and learning outcomes with analytics',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast access to resources and seamless user experience',
    },
    {
      icon: GraduationCap,
      title: 'Expert Support',
      description: 'Get help from our dedicated education support team',
    },
  ];

  const benefits = [
    'Access to premium educational content',
    'Real-time collaboration tools',
    'Comprehensive analytics dashboard',
    '24/7 platform availability',
    'Regular content updates',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">EduConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full md:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-32 px-4 md:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Transforming Education Together</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connect, Learn, and{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Grow
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The all-in-one platform connecting schools, publishers, and educators. 
              Access premium content, track progress, and collaborate seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to enhance the educational experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose EduConnect?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of schools and educators who trust EduConnect for their 
                educational needs. Experience the difference of a platform built for education.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white space-y-6 shadow-large">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Join EduConnect</h3>
                    <p className="text-white/90">Start your journey today</p>
                  </div>
                </div>
                <p className="text-lg text-white/90">
                  Whether you're a school administrator, publisher, or educator, 
                  EduConnect provides the tools you need to succeed in modern education.
                </p>
                <div className="pt-4">
                  <Link to="/register">
                    <Button size="lg" variant="secondary" className="w-full">
                      Create Your Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20 bg-primary-light">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Education Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join EduConnect today and discover how we can help you achieve your educational goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="default" className="w-full sm:w-auto text-base px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                Sign In to Existing Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card py-8 md:py-12 px-4 md:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">EduConnect</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} EduConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
