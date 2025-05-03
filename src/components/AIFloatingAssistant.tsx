
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X, Minimize2, Maximize2, Send, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { askMistral, checkOllamaConnection } from '@/utils/ollamaApi';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
};

// Sample job data for the assistant to reference
const mockJobData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    description: "We are looking for an experienced Frontend Developer...",
    requirements: ["5+ years of React experience", "Strong TypeScript skills", "Experience with state management"]
  },
  {
    id: 2,
    title: "UX Designer",
    company: "CreativeMinds",
    location: "New York, NY",
    salary: "$90K - $120K",
    description: "Join our design team to create stunning user experiences...",
    requirements: ["3+ years of UX design experience", "Proficiency with Figma", "Portfolio of previous work"]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSolutions",
    location: "Remote",
    salary: "$130K - $160K",
    description: "Help us build and maintain our cloud infrastructure...",
    requirements: ["Experience with AWS/Azure", "Knowledge of CI/CD pipelines", "Container orchestration"]
  }
];

const AIFloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI career assistant. How can I help you today?",
      sender: 'assistant'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check Ollama connection when component mounts
    const checkConnection = async () => {
      const connected = await checkOllamaConnection();
      setIsOllamaConnected(connected);
      
      if (!connected) {
        toast({
          variant: "destructive",
          title: "Ollama Connection Failed",
          description: "Please make sure Ollama is running locally with the Mistral model. Run: 'ollama run mistral'",
        });
      }
    };
    
    checkConnection();
  }, [toast]);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Check if Ollama is connected before sending request
    if (!isOllamaConnected) {
      const connected = await checkOllamaConnection();
      setIsOllamaConnected(connected);
      
      if (!connected) {
        setIsTyping(false);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm having trouble connecting to my AI brain. Please make sure Ollama is running with the Mistral model. Run: 'ollama run mistral'",
          sender: 'assistant'
        };
        
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          variant: "destructive",
          title: "Ollama Connection Failed",
          description: "Please make sure Ollama is running locally with the Mistral model.",
        });
        
        return;
      }
    }
    
    try {
      // Generate prompt based on if the question is about jobs
      let prompt = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('job') || lowerInput.includes('position') || lowerInput.includes('opening') || 
          lowerInput.includes('career') || lowerInput.includes('salary') || lowerInput.includes('work')) {
        // Use job-specific prompt if the question is about jobs
        prompt = `You are a helpful AI career assistant. The user is looking for job-related information.
        
Here is data about available jobs:
${mockJobData.map(job => `
- Job ID: ${job.id}
- Title: ${job.title}
- Company: ${job.company}
- Location: ${job.location}
- Salary: ${job.salary}
- Description: ${job.description}
`).join('\n')}

User message: ${input}

Please provide a helpful response about these jobs. If they're asking about specific jobs, provide details from the data above.`;
      } else {
        // Generic career advice prompt
        prompt = `You are a helpful AI career assistant. You provide advice about careers, job searching, resumes, interviews, and professional development.
        
User message: ${input}

Please provide a helpful and concise response.`;
      }
      
      // Get response from Ollama
      const aiResponse = await askMistral(prompt);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while generating a response. Please try again later.",
        sender: 'assistant'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className={`shadow-lg transition-all duration-300 w-80 ${isMinimized ? 'h-14' : 'h-96'}`}>
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="h-4 w-4 mr-2 text-primary" />
              {isOllamaConnected ? "Mistral AI Assistant" : "AI Assistant (Offline)"}
            </CardTitle>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleOpen}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[calc(100%-7rem)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'assistant' && (
                        <Avatar className="h-8 w-8 mr-2">
                          <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </div>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </div>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-2">
                <div className="flex w-full items-center space-x-2">
                  <Input 
                    type="text" 
                    placeholder="Ask a question..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!isOllamaConnected && !isTyping}
                  />
                  <Button 
                    size="icon" 
                    disabled={!input.trim() || !isOllamaConnected || isTyping} 
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg" 
          onClick={toggleOpen}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AIFloatingAssistant;
