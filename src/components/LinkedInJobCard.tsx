
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ChevronRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  AlertCircleIcon
} from "lucide-react";
import { JobSearchResult, ApplicationStatus } from '@/services/jobSearchAPI';

interface LinkedInJobCardProps {
  job: JobSearchResult;
  selected: boolean;
  onSelect: (jobId: number, selected: boolean) => void;
  onViewDetails: (job: JobSearchResult) => void;
  applicationStatus?: ApplicationStatus;
}

const LinkedInJobCard = ({ 
  job, 
  selected, 
  onSelect, 
  onViewDetails,
  applicationStatus 
}: LinkedInJobCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get application status display properties
  const getStatusDisplay = () => {
    if (!applicationStatus) return null;
    
    switch (applicationStatus.status) {
      case 'pending':
        return {
          color: 'bg-yellow-500',
          icon: <ClockIcon className="w-4 h-4" />,
          text: 'Pending'
        };
      case 'in-progress':
        return {
          color: 'bg-blue-500',
          icon: <ClockIcon className="w-4 h-4 animate-spin" />,
          text: 'In Progress'
        };
      case 'completed':
        return {
          color: 'bg-green-500',
          icon: <CheckIcon className="w-4 h-4" />,
          text: 'Applied'
        };
      case 'failed':
        return {
          color: 'bg-red-500',
          icon: <AlertCircleIcon className="w-4 h-4" />,
          text: 'Failed'
        };
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-md' : 'shadow-sm'
      } ${selected ? 'border-primary' : 'border-border'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <Checkbox 
          checked={selected}
          onCheckedChange={(checked) => onSelect(job.id, checked as boolean)}
          className="h-5 w-5"
        />
      </div>
      
      {/* Application status badge */}
      {statusDisplay && (
        <div className="absolute top-4 right-4 z-10">
          <Badge 
            className={`${statusDisplay.color} text-white flex items-center gap-1`}
          >
            {statusDisplay.icon}
            {statusDisplay.text}
          </Badge>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Logo */}
          <div className="col-span-2">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-slate-400">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={`${job.company} logo`} 
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          </div>
          
          {/* Job info */}
          <div className="col-span-7 ml-2">
            <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
            
            <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <MapPinIcon className="w-3 h-3 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{job.posted}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="w-3 h-3 mr-1" />
                <span>{job.jobType || 'Full-time'}</span>
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {job.easyApply && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  Easy Apply
                </Badge>
              )}
              {job.matchPercentage && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                  <CheckCircleIcon className="w-3 h-3" />
                  {job.matchPercentage}% Match
                </Badge>
              )}
            </div>
          </div>
          
          {/* Action */}
          <div className="col-span-3 flex items-center justify-end">
            <Button 
              onClick={() => onViewDetails(job)}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              View Details
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedInJobCard;
