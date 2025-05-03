
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  PauseIcon, 
  PlayIcon, 
  Square as StopIcon,
  SkipForwardIcon,
  RefreshCw as RefreshIcon,
  MonitorIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  Chrome as ChromeIcon,
  UploadIcon,
  FileTextIcon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  AutomationStatus, 
  AutomationLog, 
  controlAutomation,
  getAutomationStatus,
  getAutomationLogs,
  startAutomation,
  uploadCV,
  setupPolling
} from '@/services/automationService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface JobAutomationDisplayProps {
  jobTitle: string;
}

const JobAutomationDisplay = ({ jobTitle }: JobAutomationDisplayProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<AutomationStatus>({
    status: 'idle',
    jobsTotal: 0,
    jobsCompleted: 0,
    jobsFailed: 0
  });
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const logEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of logs when new logs come in
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Fetch initial status and logs
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const statusData = await getAutomationStatus();
        setStatus(statusData);
        setIsPaused(statusData.status === 'paused');
        
        const logsData = await getAutomationLogs();
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching automation data:', error);
        // For development/demo, use mock data if the server is not available
        mockInitialData();
      }
    };
    
    const mockInitialData = () => {
      // Mocked data for development/demo purposes
      setStatus({
        status: 'idle',
        jobsTotal: 0,
        jobsCompleted: 0,
        jobsFailed: 0
      });
      
      setLogs([]);
    };
    
    fetchInitialData();
    
    // Set up polling for updates
    const cancelPolling = setupPolling(
      (newStatus) => {
        setStatus(newStatus);
        setIsPaused(newStatus.status === 'paused');
      },
      (newLogs) => {
        setLogs(prev => [...prev, ...newLogs]);
      }
    );
    
    return () => cancelPolling();
  }, []);
  
  const handleStartAutomation = async () => {
    if (!cvFile) {
      toast({
        title: "CV Required",
        description: "Please upload your CV before starting the automation.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsStarting(true);
      
      // Upload CV first
      const uploadResult = await uploadCV(cvFile);
      if (!uploadResult.success) {
        throw new Error('Failed to upload CV');
      }
      
      toast({
        title: "CV Uploaded",
        description: "Your CV has been uploaded successfully.",
      });
      
      // Start the automation
      const newStatus = await startAutomation(jobTitle);
      setStatus(newStatus);
      
      toast({
        title: "Automation Started",
        description: `Starting automated job search for ${jobTitle} positions.`,
      });
    } catch (error) {
      console.error('Error starting automation:', error);
      toast({
        variant: "destructive",
        title: "Automation Failed",
        description: "Failed to start the automation process.",
      });
    } finally {
      setIsStarting(false);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setCvFile(files[0]);
      toast({
        title: "CV Selected",
        description: `Selected file: ${files[0].name}`,
      });
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleControlAction = async (action: 'start' | 'pause' | 'resume' | 'stop' | 'skip') => {
    try {
      setIsRefreshing(true);
      
      const newStatus = await controlAutomation({ action });
      setStatus(newStatus);
      
      switch(action) {
        case 'pause':
          setIsPaused(true);
          toast({
            title: "Automation Paused",
            description: "The application process has been paused. Resume when ready.",
          });
          break;
        case 'resume':
          setIsPaused(false);
          toast({
            title: "Automation Resumed",
            description: "The application process has been resumed.",
          });
          break;
        case 'stop':
          toast({
            title: "Automation Stopped",
            description: "The application process has been stopped.",
          });
          break;
        case 'skip':
          toast({
            title: "Job Skipped",
            description: "Skipped to the next job in the queue.",
          });
          break;
      }
    } catch (error) {
      console.error(`Error controlling automation (${action}):`, error);
      toast({
        variant: "destructive",
        title: "Automation Control Failed",
        description: `Failed to ${action} the automation.`,
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const calculateProgress = () => {
    if (status.jobsTotal === 0) return 0;
    return ((status.jobsCompleted + status.jobsFailed) / status.jobsTotal) * 100;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />;
      case 'success':
        return <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />;
      case 'warning':
        return <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />;
      case 'error':
        return <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />;
      case 'search':
        return <div className="w-4 h-4 rounded-full bg-purple-500 mr-2" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-500 mr-2" />;
    }
  };
  
  // Determine if process is complete
  const isComplete = status.status === 'completed' || 
                     (status.jobsCompleted + status.jobsFailed >= status.jobsTotal && status.jobsTotal > 0);
  
  // Fix the types issue by using a type guard to check status values
  const isStatusIdle = status.status === 'idle';
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Job Application Automation</CardTitle>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs font-medium text-blue-800 dark:text-blue-200">
              <ChromeIcon className="h-3 w-3 mr-1" />
              Using Chrome
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isStatusIdle && (
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <FileTextIcon className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Upload Your CV</AlertTitle>
                  <AlertDescription>
                    Upload your CV to enable automated job applications. This will be used to fill out application forms.
                  </AlertDescription>
                </Alert>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleUploadClick}
                    disabled={isUploading}
                  >
                    <UploadIcon className="h-4 w-4 mr-1" />
                    {cvFile ? 'Change CV' : 'Upload CV'}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                    className="hidden"
                  />
                  {cvFile && (
                    <span className="text-sm text-muted-foreground">
                      {cvFile.name}
                    </span>
                  )}
                </div>
                
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleStartAutomation}
                  disabled={isStarting}
                >
                  {isStarting ? (
                    <>
                      <RefreshIcon className="h-4 w-4 mr-2 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Start Automated Job Applications
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {!isStatusIdle && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {isComplete ? "Process Complete" : "Applying to Jobs"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {status.jobsTotal > 0 
                        ? `Progress: ${status.jobsCompleted} completed, ${status.jobsFailed} failed out of ${status.jobsTotal} jobs`
                        : "No jobs in queue yet"}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {status.status === 'running' && !isPaused && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleControlAction('pause')}
                        >
                          <PauseIcon className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleControlAction('skip')}
                          disabled={isComplete}
                        >
                          <SkipForwardIcon className="h-4 w-4 mr-1" />
                          Skip
                        </Button>
                      </>
                    )}
                    
                    {status.status === 'paused' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleControlAction('resume')}
                      >
                        <PlayIcon className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    )}
                    
                    {!isComplete && !isStatusIdle && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleControlAction('stop')}
                      >
                        <StopIcon className="h-4 w-4 mr-1" />
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{calculateProgress().toFixed(0)}% Complete</span>
                    <span>
                      {status.jobsCompleted} / {status.jobsTotal} Jobs
                    </span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>
                
                {status.currentJobTitle && !isComplete && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                    <p className="text-sm text-muted-foreground mb-1">Currently processing:</p>
                    <p className="font-medium">{status.currentJobTitle}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Automation Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[300px] overflow-y-auto pr-2">
            <div className="space-y-2">
              {logs.length > 0 ? (
                <>
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start">
                      {getLogIcon(log.type)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{log.message}</p>
                          <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No logs available yet.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobAutomationDisplay;
