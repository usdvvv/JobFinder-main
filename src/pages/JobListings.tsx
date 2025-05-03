
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Clock, 
  Filter, 
  SlidersHorizontal, 
  CalendarDays, 
  Banknote,
  Building,
  Bookmark,
  ChevronRight,
  FileText
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import JobCard from '@/components/JobCard';

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: null,
    experience: null,
    salary: null,
    location: null,
    remote: false
  });

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  const toggleRemote = () => {
    setSelectedFilters(prev => ({
      ...prev,
      remote: !prev.remote
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      jobType: null,
      experience: null,
      salary: null,
      location: null,
      remote: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Find Your Dream Job</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Discover opportunities that match your skills and career goals
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-10 py-6 text-lg"
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <AnimatedSection animation="slide-up" className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Job Type</h3>
                    <div className="space-y-2">
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.jobType === 'full-time' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('jobType', 'full-time')}
                      >
                        <span>Full-time</span>
                        {selectedFilters.jobType === 'full-time' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.jobType === 'part-time' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('jobType', 'part-time')}
                      >
                        <span>Part-time</span>
                        {selectedFilters.jobType === 'part-time' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.jobType === 'contract' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('jobType', 'contract')}
                      >
                        <span>Contract</span>
                        {selectedFilters.jobType === 'contract' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.jobType === 'internship' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('jobType', 'internship')}
                      >
                        <span>Internship</span>
                        {selectedFilters.jobType === 'internship' && <Badge>Selected</Badge>}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                    <div className="space-y-2">
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.experience === 'entry' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('experience', 'entry')}
                      >
                        <span>Entry Level</span>
                        {selectedFilters.experience === 'entry' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.experience === 'mid' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('experience', 'mid')}
                      >
                        <span>Mid Level</span>
                        {selectedFilters.experience === 'mid' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.experience === 'senior' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('experience', 'senior')}
                      >
                        <span>Senior Level</span>
                        {selectedFilters.experience === 'senior' && <Badge>Selected</Badge>}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                    <div className="space-y-2">
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.salary === 'under50k' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('salary', 'under50k')}
                      >
                        <span>Under $50K</span>
                        {selectedFilters.salary === 'under50k' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.salary === '50k-100k' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('salary', '50k-100k')}
                      >
                        <span>$50K - $100K</span>
                        {selectedFilters.salary === '50k-100k' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.salary === '100k-150k' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('salary', '100k-150k')}
                      >
                        <span>$100K - $150K</span>
                        {selectedFilters.salary === '100k-150k' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.salary === 'over150k' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('salary', 'over150k')}
                      >
                        <span>$150K+</span>
                        {selectedFilters.salary === 'over150k' && <Badge>Selected</Badge>}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <div className="space-y-2">
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.location === 'sf' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('location', 'sf')}
                      >
                        <span>San Francisco</span>
                        {selectedFilters.location === 'sf' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.location === 'nyc' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('location', 'nyc')}
                      >
                        <span>New York</span>
                        {selectedFilters.location === 'nyc' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.location === 'seattle' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('location', 'seattle')}
                      >
                        <span>Seattle</span>
                        {selectedFilters.location === 'seattle' && <Badge>Selected</Badge>}
                      </button>
                      <button 
                        className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                          selectedFilters.location === 'austin' 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleFilterChange('location', 'austin')}
                      >
                        <span>Austin</span>
                        {selectedFilters.location === 'austin' && <Badge>Selected</Badge>}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                        selectedFilters.remote 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={toggleRemote}
                    >
                      <span>Remote Only</span>
                      {selectedFilters.remote && <Badge>Selected</Badge>}
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={100} className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Job Listings</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                      <Button size="sm">
                        Save Search
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Showing 1-10 of 56 jobs
                  </CardDescription>
                </CardHeader>
                <div className="px-4">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All Jobs</TabsTrigger>
                      <TabsTrigger value="saved">Saved</TabsTrigger>
                      <TabsTrigger value="applied">Applied</TabsTrigger>
                      <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <JobCard 
                      title="Senior Frontend Developer"
                      company="TechCorp Inc."
                      location="San Francisco, CA"
                      salary="$120K - $150K"
                      type="Full-time"
                      posted="2 days ago"
                      description="We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces, implementing features, and ensuring the overall quality of our web applications."
                      skills={["React", "TypeScript", "CSS", "Redux"]}
                      remote={true}
                      id="job1"
                    />
                    
                    <JobCard 
                      title="Backend Engineer"
                      company="DataSystems"
                      location="New York, NY"
                      salary="$130K - $160K"
                      type="Full-time"
                      posted="1 day ago"
                      description="Join our backend team to design and implement scalable APIs and services. You'll work with our data team to optimize database queries and ensure high performance."
                      skills={["Node.js", "Python", "PostgreSQL", "AWS"]}
                      remote={false}
                      id="job2"
                    />
                    
                    <JobCard 
                      title="Full Stack Developer"
                      company="StartupX"
                      location="Remote"
                      salary="$100K - $130K"
                      type="Full-time"
                      posted="3 days ago"
                      description="As a Full Stack Developer, you'll work on both frontend and backend aspects of our product. You should be comfortable with modern JavaScript frameworks and server-side technologies."
                      skills={["React", "Node.js", "MongoDB", "GraphQL"]}
                      remote={true}
                      id="job3"
                    />
                    
                    <JobCard 
                      title="DevOps Engineer"
                      company="CloudTech Solutions"
                      location="Seattle, WA"
                      salary="$125K - $155K"
                      type="Full-time"
                      posted="1 week ago"
                      description="We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work on CI/CD pipelines, infrastructure as code, and monitoring solutions."
                      skills={["Kubernetes", "Docker", "Terraform", "AWS"]}
                      remote={true}
                      id="job4"
                    />
                    
                    <JobCard 
                      title="UI/UX Designer"
                      company="DesignHub"
                      location="Austin, TX"
                      salary="$90K - $120K"
                      type="Full-time"
                      posted="5 days ago"
                      description="Join our design team to create beautiful and intuitive user interfaces. You'll collaborate with product managers and developers to deliver exceptional user experiences."
                      skills={["Figma", "Adobe XD", "Prototyping", "User Research"]}
                      remote={false}
                      id="job5"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">...</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">8</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              <AnimatedSection animation="slide-up" delay={200} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Search Tips</CardTitle>
                    <CardDescription>
                      Maximize your job search with these helpful tips
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Optimize Your Resume</h3>
                        <p className="text-sm text-muted-foreground">
                          Tailor your resume for each job application to highlight relevant skills and experience.
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Research Companies</h3>
                        <p className="text-sm text-muted-foreground">
                          Learn about the company's culture, values, and mission before applying or interviewing.
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Bookmark className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Save Job Searches</h3>
                        <p className="text-sm text-muted-foreground">
                          Save your searches and set up job alerts to stay updated on new opportunities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
