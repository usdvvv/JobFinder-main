import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, FileCheck, FileWarning, Search, Clock, Check, X, Download, ExternalLink, AlertTriangle, ThumbsUp, ThumbsDown, MessageSquare, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CompanyNavBar from '@/components/company/CompanyNavBar';
import AnimatedSection from '@/components/AnimatedSection';

const jobApplications = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    role: "Senior Frontend Developer",
    email: "alex@example.com", 
    experience: "5 years",
    education: "BS Computer Science, Stanford University",
    status: "new", 
    submittedAt: "2023-06-20",
    resume: "/resume-alex.pdf",
    coverLetter: "/cover-letter-alex.pdf",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    plagiarismScore: 2, // 2% plagiarism
    avatarUrl: "",
    portfolioUrl: "https://alex-portfolio.example.com"
  },
  { 
    id: 2, 
    name: "Samantha Lee", 
    role: "UX Designer",
    email: "samantha@example.com", 
    experience: "3 years",
    education: "BFA Design, RISD",
    status: "reviewing", 
    submittedAt: "2023-06-18",
    resume: "/resume-samantha.pdf",
    coverLetter: "/cover-letter-samantha.pdf",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
    plagiarismScore: 15, // 15% plagiarism
    avatarUrl: "",
    portfolioUrl: "https://samantha-portfolio.example.com"
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    role: "Product Manager",
    email: "michael@example.com", 
    experience: "8 years",
    education: "MBA, Harvard Business School",
    status: "shortlisted", 
    submittedAt: "2023-06-15",
    resume: "/resume-michael.pdf",
    coverLetter: "/cover-letter-michael.pdf",
    skills: ["Product Strategy", "Roadmapping", "User Stories", "Agile"],
    plagiarismScore: 0, // 0% plagiarism
    avatarUrl: "",
    portfolioUrl: ""
  },
  { 
    id: 4, 
    name: "Olivia Williams", 
    role: "Backend Engineer",
    email: "olivia@example.com", 
    experience: "4 years",
    education: "MS Computer Engineering, MIT",
    status: "rejected", 
    submittedAt: "2023-06-10",
    resume: "/resume-olivia.pdf",
    coverLetter: "/cover-letter-olivia.pdf",
    skills: ["Java", "Spring Boot", "MySQL", "AWS"],
    plagiarismScore: 42, // 42% plagiarism
    avatarUrl: "",
    portfolioUrl: "https://olivia-portfolio.example.com"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-600 text-white font-semibold';
    case 'reviewing': return 'bg-purple-700 text-white font-semibold';
    case 'shortlisted': return 'bg-green-600 text-white font-semibold';
    case 'interviewed': return 'bg-amber-500 text-white font-semibold';
    case 'offered': return 'bg-emerald-600 text-white font-semibold';
    case 'rejected': return 'bg-red-600 text-white font-semibold';
    default: return 'bg-gray-700 text-white font-semibold';
  }
};

const getPlagiarismColor = (score: number) => {
  if (score < 5) return 'text-green-400 font-semibold';
  if (score < 20) return 'text-yellow-300 font-semibold';
  return 'text-red-400 font-semibold';
};

const ApplicationsManager = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<number | null>(1);
  const [isPlagiarismModalOpen, setIsPlagiarismModalOpen] = useState(false);
  
  const filteredApplications = jobApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const currentApplication = jobApplications.find(app => app.id === selectedApplication);
  
  const runPlagiarismCheck = () => {
    toast({
      title: "Plagiarism check in progress",
      description: "We're analyzing the resume and cover letter content...",
    });
    
    setTimeout(() => {
      setIsPlagiarismModalOpen(true);
    }, 2000);
  };
  
  const handleStatusChange = (newStatus: string) => {
    toast({
      title: `Application status updated to ${newStatus}`,
      description: `${currentApplication?.name}'s application has been ${newStatus}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          asChild
        >
          <Link to="/company/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Job Applications</h1>
            <p className="text-muted-foreground mt-1">
              {jobId ? `Managing applications for job #${jobId}` : "View and manage all applications"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-up" delay={100}>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>
                    {filteredApplications.length} applications found
                  </CardDescription>
                  
                  <div className="mt-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search applications..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Tabs defaultValue="all" onValueChange={setStatusFilter}>
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="new">New</TabsTrigger>
                        <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                
                <CardContent className="px-2">
                  <div className="space-y-1 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                    {filteredApplications.map((application) => (
                      <div 
                        key={application.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedApplication === application.id 
                            ? 'bg-blue-700/60 border-blue-300 border' 
                            : 'hover:bg-slate-800/70 border border-transparent'
                        }`}
                        onClick={() => setSelectedApplication(application.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={application.avatarUrl} />
                            <AvatarFallback className="bg-blue-900 text-blue-200 font-bold">
                              {application.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="truncate font-bold text-base leading-5 text-blue-900 dark:text-blue-200">
                                {application.name}
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full border border-white/20 drop-shadow font-semibold ${getStatusColor(application.status)}`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-300 truncate">{application.role}</div>
                            <div className="flex items-center mt-1 text-xs text-neutral-400">
                              <Clock className="h-3 w-3 mr-1" /> Applied {application.submittedAt}
                            </div>
                          </div>
                        </div>
                        
                        {application.plagiarismScore > 0 && (
                          <div className="mt-2 flex items-center">
                            <AlertTriangle className={`h-3 w-3 mr-1 ${getPlagiarismColor(application.plagiarismScore)}`} />
                            <span className={`text-xs ${getPlagiarismColor(application.plagiarismScore)}`}>
                              {application.plagiarismScore}% potential plagiarism detected
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          <div className="lg:col-span-2">
            {currentApplication ? (
              <AnimatedSection animation="fade-in" delay={200}>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{currentApplication.name}</CardTitle>
                        <CardDescription className="mt-1">{currentApplication.role}</CardDescription>
                      </div>
                      <div className={`text-sm px-3 py-1 rounded-full ${getStatusColor(currentApplication.status)}`}>
                        {currentApplication.status.charAt(0).toUpperCase() + currentApplication.status.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Contact Information</div>
                        <div>{currentApplication.email}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Applied on</div>
                        <div>{currentApplication.submittedAt}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Experience</div>
                        <div>{currentApplication.experience}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Education</h3>
                      <p>{currentApplication.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentApplication.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Resume</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={currentApplication.resume} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={currentApplication.resume} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Cover Letter</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={currentApplication.coverLetter} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={currentApplication.coverLetter} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {currentApplication.portfolioUrl && (
                      <div>
                        <h3 className="font-medium mb-2">Portfolio</h3>
                        <Button variant="outline" size="sm" asChild>
                          <a href={currentApplication.portfolioUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Portfolio Website
                          </a>
                        </Button>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        Plagiarism Check
                        <span className={`ml-2 text-sm ${getPlagiarismColor(currentApplication.plagiarismScore)}`}>
                          ({currentApplication.plagiarismScore}% match)
                        </span>
                      </h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Originality Score</span>
                          <span className="text-sm">{100 - currentApplication.plagiarismScore}%</span>
                        </div>
                        <Progress value={100 - currentApplication.plagiarismScore} className="h-2" />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={runPlagiarismCheck}
                          className="bg-blue-700 text-white hover:bg-blue-800 focus:bg-blue-700"
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          Run New Check
                        </Button>
                        
                        {currentApplication.plagiarismScore > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsPlagiarismModalOpen(true)}
                            className="bg-yellow-600 text-white hover:bg-yellow-700 focus:bg-yellow-700"
                          >
                            <FileWarning className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t p-6">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        size="sm" 
                        onClick={() => handleStatusChange('rejected')}
                        className="bg-red-700 text-white border-red-700 hover:bg-red-800 hover:text-white font-semibold"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange('interviewing')}
                        className="bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:text-white font-semibold"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                    
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange('shortlisted')}
                      className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Shortlist Candidate
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ) : (
              <AnimatedSection animation="fade-in">
                <Card className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center p-6">
                    <div className="mx-auto bg-muted rounded-full h-12 w-12 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Application Selected</h3>
                    <p className="text-muted-foreground">
                      Select an application from the list to view details
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            )}
            
            {currentApplication && (
              <AnimatedSection animation="fade-in" delay={300}>
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const currentIndex = filteredApplications.findIndex(app => app.id === selectedApplication);
                      if (currentIndex > 0) {
                        setSelectedApplication(filteredApplications[currentIndex - 1].id);
                      }
                    }}
                    disabled={filteredApplications.findIndex(app => app.id === selectedApplication) === 0}
                    className="bg-blue-700 text-white hover:bg-blue-800 focus:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    {filteredApplications.findIndex(app => app.id === selectedApplication) + 1} of {filteredApplications.length}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const currentIndex = filteredApplications.findIndex(app => app.id === selectedApplication);
                      if (currentIndex < filteredApplications.length - 1) {
                        setSelectedApplication(filteredApplications[currentIndex + 1].id);
                      }
                    }}
                    disabled={filteredApplications.findIndex(app => app.id === selectedApplication) === filteredApplications.length - 1}
                    className="bg-blue-700 text-white hover:bg-blue-800 focus:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
        
        {isPlagiarismModalOpen && currentApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Plagiarism Analysis Results</CardTitle>
                <CardDescription>
                  Showing potential matches for {currentApplication.name}'s application
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Overall Originality Score</h3>
                    <p className="text-muted-foreground">
                      {currentApplication.plagiarismScore}% match with existing content
                    </p>
                  </div>
                  
                  <div className={`text-2xl font-bold ${getPlagiarismColor(currentApplication.plagiarismScore)}`}>
                    {100 - currentApplication.plagiarismScore}%
                  </div>
                </div>
                
                <Progress value={100 - currentApplication.plagiarismScore} className="h-2" />
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Detected Issues</h3>
                  
                  {currentApplication.plagiarismScore > 0 ? (
                    <div className="space-y-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-3 font-medium">From resume (Personal Summary section)</div>
                        <div className="p-4">
                          <p className="mb-2 text-muted-foreground text-sm">Submitted content:</p>
                          <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 mb-4">
                            <p>
                              "I am a <span className="bg-red-200">passionate and innovative professional with extensive experience in developing 
                              user-friendly interfaces that enhance the overall user experience. My approach to design 
                              combines creativity with data-driven insights to create solutions that are both 
                              visually appealing and functionally effective.</span>"
                            </p>
                          </div>
                          
                          <p className="mb-2 text-muted-foreground text-sm">Similar content found online:</p>
                          <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                            <p>
                              "I am a <span className="bg-blue-200">passionate and innovative professional with extensive experience in developing 
                              user-friendly interfaces that enhance the overall user experience. My approach to design 
                              combines creativity with data-driven insights to create solutions that are both 
                              visually appealing and functionally effective.</span>"
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Source: exampleportfolio.com/about - Last updated March 2023
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {currentApplication.plagiarismScore > 20 && (
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-muted p-3 font-medium">From cover letter (2nd paragraph)</div>
                          <div className="p-4">
                            <p className="mb-2 text-muted-foreground text-sm">Submitted content:</p>
                            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 mb-4">
                              <p>
                                "<span className="bg-red-200">In my previous role at XYZ Company, I led the development of a responsive web application 
                                that increased user engagement by 45% within three months of launch. I collaborated 
                                closely with cross-functional teams to ensure that all aspects of the user experience 
                                were optimized, resulting in a significant improvement in customer satisfaction metrics.</span>"
                              </p>
                            </div>
                            
                            <p className="mb-2 text-muted-foreground text-sm">Similar content found online:</p>
                            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                              <p>
                                "<span className="bg-blue-200">In my previous role at ABC Agency, I led the development of a responsive web application 
                                that increased user engagement by 45% within three months of launch. I collaborated 
                                closely with cross-functional teams to ensure that all aspects of the user experience 
                                were optimized, resulting in a significant improvement in customer satisfaction metrics.</span>"
                              </p>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Source: resumeexamples.com/cover-letters - Last updated January 2023
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                          <FileCheck className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-green-600">No Plagiarism Detected</h3>
                        <p className="text-muted-foreground max-w-md">
                          The application appears to be original. All content passed our plagiarism checks.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t p-6">
                <div className="space-x-2">
                  {currentApplication.plagiarismScore > 0 ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Candidate contacted",
                            description: "An email has been sent requesting clarification on the flagged content.",
                          });
                          setIsPlagiarismModalOpen(false);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Clarification
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          toast({
                            variant: "destructive",
                            title: "Candidate rejected",
                            description: "The application has been rejected due to plagiarism concerns.",
                          });
                          handleStatusChange('rejected');
                          setIsPlagiarismModalOpen(false);
                        }}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Reject for Plagiarism
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Marked as original",
                          description: "This application has been verified as original content.",
                        });
                        setIsPlagiarismModalOpen(false);
                      }}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Mark as Original
                    </Button>
                  )}
                </div>
                
                <Button 
                  onClick={() => setIsPlagiarismModalOpen(false)}
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsManager;
