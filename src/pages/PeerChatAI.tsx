
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Smile, ThumbsUp, ThumbsDown, User, RefreshCw, Info } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'peer';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'seen' | 'error';
}

const PeerChatAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm your job search peer. I've been through the job hunt process and can provide advice, encouragement, or just listen. What's on your mind today?",
      sender: 'peer',
      timestamp: new Date(Date.now() - 60000),
      status: 'seen'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPeer, setCurrentPeer] = useState('alex');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const peers = {
    alex: {
      name: 'Alex',
      role: 'Software Engineer',
      company: 'Tech Innovations Inc.',
      experience: '5 years',
      avatar: '',
      personality: 'Encouraging and technical'
    },
    sarah: {
      name: 'Sarah',
      role: 'UX Designer',
      company: 'CreativeMinds',
      experience: '7 years',
      avatar: '',
      personality: 'Creative and empathetic'
    },
    michael: {
      name: 'Michael',
      role: 'Product Manager',
      company: 'SaaS Solutions',
      experience: '10 years',
      avatar: '',
      personality: 'Strategic and straightforward'
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      // Simulate peer typing
      setIsTyping(true);
      
      // Generate peer response
      setTimeout(() => {
        setIsTyping(false);
        
        const peerResponse = generatePeerResponse(newMessage, currentPeer);
        const peerMessage: Message = {
          id: messages.length + 2,
          text: peerResponse,
          sender: 'peer',
          timestamp: new Date(),
          status: 'sent'
        };
        
        setMessages(prev => [...prev, peerMessage]);
      }, 1500 + Math.random() * 2000);
    }, 500);
  };
  
  const generatePeerResponse = (userMessage: string, peer: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Job search anxiety response
    if (lowerMsg.includes('anxious') || lowerMsg.includes('nervous') || lowerMsg.includes('worried')) {
      if (peer === 'alex') {
        return "I totally get those job search jitters. When I was looking for my current role, I had at least 15 rejections before finding the right fit. What helped me was breaking down the process into small daily tasks. Maybe try focusing on just 2-3 quality applications each day rather than mass applying?";
      } else if (peer === 'sarah') {
        return "It's completely natural to feel anxious during your job search. The uncertainty can be overwhelming. I found that creating a visual board of my career goals and celebrating small wins helped keep me motivated. Would it help to talk through what specifically is causing your anxiety?";
      } else {
        return "Job search anxiety is common but manageable. I approach it like any other project: define your targets, create a strategy, execute methodically, and iterate based on results. Focus on what you can control, like improving your resume or preparing for interviews, rather than outcomes.";
      }
    }
    
    // Resume advice response
    else if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
      if (peer === 'alex') {
        return "For tech resumes, I've found that being specific about technologies and quantifying impact works wonders. Instead of 'Used React', try 'Developed a React application that increased user engagement by 35%'. Also, GitHub links and portfolio projects can really help you stand out!";
      } else if (peer === 'sarah') {
        return "As a designer who reviews portfolios, I can tell you that a clean, well-designed resume reflects your attention to detail. Focus on the narrative your resume tells. For each role, highlight a challenge, your approach, and the outcome. Visual hierarchy is important too - make sure the most relevant info catches the eye first.";
      } else {
        return "Your resume should be treated as a product with your career trajectory as the value proposition. Focus on outcomes, not just responsibilities. I recommend using the STAR method (Situation, Task, Action, Result) for each bullet point. And always tailor it to each job description using relevant keywords.";
      }
    }
    
    // Interview preparation response
    else if (lowerMsg.includes('interview') || lowerMsg.includes('preparing')) {
      if (peer === 'alex') {
        return "Technical interviews can be tough! I always do three things: 1) Research the company's tech stack and review relevant concepts, 2) Practice coding problems on platforms like LeetCode focusing on verbally explaining my thought process, 3) Prepare questions that show I understand their business challenges. Want me to elaborate on any of these?";
      } else if (peer === 'sarah') {
        return "For design interviews, I create a case study presentation of my best work that tells a story. Practice articulating your design decisions and the 'why' behind them. Also, research the company's product and come prepared with thoughtful observations about their user experience. Remember, they're evaluating both your skills and your collaborative potential.";
      } else {
        return "Interview success comes from thorough preparation and strategic positioning. Research the company's market challenges, prepare specific examples of how your skills address their needs, and practice the STAR method for behavioral questions. Always frame answers to demonstrate your value proposition and alignment with their business objectives.";
      }
    }
    
    // Rejection handling response
    else if (lowerMsg.includes('rejected') || lowerMsg.includes('rejection')) {
      if (peer === 'alex') {
        return "Rejections are tough, I won't sugarcoat it. I've been there, and it stings. What helped me was asking for feedback when possible and treating each interview as a learning opportunity. Remember that fit goes both ways - sometimes a rejection saves you from a role that wouldn't have been right for you.";
      } else if (peer === 'sarah') {
        return "I know rejections can be disheartening. After a particularly difficult rejection, I started keeping a 'rejection reflection' journal where I noted what went well and what I could improve. This shifted my perspective from seeing rejections as failures to viewing them as stepping stones. Be gentle with yourself during this process.";
      } else {
        return "Rejections are data points, not judgments of your value. Analyze patterns in feedback, identify areas for improvement, and adjust your approach accordingly. Maintain a pipeline of opportunities to reduce the impact of any single rejection. Remember that successful job searches are largely about persistence and continuous improvement.";
      }
    }
    
    // General encouragement response
    else if (lowerMsg.includes('discouraged') || lowerMsg.includes('giving up') || lowerMsg.includes('hopeless')) {
      if (peer === 'alex') {
        return "I hit that wall too during my job search. What kept me going was finding a community of other developers who were also job hunting. We shared leads and encouraged each other. Also, setting small, achievable daily goals helped me maintain momentum. This is just a chapter, not your whole story.";
      } else if (peer === 'sarah') {
        return "Those feelings are valid and part of almost everyone's job search journey. When I felt discouraged, I took a day off to recharge creatively - visited a museum, sketched, or tried a new design technique just for fun. Reconnecting with why you love what you do can reignite that spark. Tomorrow is a new opportunity.";
      } else {
        return "Discouragement during a job search is a common challenge with practical solutions. Reassess your strategy, seek feedback from industry connections, and optimize your approach. Consider upskilling in high-demand areas to increase your market value. Remember that economic factors often play a larger role than personal qualifications.";
      }
    }
    
    // Salary negotiation response  
    else if (lowerMsg.includes('salary') || lowerMsg.includes('negotiation') || lowerMsg.includes('offer')) {
      if (peer === 'alex') {
        return "Salary negotiations were intimidating for me at first! Research on sites like Glassdoor and levels.fyi really helped me understand my market value. When I got an offer, I politely asked for 24 hours to consider it, then came back with a counteroffer based on my research. Being prepared with specific reasons why you deserve more is key.";
      } else if (peer === 'sarah') {
        return "When negotiating, I've found that framing it as a collaboration rather than a confrontation works well. I highlight my enthusiasm for the role and the unique value I bring, then present my research on industry standards. Remember to consider the total package - sometimes flexibility, growth opportunities, or other benefits can be as valuable as the base salary.";
      } else {
        return "Approach negotiation as a strategic business discussion. Research thoroughly to establish your market value, quantify your potential contribution to their bottom line, and practice your delivery to project confidence. Always get offers in writing and be prepared to walk away if terms don't align with your worth. Remember, negotiation skill is a career-long asset.";
      }
    }
    
    // Default response
    else {
      if (peer === 'alex') {
        return "That's an interesting point about your job search. In my experience as a software engineer, staying persistent and continuously building skills while applying helped me land my role. Is there a specific aspect of your job search that's particularly challenging right now?";
      } else if (peer === 'sarah') {
        return "I appreciate you sharing that. From my perspective in the design world, storytelling is just as important as skills during the job search. Each application is an opportunity to communicate your unique approach. What part of your job search journey would you like to discuss further?";
      } else {
        return "Interesting perspective. In my product management career, I've found that aligning your personal brand with market needs is crucial for job search success. Strategic networking and targeted applications yield better results than high-volume approaches. Would you like to discuss a more structured approach to your search?";
      }
    }
  };
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <AnimatedSection animation="fade-in" className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Peer Chat AI</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Connect with AI peers who've successfully navigated job searches to get advice, perspective, and encouragement
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-up" delay={100}>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Peer</CardTitle>
                  <CardDescription>
                    Select a peer that matches your career interests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'alex' 
                        ? 'bg-blue-100 border-blue-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => setCurrentPeer('alex')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'alex' ? 'text-blue-900' : 'text-white'}`}>{peers.alex.name}</div>
                        <div className={`text-sm ${currentPeer === 'alex' ? 'text-blue-800' : 'text-blue-200'}`}>{peers.alex.role}</div>
                        <div className={`text-xs ${currentPeer === 'alex' ? 'text-blue-700' : 'text-blue-300'}`}>{peers.alex.company}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'sarah' 
                        ? 'bg-purple-100 border-purple-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => setCurrentPeer('sarah')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-purple-100 text-purple-700">SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'sarah' ? 'text-purple-900' : 'text-white'}`}>{peers.sarah.name}</div>
                        <div className={`text-sm ${currentPeer === 'sarah' ? 'text-purple-800' : 'text-purple-200'}`}>{peers.sarah.role}</div>
                        <div className={`text-xs ${currentPeer === 'sarah' ? 'text-purple-700' : 'text-purple-300'}`}>{peers.sarah.company}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'michael' 
                        ? 'bg-green-100 border-green-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => setCurrentPeer('michael')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-green-100 text-green-700">MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'michael' ? 'text-green-900' : 'text-white'}`}>{peers.michael.name}</div>
                        <div className={`text-sm ${currentPeer === 'michael' ? 'text-green-800' : 'text-green-200'}`}>{peers.michael.role}</div>
                        <div className={`text-xs ${currentPeer === 'michael' ? 'text-green-700' : 'text-green-300'}`}>{peers.michael.company}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Suggested Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setNewMessage("I'm feeling anxious about my job search. Any advice?")}>
                      Job search anxiety
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setNewMessage("How can I improve my resume?")}>
                      Resume improvements
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setNewMessage("I have an interview coming up. How should I prepare?")}>
                      Interview preparation
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setNewMessage("I just got rejected again. How do you deal with rejection?")}>
                      Handling rejection
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setNewMessage("How do I negotiate salary for a new offer?")}>
                      Salary negotiation
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          {/* Chat area */}
          <div className="lg:col-span-3">
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="flex flex-col h-[70vh]">
                <CardHeader className="border-b pb-3 pt-6">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className={
                        currentPeer === 'alex' 
                          ? 'bg-blue-100 text-blue-700' 
                          : currentPeer === 'sarah'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                      }>
                        {peers[currentPeer as keyof typeof peers].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {peers[currentPeer as keyof typeof peers].name}
                      </CardTitle>
                      <CardDescription>
                        {peers[currentPeer as keyof typeof peers].role} • {peers[currentPeer as keyof typeof peers].experience} experience
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'peer' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <AvatarFallback className={
                              currentPeer === 'alex' 
                                ? 'bg-blue-100 text-blue-700' 
                                : currentPeer === 'sarah'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-green-100 text-green-700'
                            }>
                              {peers[currentPeer as keyof typeof peers].name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                          <div 
                            className={`p-3 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-muted rounded-bl-none'
                            }`}
                          >
                            {message.text}
                          </div>
                          
                          <div 
                            className={`text-xs text-muted-foreground mt-1 flex items-center ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {message.sender === 'user' && message.status && (
                              <span className="ml-2">
                                {message.status === 'sending' && <span>Sending...</span>}
                                {message.status === 'sent' && <span>Sent</span>}
                                {message.status === 'seen' && <span>Seen</span>}
                                {message.status === 'error' && <span className="text-red-500">Error</span>}
                              </span>
                            )}
                          </div>
                          
                          {message.sender === 'peer' && (
                            <div className="flex space-x-1 mt-1">
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span className="text-xs">Helpful</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                <span className="text-xs">Not helpful</span>
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                            <AvatarFallback className="bg-gray-100">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarFallback className={
                            currentPeer === 'alex' 
                              ? 'bg-blue-100 text-blue-700' 
                              : currentPeer === 'sarah'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-green-100 text-green-700'
                          }>
                            {peers[currentPeer as keyof typeof peers].name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <div className="flex items-end w-full space-x-2">
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Type your message here..." 
                        className="min-h-24 resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="mt-4 text-center">
                <Button variant="outline" className="space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Start New Conversation</span>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerChatAI;
