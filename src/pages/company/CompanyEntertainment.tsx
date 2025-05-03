
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyNavBar from "@/components/company/CompanyNavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sudoku from "@/components/games/Sudoku";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Puzzle, Brain, Building2, Users } from "lucide-react";
import AnimatedSection from '@/components/AnimatedSection';

const CompanyEntertainment = () => {
  const [activeTab, setActiveTab] = useState("sudoku");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <CompanyNavBar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Company Entertainment Zone
          </h1>
          <p className="text-muted-foreground mt-2">
            Engage your team with fun and interactive brain games to boost productivity and wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Team Engagement Games</CardTitle>
                <CardDescription>
                  Select a game for your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant={activeTab === "sudoku" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("sudoku")}
                  >
                    <Puzzle className="mr-2 h-4 w-4" />
                    Sudoku
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start opacity-50"
                    disabled
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Chess Challenge (Coming Soon)
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start opacity-50"
                    disabled
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Team Word Puzzle (Coming Soon)
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/company/dashboard')}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Benefits for Your Team</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  <li>Improves team critical thinking skills</li>
                  <li>Enhances collaborative problem-solving</li>
                  <li>Reduces workplace stress</li>
                  <li>Provides productive breaks</li>
                  <li>Increases focus and productivity</li>
                  <li>Strengthens team bonding</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Team Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Michael Peterson", score: 950, time: "1m 42s" },
                    { name: "Sarah Johnson", score: 920, time: "1m 54s" },
                    { name: "David Kim", score: 890, time: "2m 02s" }
                  ].map((player, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          index === 0 ? "bg-yellow-100 text-yellow-800" :
                          index === 1 ? "bg-gray-100 text-gray-800" :
                          "bg-amber-100 text-amber-800"
                        }`}>
                          {index + 1}
                        </div>
                        <span className="ml-2 text-sm font-medium">{player.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{player.score} ({player.time})</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Area */}
          <div className="md:col-span-9">
            <Card className="bg-card shadow-md">
              <CardContent className="p-6">
                {activeTab === "sudoku" && <Sudoku />}
                {activeTab !== "sudoku" && (
                  <div className="text-center p-12">
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon!</h3>
                    <p className="text-muted-foreground">This team game is currently in development.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEntertainment;
