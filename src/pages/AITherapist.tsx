import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  Heart, 
  Send, 
  Brain, 
  Wand2, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  User,
  Info,
  ArrowRight,
  HeartPulse,
  Laugh,
  Video,
  Mic,
  MicOff,
  VideoOff
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import WellnessUserOverview from "@/components/WellnessUserOverview";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'therapist';
  timestamp: Date;
};

const therapistResponses = [
  "It sounds like you're feeling stressed about your job search. That's completely normal, especially in today's competitive market. What specific aspects of the process have been most challenging for you?",
  "Interview anxiety is something many people experience. Remember that being nervous shows you care about the opportunity. Have you tried any relaxation techniques before interviews?",
  "Feeling overwhelmed by rejection is natural. Remember that job hunting is often a numbers game, and each 'no' brings you closer to a 'yes'. Would it help to talk about some strategies for managing these feelings?",
  "It's impressive that you're being so proactive about your career development. What specific skills are you most proud of developing recently?",
  "Work-life balance is crucial for maintaining mental health during a job search. What activities outside of your job search bring you joy and relaxation?"
];

const AITherapist = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Career Therapist. I'm here to help you manage stress, anxiety, and other emotions related to your job search and career. How are you feeling today?",
      sender: 'therapist',
      timestamp: new Date()
    }
  ]);
  
  const [videoCall, setVideoCall] = useState({
    active: false,
    micMuted: false,
    videoMuted: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      const randomResponse = therapistResponses[Math.floor(Math.random() * therapistResponses.length)];
      
      const therapistMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'therapist',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, therapistMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVideoCall = () => {
    setVideoCall({
      ...videoCall,
      active: true
    });
  };

  const endVideoCall = () => {
    setVideoCall({
      active: false,
      micMuted: false,
      videoMuted: false
    });
  };

  const toggleMic = () => {
    setVideoCall({
      ...videoCall,
      micMuted: !videoCall.micMuted
    });
  };

  const toggleVideo = () => {
    setVideoCall({
      ...videoCall,
      videoMuted: !videoCall.videoMuted
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <WellnessUserOverview />
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">AI Career Therapist</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Talk through your job search anxieties, career stress, and receive emotional support
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <AnimatedSection animation="slide-up" className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-2 rounded-full bg-primary/10 h-16 w-16 flex items-center justify-center mb-2">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>AI Therapist</CardTitle>
                    <CardDescription>
                      A safe space to discuss your career concerns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Response Quality</span>
                      <span className="text-green-600 font-medium">Excellent</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                    </div>
                    
                    <div className="text-center space-y-2 pt-2">
                      <p className="text-xs text-muted-foreground">
                        Confidential and secure conversations
                      </p>
                      <div className="flex justify-center space-x-1">
                        <HeartPulse className="h-4 w-4 text-red-500" />
                        <Brain className="h-4 w-4 text-primary" />
                        <Laugh className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Therapy Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      Interview Anxiety
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      Rejection Resilience
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      Career Transitions
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      Workplace Stress
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      Work-Life Balance
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                      <h3 className="text-sm font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-500" />
                        Stress Management Guide
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Techniques for managing job search stress
                      </p>
                    </div>
                    <div className="p-3 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                      <h3 className="text-sm font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-500" />
                        Confidence Building
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Strategies to boost interview confidence
                      </p>
                    </div>
                    <div className="p-3 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                      <h3 className="text-sm font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-500" />
                        Professional Crisis Hotlines
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        When you need immediate professional help
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={100} className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Text Chat
                  </TabsTrigger>
                  <TabsTrigger value="video" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Video className="h-4 w-4 mr-2" />
                    Video Chat
                  </TabsTrigger>
                  <TabsTrigger value="exercises" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Exercises & Activities
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="mt-6">
                  <Card className="h-[calc(80vh-200px)] flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-primary" />
                        AI Career Therapist Chat
                      </CardTitle>
                      <CardDescription>
                        Share your thoughts and feelings about your job search and career journey
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`flex max-w-[80%] ${
                              message.sender === 'user' 
                                ? 'flex-row-reverse' 
                                : 'flex-row'
                            }`}
                          >
                            <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                              {message.sender === 'user' ? (
                                <Avatar>
                                  <User className="h-6 w-6" />
                                </Avatar>
                              ) : (
                                <Avatar className="bg-primary/10">
                                  <Brain className="h-6 w-6 text-primary" />
                                </Avatar>
                              )}
                            </div>
                            <div 
                              className={`p-3 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div 
                                className={`mt-1 text-xs ${
                                  message.sender === 'user' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isProcessing && (
                        <div className="flex justify-start">
                          <div className="flex max-w-[80%]">
                            <div className="flex-shrink-0 mr-3">
                              <Avatar className="bg-primary/10">
                                <Brain className="h-6 w-6 text-primary" />
                              </Avatar>
                            </div>
                            <div className="p-3 rounded-lg bg-muted">
                              <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-2 border-t">
                      <div className="w-full flex space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          disabled={isProcessing}
                          className="flex-1"
                        />
                        <Button onClick={handleSend} disabled={isProcessing || !input.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="w-full mt-2 flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Your conversations are private and secure
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="video" className="mt-6">
                  <Card className="h-[calc(80vh-200px)] flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        <Video className="h-5 w-5 mr-2 text-primary" />
                        Video Therapy Session
                      </CardTitle>
                      <CardDescription>
                        Have a face-to-face therapy session with our AI therapist
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 p-4 flex flex-col items-center justify-center">
                      {!videoCall.active ? (
                        <div className="text-center space-y-4">
                          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Video className="h-12 w-12 text-primary" />
                          </div>
                          <h3 className="text-xl font-medium">Ready for your session?</h3>
                          <p className="text-muted-foreground max-w-md">
                            Connect with our AI therapist for a face-to-face video session to discuss your career anxiety and stress.
                          </p>
                          <Button className="mt-2" size="lg" onClick={startVideoCall}>
                            Start Video Session
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col">
                          <div className="relative flex-1 bg-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                            {/* Therapist video feed */}
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <Avatar className="h-24 w-24 bg-primary/10 mx-auto mb-4">
                                  <Brain className="h-12 w-12 text-primary" />
                                </Avatar>
                                <p className="text-white">AI Therapist</p>
                              </div>
                            </div>
                            
                            {/* User video feed (small picture-in-picture) */}
                            <div className="absolute bottom-4 right-4 w-32 h-24 bg-muted rounded overflow-hidden border-2 border-background shadow-lg">
                              {videoCall.videoMuted ? (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <User className="h-8 w-8 text-muted-foreground" />
                                </div>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <Avatar className="h-10 w-10">
                                    <User className="h-6 w-6" />
                                  </Avatar>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-center space-x-2 mt-auto">
                            <Button
                              variant={videoCall.micMuted ? "destructive" : "outline"}
                              size="icon"
                              className="h-12 w-12 rounded-full"
                              onClick={toggleMic}
                            >
                              {videoCall.micMuted ? (
                                <MicOff className="h-5 w-5" />
                              ) : (
                                <Mic className="h-5 w-5" />
                              )}
                            </Button>
                            
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-12 w-12 rounded-full"
                              onClick={endVideoCall}
                            >
                              <PhoneOff className="h-5 w-5" />
                            </Button>
                            
                            <Button
                              variant={videoCall.videoMuted ? "destructive" : "outline"}
                              size="icon"
                              className="h-12 w-12 rounded-full"
                              onClick={toggleVideo}
                            >
                              {videoCall.videoMuted ? (
                                <VideoOff className="h-5 w-5" />
                              ) : (
                                <Video className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="exercises" className="mt-6">
                  <div className="space-y-6">
                    <AnimatedSection animation="fade-in">
                      <Card>
                        <CardHeader>
                          <CardTitle>Career Anxiety Exercises</CardTitle>
                          <CardDescription>
                            Activities designed to help you manage job search stress and anxiety
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                              <h3 className="font-medium mb-2">Guided Breathing</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                A 5-minute breathing exercise to calm interview nerves
                              </p>
                              <Button size="sm" className="w-full">
                                Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                              <h3 className="font-medium mb-2">Reframing Rejection</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Techniques to build resilience after job rejections
                              </p>
                              <Button size="sm" className="w-full">
                                Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                              <h3 className="font-medium mb-2">Confidence Journaling</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Document your achievements to boost interview confidence
                              </p>
                              <Button size="sm" className="w-full">
                                Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                              <h3 className="font-medium mb-2">Stress Visualization</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Visualize success and manage workplace stress
                              </p>
                              <Button size="sm" className="w-full">
                                Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                    
                    <AnimatedSection animation="fade-in" delay={100}>
                      <Card>
                        <CardHeader>
                          <CardTitle>Weekly Mood Tracker</CardTitle>
                          <CardDescription>
                            Track your emotional well-being throughout your job search
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-7 gap-2">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <div key={day} className="text-center text-sm font-medium">
                                  {day}
                                </div>
                              ))}
                              
                              {Array.from({ length: 7 }).map((_, i) => (
                                <Button 
                                  key={i} 
                                  variant="outline" 
                                  className="h-12 hover:bg-primary/10"
                                  disabled={i > 3}
                                >
                                  {i <= 3 && (
                                    <div className="flex flex-col items-center">
                                      {i === 0 && <Laugh className="h-5 w-5 text-green-500" />}
                                      {i === 1 && <Heart className="h-5 w-5 text-yellow-500" />}
                                      {i === 2 && <Heart className="h-5 w-5 text-orange-500" />}
                                      {i === 3 && <Heart className="h-5 w-5 text-red-500" />}
                                    </div>
                                  )}
                                </Button>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center pt-2">
                              <div className="flex items-center space-x-2">
                                <Laugh className="h-4 w-4 text-green-500" />
                                <span className="text-xs">Great</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Heart className="h-4 w-4 text-yellow-500" />
                                <span className="text-xs">Good</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Heart className="h-4 w-4 text-orange-500" />
                                <span className="text-xs">Okay</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Heart className="h-4 w-4 text-red-500" />
                                <span className="text-xs">Stressed</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Mood Insights
                          </Button>
                        </CardFooter>
                      </Card>
                    </AnimatedSection>
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneOff = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
    <line x1="22" y1="2" x2="2" y2="22" />
  </svg>
);

export default AITherapist;
