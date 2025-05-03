import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, PlusCircle, Search, X, Check, Eye, Edit, Trash, Filter } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import CompanyNavBar from '@/components/company/CompanyNavBar';
import { toast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = "company_job_postings";

const initialJobPostings = [
  { id: 1, title: 'Senior Frontend Developer', location: 'San Francisco, CA', type: 'Full-time', level: 'Senior', applications: 12, status: 'active', createdAt: '2023-06-15' },
  { id: 2, title: 'Product Manager', location: 'New York, NY', type: 'Full-time', level: 'Mid-level', applications: 24, status: 'active', createdAt: '2023-06-10' },
  { id: 3, title: 'UX Designer', location: 'Remote', type: 'Contract', level: 'Mid-level', applications: 8, status: 'closed', createdAt: '2023-05-20' },
  { id: 4, title: 'Backend Engineer', location: 'Austin, TX', type: 'Full-time', level: 'Senior', applications: 15, status: 'active', createdAt: '2023-06-05' },
  { id: 5, title: 'DevOps Engineer', location: 'Seattle, WA', type: 'Full-time', level: 'Senior', applications: 6, status: 'active', createdAt: '2023-06-18' },
  { id: 6, title: 'Marketing Specialist', location: 'Chicago, IL', type: 'Part-time', level: 'Entry-level', applications: 19, status: 'active', createdAt: '2023-06-12' },
  { id: 7, title: 'Data Scientist', location: 'Boston, MA', type: 'Full-time', level: 'Mid-level', applications: 10, status: 'active', createdAt: '2023-06-08' },
  { id: 8, title: 'Customer Success Manager', location: 'Denver, CO', type: 'Full-time', level: 'Mid-level', applications: 5, status: 'closed', createdAt: '2023-05-15' },
];

function loadJobPostings() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialJobPostings));
  return initialJobPostings;
}

function saveJobPostings(jobs: typeof initialJobPostings) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
}

const CompanyJobs = () => {
  const [jobPostings, setJobPostings] = useState(loadJobPostings());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    saveJobPostings(jobPostings);
  }, [jobPostings]);

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (id: number) => {
    setJobPostings(jobPostings.filter(job => job.id !== id));
    toast({
      title: "Job posting deleted",
      description: "The job posting has been successfully deleted.",
    });
  };

  const handleToggleStatus = (id: number) => {
    setJobPostings(jobPostings.map(job => 
      job.id === id 
        ? { ...job, status: job.status === 'active' ? 'closed' : 'active' } 
        : job
    ));
    
    const job = jobPostings.find(job => job.id === id);
    const newStatus = job?.status === 'active' ? 'closed' : 'active';
    
    toast({
      title: `Job posting ${newStatus}`,
      description: `The job posting has been ${newStatus}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground mt-1">Manage all your job listings in one place</p>
          </div>
          
          <Button asChild className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
            <Link to="/company/create-job">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>
        
        <Card className="border border-border/40 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Filter Job Postings</CardTitle>
            <CardDescription>
              Search and filter your job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              <div className="w-full sm:w-[180px]">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle>All Job Postings</CardTitle>
            <CardDescription>
              Total: {filteredJobs.length} job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No job postings found</h3>
                <p className="mt-1 text-muted-foreground">
                  {searchTerm || statusFilter !== 'all'
                    ? "Try adjusting your search filters"
                    : "Create your first job posting to get started"}
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                    <Link to="/company/create-job">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post New Job
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left pb-3 font-medium text-muted-foreground">Job Title</th>
                      <th className="text-left pb-3 font-medium text-muted-foreground hidden md:table-cell">Location</th>
                      <th className="text-left pb-3 font-medium text-muted-foreground hidden lg:table-cell">Applications</th>
                      <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left pb-3 font-medium text-muted-foreground hidden sm:table-cell">Created</th>
                      <th className="text-right pb-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="border-b border-border/20 hover:bg-muted/50">
                        <td className="py-3 font-medium">
                          <div>
                            {job.title}
                            <div className="md:hidden text-sm text-muted-foreground">
                              {job.location}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 hidden md:table-cell">{job.location}</td>
                        <td className="py-3 hidden lg:table-cell">{job.applications}</td>
                        <td className="py-3">
                          <Badge className={`px-2 py-1 ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground hidden sm:table-cell">{job.createdAt}</td>
                        <td className="py-3">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                              <Link to={`/company/jobs/${job.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                              <Link to={`/company/jobs/${job.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                              <Link to={`/company/applications?job=${job.id}`}>
                                <FileText className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hidden sm:flex"
                              onClick={() => handleToggleStatus(job.id)}
                            >
                              {job.status === 'active' ? (
                                <X className="h-4 w-4 text-red-500" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hidden sm:flex text-destructive hover:text-destructive"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                            
                            <Select>
                              <SelectTrigger className="sm:hidden w-[100px]">
                                <span>Actions</span>
                              </SelectTrigger>
                              <SelectContent align="end">
                                <SelectItem value="view">
                                  <Link to={`/company/jobs/${job.id}`} className="flex items-center">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </SelectItem>
                                <SelectItem value="edit">
                                  <Link to={`/company/jobs/${job.id}/edit`} className="flex items-center">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </SelectItem>
                                <SelectItem value="applications">
                                  <Link to={`/company/applications?job=${job.id}`} className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Applications
                                  </Link>
                                </SelectItem>
                                <SelectItem value="toggle" onSelect={() => handleToggleStatus(job.id)}>
                                  <div className="flex items-center">
                                    {job.status === 'active' ? (
                                      <>
                                        <X className="mr-2 h-4 w-4 text-red-500" />
                                        Close
                                      </>
                                    ) : (
                                      <>
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                        Activate
                                      </>
                                    )}
                                  </div>
                                </SelectItem>
                                <SelectItem value="delete" onSelect={() => handleDeleteJob(job.id)}>
                                  <div className="flex items-center text-destructive">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyJobs;
