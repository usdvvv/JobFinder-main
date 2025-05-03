
import { useState } from 'react';
import CompanyNavBar from "@/components/company/CompanyNavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Send, MessageSquare, Users, Calendar, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';

// Mock data for team members
const teamMembers = {
  robert: {
    name: "Robert Smith",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "RS",
    avatarColor: "bg-blue-100 text-blue-700"
  },
  jessica: {
    name: "Jessica Chen",
    role: "Product Manager",
    department: "Product",
    avatar: "JC",
    avatarColor: "bg-purple-100 text-purple-700"
  },
  thomas: {
    name: "Thomas Wilson",
    role: "Marketing Specialist",
    department: "Marketing",
    avatar: "TW",
    avatarColor: "bg-green-100 text-green-700"
  }
};

// Pre-defined responses for each mentor
const peerResponses = {
  robert: [
    "I think we should approach this problem step by step. What specific technical challenges is your team facing?",
    "Have you considered breaking down the project into smaller sprints? That helped my team a lot with complex implementations.",
    "Code reviews have been essential for my team's quality. We do them in pairs which has improved our collaboration.",
    "Working remotely with developers requires clear documentation. I recommend setting up detailed technical specs before coding begins."
  ],
  jessica: [
    "From a product perspective, I'd suggest prioritizing features based on both user impact and development complexity.",
    "We've found that regular user testing, even with simple prototypes, saves us a lot of development time and rework.",
    "Cross-functional collaboration has been key for us. Have you tried joint planning sessions with design and engineering?",
    "For roadmap planning, we use a quarterly OKR approach but review priorities monthly. It gives us both structure and flexibility."
  ],
  thomas: [
    "Content marketing has been our most effective channel. We focus on solving real problems our audience faces.",
    "Social media presence requires consistency. We create content calendars a month in advance to maintain quality.",
    "For campaign measurement, we track not just conversions but engagement metrics that indicate long-term interest.",
    "Internal communication between marketing and sales has transformed our lead quality. Weekly sync meetings make a big difference."
  ]
};

const CompanyPeerChat = () => {
  const [message, setMessage] = useState("");
  const [currentPeer, setCurrentPeer] = useState('robert');
  const [chatMessages, setChatMessages] = useState([
    { 
      role: "assistant", 
      content: `Hello! I'm ${teamMembers[currentPeer as keyof typeof teamMembers].name}, an AI peer mentor. I can share my experience and advice on ${teamMembers[currentPeer as keyof typeof teamMembers].department.toLowerCase()} challenges. How can I help your team today?` 
    }
  ]);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message
    setChatMessages(prev => [...prev, { role: "user", content: message }]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const peerType = currentPeer as keyof typeof peerResponses;
      const responses = peerResponses[peerType];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: randomResponse 
      }]);
    }, 1000);
    
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePeerChange = (peer: string) => {
    setCurrentPeer(peer);
    setChatMessages([
      { 
        role: "assistant", 
        content: `Hello! I'm ${teamMembers[peer as keyof typeof teamMembers].name}, an AI peer mentor. I can share my experience and advice on ${teamMembers[peer as keyof typeof teamMembers].department.toLowerCase()} challenges. How can I help your team today?` 
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Company Peer Chat
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect your team with AI peer mentors for professional guidance and support
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <AnimatedSection animation="slide-in-right">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    Peer Mentors
                  </CardTitle>
                  <CardDescription>Select a mentor for your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'robert' 
                        ? 'bg-blue-100 border-blue-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => handlePeerChange('robert')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">RS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'robert' ? 'text-blue-900' : ''}`}>
                          {teamMembers.robert.name}
                        </div>
                        <div className={`text-sm ${currentPeer === 'robert' ? 'text-blue-800' : 'text-muted-foreground'}`}>
                          {teamMembers.robert.role}
                        </div>
                        <div className={`text-xs ${currentPeer === 'robert' ? 'text-blue-700' : 'text-muted-foreground'}`}>
                          {teamMembers.robert.department}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'jessica' 
                        ? 'bg-purple-100 border-purple-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => handlePeerChange('jessica')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-purple-100 text-purple-700">JC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'jessica' ? 'text-purple-900' : ''}`}>
                          {teamMembers.jessica.name}
                        </div>
                        <div className={`text-sm ${currentPeer === 'jessica' ? 'text-purple-800' : 'text-muted-foreground'}`}>
                          {teamMembers.jessica.role}
                        </div>
                        <div className={`text-xs ${currentPeer === 'jessica' ? 'text-purple-700' : 'text-muted-foreground'}`}>
                          {teamMembers.jessica.department}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentPeer === 'thomas' 
                        ? 'bg-green-100 border-green-300 border' 
                        : 'hover:bg-muted border border-transparent'
                    }`}
                    onClick={() => handlePeerChange('thomas')}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-green-100 text-green-700">TW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-medium ${currentPeer === 'thomas' ? 'text-green-900' : ''}`}>
                          {teamMembers.thomas.name}
                        </div>
                        <div className={`text-sm ${currentPeer === 'thomas' ? 'text-green-800' : 'text-muted-foreground'}`}>
                          {teamMembers.thomas.role}
                        </div>
                        <div className={`text-xs ${currentPeer === 'thomas' ? 'text-green-700' : 'text-muted-foreground'}`}>
                          {teamMembers.thomas.department}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/company/dashboard')}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">How AI Peer Chat Helps</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Role-specific advice from experienced professionals</li>
                    <li>Confidential mentorship for team members</li>
                    <li>Practical solutions to common workplace challenges</li>
                    <li>Available 24/7 for immediate guidance</li>
                    <li>Helps bridge knowledge gaps across departments</li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          <div className="md:col-span-9">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className={teamMembers[currentPeer as keyof typeof teamMembers].avatarColor}>
                      {teamMembers[currentPeer as keyof typeof teamMembers].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{teamMembers[currentPeer as keyof typeof teamMembers].name}</CardTitle>
                    <CardDescription>
                      {teamMembers[currentPeer as keyof typeof teamMembers].role} | {teamMembers[currentPeer as keyof typeof teamMembers].department}
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
                          : "bg-muted"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-3 border-t">
                <div className="flex items-center w-full space-x-2">
                  <Textarea 
                    placeholder="Type a message to the AI peer mentor..." 
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPeerChat;
