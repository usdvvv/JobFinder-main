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
import { Eye, EyeOff, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedSection from '@/components/AnimatedSection';

const CompanySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    website: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    website: '',
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
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      industry: '',
      website: '',
      terms: '',
      general: ''
    };

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
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

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
      valid = false;
    }

    if (formData.website && !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(formData.website)) {
      newErrors.website = 'Website URL is invalid';
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Store user credentials in localStorage
    setTimeout(() => {
      try {
        // Get existing users or initialize empty array
        const storedCompanyUsers = localStorage.getItem('companyUsers');
        const companyUsers = storedCompanyUsers ? JSON.parse(storedCompanyUsers) : [];
        
        // Check if email already exists
        const emailExists = companyUsers.some(
          (user: {email: string}) => user.email === formData.email
        );
        
        if (emailExists) {
          setErrors({
            ...errors,
            email: 'This email is already registered',
            general: 'Account with this email already exists'
          });
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: "An account with this email already exists.",
          });
          setIsLoading(false);
          return;
        }
        
        // Add new user
        companyUsers.push({
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password,
          industry: formData.industry,
          website: formData.website,
          createdAt: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('companyUsers', JSON.stringify(companyUsers));
        
        toast({
          title: "Company account created successfully",
          description: "Welcome to JobFinder! You can now log in.",
        });
        
        navigate('/company/login');
      } catch (error) {
        console.error("Error saving user data:", error);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "There was an error creating your account. Please try again.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Updated background with better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-800 to-slate-900 opacity-90 z-0"></div>
      
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <AnimatedSection animation="slide-up" className="w-full max-w-md z-10">
          {/* Improved card background for better contrast */}
          <Card className="w-full border-primary/20 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="space-y-1">
              <div className="w-full flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
              {/* Improved text contrast */}
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">Register Your Company</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-200">
                Create a company account to post job listings
              </CardDescription>
            </CardHeader>
            
            {errors.general && (
              <div className="mx-6 mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md flex items-center text-red-700 dark:text-red-300 text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {/* Improved label contrast */}
                  <Label htmlFor="companyName" className="text-gray-800 dark:text-gray-100">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Acme Corporation"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`${errors.companyName ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                      bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                  />
                  {errors.companyName && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 dark:text-gray-100">Company Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="info@yourcompany.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                      bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-800 dark:text-gray-100">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="Technology, Healthcare, Finance, etc."
                    value={formData.industry}
                    onChange={handleChange}
                    className={`${errors.industry ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                      bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                  />
                  {errors.industry && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.industry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-800 dark:text-gray-100">Company Website (optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://www.yourcompany.com"
                    value={formData.website}
                    onChange={handleChange}
                    className={`${errors.website ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                      bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                  />
                  {errors.website && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.website}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 dark:text-gray-100">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`pr-10 ${errors.password ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                        bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-800 dark:text-gray-100">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${errors.confirmPassword ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} 
                        bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                  
                  {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-600 dark:text-green-400 text-xs mt-1 flex items-center">
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
                    className={`${errors.terms ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} mt-1`}
                  />
                  <div>
                    <Label 
                      htmlFor="terms" 
                      className="text-sm font-normal cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                      I accept the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
                    <span>Create Company Account</span>
                  )}
                </Button>
                
                <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                  Already have an account?{' '}
                  <Link to="/company/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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

export default CompanySignup;
