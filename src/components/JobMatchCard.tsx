
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Briefcase, CheckCircle, ChevronRight } from 'lucide-react';

interface JobMatchCardProps {
  job: {
    id: number;
    title: string;
    matchScore: number;
    whyMatch: string;
    responsibilities: string[];
    whyExcel: string;
  };
  onApply: () => void;
}

const JobMatchCard = ({ job, onApply }: JobMatchCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">{job.matchScore}%</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <div className="flex items-center text-sm text-primary font-medium mt-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {job.matchScore}% Match for Your Skills
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">Why This Role is Perfect for You:</h4>
              <p className="mt-1">{job.whyMatch}</p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">What You'll Be Doing:</h4>
              <ul className="mt-1 space-y-1">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm text-muted-foreground">Why You'd Excel at This:</h4>
              <p className="mt-1">{job.whyExcel}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center md:items-end space-y-4">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/80 to-primary p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">{job.matchScore}%</span>
                  <span className="text-xs text-muted-foreground">Match</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full md:w-auto" 
              onClick={onApply}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobMatchCard;
