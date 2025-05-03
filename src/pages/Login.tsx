import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const isCompanyLogin = location.pathname.includes('/company');

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (isCompanyLogin) {
        if (email === 'company@example.com' && password === 'password') {
          toast({
            title: "Login successful",
            description: "Welcome to JobFinder's company portal!",
          });
          navigate('/company/dashboard');
        } else {
          setErrors({
            ...errors,
            general: 'Invalid email or password'
          });
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
          });
        }
      } else {
        if (email === 'user@example.com' && password === 'password') {
          toast({
            title: "Login successful",
            description: "Welcome back to JobFinder!",
          });
          navigate('/jobs');
        } else {
          setErrors({
            ...errors,
            general: 'Invalid email or password'
          });
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
          });
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = isCompanyLogin ? "Company Login - JobFinder" : "Login - JobFinder";
  }, [isCompanyLogin]);

  return (
    <div className="min-h-screen bg-background">
      {!isCompanyLogin && <NavBar />}
      
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="absolute top-0 left-0 w-full h-full bg-hero-pattern opacity-50 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100/65 to-blue-400/90 dark:from-blue-900/70 dark:to-blue-950/80 z-1"></div>
        
        <AnimatedSection animation="slide-up" className="w-full max-w-md z-10">
          <Card className="w-full backdrop-blur-sm bg-white/95 dark:bg-blue-950/95 border border-gray-200 dark:border-blue-900 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="w-full flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
                  <LogIn className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-blue-100">
                {isCompanyLogin ? "Company Login" : "Welcome to JobFinder"}
              </CardTitle>
              <CardDescription className="text-center text-gray-800 dark:text-blue-200">
                {isCompanyLogin 
                  ? "Enter your credentials to access your company account" 
                  : "Enter your credentials to access your account"}
              </CardDescription>
            </CardHeader>
            
            {errors.general && (
              <div className="mx-6 mb-4 p-3 bg-red-100 dark:bg-destructive/10 border border-red-300 dark:border-destructive/20 rounded-md flex items-center text-red-700 dark:text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-blue-100">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={isCompanyLogin ? "your.company@example.com" : "your.email@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${
                      errors.email 
                      ? 'border-red-600 focus:ring-red-600' 
                      : 'border-gray-400 focus:ring-blue-600 dark:border-blue-700 dark:focus:ring-blue-400'
                    } text-gray-900 dark:text-blue-50 dark:bg-blue-950 placeholder:text-gray-500 dark:placeholder:text-blue-200/80`}
                  />
                  {errors.email && (
                    <p className="text-red-700 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-900 dark:text-blue-100">Password</Label>
                    <Link 
                      to={isCompanyLogin ? "/company/forgot-password" : "/forgot-password"} 
                      className="text-xs text-blue-700 dark:text-blue-200 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pr-10 ${
                        errors.password 
                        ? 'border-red-600 focus:ring-red-600' 
                        : 'border-gray-400 focus:ring-blue-600 dark:border-blue-700 dark:focus:ring-blue-400'
                      } text-gray-900 dark:text-blue-50 dark:bg-blue-950 placeholder:text-gray-500 dark:placeholder:text-blue-200/80`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-700 dark:text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      setRememberMe(checked as boolean);
                    }}
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-normal cursor-pointer text-gray-800 dark:text-blue-200"
                  >
                    Remember me
                  </Label>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </Button>
                
                <p className="text-center text-sm text-gray-900 dark:text-blue-100">
                  Don't have an account?{' '}
                  <Link 
                    to={isCompanyLogin ? "/company/signup" : "/signup"} 
                    className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 hover:underline"
                  >
                    {isCompanyLogin ? "Register your company" : "Create an account"}
                  </Link>
                </p>
                {isCompanyLogin && (
                  <p className="text-center text-sm text-gray-900 dark:text-blue-100">
                    <Link to="/" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 hover:underline">
                      Return to role selection
                    </Link>
                  </p>
                )}
              </CardFooter>
            </form>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Login;
