
import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, FileText, Briefcase, CheckCircle2, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

// Mock job data
const JOB_DATA = {
  '1': {
    title: 'Frontend Developer',
    company: 'TechCorp',
  },
  '2': {
    title: 'UX/UI Designer',
    company: 'DesignHub',
  },
  '3': {
    title: 'Data Scientist',
    company: 'DataWorks',
  },
  '4': {
    title: 'Product Manager',
    company: 'ProductLabs',
  },
};

type JobDataType = {
  [key: string]: {
    title: string;
    company: string;
  };
};

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    experience: '',
    education: '',
    coverLetter: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const jobData = id && (JOB_DATA as JobDataType)[id] 
    ? (JOB_DATA as JobDataType)[id] 
    : { title: 'Unknown Position', company: 'Unknown Company' };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      if (type === 'resume') {
        setResumeFile(file);
      } else {
        setCoverLetterFile(file);
      }
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'coverLetter') => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      if (type === 'resume') {
        setResumeFile(file);
      } else {
        setCoverLetterFile(file);
      }
    }
  };

  const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAutoFill = () => {
    if (!resumeFile) {
      toast({
        variant: "destructive",
        title: "No resume uploaded",
        description: "Please upload your resume to use the auto-fill feature.",
      });
      return;
    }
    
    setIsAutoFilling(true);
    setUploadProgress(0);
    
    // Simulate file upload and processing
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API response
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setUploadSuccess(true);
      
      // Simulate data extracted from resume
      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        website: 'johndoe.com',
        experience: '5 years of experience in frontend development with React and TypeScript. Worked at XYZ Corp (2018-2023) as Senior Frontend Developer.',
        education: 'Bachelor of Science in Computer Science, University of Technology (2014-2018)',
        coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the ${jobData.title} position at ${jobData.company}. With my strong background in frontend development and experience with modern JavaScript frameworks, I believe I am well-suited for this role.

My experience includes developing responsive web applications using React, TypeScript, and modern CSS frameworks. I have a proven track record of delivering high-quality code and collaborating effectively with cross-functional teams.

I am excited about the opportunity to bring my skills and experience to ${jobData.company} and contribute to your innovative projects.

Thank you for considering my application.

Sincerely,
John Doe`,
      });
      
      setIsAutoFilling(false);
      
      toast({
        title: "Resume processed successfully",
        description: "We've extracted information from your resume. Please review and edit as needed.",
      });
    }, 3000);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (activeTab === 'manual' && !formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    }
    
    if (activeTab === 'manual' && !formData.education.trim()) {
      newErrors.education = 'Education is required';
      isValid = false;
    }
    
    if (activeTab === 'upload' && !resumeFile) {
      newErrors.resume = 'Resume is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Form validation error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application submitted successfully",
        description: "Your application has been sent to the employer.",
      });
      setIsSubmitting(false);
      navigate('/jobs');
    }, 2000);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slide-down" className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Job Listing
            </Button>
            
            <h1 className="text-2xl md:text-3xl font-bold">
              Apply for: {jobData.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              at {jobData.company}
            </p>
          </AnimatedSection>
          
          <Tabs 
            defaultValue="manual" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="manual" className="text-sm sm:text-base">
                <FileText className="h-4 w-4 mr-2" /> Manual Application
              </TabsTrigger>
              <TabsTrigger value="upload" className="text-sm sm:text-base">
                <UploadCloud className="h-4 w-4 mr-2" /> Upload Resume
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="manual">
                <AnimatedSection animation="fade-in" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Provide your contact details so employers can reach you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'border-destructive' : ''}
                          />
                          {errors.firstName && (
                            <p className="text-destructive text-xs">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'border-destructive' : ''}
                          />
                          {errors.lastName && (
                            <p className="text-destructive text-xs">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && (
                            <p className="text-destructive text-xs">{errors.email}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'border-destructive' : ''}
                          />
                          {errors.phone && (
                            <p className="text-destructive text-xs">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/yourprofile"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub Profile</Label>
                          <Input
                            id="github"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="github.com/yourusername"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Personal Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="yourwebsite.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Experience & Education</CardTitle>
                      <CardDescription>
                        Tell us about your professional background and education.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">
                          Professional Experience <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Describe your relevant work experience..."
                          className={`min-h-[120px] ${errors.experience ? 'border-destructive' : ''}`}
                        />
                        {errors.experience && (
                          <p className="text-destructive text-xs">{errors.experience}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="education">
                          Education <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          placeholder="List your educational background..."
                          className={`min-h-[120px] ${errors.education ? 'border-destructive' : ''}`}
                        />
                        {errors.education && (
                          <p className="text-destructive text-xs">{errors.education}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Cover Letter</CardTitle>
                      <CardDescription>
                        Explain why you're the right fit for this role.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          placeholder="Write your cover letter here..."
                          className="min-h-[200px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="upload">
                <AnimatedSection animation="fade-in" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Your Resume</CardTitle>
                      <CardDescription>
                        Upload your resume and we'll extract your information automatically.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${
                          resumeFile ? 'border-green-500 bg-green-50' : 'border-muted-foreground/20 hover:border-muted-foreground/50'
                        } transition-colors duration-200`}
                        onDrop={(e) => handleFileDrop(e, 'resume')}
                        onDragOver={handleFileDragOver}
                      >
                        {resumeFile ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
                            <p className="font-medium text-green-700">{resumeFile.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => setResumeFile(null)}
                            >
                              Remove file
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="font-medium">Drop your resume here or click to browse</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Supports PDF, DOCX, or TXT (Max 5MB)
                            </p>
                            {errors.resume && (
                              <p className="text-destructive text-xs mt-2">{errors.resume}</p>
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={triggerFileInput}
                            >
                              Browse files
                            </Button>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'resume')}
                        />
                      </div>

                      <div className="mt-6">
                        <Button
                          type="button"
                          className="w-full"
                          disabled={!resumeFile || isAutoFilling}
                          onClick={handleAutoFill}
                        >
                          {isAutoFilling ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing ({uploadProgress}%)...
                            </div>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" /> Auto-Fill Application
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {uploadSuccess && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Extracted Information</CardTitle>
                          <CardDescription>
                            We've extracted the following information from your resume. Please review and edit if needed.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="linkedin">LinkedIn</Label>
                              <Input
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="github">GitHub</Label>
                              <Input
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Textarea
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                              className="min-h-[120px]"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="education">Education</Label>
                            <Textarea
                              id="education"
                              name="education"
                              value={formData.education}
                              onChange={handleChange}
                              className="min-h-[120px]"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Cover Letter</CardTitle>
                          <CardDescription>
                            We've generated a cover letter based on your resume and the job description. Feel free to edit it.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Textarea
                              id="coverLetter"
                              name="coverLetter"
                              value={formData.coverLetter}
                              onChange={handleChange}
                              className="min-h-[200px]"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </AnimatedSection>
              </TabsContent>
              
              <AnimatedSection animation="slide-up" delay={300} className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>Applying for: <strong>{jobData.title}</strong> at <strong>{jobData.company}</strong></span>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full sm:w-auto min-w-[150px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
