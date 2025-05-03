import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Search, 
  ArrowRight,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Loader2,
  FilterIcon,
  RssIcon,
  LightbulbIcon
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import JobMatchCard from '@/components/JobMatchCard';
import LinkedInJobCard from '@/components/LinkedInJobCard';
import JobDetailsPanel from '@/components/JobDetailsPanel';
import JobsFilterBar, { JobFilters } from '@/components/JobsFilterBar';
import BatchApplicationPanel from '@/components/BatchApplicationPanel';
import { 
  uploadAndAnalyzeCV, 
  searchJobs, 
  JobMatch, 
  JobSearchResult,
  ApplicationStatus 
} from '@/services/jobSearchAPI';

const AIJobSearch = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // CV Upload state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  
  // Job search state
  const [jobTitle, setJobTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<JobSearchResult[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedJobIds, setSelectedJobIds] = useState<Set<number>>(new Set());
  const [selectedJob, setSelectedJob] = useState<JobSearchResult | null>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isBatchApplyOpen, setIsBatchApplyOpen] = useState(false);
  const [applicationStatuses, setApplicationStatuses] = useState<Record<number, ApplicationStatus>>({});
  const [searchFilters, setSearchFilters] = useState<JobFilters>({
    easyApplyOnly: false,
    sortBy: 'relevance',
    datePosted: 'any',
    jobType: 'any',
    salaryRange: [0, 200],
    locationDistance: 25,
  });
  const [filteredResults, setFilteredResults] = useState<JobSearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter job results when filters change
  useEffect(() => {
    if (searchResults.length === 0) {
      setFilteredResults([]);
      return;
    }
    
    let results = [...searchResults];
    
    // Apply Easy Apply filter
    if (searchFilters.easyApplyOnly) {
      results = results.filter(job => job.easyApply);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sort
    if (searchFilters.sortBy === 'date') {
      results.sort((a, b) => {
        // Convert posting date string to sortable value
        // Simple conversion for demo - in reality would need more robust parsing
        const getPostingValue = (posted: string) => {
          if (posted.includes('hour')) return 0;
          if (posted.includes('day')) return parseInt(posted) || 1;
          if (posted.includes('week')) return (parseInt(posted) || 1) * 7;
          if (posted.includes('month')) return (parseInt(posted) || 1) * 30;
          return 100; // Default for unknown formats
        };
        
        return getPostingValue(a.posted) - getPostingValue(b.posted);
      });
    } else if (searchFilters.sortBy === 'salary') {
      results.sort((a, b) => {
        // Extract numeric value from salary string
        const getSalaryValue = (salary: string) => {
          const match = salary.match(/\$(\d+)K/);
          return match ? parseInt(match[1]) : 0;
        };
        
        return getSalaryValue(b.salary) - getSalaryValue(a.salary);
      });
    } else if (searchFilters.sortBy === 'relevance') {
      // Sort by match percentage if available
      results.sort((a, b) => {
        const aMatch = a.matchPercentage || 0;
        const bMatch = b.matchPercentage || 0;
        return bMatch - aMatch;
      });
    }
    
    setFilteredResults(results);
  }, [searchResults, searchFilters, searchTerm]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file only.",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      setCvFile(file);
    }
  };
  
  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file only.",
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      
      setCvFile(file);
    }
  };
  
  const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Analyze CV using our API
  const analyzeCV = async () => {
    if (!cvFile) {
      toast({
        variant: "destructive",
        title: "No CV uploaded",
        description: "Please upload your CV first.",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // Call our API to analyze the CV
      const matches = await uploadAndAnalyzeCV(cvFile);
      clearInterval(interval);
      setUploadProgress(100);
      setJobMatches(matches);
      
      toast({
        title: "CV analyzed successfully",
        description: "We've found job matches for your profile!",
      });
    } catch (error) {
      console.error('Error analyzing CV:', error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "Failed to analyze your CV. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Search for jobs
  const searchJobsHandler = async () => {
    if (!jobTitle.trim()) {
      toast({
        variant: "destructive",
        title: "No job title entered",
        description: "Please enter a job title to search for.",
      });
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      // Call our API to search for jobs
      const results = await searchJobs(jobTitle);
      
      // Enhance results with additional data for demo purposes
      const enhancedResults = results.map(job => ({
        ...job,
        easyApply: Math.random() > 0.3, // 70% of jobs are Easy Apply
        matchPercentage: Math.floor(Math.random() * 40) + 60, // 60-99% match
        jobType: ['Full-time', 'Part-time', 'Contract', 'Internship'][Math.floor(Math.random() * 4)],
        skills: [
          'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 
          'Python', 'SQL', 'AWS', 'Git', 'Agile', 'UI/UX', 'REST API'
        ].sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 5)),
        matchedSkills: [
          'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'
        ].sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 3))
      }));
      
      setSearchResults(enhancedResults);
      setActiveTab('search');
    } catch (error) {
      console.error('Error searching jobs:', error);
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Failed to search for jobs. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const applyToJob = (jobId: number) => {
    navigate(`/apply/${jobId}`);
  };
  
  const handleJobSelection = (jobId: number, selected: boolean) => {
    setSelectedJobIds(prev => {
      const newSelectedIds = new Set(prev);
      if (selected) {
        newSelectedIds.add(jobId);
      } else {
        newSelectedIds.delete(jobId);
      }
      return newSelectedIds;
    });
  };
  
  const handleViewJobDetails = (job: JobSearchResult) => {
    setSelectedJob(job);
    setIsJobDetailOpen(true);
  };
  
  const handleBatchApplyComplete = (results: Record<number, ApplicationStatus>) => {
    setApplicationStatuses(prev => ({...prev, ...results}));
    
    // Count successes and failures
    const successes = Object.values(results).filter(r => r.status === 'completed').length;
    const failures = Object.values(results).filter(r => r.status === 'failed').length;
    
    // Show toast with summary
    toast({
      title: "Batch Application Complete",
      description: `Applied to ${successes} jobs successfully, ${failures} jobs failed.`,
    });
  };
  
  const handleApplicationSuccess = (jobId: number, status: ApplicationStatus) => {
    setApplicationStatuses(prev => ({
      ...prev,
      [jobId]: status
    }));
  };
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">AI-Powered Job Matching</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Upload your CV and let our AI match you with the perfect job opportunities
            </p>
          </AnimatedSection>
          
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <AnimatedSection animation="fade-in">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CV
                </TabsTrigger>
                <TabsTrigger value="search">
                  <Search className="mr-2 h-4 w-4" />
                  Search Jobs
                </TabsTrigger>
              </TabsList>
            </AnimatedSection>
            
            <TabsContent value="upload" className="mt-6">
              <AnimatedSection animation="slide-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Upload Your CV</CardTitle>
                    <CardDescription>
                      Upload your CV and our AI will find the best job matches for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        cvFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-muted-foreground/20 hover:border-muted-foreground/50'
                      } transition-colors duration-200`}
                      onDrop={handleFileDrop}
                      onDragOver={handleFileDragOver}
                    >
                      {cvFile ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                          <p className="font-medium text-green-700 dark:text-green-300">{cvFile.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => setCvFile(null)}
                          >
                            Remove file
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="font-medium">Drop your CV here or click to browse</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supports PDF or DOCX (Max 5MB)
                          </p>
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
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {cvFile && (
                      <div className="mt-6">
                        <Button
                          className="w-full"
                          onClick={analyzeCV}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing... {uploadProgress}%
                            </>
                          ) : (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Analyze CV
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="md:col-span-2">
                  {isAnalyzing ? (
                    <Card className="h-full flex flex-col justify-center items-center p-8">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Analyzing your CV</h3>
                      <p className="text-muted-foreground text-center">
                        Our AI is processing your CV and finding the best job matches for your skills and experience.
                      </p>
                      <div className="w-full max-w-md mt-6 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300 ease-in-out" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </Card>
                  ) : jobMatches.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Your Top Job Matches</h2>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setActiveTab('search');
                            setJobTitle(jobMatches[0]?.title || '');
                          }}
                          className="flex items-center gap-2"
                        >
                          <Search className="h-4 w-4" />
                          Find Similar Jobs
                        </Button>
                      </div>
                      {jobMatches.map((job) => (
                        <JobMatchCard
                          key={job.id}
                          job={job}
                          onApply={() => {
                            // Set job title for search tab
                            setJobTitle(job.title);
                            // Trigger search and switch to search tab
                            searchJobsHandler();
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="h-full flex flex-col justify-center items-center p-8">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No analysis yet</h3>
                      <p className="text-muted-foreground text-center">
                        Upload your CV and click "Analyze CV" to find your best job matches.
                      </p>
                    </Card>
                  )}
                </div>
              </AnimatedSection>
            </TabsContent>
            
            <TabsContent value="search" className="mt-6">
              <AnimatedSection animation="slide-up">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Search for Jobs</CardTitle>
                    <CardDescription>
                      Enter a job title to search for relevant openings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          className="pl-10"
                          placeholder="Job title, e.g., 'Frontend Developer'"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && searchJobsHandler()}
                        />
                      </div>
                      <Button onClick={searchJobsHandler} disabled={isSearching}>
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            Search
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Search results section */}
                {isSearching ? (
                  <Card className="p-12 flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Searching for jobs</h3>
                    <p className="text-muted-foreground text-center">
                      We're finding the best job matches for "{jobTitle}"
                    </p>
                  </Card>
                ) : filteredResults.length > 0 ? (
                  <div>
                    {/* Filter bar */}
                    <JobsFilterBar 
                      totalJobs={filteredResults.length}
                      searchTerm={jobTitle}
                      onSearchChange={setSearchTerm}
                      onFilterChange={setSearchFilters}
                    />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => setSelectedJobIds(new Set())}
                          disabled={selectedJobIds.size === 0}
                        >
                          Clear Selection ({selectedJobIds.size})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => setSelectedJobIds(new Set(filteredResults.map(job => job.id)))}
                        >
                          Select All
                        </Button>
                      </div>
                      <Button
                        onClick={() => setIsBatchApplyOpen(true)}
                        disabled={selectedJobIds.size === 0}
                        className="flex items-center gap-2"
                      >
                        <RssIcon className="h-4 w-4" />
                        Apply to {selectedJobIds.size} Selected
                      </Button>
                    </div>
                    
                    {/* Job list */}
                    <div className="space-y-4">
                      {filteredResults.map((job) => (
                        <LinkedInJobCard
                          key={job.id}
                          job={job}
                          selected={selectedJobIds.has(job.id)}
                          onSelect={handleJobSelection}
                          onViewDetails={handleViewJobDetails}
                          applicationStatus={applicationStatuses[job.id]}
                        />
                      ))}
                    </div>
                    
                    {/* Job Details Panel */}
                    <JobDetailsPanel
                      job={selectedJob}
                      open={isJobDetailOpen}
                      onOpenChange={setIsJobDetailOpen}
                      onApplySuccess={handleApplicationSuccess}
                    />
                    
                    {/* Batch Application Panel */}
                    <BatchApplicationPanel
                      open={isBatchApplyOpen}
                      onOpenChange={setIsBatchApplyOpen}
                      selectedJobs={filteredResults.filter(job => selectedJobIds.has(job.id))}
                      onComplete={handleBatchApplyComplete}
                    />
                  </div>
                ) : searchResults.length === 0 ? (
                  <Card className="p-12 flex flex-col items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No search results yet</h3>
                    <p className="text-muted-foreground text-center mb-6">
                      Enter a job title above and click "Search" to find job opportunities
                    </p>
                    {jobMatches.length > 0 && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md max-w-md">
                        <div className="flex gap-2 items-start">
                          <LightbulbIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Pro Tip: Try searching for one of your recommended jobs
                            </p>
                            <div className="mt-2 space-y-1">
                              {jobMatches.slice(0, 3).map((match, index) => (
                                <Button 
                                  key={index} 
                                  variant="outline" 
                                  size="sm" 
                                  className="mr-2 mt-1 bg-white/50 dark:bg-slate-800/50"
                                  onClick={() => {
                                    setJobTitle(match.title);
                                    searchJobsHandler();
                                  }}
                                >
                                  {match.title}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card className="p-12 flex flex-col items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No matching jobs found</h3>
                    <p className="text-muted-foreground text-center">
                      No jobs match your current filters. Try adjusting your search criteria.
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => {
                        setSearchFilters({
                          easyApplyOnly: false,
                          sortBy: 'relevance',
                          datePosted: 'any',
                          jobType: 'any',
                          salaryRange: [0, 200],
                          locationDistance: 25,
                        });
                        setSearchTerm('');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Card>
                )}
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIJobSearch;
