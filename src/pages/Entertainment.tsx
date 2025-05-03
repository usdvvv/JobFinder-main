
import { useState } from 'react';
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sudoku from "@/components/games/Sudoku";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Puzzle, Brain, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Entertainment = () => {
  const [activeTab, setActiveTab] = useState("sudoku");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Entertainment Zone
          </h1>
          <p className="text-muted-foreground mt-2">
            Take a break and exercise your brain with these intellectual games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Games</CardTitle>
                <CardDescription>
                  Select a game to play
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
                    Chess (Coming Soon)
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start opacity-50"
                    disabled
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Word Puzzle (Coming Soon)
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  <li>Improves critical thinking skills</li>
                  <li>Enhances problem-solving abilities</li>
                  <li>Reduces stress and promotes mental relaxation</li>
                  <li>Provides a productive break from work</li>
                  <li>Increases concentration and attention span</li>
                </ul>
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
                    <p className="text-muted-foreground">This game is currently in development.</p>
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

export default Entertainment;
