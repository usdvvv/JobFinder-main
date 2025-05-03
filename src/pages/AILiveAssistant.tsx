
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  RefreshCw,
  Mic,
  MessageSquare,
  Video
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';

// Message type for chat
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

// Example responses from AI assistant
const aiResponses = [
  "Based on your profile, I'd recommend applying for software engineering positions at tech startups. Your skills in React and Node.js make you a great fit!",
  "Looking at your resume, I notice you could add more quantifiable achievements. Try including metrics like 'increased efficiency by 30%' to strengthen your impact.",
  "For your upcoming interview at Tech Co., prepare to discuss your experience with agile methodologies and team collaboration. They value these skills highly.",
  "Your resume looks strong, but consider reorganizing to highlight your most relevant experience first. This will catch the recruiter's attention immediately.",
  "Based on current market trends, your skill set is in high demand. Consider adding cloud computing knowledge to make yourself even more marketable."
];

const AILiveAssistant = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI career assistant. I can help you with resume tips, interview preparation, job search strategies, and more. What can I help you with today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestions = [
    "How can I improve my resume?",
    "What skills are in demand for my field?",
    "Tips for my upcoming interview",
    "Help me write a cover letter",
    "How to negotiate my salary"
  ];

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
    setShowSuggestions(false);

    // Simulate AI thinking and responding
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container max-w-6xl mx-auto pt-20 pb-10 px-4">
        <AnimatedSection animation="slide-down" className="mb-6">
          <h1 className="text-3xl font-bold text-center">AI Career Assistant</h1>
          <p className="text-center text-muted-foreground mt-2">
            Get personalized career advice, resume tips, and interview preparation
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-up">
              <Card>
                <CardHeader>
                  <CardTitle>Assistant Features</CardTitle>
                  <CardDescription>
                    Your personal AI career coach
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">What I can help with:</h3>
                    <ul className="space-y-1">
                      <li className="text-sm flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        Resume optimization
                      </li>
                      <li className="text-sm flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        Interview preparation
                      </li>
                      <li className="text-sm flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        Job search strategies
                      </li>
                      <li className="text-sm flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        Career path advice
                      </li>
                      <li className="text-sm flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        Skill development
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setShowSuggestions(!showSuggestions)}>
                    {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </div>
          
          <div className="lg:col-span-3">
            <AnimatedSection animation="slide-up" delay={100}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Text Chat
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="h-4 w-4 mr-2" />
                    Video Chat
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="mt-4">
                  <Card className="h-[calc(80vh-250px)] flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        <Bot className="h-5 w-5 mr-2 text-primary" />
                        AI Career Assistant
                      </CardTitle>
                      <CardDescription>
                        Chat with your AI assistant for personalized career advice
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {showSuggestions && (
                        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {suggestions.map((suggestion, index) => (
                            <Button 
                              key={index} 
                              variant="outline" 
                              className="justify-start h-auto py-2 px-3 text-sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    
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
                                  <Bot className="h-6 w-6 text-primary" />
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
                                <Bot className="h-6 w-6 text-primary" />
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
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="video" className="mt-4">
                  <Card className="h-[calc(80vh-250px)] flex flex-col">
                    <CardContent className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="mx-auto bg-primary/10 p-6 rounded-full">
                          <Video className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Video Assistant</h2>
                        <p className="text-muted-foreground max-w-md">
                          Connect with your AI career assistant through video for a more interactive experience
                        </p>
                        <Button className="mt-4" size="lg">
                          Start Video Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILiveAssistant;
