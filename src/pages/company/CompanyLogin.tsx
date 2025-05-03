
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Eye, EyeOff, Building2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedSection from '@/components/AnimatedSection';

const CompanyLogin = () => {
  const navigate = useNavigate();
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
    
    // Check if there are credentials in localStorage from signup
    const storedCompanyUsers = localStorage.getItem('companyUsers');
    const companyUsers = storedCompanyUsers ? JSON.parse(storedCompanyUsers) : [];
    
    // Find user with matching credentials
    const userMatch = companyUsers.find(
      (user: {email: string, password: string}) => 
        user.email === email && user.password === password
    );
    
    // Demo credentials for testing
    const isDemoCredentials = email === 'company@example.com' && password === 'password';
    
    setTimeout(() => {
      // Successful login if credentials match stored user or demo credentials
      if (userMatch || isDemoCredentials) {
        // For real app, you'd do JWT token storage here
        if (rememberMe) {
          localStorage.setItem('companyLoggedIn', 'true');
          localStorage.setItem('companyEmail', email);
        }
        
        toast({
          title: "Login successful",
          description: "Welcome to JobFinder!",
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
      setIsLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="absolute top-0 left-0 w-full h-full bg-hero-pattern opacity-50 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/30 to-blue-950/50 z-1"></div>
      
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <AnimatedSection animation="slide-up" className="w-full max-w-md z-10">
          <Card className="w-full backdrop-blur-sm bg-[#1e293b]/90 border-blue-500/20 shadow-xl text-white">
            <CardHeader className="space-y-1">
              <div className="w-full flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white">Company Portal</CardTitle>
              <CardDescription className="text-center text-blue-200">
                Enter your credentials to access your company account
              </CardDescription>
            </CardHeader>
            
            {errors.general && (
              <div className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center text-red-300 text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-100">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.company@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${errors.email ? 'border-red-500' : 'border-blue-500/30'} bg-blue-900/30 text-white placeholder:text-blue-300/50`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-blue-100">Password</Label>
                    <Link 
                      to="/company/forgot-password" 
                      className="text-xs text-blue-300 hover:text-blue-100"
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
                      className={`pr-10 ${errors.password ? 'border-red-500' : 'border-blue-500/30'} bg-blue-900/30 text-white`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      setRememberMe(checked as boolean);
                    }}
                    className="border-blue-500/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-normal cursor-pointer text-blue-200"
                  >
                    Remember me
                  </Label>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
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
                
                <p className="text-center text-sm text-blue-300">
                  Don't have a company account?{' '}
                  <Link to="/company/signup" className="text-blue-400 hover:text-blue-300 hover:underline">
                    Register your company
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CompanyLogin;
