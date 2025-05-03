
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface JobMatch {
  id: number;
  title: string;
  matchScore: number;
  whyMatch: string;
  responsibilities: string[];
  whyExcel: string;
}

export interface JobSearchResult {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  posted: string;
  remote: boolean;
  link: string;
  easyApply?: boolean;
  matchPercentage?: number;
  companyLogo?: string;
  jobType?: string;
  skills?: string[];
  matchedSkills?: string[];
}

export interface ApplicationStatus {
  id: number;
  jobId: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  logs: string[];
  timestamp: string;
}

export const uploadAndAnalyzeCV = async (file: File): Promise<JobMatch[]> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/analyze-cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.job_matches;
  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw error;
  }
};

export const searchJobs = async (jobTitle: string): Promise<JobSearchResult[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search-jobs`, { jobTitle });
    return response.data.search_results;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

export const applyToJob = async (jobId: number, candidateData?: any): Promise<ApplicationStatus> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/apply-job`, { 
      jobId,
      candidateData 
    });
    return response.data;
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
};

export const applyToMultipleJobs = async (jobIds: number[], candidateData?: any): Promise<ApplicationStatus[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/apply-multiple`, { 
      jobIds,
      candidateData 
    });
    return response.data.applications;
  } catch (error) {
    console.error('Error applying to multiple jobs:', error);
    throw error;
  }
};

export const getApplicationStatus = async (applicationId: number): Promise<ApplicationStatus> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-status/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting application status:', error);
    throw error;
  }
};
