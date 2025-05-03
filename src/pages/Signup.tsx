import { useState } from 'react';
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
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
      general: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call and send confirmation email
    setTimeout(async () => {
      try {
        // Call the edge function for sending the email
        await fetch("https://bcnbrvpbmijsmhyvnngv.supabase.co/functions/v1/send-signup-confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            fullName: formData.fullName,
          }),
        });
      } catch (error) {
        console.error("Error sending confirmation email:", error);
        toast({
          variant: "destructive",
          title: "Email failed",
          description: "Could not send confirmation email. Please contact support.",
        });
      }

      toast({
        title: "Account created successfully",
        description: "Welcome to DreamJob! You can now log in.",
      });
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Password strength indicators
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Content checks
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
    
    return Math.min(score, 5); // Max score of 5
  };

  const passwordStrength = getPasswordStrength(formData.password);
  
  const getStrengthText = (strength: number) => {
    if (strength === 0) return 'No password';
    if (strength === 1) return 'Very weak';
    if (strength === 2) return 'Weak';
    if (strength === 3) return 'Medium';
    if (strength === 4) return 'Strong';
    return 'Very strong';
  };
  
  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-300';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="absolute top-0 left-0 w-full h-full bg-hero-pattern opacity-50 z-0"></div>
        
        <AnimatedSection animation="slide-up" className="w-full max-w-md z-10">
          <Card className="w-full backdrop-blur-sm bg-white/90 dark:bg-blue-950/80 border border-gray-300 dark:border-blue-900 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="w-full flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create an account</CardTitle>
              <CardDescription className="text-center text-gray-700 dark:text-blue-100">
                Enter your information to create your account
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
                  <Label htmlFor="fullName" className="text-gray-800 dark:text-blue-100">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${
                      errors.fullName ? 'border-red-400 focus:ring-red-500' : 
                      'border-gray-300 focus:ring-blue-500 dark:border-blue-800 dark:focus:ring-blue-500'
                    } text-gray-900 dark:text-blue-50 dark:bg-blue-900/60 placeholder:text-gray-400 dark:placeholder:text-blue-200/70`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 dark:text-blue-100">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${
                      errors.email ? 'border-red-400 focus:ring-red-500' : 
                      'border-gray-300 focus:ring-blue-500 dark:border-blue-800 dark:focus:ring-blue-500'
                    } text-gray-900 dark:text-blue-50 dark:bg-blue-900/60 placeholder:text-gray-400 dark:placeholder:text-blue-200/70`}
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 dark:text-blue-100">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`pr-10 ${
                        errors.password ? 'border-red-400 focus:ring-red-500' : 
                        'border-gray-300 focus:ring-blue-500 dark:border-blue-800 dark:focus:ring-blue-500'
                      } text-gray-900 dark:text-blue-50 dark:bg-blue-900/60 placeholder:text-gray-400 dark:placeholder:text-blue-200/70`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-blue-300 dark:hover:text-blue-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-blue-950/40">
                        <div
                          className={`${getStrengthColor(passwordStrength)} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-800 dark:text-blue-200">
                        Password strength: <span className="font-medium">{getStrengthText(passwordStrength)}</span>
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-800 dark:text-blue-100">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${
                        errors.confirmPassword ? 'border-red-400 focus:ring-red-500' : 
                        'border-gray-300 focus:ring-blue-500 dark:border-blue-800 dark:focus:ring-blue-500'
                      } text-gray-900 dark:text-blue-50 dark:bg-blue-900/60 placeholder:text-gray-400 dark:placeholder:text-blue-200/70`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                  
                  {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-700 dark:text-green-400 text-xs mt-1 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> Passwords match
                    </p>
                  )}
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      setAcceptTerms(checked as boolean);
                    }}
                    className={`${errors.terms ? 'border-red-400' : 'border-gray-300 dark:border-blue-800'} mt-1`}
                  />
                  <div>
                    <Label 
                      htmlFor="terms" 
                      className="text-sm font-normal cursor-pointer text-gray-800 dark:text-blue-200"
                    >
                      I accept the{' '}
                      <Link to="/terms" className="text-blue-700 hover:text-blue-500 dark:text-blue-200 dark:hover:text-blue-100 underline">
                        terms and conditions
                      </Link>
                    </Label>
                    {errors.terms && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.terms}</p>
                    )}
                  </div>
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
                      Creating account...
                    </div>
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
                
                <p className="text-center text-sm text-gray-800 dark:text-blue-200">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-700 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-100 underline">
                    Sign in
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

export default Signup;
