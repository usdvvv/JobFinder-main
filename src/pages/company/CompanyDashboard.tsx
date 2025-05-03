import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  FileText, 
  FileSearch, 
  PlusCircle, 
  Users, 
  ArrowUpRight, 
  Briefcase, 
  Trophy, 
  Puzzle, 
  HeartPulse, 
  MessageSquare 
} from 'lucide-react';
import CompanyNavBar from '@/components/company/CompanyNavBar';
import AnimatedSection from '@/components/AnimatedSection';
import CodingLeaderboard from '@/components/CodingLeaderboard';
import WellnessUserOverview from '@/components/WellnessUserOverview';
import WellnessCompanyOverview from '@/components/WellnessCompanyOverview';

const jobPostings = [
  { id: 1, title: 'Senior Frontend Developer', applications: 12, status: 'active', createdAt: '2023-06-15' },
  { id: 2, title: 'Product Manager', applications: 24, status: 'active', createdAt: '2023-06-10' },
  { id: 3, title: 'UX Designer', applications: 8, status: 'closed', createdAt: '2023-05-20' },
  { id: 4, title: 'Backend Engineer', applications: 15, status: 'active', createdAt: '2023-06-05' },
];

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = [
    { title: 'Active Jobs', value: jobPostings.filter(job => job.status === 'active').length, icon: <Briefcase className="h-5 w-5" />, color: 'bg-blue-100 text-blue-700' },
    { title: 'Total Applications', value: jobPostings.reduce((acc, job) => acc + job.applications, 0), icon: <FileText className="h-5 w-5" />, color: 'bg-emerald-100 text-emerald-700' },
    { title: 'Candidates Viewed', value: 32, icon: <Users className="h-5 w-5" />, color: 'bg-violet-100 text-violet-700' },
    { title: 'Plagiarism Checks', value: 5, icon: <FileSearch className="h-5 w-5" />, color: 'bg-amber-100 text-amber-700' },
  ];

  const wellnessServices = [
    { 
      title: 'Entertainment Zone', 
      description: 'Games and activities to help employees relax and recharge',
      icon: <Puzzle className="h-10 w-10 text-purple-500" />,
      path: '/company/entertainment',
      color: 'bg-purple-100 border-purple-300',
      textColor: 'text-purple-900',
      iconBg: 'bg-purple-100',
      buttonBg: 'bg-purple-700 hover:bg-purple-800 text-white'
    },
    { 
      title: 'AI Therapist', 
      description: 'Confidential AI-powered mental health support for your team',
      icon: <HeartPulse className="h-10 w-10 text-red-500" />,
      path: '/company/therapist',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-900',
      iconBg: 'bg-red-100',
      buttonBg: 'bg-red-700 hover:bg-red-800 text-white'
    },
    { 
      title: 'Peer Chat', 
      description: 'Connect team members with AI-powered peer support',
      icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
      path: '/company/peer-chat',
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-900',
      iconBg: 'bg-blue-100',
      buttonBg: 'bg-blue-700 hover:bg-blue-800 text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Company Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your job postings and applications</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button
              asChild
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <Link to="/company/applications">
                <FileSearch className="mr-2 h-4 w-4" />
                View Applications
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/company/create-job">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-md mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="talents">Top Talents</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AnimatedSection animation="fade-in" delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="border border-border/40 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={150} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">Employee Wellness</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wellnessServices.map((service, index) => (
                  <Card key={index} className={`border ${service.color} hover:shadow-md transition-shadow`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${service.iconBg} shadow-sm`}>
                          {service.icon}
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={service.path}>
                            <ArrowUpRight className="h-5 w-5 text-gray-700" />
                          </Link>
                        </Button>
                      </div>
                      <CardTitle className={`mt-2 ${service.textColor}`}>{service.title}</CardTitle>
                      <CardDescription className="text-gray-700">{service.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild className={`w-full ${service.buttonBg}`}>
                        <Link to={service.path}>
                          Access Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="border border-border/40 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Recent Job Postings</CardTitle>
                    <Link to="/company/jobs" className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline flex items-center">
                      View All <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left pb-3 font-medium text-gray-300">Job Title</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Applications</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Status</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Created</th>
                          <th className="text-right pb-3 font-medium text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPostings.map((job) => (
                          <tr key={job.id} className="border-b border-border/20 hover:bg-muted/50">
                            <td className="py-3 font-medium text-white">{job.title}</td>
                            <td className="py-3 text-gray-200">{job.applications}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300">{job.createdAt}</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  asChild 
                                  className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 font-semibold transition-colors px-4 py-2 rounded"
                                >
                                  <Link to={`/company/jobs/${job.id}`}>
                                    View
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                                  <Link to={`/company/applications?job=${job.id}`}>
                                    Applications
                                  </Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={300} className="mt-8">
              <Card className="border border-border/40 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center text-white">
                      <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                      Top Coding Talents
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                      <Link to="#talents" onClick={() => setActiveTab('talents')}>
                        View Full Leaderboard <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array(3).fill(0).map((_, index) => {
                      const userIndex = index;
                      return (
                        <Card key={index} className={`border ${index === 0 ? 'bg-yellow-950/30 dark:bg-yellow-950/30 border-yellow-700 dark:border-yellow-700' : ''}`}>
                          <CardContent className="p-4 flex items-center space-x-4">
                            <Avatar className="h-12 w-12 bg-primary text-white">
                              <AvatarFallback>{["AJ", "SL", "MC"][userIndex]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-white">{["Alex Johnson", "Samantha Lee", "Michael Chen"][userIndex]}</h3>
                              <p className="text-sm text-gray-300">
                                {[950, 920, 890][userIndex]} points • {[48, 45, 43][userIndex]} problems
                              </p>
                              <div className="flex gap-1 mt-1">
                                {[["JavaScript", "Python"], ["C++", "Python"], ["JavaScript", "TypeScript"]][userIndex].map((lang, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-blue-900/50 text-blue-200">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="jobs">
            <AnimatedSection animation="fade-in">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">All Job Postings</CardTitle>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/company/create-job">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post New Job
                      </Link>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-300">
                    Manage all your job listings in one place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left pb-3 font-medium text-gray-300">Job Title</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Applications</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Status</th>
                          <th className="text-left pb-3 font-medium text-gray-300">Created</th>
                          <th className="text-right pb-3 font-medium text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPostings.map((job) => (
                          <tr key={job.id} className="border-b border-border/20 hover:bg-muted/50">
                            <td className="py-3 font-medium text-white">{job.title}</td>
                            <td className="py-3 text-gray-200">{job.applications}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300">{job.createdAt}</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                                  <Link to={`/company/jobs/${job.id}/edit`}>
                                    Edit
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                                  <Link to={`/company/applications?job=${job.id}`}>
                                    Applications
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="wellness">
            <AnimatedSection animation="fade-in">
              {/* New Addition: Show Company and Employee Wellness next to each other */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <WellnessCompanyOverview />
                <WellnessUserOverview />
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Employee Wellness Services</h2>
                <p className="text-gray-300">
                  Provide your team with tools for mental health, entertainment, and peer support.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wellnessServices.map((service, index) => (
                  <Card key={index} className={`border ${service.color} hover:shadow-md transition-all hover:translate-y-[-5px]`}>
                    <CardHeader>
                      <div className="flex justify-center mb-2">
                        <div className={`p-4 rounded-full ${service.iconBg} shadow-sm`}>
                          {service.icon}
                        </div>
                      </div>
                      <CardTitle className={`text-center ${service.textColor}`}>{service.title}</CardTitle>
                      <CardDescription className="text-center text-gray-700">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {index === 0 && (
                          <>
                            <li className="flex items-center">
                              <span className="bg-purple-700 text-white rounded-full p-1 mr-2">✓</span>
                              Brain teasers and puzzles
                            </li>
                            <li className="flex items-center">
                              <span className="bg-purple-700 text-white rounded-full p-1 mr-2">✓</span>
                              Strategy games
                            </li>
                            <li className="flex items-center">
                              <span className="bg-purple-700 text-white rounded-full p-1 mr-2">✓</span>
                              Team-building activities
                            </li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li className="flex items-center">
                              <span className="bg-red-700 text-white rounded-full p-1 mr-2">✓</span>
                              Confidential AI counseling
                            </li>
                            <li className="flex items-center">
                              <span className="bg-red-700 text-white rounded-full p-1 mr-2">✓</span>
                              Stress management
                            </li>
                            <li className="flex items-center">
                              <span className="bg-red-700 text-white rounded-full p-1 mr-2">✓</span>
                              Mental health resources
                            </li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li className="flex items-center">
                              <span className="bg-blue-700 text-white rounded-full p-1 mr-2">✓</span>
                              Connect with AI mentors
                            </li>
                            <li className="flex items-center">
                              <span className="bg-blue-700 text-white rounded-full p-1 mr-2">✓</span>
                              Career advice and support
                            </li>
                            <li className="flex items-center">
                              <span className="bg-blue-700 text-white rounded-full p-1 mr-2">✓</span>
                              Professional guidance
                            </li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className={`w-full ${service.buttonBg}`}>
                        <Link to={service.path}>
                          Launch Service
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="talents">
            <AnimatedSection animation="fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Top Coding Talents</h2>
                <p className="text-gray-300">
                  Browse the leaderboard of top performers from our coding challenges. You can contact candidates directly to discuss opportunities.
                </p>
              </div>
              <CodingLeaderboard isCompanyView={true} />
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="company">
            <AnimatedSection animation="fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Company Profile</CardTitle>
                  <CardDescription className="text-gray-300">
                    Update your company details and profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-8">
                    <div className="h-24 w-24 bg-blue-900 rounded-lg flex items-center justify-center mr-6">
                      <Building2 className="h-12 w-12 text-blue-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Acme Corporation</h2>
                      <p className="text-gray-300">Technology</p>
                      <p className="mt-1 text-blue-400">https://www.acmecorp.example.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-white">About</h3>
                      <p className="text-gray-300">
                        Acme Corporation is a technology company focused on creating innovative solutions for businesses of all sizes. 
                        Founded in 2010, we have grown to become a leader in our space with clients worldwide.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-white">Contact Information</h3>
                      <p className="text-gray-300">
                        <strong className="text-white">Email:</strong> info@acmecorp.example.com<br />
                        <strong className="text-white">Phone:</strong> (555) 123-4567<br />
                        <strong className="text-white">Address:</strong> 123 Tech Street, San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
