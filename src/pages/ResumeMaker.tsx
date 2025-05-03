
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, FileCheck, Sparkles, ArrowRight, CheckCircle2, ArrowLeft, X } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

const ResumeMaker = () => {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Resume Builder</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Create a professional resume, get feedback on your existing resume, or generate a tailored cover letter
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" className="mb-8">
            <Tabs defaultValue="generator" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume Generator
                </TabsTrigger>
                <TabsTrigger value="evaluator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Resume Evaluator
                </TabsTrigger>
                <TabsTrigger value="coverletter" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Cover Letter Maker
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generator" className="mt-6">
                <ResumeGenerator />
              </TabsContent>
              
              <TabsContent value="evaluator" className="mt-6">
                <ResumeEvaluator />
              </TabsContent>
              
              <TabsContent value="coverletter" className="mt-6">
                <CoverLetterMaker />
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

const ResumeGenerator = () => {
  const { toast } = useToast();
  const [buildingStarted, setBuildingStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Personal Information", "Work Experience", "Education", "Skills & Certifications", "Preview"];
  
  // State for multiple job experiences
  const [workExperiences, setWorkExperiences] = useState([{ 
    id: 1, 
    jobTitle: '', 
    company: '', 
    startDate: '', 
    endDate: '', 
    description: '' 
  }]);
  
  // State for multiple education entries
  const [educations, setEducations] = useState([{ 
    id: 1, 
    degree: '', 
    institution: '', 
    startYear: '', 
    endYear: '', 
    additionalInfo: '' 
  }]);
  
  // State for multiple certifications
  const [certifications, setCertifications] = useState([{ 
    id: 1, 
    name: '', 
    year: '' 
  }]);

  const handleStartBuilding = () => {
    setBuildingStarted(true);
    setActiveStep(0);
    toast({
      title: "Resume building started",
      description: "You can now fill in your resume details",
    });
  };

  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      toast({
        title: `${steps[activeStep]} completed`,
        description: `Now completing ${steps[activeStep + 1]}`,
      });
    } else {
      toast({
        title: "Resume completed!",
        description: "Your resume is ready to download",
      });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Add new work experience
  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { 
      id: workExperiences.length + 1, 
      jobTitle: '', 
      company: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }]);
    toast({
      title: "Added new job experience",
      description: "You can now fill in the details for this job",
    });
  };

  // Remove work experience
  const removeWorkExperience = (id: number) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter(experience => experience.id !== id));
      toast({
        title: "Removed job experience",
        description: "The job experience has been removed",
      });
    }
  };

  // Add new education
  const addEducation = () => {
    setEducations([...educations, { 
      id: educations.length + 1, 
      degree: '', 
      institution: '', 
      startYear: '', 
      endYear: '', 
      additionalInfo: '' 
    }]);
    toast({
      title: "Added new education",
      description: "You can now fill in the details for this education",
    });
  };

  // Remove education
  const removeEducation = (id: number) => {
    if (educations.length > 1) {
      setEducations(educations.filter(education => education.id !== id));
      toast({
        title: "Removed education",
        description: "The education entry has been removed",
      });
    }
  };

  // Add new certification
  const addCertification = () => {
    setCertifications([...certifications, { 
      id: certifications.length + 1, 
      name: '', 
      year: '' 
    }]);
    toast({
      title: "Added new certification",
      description: "You can now fill in the details for this certification",
    });
  };

  // Remove certification
  const removeCertification = (id: number) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter(certification => certification.id !== id));
      toast({
        title: "Removed certification",
        description: "The certification has been removed",
      });
    }
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AnimatedSection animation="slide-up" delay={100}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Create your resume</CardTitle>
            <CardDescription>
              Build a professional resume step by step
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!buildingStarted ? (
              <div className="space-y-4">
                {steps.slice(0, -1).map((step, index) => (
                  <div key={index} className="p-4 border border-border rounded-md bg-muted/50">
                    <h3 className="font-medium mb-2 flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      {step}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 && "Add your contact details and basic information"}
                      {index === 1 && "List your work history and achievements"}
                      {index === 2 && "Add your educational background"}
                      {index === 3 && "Highlight your key skills and certifications"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Personal Information Section */}
                {activeStep === 0 && (
                  <div className="p-6 border border-primary/20 rounded-md bg-primary/5">
                    <h3 className="font-medium mb-3">Personal Information</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="p-2 rounded-md border border-border bg-background" />
                        <input type="text" placeholder="Last Name" className="p-2 rounded-md border border-border bg-background" />
                      </div>
                      <input type="email" placeholder="Email Address" className="p-2 rounded-md border border-border bg-background" />
                      <input type="tel" placeholder="Phone Number" className="p-2 rounded-md border border-border bg-background" />
                      <Textarea placeholder="Professional Summary" className="p-2 rounded-md border border-border bg-background min-h-[100px]" />
                    </div>
                  </div>
                )}

                {/* Work Experience Section */}
                {activeStep === 1 && (
                  <div className="p-6 border border-primary/20 rounded-md bg-primary/5 max-h-[500px] overflow-y-auto">
                    <h3 className="font-medium mb-3">Work Experience</h3>
                    {workExperiences.map((experience, index) => (
                      <div key={experience.id} className="mb-6 relative">
                        {index > 0 && (
                          <div className="absolute -top-1 -right-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6 rounded-full bg-destructive hover:bg-destructive/90 text-white border-none"
                              onClick={() => removeWorkExperience(experience.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="grid gap-4 p-4 border border-border rounded-md bg-background/50 mt-2">
                          <input 
                            type="text" 
                            placeholder="Job Title" 
                            className="p-2 rounded-md border border-border bg-background" 
                            value={experience.jobTitle}
                            onChange={(e) => {
                              const updated = [...workExperiences];
                              updated[index].jobTitle = e.target.value;
                              setWorkExperiences(updated);
                            }}
                          />
                          <input 
                            type="text" 
                            placeholder="Company" 
                            className="p-2 rounded-md border border-border bg-background" 
                            value={experience.company}
                            onChange={(e) => {
                              const updated = [...workExperiences];
                              updated[index].company = e.target.value;
                              setWorkExperiences(updated);
                            }}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="Start Date" 
                              className="p-2 rounded-md border border-border bg-background" 
                              value={experience.startDate}
                              onChange={(e) => {
                                const updated = [...workExperiences];
                                updated[index].startDate = e.target.value;
                                setWorkExperiences(updated);
                              }}
                            />
                            <input 
                              type="text" 
                              placeholder="End Date" 
                              className="p-2 rounded-md border border-border bg-background" 
                              value={experience.endDate}
                              onChange={(e) => {
                                const updated = [...workExperiences];
                                updated[index].endDate = e.target.value;
                                setWorkExperiences(updated);
                              }}
                            />
                          </div>
                          <Textarea 
                            placeholder="Job Description and Achievements" 
                            className="p-2 rounded-md border border-border bg-background min-h-[100px]" 
                            value={experience.description}
                            onChange={(e) => {
                              const updated = [...workExperiences];
                              updated[index].description = e.target.value;
                              setWorkExperiences(updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2" onClick={addWorkExperience}>
                      + Add Another Job
                    </Button>
                  </div>
                )}

                {/* Education Section */}
                {activeStep === 2 && (
                  <div className="p-6 border border-primary/20 rounded-md bg-primary/5 max-h-[500px] overflow-y-auto">
                    <h3 className="font-medium mb-3">Education</h3>
                    {educations.map((education, index) => (
                      <div key={education.id} className="mb-6 relative">
                        {index > 0 && (
                          <div className="absolute -top-1 -right-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6 rounded-full bg-destructive hover:bg-destructive/90 text-white border-none"
                              onClick={() => removeEducation(education.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="grid gap-4 p-4 border border-border rounded-md bg-background/50 mt-2">
                          <input 
                            type="text" 
                            placeholder="Degree / Certificate" 
                            className="p-2 rounded-md border border-border bg-background" 
                            value={education.degree}
                            onChange={(e) => {
                              const updated = [...educations];
                              updated[index].degree = e.target.value;
                              setEducations(updated);
                            }}
                          />
                          <input 
                            type="text" 
                            placeholder="Institution" 
                            className="p-2 rounded-md border border-border bg-background" 
                            value={education.institution}
                            onChange={(e) => {
                              const updated = [...educations];
                              updated[index].institution = e.target.value;
                              setEducations(updated);
                            }}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="Start Year" 
                              className="p-2 rounded-md border border-border bg-background" 
                              value={education.startYear}
                              onChange={(e) => {
                                const updated = [...educations];
                                updated[index].startYear = e.target.value;
                                setEducations(updated);
                              }}
                            />
                            <input 
                              type="text" 
                              placeholder="End Year" 
                              className="p-2 rounded-md border border-border bg-background" 
                              value={education.endYear}
                              onChange={(e) => {
                                const updated = [...educations];
                                updated[index].endYear = e.target.value;
                                setEducations(updated);
                              }}
                            />
                          </div>
                          <Textarea 
                            placeholder="Additional Information" 
                            className="p-2 rounded-md border border-border bg-background min-h-[100px]" 
                            value={education.additionalInfo}
                            onChange={(e) => {
                              const updated = [...educations];
                              updated[index].additionalInfo = e.target.value;
                              setEducations(updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2" onClick={addEducation}>
                      + Add Another Education
                    </Button>
                  </div>
                )}

                {/* Skills Section */}
                {activeStep === 3 && (
                  <div className="p-6 border border-primary/20 rounded-md bg-primary/5 max-h-[500px] overflow-y-auto">
                    <h3 className="font-medium mb-3">Skills & Certifications</h3>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Skills (separated by commas)</label>
                        <Textarea placeholder="e.g., Project Management, JavaScript, Communication" className="p-2 rounded-md border border-border bg-background min-h-[80px]" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Certifications</label>
                        <div className="space-y-3">
                          {certifications.map((cert, index) => (
                            <div key={cert.id} className="relative">
                              {index > 0 && (
                                <div className="absolute -top-1 -right-1">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-6 w-6 rounded-full bg-destructive hover:bg-destructive/90 text-white border-none"
                                    onClick={() => removeCertification(cert.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                              <div className="flex gap-3 p-3 border border-border rounded-md bg-background/50">
                                <input 
                                  type="text" 
                                  placeholder="Certification Name" 
                                  className="p-2 rounded-md border border-border bg-background flex-1" 
                                  value={cert.name}
                                  onChange={(e) => {
                                    const updated = [...certifications];
                                    updated[index].name = e.target.value;
                                    setCertifications(updated);
                                  }}
                                />
                                <input 
                                  type="text" 
                                  placeholder="Year" 
                                  className="p-2 rounded-md border border-border bg-background w-24" 
                                  value={cert.year}
                                  onChange={(e) => {
                                    const updated = [...certifications];
                                    updated[index].year = e.target.value;
                                    setCertifications(updated);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="mt-2" onClick={addCertification}>
                            + Add Certification
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Section */}
                {activeStep === 4 && (
                  <div className="p-6 border border-primary/20 rounded-md bg-primary/5">
                    <h3 className="font-medium mb-3">Resume Preview</h3>
                    <div className="p-4 border border-dashed border-border rounded-md bg-muted/30 flex items-center justify-center min-h-[300px]">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
                        <h3 className="font-medium">Your Resume is Ready!</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">Click download below to get your completed resume</p>
                        <Button>Download Resume</Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {activeStep > 0 && (
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  )}
                  {activeStep < steps.length - 1 ? (
                    <Button 
                      onClick={handleContinue} 
                      className={activeStep > 0 ? "ml-auto" : "w-full"}
                    >
                      Continue to {steps[activeStep + 1]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      onClick={handleContinue}
                      className="ml-auto"
                    >
                      Finish
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!buildingStarted ? (
              <Button className="w-full" onClick={handleStartBuilding}>
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setBuildingStarted(false)}>
                Cancel
              </Button>
            )}
          </CardFooter>
        </Card>
      </AnimatedSection>
      
      <AnimatedSection animation="slide-up" delay={200}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Resume Templates</CardTitle>
            <CardDescription>
              Choose from professional templates tailored for your industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Classic Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-secondary/20 to-accent/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Modern Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium">Creative Template</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden hover:border-primary transition-colors cursor-pointer aspect-[0.7]">
                <div className="bg-gradient-to-br from-gray-500/90 to-gray-700/90 w-full h-full flex items-center justify-center p-4">
                  <p className="text-center text-sm font-medium text-white">Executive Template</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Preview All Templates
            </Button>
          </CardFooter>
        </Card>
      </AnimatedSection>
    </div>
  );
};

const ResumeEvaluator = () => {
  return (
    <AnimatedSection animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Evaluate Your Resume</CardTitle>
          <CardDescription>
            Get personalized feedback on your resume and see how it matches with job descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your resume file or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOCX, TXT (Max 5MB)
            </p>
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Job Description</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop a job description or paste the text
            </p>
            <p className="text-xs text-muted-foreground">
              We'll analyze how well your resume matches the job requirements
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Analyze Resume <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

const CoverLetterMaker = () => {
  return (
    <AnimatedSection animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Cover Letter</CardTitle>
          <CardDescription>
            Create a customized cover letter that perfectly complements your resume and the job you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
              <p className="text-xs text-muted-foreground">
                We'll use information from your resume to personalize your cover letter
              </p>
            </div>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-2">Upload Job Description</h3>
              <p className="text-xs text-muted-foreground">
                Your cover letter will be tailored to match the job requirements
              </p>
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-muted/50 space-y-2">
            <h3 className="font-medium text-sm">Customize Your Cover Letter</h3>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Select your tone:</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs h-7">Professional</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Confident</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Enthusiastic</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Formal</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Generate Cover Letter <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

export default ResumeMaker;
