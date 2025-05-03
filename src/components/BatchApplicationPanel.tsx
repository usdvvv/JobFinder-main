
import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircleIcon, 
  AlertCircleIcon, 
  Loader2Icon, 
  XIcon,
  CheckIcon,
  PauseIcon,
  PlayIcon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { applyToMultipleJobs, JobSearchResult, ApplicationStatus } from '@/services/jobSearchAPI';

interface BatchApplicationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJobs: JobSearchResult[];
  onComplete: (results: Record<number, ApplicationStatus>) => void;
}

const BatchApplicationPanel = ({ 
  open, 
  onOpenChange, 
  selectedJobs,
  onComplete
}: BatchApplicationPanelProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [applicationResults, setApplicationResults] = useState<Record<number, ApplicationStatus>>({});
  const [logs, setLogs] = useState<string[]>([]);
  
  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setIsProcessing(false);
      setIsPaused(false);
      setCurrentJobIndex(0);
      setApplicationResults({});
      setLogs([]);
    }
  }, [open]);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };
  
  const startBatchApplication = async () => {
    if (selectedJobs.length === 0) return;
    
    setIsProcessing(true);
    addLog(`Starting batch application for ${selectedJobs.length} jobs...`);
    
    // Process jobs one by one with simulated results
    processNextJob();
  };
  
  const processNextJob = async () => {
    if (currentJobIndex >= selectedJobs.length) {
      // All jobs processed
      setIsProcessing(false);
      addLog('Batch application completed!');
      toast({
        title: "Batch Application Complete",
        description: `Applied to ${selectedJobs.length} jobs successfully.`,
      });
      onComplete(applicationResults);
      return;
    }
    
    if (isPaused) {
      addLog('Application process paused. Click resume to continue.');
      return;
    }
    
    const job = selectedJobs[currentJobIndex];
    addLog(`Processing job ${currentJobIndex + 1}/${selectedJobs.length}: ${job.title} at ${job.company}`);
    
    try {
      // Simulate different application stages with delays
      setTimeout(() => {
        addLog(`Opening job posting: ${job.title}...`);
      }, 500);
      
      setTimeout(() => {
        addLog(`Locating apply button...`);
      }, 1500);
      
      setTimeout(() => {
        addLog(`Filling application form...`);
      }, 2500);
      
      setTimeout(() => {
        // Randomly succeed or fail (90% success rate)
        const success = Math.random() > 0.1;
        
        if (success) {
          addLog(`✅ Successfully applied to ${job.title} at ${job.company}`);
          const result: ApplicationStatus = {
            id: job.id + 1000, // Generate a fake application ID
            jobId: job.id,
            status: 'completed',
            logs: logs.filter(log => log.includes(job.title)),
            timestamp: new Date().toISOString()
          };
          
          setApplicationResults(prev => ({
            ...prev,
            [job.id]: result
          }));
        } else {
          addLog(`❌ Failed to apply to ${job.title} at ${job.company} - Application form error`);
          const result: ApplicationStatus = {
            id: job.id + 1000,
            jobId: job.id,
            status: 'failed',
            logs: logs.filter(log => log.includes(job.title)),
            timestamp: new Date().toISOString()
          };
          
          setApplicationResults(prev => ({
            ...prev,
            [job.id]: result
          }));
        }
        
        // Move to next job
        setCurrentJobIndex(prev => prev + 1);
        processNextJob();
      }, 3500);
    } catch (error) {
      console.error('Error in batch application:', error);
      addLog(`❌ Error applying to ${job.title}: ${error}`);
      
      setApplicationResults(prev => ({
        ...prev,
        [job.id]: {
          id: job.id + 1000,
          jobId: job.id,
          status: 'failed',
          logs: logs.filter(log => log.includes(job.title)),
          timestamp: new Date().toISOString()
        }
      }));
      
      // Continue with next job despite error
      setCurrentJobIndex(prev => prev + 1);
      processNextJob();
    }
  };
  
  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (isPaused) {
      addLog('Resuming application process...');
      processNextJob();
    } else {
      addLog('Pausing application process...');
    }
  };
  
  const calculateProgress = () => {
    if (selectedJobs.length === 0) return 0;
    return (currentJobIndex / selectedJobs.length) * 100;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Batch Apply to Jobs</DialogTitle>
          <DialogDescription>
            {isProcessing 
              ? `Applying to ${selectedJobs.length} jobs (${currentJobIndex}/${selectedJobs.length} completed)`
              : `Apply to ${selectedJobs.length} selected jobs with one click`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          )}
          
          {selectedJobs.length > 0 && !isProcessing && (
            <div className="space-y-2">
              <p className="text-sm">The following jobs will be applied to:</p>
              <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                {selectedJobs.map(job => (
                  <div key={job.id} className="p-2 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    {applicationResults[job.id] && (
                      <div>
                        {applicationResults[job.id].status === 'completed' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {logs.length > 0 && (
            <div className="space-y-2">
              <Separator />
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Application Logs</p>
                <Button variant="ghost" size="sm" onClick={() => setLogs([])}>Clear</Button>
              </div>
              <div className="h-32 overflow-y-auto bg-slate-50 dark:bg-slate-900 rounded-md p-2">
                <div className="text-xs font-mono space-y-1">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-muted-foreground mr-1">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {!isProcessing ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={startBatchApplication} disabled={selectedJobs.length === 0}>
                Start Auto Apply
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="outline" onClick={togglePause}>
                {isPaused ? (
                  <>
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <PauseIcon className="h-4 w-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchApplicationPanel;
