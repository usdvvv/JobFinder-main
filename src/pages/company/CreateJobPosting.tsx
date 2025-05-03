
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Briefcase, DollarSign, MapPin, Clock, Award, Save, ChevronLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CompanyNavBar from '@/components/company/CompanyNavBar';
import AnimatedSection from '@/components/AnimatedSection';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'full-time',
    experience: 'mid-level',
    salary: {
      min: '',
      max: '',
      period: 'yearly',
      showSalary: true
    },
    skills: '',
    description: '',
    requirements: '',
    benefits: '',
    remote: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: value
      }
    }));
  };
  
  const handleToggleChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      remote: checked
    }));
  };

  const handleSalaryVisibilityChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        showSalary: checked
      }
    }));
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    if (fieldName === 'salary.period') {
      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          period: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Job posting created",
        description: "Your job posting has been published successfully!",
      });
      navigate('/company/jobs');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Job Posting</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to create a new job posting</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <AnimatedSection animation="slide-up" delay={100}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Provide the basic details of the job posting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Job Title*</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="e.g. Senior Frontend Developer" 
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="location">Location*</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="location" 
                          name="location" 
                          className="pl-10" 
                          placeholder="e.g. San Francisco, CA"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-3 items-center">
                      <div className="flex justify-between">
                        <Label htmlFor="remote">Remote Job</Label>
                        <Switch 
                          id="remote"
                          checked={formData.remote}
                          onCheckedChange={handleToggleChange}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.remote ? "This job can be performed fully remotely" : "This job requires in-person presence"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="type">Job Type*</Label>
                      <Select 
                        defaultValue={formData.type}
                        onValueChange={(value) => handleSelectChange(value, 'type')}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="experience">Experience Level*</Label>
                      <Select 
                        defaultValue={formData.experience}
                        onValueChange={(value) => handleSelectChange(value, 'experience')}
                      >
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="mid-level">Mid-Level</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="lead">Lead / Principal</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={200}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                  Compensation
                </CardTitle>
                <CardDescription>
                  Provide the salary range for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="salary-visibility">Display Salary Range</Label>
                    <Switch 
                      id="salary-visibility"
                      checked={formData.salary.showSalary}
                      onCheckedChange={handleSalaryVisibilityChange}
                    />
                  </div>
                  
                  {formData.salary.showSalary && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="grid gap-3">
                        <Label htmlFor="min">Minimum Salary</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="min" 
                            name="min" 
                            type="number"
                            className="pl-10" 
                            placeholder="e.g. 80000"
                            value={formData.salary.min}
                            onChange={handleSalaryChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        <Label htmlFor="max">Maximum Salary</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="max" 
                            name="max"
                            type="number" 
                            className="pl-10" 
                            placeholder="e.g. 120000"
                            value={formData.salary.max}
                            onChange={handleSalaryChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        <Label htmlFor="period">Period</Label>
                        <Select 
                          defaultValue={formData.salary.period}
                          onValueChange={(value) => handleSelectChange(value, 'salary.period')}
                        >
                          <SelectTrigger id="period">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yearly">Per Year</SelectItem>
                            <SelectItem value="monthly">Per Month</SelectItem>
                            <SelectItem value="hourly">Per Hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={300}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-blue-600" />
                  Skills & Details
                </CardTitle>
                <CardDescription>
                  Provide the required skills and detailed description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="skills">Required Skills (comma separated)*</Label>
                    <Input 
                      id="skills" 
                      name="skills" 
                      placeholder="e.g. React, TypeScript, Node.js"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Separate skills with commas. These will be displayed as tags on the job listing.
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="description">Job Description*</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Describe the role and responsibilities..."
                      className="min-h-32"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea 
                      id="requirements" 
                      name="requirements" 
                      placeholder="List the requirements for this position..."
                      className="min-h-24"
                      value={formData.requirements}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="benefits">Benefits & Perks</Label>
                    <Textarea 
                      id="benefits" 
                      name="benefits" 
                      placeholder="Describe the benefits and perks..."
                      className="min-h-24"
                      value={formData.benefits}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={400}>
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/company/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Publish Job
                  </div>
                )}
              </Button>
            </div>
          </AnimatedSection>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPosting;
