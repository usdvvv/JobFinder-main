
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Slider
} from "@/components/ui/slider";
import {
  SlidersHorizontalIcon,
  SearchIcon,
  CheckSquareIcon
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface JobsFilterBarProps {
  totalJobs: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: JobFilters) => void;
}

export interface JobFilters {
  easyApplyOnly: boolean;
  sortBy: 'relevance' | 'date' | 'salary';
  datePosted: string;
  jobType: string;
  salaryRange: [number, number];
  locationDistance: number;
}

const JobsFilterBar = ({ 
  totalJobs,
  searchTerm,
  onSearchChange,
  onFilterChange
}: JobsFilterBarProps) => {
  const [filters, setFilters] = useState<JobFilters>({
    easyApplyOnly: false,
    sortBy: 'relevance',
    datePosted: 'any',
    jobType: 'any',
    salaryRange: [0, 200],
    locationDistance: 25,
  });

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full bg-card border-b mb-6">
      <div className="container py-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{totalJobs > 0 ? `${totalJobs} Job Results` : 'Job Search'}</h2>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? `Showing results for "${searchTerm}"` : 'Search for jobs to see results'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Refine your search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date posted</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontalIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                    <SheetDescription>
                      Narrow down job results based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="easy-apply">Easy Apply Only</Label>
                        <p className="text-sm text-muted-foreground">
                          Show only jobs with one-click application
                        </p>
                      </div>
                      <Switch
                        id="easy-apply"
                        checked={filters.easyApplyOnly}
                        onCheckedChange={(checked) => handleFilterChange('easyApplyOnly', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date Posted</Label>
                      <Select 
                        value={filters.datePosted}
                        onValueChange={(value) => handleFilterChange('datePosted', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Past week</SelectItem>
                          <SelectItem value="month">Past month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <Select 
                        value={filters.jobType}
                        onValueChange={(value) => handleFilterChange('jobType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any type</SelectItem>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Salary Range (K)</Label>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${filters.salaryRange[0]}K</span>
                          <span>${filters.salaryRange[1]}K+</span>
                        </div>
                      </div>
                      <Slider
                        defaultValue={filters.salaryRange}
                        max={200}
                        step={10}
                        value={filters.salaryRange}
                        onValueChange={(value) => handleFilterChange('salaryRange', value as [number, number])}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Location Distance</Label>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{filters.locationDistance} miles</span>
                        </div>
                      </div>
                      <Slider
                        defaultValue={[filters.locationDistance]}
                        max={100}
                        step={5}
                        value={[filters.locationDistance]}
                        onValueChange={(value) => handleFilterChange('locationDistance', value[0])}
                      />
                    </div>
                  </div>
                  
                  <SheetFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFilters({
                          easyApplyOnly: false,
                          sortBy: 'relevance',
                          datePosted: 'any',
                          jobType: 'any',
                          salaryRange: [0, 200],
                          locationDistance: 25,
                        });
                      }}
                    >
                      Reset All
                    </Button>
                    <Button>Apply Filters</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="flex gap-2 items-center">
                <CheckSquareIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Easy Apply</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsFilterBar;
