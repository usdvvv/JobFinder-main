import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Video, MessageSquare, Code, Play, FileText, Upload, ArrowRight, Trophy, BriefcaseIcon } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import CodingLeaderboard from '@/components/CodingLeaderboard';
import CodingChallenge from '@/components/CodingChallenge';
import { Textarea } from "@/components/ui/textarea";
import AIInterviewer from '@/components/AIInterviewer';
import PracticeQuestion from '@/components/PracticeQuestion';


const InterviewPrep = () => {
  const [showCodingChallenge, setShowCodingChallenge] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState({
    title: '',
    description: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    category: '',
    examples: [],
    starterCode: '',
    solution: ''
  });

  const handleOpenChallenge = (challenge: any) => {
    setSelectedChallenge(challenge);
    setShowCodingChallenge(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Interview Preparation</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Practice for your interviews with our AI-powered tools and boost your confidence
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" className="mb-8">
            <Tabs defaultValue="mock" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mock" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Video className="h-4 w-4 mr-2" />
                  Mock Interviews
                </TabsTrigger>
                <TabsTrigger value="questions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Practice Questions
                </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Code className="h-4 w-4 mr-2" />
                  Technical Interviews
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="mock" className="mt-6">
                <MockInterviews />
              </TabsContent>
              
              <TabsContent value="questions" className="mt-6">
                <PracticeQuestions />
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <TechnicalInterviews onOpenChallenge={handleOpenChallenge} />
              </TabsContent>
              
              <TabsContent value="leaderboard" className="mt-6">
                <CodingLeaderboard />
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>

      {showCodingChallenge && (
        <CodingChallenge
          title={selectedChallenge.title}
          description={selectedChallenge.description}
          difficulty={selectedChallenge.difficulty}
          category={selectedChallenge.category}
          examples={selectedChallenge.examples}
          starterCode={selectedChallenge.starterCode}
          solution={selectedChallenge.solution}
          onClose={() => setShowCodingChallenge(false)}
        />
      )}
    </div>
  );
};

const MockInterviews = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('Tech');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Mid-level');
  const [showInterview, setShowInterview] = useState(false);

  return (
    <div className="space-y-6">
      {!showInterview ? (
        <>
          <AnimatedSection animation="slide-up" delay={100}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-primary" />
                  Live 3D Mock Interview
                </CardTitle>
                <CardDescription>
                  Practice with our AI interviewer who will ask you questions and provide real-time feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="p-4 rounded-md bg-muted/50">
                    <h3 className="font-medium text-sm mb-2 flex items-center">
                      <BriefcaseIcon className="h-4 w-4 mr-2 text-primary" />
                      Job Description
                    </h3>
                    <Textarea 
                      placeholder="Paste the job description here for a more personalized interview experience..."
                      className="resize-none min-h-[100px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Adding a job description helps our AI tailor questions specific to the role you're applying for
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-muted/50">
                    <h3 className="font-medium text-sm mb-2">Select Industry</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Tech', 'Finance', 'Marketing', 'Healthcare'].map(industry => (
                        <Button 
                          key={industry}
                          variant={selectedIndustry === industry ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSelectedIndustry(industry)}
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-muted/50">
                    <h3 className="font-medium text-sm mb-2">Interview Difficulty</h3>
                    <div className="flex gap-2">
                      {['Entry', 'Mid-level', 'Senior'].map(difficulty => (
                        <Button 
                          key={difficulty}
                          variant={selectedDifficulty === difficulty ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSelectedDifficulty(difficulty)}
                        >
                          {difficulty}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setShowInterview(true)}>
                  Start Mock Interview <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upload Resume for Personalized Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your resume for tailored questions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, TXT (Max 5MB)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Upload Resume</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Previous Interview Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Frontend Developer Interview</span>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Product Manager Interview</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Sessions</Button>
                </CardFooter>
              </Card>
            </div>
          </AnimatedSection>
        </>
      ) : (
        <AnimatedSection animation="fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-primary" />
                  3D AI Interview Simulator
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowInterview(false)}>
                  Back
                </Button>
              </CardTitle>
              <CardDescription>
                Speak naturally with our AI interviewer and receive instant feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIInterviewer 
                jobDescription={jobDescription} 
                industry={selectedIndustry}
                difficulty={selectedDifficulty}
              />
            </CardContent>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
};

const PracticeQuestions = () => {
  return (
    <AnimatedSection animation="fade-in">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Common Interview Questions</CardTitle>
            <CardDescription>
              Practice answering questions frequently asked in interviews for your field
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-md border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Tell me about yourself.</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    The most common opening question in interviews. How would you introduce yourself professionally?
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 rounded-md border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">What are your greatest strengths?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus on qualities relevant to the job and provide specific examples.
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 rounded-md border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Why should we hire you?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Highlight your unique value proposition and how you can solve the company's problems.
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 rounded-md border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Where do you see yourself in 5 Years?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Show ambition while aligning your goals with the company's growth trajectory.
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              View All Practice Questions
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Industry-Specific Questions</CardTitle>
            <CardDescription>
              Practice with questions tailored to your specific field and role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Software Engineering</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Data Science</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Product Management</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Marketing</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Sales</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Design</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Finance</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-6 flex flex-col space-y-2">
                <FileText className="h-8 w-8 mb-1" />
                <span>Healthcare</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
};

const TechnicalInterviews = ({ onOpenChallenge }: { onOpenChallenge: (challenge: any) => void }) => {
  const handleOpenChallenge = () => {
    const challenge = {
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
      category: 'Arrays',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
        },
        {
          input: 'nums = [3,3], target = 6',
          output: '[0,1]',
        }
      ],
      starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
      solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`
    };
    
    onOpenChallenge(challenge);
  };

  return (
    <AnimatedSection animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Technical Coding Interviews</CardTitle>
          <CardDescription>
            Practice coding challenges and technical questions commonly asked in tech interviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Choose a programming language:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">JavaScript</Button>
                <Button variant="outline">Python</Button>
                <Button variant="outline">Java</Button>
                <Button variant="outline">C++</Button>
                <Button variant="outline">Go</Button>
                <Button variant="outline">Ruby</Button>
              </div>
              
              <h3 className="font-medium mt-6">Choose difficulty level:</h3>
              <div className="flex gap-2">
                <Button variant="outline">Easy</Button>
                <Button variant="outline">Medium</Button>
                <Button variant="outline">Hard</Button>
              </div>
              
              <h3 className="font-medium mt-6">Problem categories:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">Arrays & Strings</Button>
                <Button variant="outline" className="justify-start">Linked Lists</Button>
                <Button variant="outline" className="justify-start">Trees & Graphs</Button>
                <Button variant="outline" className="justify-start">Dynamic Programming</Button>
                <Button variant="outline" className="justify-start">Sorting & Searching</Button>
                <Button variant="outline" className="justify-start">System Design</Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4 bg-muted/30">
              <h3 className="font-medium mb-3">Popular Coding Challenges</h3>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded-md flex items-center justify-between hover:shadow-sm transition-shadow cursor-pointer"
                     onClick={handleOpenChallenge}>
                  <div>
                    <p className="font-medium text-sm">Two Sum</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Easy</span>
                      <span className="text-xs text-muted-foreground ml-2">Array, Hash Table</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={handleOpenChallenge}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-3 bg-background rounded-md flex items-center justify-between hover:shadow-sm transition-shadow cursor-pointer"
                     onClick={handleOpenChallenge}>
                  <div>
                    <p className="font-medium text-sm">Merge Intervals</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Medium</span>
                      <span className="text-xs text-muted-foreground ml-2">Array, Sorting</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={handleOpenChallenge}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-3 bg-background rounded-md flex items-center justify-between hover:shadow-sm transition-shadow cursor-pointer"
                     onClick={handleOpenChallenge}>
                  <div>
                    <p className="font-medium text-sm">LRU Cache</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Hard</span>
                      <span className="text-xs text-muted-foreground ml-2">Hash Table, Linked List</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={handleOpenChallenge}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleOpenChallenge}>
            Start Coding Challenge <Code className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

export default InterviewPrep;
