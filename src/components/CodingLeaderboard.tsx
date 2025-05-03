
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Crown, MessageSquare, Code, Award, User, Trophy, Medal } from 'lucide-react';

// Mock data for the leaderboard - in a real app this would come from a database
const leaderboardData = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    score: 950, 
    solvedProblems: 48, 
    streak: 12, 
    languages: ["JavaScript", "Python", "Java"],
    avatar: "AJ",
    rank: 1
  },
  { 
    id: 2, 
    name: "Samantha Lee", 
    score: 920, 
    solvedProblems: 45, 
    streak: 8, 
    languages: ["C++", "Python"],
    avatar: "SL",
    rank: 2
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    score: 890, 
    solvedProblems: 43, 
    streak: 7, 
    languages: ["JavaScript", "TypeScript"],
    avatar: "MC",
    rank: 3
  },
  { 
    id: 4, 
    name: "Olivia Smith", 
    score: 870, 
    solvedProblems: 42, 
    streak: 5, 
    languages: ["JavaScript", "Ruby"],
    avatar: "OS",
    rank: 4
  },
  { 
    id: 5, 
    name: "James Wilson", 
    score: 820, 
    solvedProblems: 40, 
    streak: 6, 
    languages: ["Python", "Java", "C#"],
    avatar: "JW",
    rank: 5
  },
  { 
    id: 6, 
    name: "Emma Davis", 
    score: 790, 
    solvedProblems: 38, 
    streak: 4, 
    languages: ["JavaScript", "TypeScript"],
    avatar: "ED",
    rank: 6
  },
  { 
    id: 7, 
    name: "David Garcia", 
    score: 760, 
    solvedProblems: 37, 
    streak: 3, 
    languages: ["Python", "C++"],
    avatar: "DG",
    rank: 7
  },
  { 
    id: 8, 
    name: "Sophia Martinez", 
    score: 740, 
    solvedProblems: 35, 
    streak: 4, 
    languages: ["JavaScript", "Ruby"],
    avatar: "SM",
    rank: 8
  },
  { 
    id: 9, 
    name: "Daniel Brown", 
    score: 710, 
    solvedProblems: 34, 
    streak: 2, 
    languages: ["Java", "Kotlin"],
    avatar: "DB",
    rank: 9
  },
  { 
    id: 10, 
    name: "Ava Thompson", 
    score: 690, 
    solvedProblems: 33, 
    streak: 5, 
    languages: ["JavaScript", "Python"],
    avatar: "AT",
    rank: 10
  }
];

interface CodingLeaderboardProps {
  isCompanyView?: boolean;
}

const CodingLeaderboard = ({ isCompanyView = false }: CodingLeaderboardProps) => {
  const [selectedUser, setSelectedUser] = useState<null | typeof leaderboardData[0]>(null);
  const [contactMessage, setContactMessage] = useState('');
  const { toast } = useToast();

  const handleContact = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedUser?.name}.`,
      duration: 3000,
    });
    setContactMessage('');
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-sm font-medium text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl font-bold">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Coding Challenge Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Top 3 users with special styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {leaderboardData.slice(0, 3).map((user) => (
              <Card key={user.id} className={`border ${user.rank === 1 ? 
                'bg-yellow-600/20 dark:bg-yellow-900/40 border-yellow-600 dark:border-yellow-700' : ''}`}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16 mt-2 bg-primary text-white text-lg">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    {user.rank === 1 && (
                      <Crown className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                  <h3 className="mt-3 font-bold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{user.score} pts</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {user.solvedProblems} problems solved
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {user.languages.map((lang, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => setSelectedUser(user)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {user.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">Rank #{user.rank} • {user.score} points</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Input placeholder="Subject" />
                          <Textarea 
                            placeholder="Your message to the candidate..." 
                            className="min-h-[150px]"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleContact}>Send Message</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Table for the rest of the users */}
          <Table>
            <TableCaption>Showing top performers based on problem-solving score.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="hidden md:table-cell">Problems</TableHead>
                <TableHead className="hidden md:table-cell">Streak</TableHead>
                <TableHead className="hidden md:table-cell">Languages</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.slice(3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      {getRankIcon(user.rank)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2 bg-primary text-white">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">{user.score}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.solvedProblems}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.streak} days</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {user.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Contact</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact {user.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                              <AvatarFallback>{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">Rank #{user.rank} • {user.score} points</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Input placeholder="Subject" />
                            <Textarea 
                              placeholder="Your message to the candidate..." 
                              className="min-h-[150px]"
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleContact}>Send Message</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodingLeaderboard;
