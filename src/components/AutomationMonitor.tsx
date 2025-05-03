
import { useState, useEffect, useRef } from 'react';
import { 
  AlertCircleIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ClipboardIcon, 
  Loader2Icon, 
  PauseIcon, 
  PlayIcon, 
  SearchIcon, 
  SkipForwardIcon, 
  StopCircleIcon, 
  XCircleIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for the component - will be replaced by API calls
type AutomationStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed';
type LogType = 'info' | 'success' | 'warning' | 'error' | 'search';

interface Log {
  id: number;
  type: LogType;
  message: string;
  timestamp: Date;
}

interface AutomationStats {
  jobsFound: number;
  inProgress: number;
  completed: number;
  failed: number;
  successRate: number;
}

// Helper function to format logs with emoji
const formatLogWithEmoji = (log: Log): { emoji: string; formattedMessage: string } => {
  let emoji = '';
  
  switch (log.type) {
    case 'search':
      emoji = '🔍';
      break;
    case 'success':
      emoji = '✅';
      break;
    case 'warning':
      emoji = '⚠️';
      break;
    case 'error':
      emoji = '❌';
      break;
    case 'info':
    default:
      emoji = '📩';
      break;
  }
  
  return { emoji, formattedMessage: `${emoji} ${log.message}` };
};

const AutomationMonitor = () => {
  const { toast } = useToast();
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus>('idle');
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<AutomationStats>({
    jobsFound: 0,
    inProgress: 0,
    completed: 0,
    failed: 0,
    successRate: 0
  });
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // Simulated WebSocket or polling
  useEffect(() => {
    const mockStartAutomation = async () => {
      // Simulate initial loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoadingInitial(false);
      
      // Set initial state
      setAutomationStatus('running');
      setStats({
        jobsFound: 15,
        inProgress: 1,
        completed: 0,
        failed: 0,
        successRate: 0
      });
      
      // Add initial logs
      const initialLogs: Log[] = [
        { id: 1, type: 'search', message: `Searching for '${jobTitle}' jobs on LinkedIn...`, timestamp: new Date() },
        { id: 2, type: 'success', message: 'LinkedIn jobs page opened successfully.', timestamp: new Date() }
      ];
      setLogs(initialLogs);
      
      // Simulate receiving log updates
      let logCounter = initialLogs.length;
      const mockMessages = [
        { type: 'search', message: 'Waiting for the job search input field...' },
        { type: 'success', message: 'Found search box. Entering job title...' },
        { type: 'search', message: 'Waiting for job results to load...' },
        { type: 'success', message: 'Job results loaded.' },
        { type: 'info', message: 'Scrolling down to load job listings...' },
        { type: 'success', message: 'Extracting job links...' },
        { type: 'success', message: 'Found 15 job listings.' },
        { type: 'info', message: 'Applying to: https://www.linkedin.com/jobs/view/12345...' },
        { type: 'search', message: 'Checking application options' },
        { type: 'info', message: 'Found 24 buttons on the page. Checking for \'Apply\' buttons...' },
        { type: 'success', message: 'Found Apply button: Easy Apply' },
        { type: 'info', message: 'Filling Easy Apply form...' },
        { type: 'success', message: 'Filled fullName' },
        { type: 'success', message: 'Filled email' },
        { type: 'success', message: 'Filled phone' },
        { type: 'success', message: 'Resume uploaded successfully.' },
        { type: 'success', message: 'Application submitted successfully!' }
      ];
      
      const logInterval = setInterval(() => {
        if (logCounter >= initialLogs.length + mockMessages.length) {
          clearInterval(logInterval);
          
          // Update stats for completion
          setStats(prev => ({
            ...prev,
            inProgress: 0,
            completed: prev.completed + 1,
            successRate: ((prev.completed + 1) / (prev.completed + prev.failed + 1)) * 100
          }));
          
          // Show completion notification
          toast({
            title: "Application Process Complete",
            description: "All job applications have been processed.",
          });
          
          setAutomationStatus('completed');
          return;
        }
        
        const nextLogIndex = logCounter - initialLogs.length;
        const nextLog = mockMessages[nextLogIndex];
        
        setLogs(prevLogs => [
          ...prevLogs,
          { 
            id: logCounter + 1, 
            type: nextLog.type as LogType, 
            message: nextLog.message, 
            timestamp: new Date() 
          }
        ]);
        
        // Update stats based on log content
        if (nextLog.message.includes('Application submitted successfully')) {
          setStats(prev => ({
            ...prev,
            completed: prev.completed + 1,
            inProgress: prev.inProgress > 0 ? prev.inProgress - 1 : 0,
            successRate: ((prev.completed + 1) / (prev.completed + prev.failed + 1)) * 100
          }));
        }
        
        logCounter++;
      }, 1000);
      
      return () => clearInterval(logInterval);
    };
    
    mockStartAutomation();
  }, [jobTitle, toast]);
  
  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current && isConsoleExpanded) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isConsoleExpanded]);
  
  const handlePauseResume = () => {
    if (automationStatus === 'running') {
      setAutomationStatus('paused');
      toast({
        title: "Automation Paused",
        description: "The job application process has been paused. Click resume to continue.",
      });
    } else if (automationStatus === 'paused') {
      setAutomationStatus('running');
      toast({
        title: "Automation Resumed",
        description: "The job application process has been resumed.",
      });
    }
  };
  
  const handleStop = () => {
    setAutomationStatus('completed');
    toast({
      title: "Automation Stopped",
      description: "The job application process has been stopped.",
      variant: "destructive"
    });
  };
  
  const handleSkip = () => {
    toast({
      title: "Skipped Current Job",
      description: "Moving to the next job in the queue.",
    });
    
    // Simulate skipping by adding a log
    setLogs(prevLogs => [
      ...prevLogs,
      { 
        id: prevLogs.length + 1, 
        type: 'warning', 
        message: 'Skipped current job application.', 
        timestamp: new Date() 
      }
    ]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      failed: prev.failed + 1,
      inProgress: prev.inProgress > 0 ? prev.inProgress - 1 : 0,
      successRate: (prev.completed / (prev.completed + prev.failed + 1)) * 100
    }));
  };
  
  const copyLogs = () => {
    const formattedLogs = logs.map(log => {
      const { emoji, formattedMessage } = formatLogWithEmoji(log);
      return formattedMessage;
    }).join('\n');
    
    navigator.clipboard.writeText(formattedLogs);
    
    toast({
      title: "Logs Copied",
      description: "Application logs have been copied to clipboard.",
    });
  };
  
  if (isLoadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2Icon className="w-10 h-10 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-medium">Starting Automation...</h3>
        <p className="text-muted-foreground">Launching browser and connecting to LinkedIn</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 bg-gradient-to-br from-[#eff6ff] via-[#eef2ff] to-[#f5f3ff] p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Search Automation</h2>
          <p className="text-muted-foreground">Searching for "{jobTitle}" on LinkedIn</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            automationStatus === 'running' ? 'bg-blue-100 text-blue-800' :
            automationStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
            automationStatus === 'completed' ? 'bg-green-100 text-green-800' :
            automationStatus === 'failed' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {automationStatus === 'running' && 'Running'}
            {automationStatus === 'paused' && 'Paused'}
            {automationStatus === 'completed' && 'Completed'}
            {automationStatus === 'failed' && 'Failed'}
            {automationStatus === 'idle' && 'Idle'}
          </span>
        </div>
      </div>
      
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircleIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle>Browser Automation Active</AlertTitle>
        <AlertDescription>
          A Chrome browser window has been launched to perform the automated job search and application process. 
          Please do not close this window until the process is complete.
        </AlertDescription>
      </Alert>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Jobs Found</span>
            <span className="text-2xl font-bold">{stats.jobsFound}</span>
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">In Progress</span>
            <span className="text-2xl font-bold">{stats.inProgress}</span>
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Completed</span>
            <span className="text-2xl font-bold">{stats.completed}</span>
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Success Rate</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{Math.round(stats.successRate)}%</span>
              <Progress value={stats.successRate} className="h-2 w-20" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Control Panel */}
      <Card className="p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Control Panel</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={automationStatus === 'paused' ? "default" : "outline"}
            onClick={handlePauseResume}
            disabled={automationStatus === 'completed' || automationStatus === 'failed'}
          >
            {automationStatus === 'paused' ? (
              <>
                <PlayIcon className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <PauseIcon className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleSkip}
            disabled={automationStatus !== 'running'}
          >
            <SkipForwardIcon className="w-4 h-4 mr-2" />
            Skip Current
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleStop}
            disabled={automationStatus === 'completed' || automationStatus === 'failed'}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <StopCircleIcon className="w-4 h-4 mr-2" />
            Stop All
          </Button>
          
          <Button
            variant="outline"
            className="ml-auto"
            onClick={copyLogs}
          >
            <ClipboardIcon className="w-4 h-4 mr-2" />
            Copy Logs
          </Button>
        </div>
      </Card>
      
      {/* Application Log Console */}
      <Card className="shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Application Log Console</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
          >
            {isConsoleExpanded ? 'Collapse' : 'Expand'}
            <ArrowRightIcon className={`w-4 h-4 ml-1 transition-transform ${isConsoleExpanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>
        
        {isConsoleExpanded && (
          <ScrollArea className="h-[400px] p-4" ref={logContainerRef}>
            <div className="space-y-2 font-mono text-sm">
              {logs.map((log) => {
                const { emoji, formattedMessage } = formatLogWithEmoji(log);
                
                return (
                  <div key={log.id} className="flex">
                    <span className="mr-2">
                      {log.type === 'success' && <CheckCircleIcon className="h-4 w-4 text-green-500" />}
                      {log.type === 'error' && <XCircleIcon className="h-4 w-4 text-red-500" />}
                      {log.type === 'warning' && <AlertCircleIcon className="h-4 w-4 text-yellow-500" />}
                      {log.type === 'search' && <SearchIcon className="h-4 w-4 text-blue-500" />}
                      {log.type === 'info' && <ArrowRightIcon className="h-4 w-4 text-gray-500" />}
                    </span>
                    <span>{log.message}</span>
                  </div>
                );
              })}
              
              {automationStatus === 'running' && (
                <div className="flex items-center text-muted-foreground animate-pulse">
                  <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                  <span>Waiting for next action...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  );
};

export default AutomationMonitor;
