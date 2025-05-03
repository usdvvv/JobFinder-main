
import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BriefcaseIcon, 
  BuildingIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ArrowUpRightIcon, 
  BookmarkIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  Loader2Icon
} from "lucide-react";
import { JobSearchResult, applyToJob, ApplicationStatus } from '@/services/jobSearchAPI';
import { useToast } from "@/hooks/use-toast";

interface JobDetailsPanelProps {
  job: JobSearchResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplySuccess: (jobId: number, status: ApplicationStatus) => void;
}

const JobDetailsPanel = ({ job, open, onOpenChange, onApplySuccess }: JobDetailsPanelProps) => {
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationLogs, setApplicationLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  if (!job) return null;

  const handleAutoApply = async () => {
    if (!job.id) return;
    
    setIsApplying(true);
    setApplicationLogs(['Starting application process...']);
    setShowLogs(true);
    
    try {
      // Simulate logs for demo purposes
      const logUpdateInterval = setInterval(() => {
        setApplicationLogs((currentLogs) => {
          const updatedLogs = [
            ...currentLogs, 
            currentLogs.length === 1 ? 'Opening job posting...' : 
            currentLogs.length === 2 ? 'Locating apply button...' :
            currentLogs.length === 3 ? 'Filling application form...' :
            currentLogs.length === 4 ? 'Submitting application...' : 
            'Application completed successfully!'
          ];
          
          if (updatedLogs.length >= 6) {
            clearInterval(logUpdateInterval);
          }
          
          return updatedLogs;
        });
      }, 1500);
      
      // Call the API
      const result = await applyToJob(job.id);
      
      // Clear the interval if it's still running
      clearInterval(logUpdateInterval);
      
      // Ensure we have a complete set of logs
      setApplicationLogs(currentLogs => {
        if (currentLogs.length < 6) {
          return [...currentLogs, 'Application completed successfully!'];
        }
        return currentLogs;
      });
      
      toast({
        title: "Application Submitted!",
        description: `Your application to ${job.title} at ${job.company} has been submitted successfully.`,
      });
      
      onApplySuccess(job.id, result);
    } catch (error) {
      setApplicationLogs(currentLogs => [...currentLogs, 'Error: Application failed. Please try again.']);
      
      toast({
        variant: "destructive",
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl">{job.title}</SheetTitle>
          <SheetDescription className="flex items-center text-base font-medium text-foreground">
            <BuildingIcon className="w-4 h-4 mr-1" /> {job.company}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Job details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{job.posted}</span>
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{job.jobType || 'Full-time'}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{job.salary}</span>
            </div>
          </div>
          
          {/* Match score */}
          {job.matchPercentage && (
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-blue-600 dark:text-blue-400" />
                Resume Match
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Match Score</span>
                  <span className="font-medium">{job.matchPercentage}%</span>
                </div>
                <Progress value={job.matchPercentage} className="h-2" />
              </div>
            </div>
          )}
          
          <Separator />
          
          {/* Job description */}
          <div>
            <h3 className="text-lg font-medium mb-2">Job Description</h3>
            <p className="text-sm whitespace-pre-line">{job.description}</p>
          </div>
          
          {/* Skills section */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    variant={job.matchedSkills?.includes(skill) ? "default" : "outline"}
                    className={job.matchedSkills?.includes(skill) ? "bg-green-500" : ""}
                  >
                    {skill}
                    {job.matchedSkills?.includes(skill) && <CheckCircleIcon className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Application logs */}
          {showLogs && applicationLogs.length > 0 && (
            <div className="mt-4 bg-slate-50 dark:bg-slate-900 border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Application Process</h4>
                <Button variant="ghost" size="sm" onClick={() => setShowLogs(false)}>Hide</Button>
              </div>
              <div className="text-xs space-y-1 font-mono">
                {applicationLogs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-muted-foreground mr-2">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={handleAutoApply}
              disabled={isApplying}
              className="w-full"
            >
              {isApplying ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  {job.easyApply ? 'Auto Apply (Easy Apply)' : 'Auto Apply'}
                </>
              )}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Manual Apply
                  <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                </a>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-center">
                <BookmarkIcon className="w-4 h-4 mr-1" />
                Save Job
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default JobDetailsPanel;
