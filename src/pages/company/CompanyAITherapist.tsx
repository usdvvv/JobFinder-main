
import { useState, useEffect } from 'react';
import CompanyNavBar from "@/components/company/CompanyNavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Send, HeartPulse, Clock, Calendar, BarChart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import WellnessCombinedOverview from "@/components/WellnessCombinedOverview";
import { askMistral, checkOllamaConnection } from '@/utils/ollamaApi';
import { useToast } from "@/components/ui/use-toast";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const CompanyAITherapist = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm Dr. Emma, your company's AI therapist. Everything discussed here is confidential. How can I support you or your team today?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: "user", content: message }]);
    
    // Clear input and show typing indicator
    setMessage("");
    setIsTyping(true);
    
    try {
      // Check if Ollama is connected
      if (!isOllamaConnected) {
        const connected = await checkOllamaConnection();
        setIsOllamaConnected(connected);
        
        if (!connected) {
          setChatMessages(prev => [...prev, { 
            role: "assistant", 
            content: "I'm having trouble connecting to my AI brain. Please make sure Ollama is running with the Mistral model. Run: 'ollama run mistral'" 
          }]);
          setIsTyping(false);
          return;
        }
      }
      
      // Create context for the AI therapist
      const conversationHistory = chatMessages.map(msg => 
        `${msg.role === 'assistant' ? 'Dr. Emma' : 'Company Leader'}: ${msg.content}`
      ).join('\n');
      
      const prompt = `You are Dr. Emma Thompson, an AI therapist specializing in workplace wellness and mental health support for company leaders and their teams. You communicate in a professional, empathetic tone.

Current conversation history:
${conversationHistory}

Company Leader: ${message}

Provide a helpful, empathetic response as Dr. Emma. Focus on workplace mental health, stress management, employee wellbeing, burnout prevention, and creating healthy work environments. Keep your response concise (100-150 words).`;
      
      // Get response from Ollama
      const aiResponse = await askMistral(prompt);
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <AnimatedSection animation="fade-in">
          {/* Use combined overview to unify company/employee wellness */}
          <WellnessCombinedOverview />
        </AnimatedSection>

        <AnimatedSection animation="fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Company AI Therapist
            </h1>
            <p className="text-gray-300 mt-2">
              Confidential mental health support for your team's wellbeing
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-in-right">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-white">
                    <HeartPulse className="mr-2 h-5 w-5 text-red-500" />
                    Company Wellness
                  </CardTitle>
                  <CardDescription className="text-gray-300">Tools and resources for your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/dashboard')}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                    <HeartPulse className="mr-2 h-4 w-4" />
                    AI Therapist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/peer-chat')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Peer Chat
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/entertainment')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Entertainment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" disabled>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                    <Badge variant="outline" className="ml-auto text-gray-400 border-gray-600">Soon</Badge>
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-white">How to Use This Service</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2 list-disc list-inside text-gray-300">
                    <li>Completely confidential and private</li>
                    <li>Ask about team mental health strategies</li>
                    <li>Get leadership wellness support</li>
                    <li>Learn how to spot burnout in your team</li>
                    <li>Discover wellness programs to implement</li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-gray-800 border-gray-700">
              <CardHeader className="pb-3 border-b border-gray-700">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-red-900 text-red-200">ET</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">Dr. Emma Thompson</CardTitle>
                    <CardDescription className="text-gray-300">
                      AI Therapist | Workplace Wellness Expert
                      {!isOllamaConnected && <span className="ml-2 text-red-400">(Offline)</span>}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-700 text-gray-200"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-700 text-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="pt-3 border-t border-gray-700">
                <div className="flex items-center w-full space-x-2">
                  <Textarea 
                    placeholder="Type a message to the AI therapist..." 
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping || !isOllamaConnected}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon" 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!message.trim() || isTyping || !isOllamaConnected}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {!isOllamaConnected && (
                  <p className="text-red-400 text-xs mt-2">
                    Cannot connect to Ollama. Please make sure it's running with the Mistral model.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAITherapist;
