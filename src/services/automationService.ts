import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface AutomationStatus {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  jobsTotal: number;
  jobsCompleted: number;
  jobsFailed: number;
  currentJobId?: number;
  currentJobTitle?: string;
}

export interface AutomationLog {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'search';
  message: string;
  timestamp: string;
}

export interface AutomationControlAction {
  action: 'start' | 'pause' | 'resume' | 'stop' | 'skip';
  jobTitle?: string;
  jobId?: number;
}

// Start the job search automation
export const startAutomation = async (jobTitle: string): Promise<AutomationStatus> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/start-automation`, { jobTitle });
    return response.data;
  } catch (error) {
    console.error('Error starting job automation:', error);
    throw error;
  }
};

// Get current automation status
export const getAutomationStatus = async (): Promise<AutomationStatus> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-status`);
    return response.data;
  } catch (error) {
    console.error('Error getting automation status:', error);
    throw error;
  }
};

// Get automation logs
export const getAutomationLogs = async (): Promise<AutomationLog[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-logs`);
    return response.data.logs;
  } catch (error) {
    console.error('Error getting automation logs:', error);
    throw error;
  }
};

// Control the automation (pause/resume/stop/skip)
export const controlAutomation = async (controlAction: AutomationControlAction): Promise<AutomationStatus> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/control`, controlAction);
    return response.data;
  } catch (error) {
    console.error('Error controlling automation:', error);
    throw error;
  }
};

// Upload CV for automation
export const uploadCV = async (file: File): Promise<{success: boolean; message: string; file_path?: string}> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/upload-cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw error;
  }
};

// Set up polling for real-time updates
export const setupPolling = (
  onStatusUpdate: (status: AutomationStatus) => void,
  onNewLogs: (logs: AutomationLog[]) => void,
  interval = 3000 // Default to 3 seconds
) => {
  // Keep track of the last log ID we've seen
  let lastLogId = 0;
  
  // Set up interval for polling
  const intervalId = setInterval(async () => {
    try {
      // Get current automation status
      const status = await getAutomationStatus();
      onStatusUpdate(status);
      
      // Get all logs and filter to only new ones
      const logs = await getAutomationLogs();
      const newLogs = logs.filter(log => log.id > lastLogId);
      
      if (newLogs.length > 0) {
        onNewLogs(newLogs);
        lastLogId = newLogs[newLogs.length - 1].id;
      }
      
      // If automation is completed or failed, stop polling
      if (status.status === 'completed' || status.status === 'failed') {
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error('Error in automation polling:', error);
    }
  }, interval);
  
  // Return a function to cancel the polling
  return () => clearInterval(intervalId);
};

// Set up WebSocket connection for real-time updates
export const setupWebSocketConnection = (
  onStatusUpdate: (status: AutomationStatus) => void,
  onNewLog: (log: AutomationLog) => void
) => {
  // In a real implementation, this would create a WebSocket connection
  // For now, we'll create a mock implementation
  const mockWebSocket = {
    connect: () => {
      console.log('WebSocket connected');
      return true;
    },
    disconnect: () => {
      console.log('WebSocket disconnected');
      return true;
    }
  };
  
  return mockWebSocket;
};
