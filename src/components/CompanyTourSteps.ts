
import { TourStep } from '@/hooks/useTourGuide';

// Define the tour steps for company pages
export const companyDashboardSteps: TourStep[] = [
  {
    targetSelector: ".company-dashboard-header",
    title: "Company Dashboard",
    description: "Welcome to your business dashboard. Here you can see an overview of your job postings, applicants, and key metrics.",
    position: "bottom"
  },
  {
    targetSelector: ".stats-cards",
    title: "Performance Metrics",
    description: "View your company's performance metrics at a glance, including job views, applicants, and conversion rates.",
    position: "top"
  },
  {
    targetSelector: ".recent-applications",
    title: "Recent Applications",
    description: "Stay updated with the latest applications for your job postings.",
    position: "left"
  },
  {
    targetSelector: ".chart-container",
    title: "Analytics",
    description: "Track your hiring performance over time with detailed charts and insights.",
    position: "right"
  }
];

export const companyJobsSteps: TourStep[] = [
  {
    targetSelector: ".jobs-header",
    title: "Job Listings",
    description: "Manage all your job postings in one place. View, edit, or delete your listings.",
    position: "bottom"
  },
  {
    targetSelector: "a[href='/company/jobs/create']",
    title: "Post a New Job",
    description: "Create a new job listing to attract talented candidates.",
    position: "left"
  },
  {
    targetSelector: ".job-card",
    title: "Job Details",
    description: "View detailed information about each job posting, including applicant count and listing status.",
    position: "right"
  },
  {
    targetSelector: ".filter-controls",
    title: "Filter Jobs",
    description: "Use these controls to filter and sort your job listings for easier management.",
    position: "top"
  }
];

export const companyApplicationsSteps: TourStep[] = [
  {
    targetSelector: ".applications-header",
    title: "Applications Manager",
    description: "Review and manage all applications received for your job postings.",
    position: "bottom"
  },
  {
    targetSelector: ".filter-section",
    title: "Filter Applications",
    description: "Filter applications by job title, date, or status to find the right candidates quickly.",
    position: "right"
  },
  {
    targetSelector: ".applicant-card",
    title: "Applicant Information",
    description: "View applicant details, resume, and contact information. Take actions like scheduling interviews or sending rejection emails.",
    position: "bottom"
  },
  {
    targetSelector: ".bulk-actions",
    title: "Bulk Actions",
    description: "Select multiple applications to perform actions in bulk, such as scheduling group interviews or sending batch emails.",
    position: "left"
  }
];

export const companyProfileSteps: TourStep[] = [
  {
    targetSelector: ".profile-header",
    title: "Company Profile",
    description: "Manage your company's profile information, which is displayed to job seekers.",
    position: "bottom"
  },
  {
    targetSelector: ".logo-section",
    title: "Company Logo",
    description: "Upload or update your company logo to enhance your brand visibility.",
    position: "right"
  },
  {
    targetSelector: ".company-details",
    title: "Company Details",
    description: "Update your company information, including name, industry, size, and location.",
    position: "bottom"
  },
  {
    targetSelector: ".about-section",
    title: "About Your Company",
    description: "Share your company's story, mission, and culture to attract the right candidates.",
    position: "top"
  }
];

export const getCompanyTourStepsForRoute = (pathname: string): TourStep[] => {
  if (pathname.includes('/company/dashboard')) {
    return companyDashboardSteps;
  } else if (pathname.includes('/company/jobs')) {
    return companyJobsSteps;
  } else if (pathname.includes('/company/applications')) {
    return companyApplicationsSteps;
  } else if (pathname.includes('/company/profile')) {
    return companyProfileSteps;
  } else {
    // Default company tour for other company pages
    return companyDashboardSteps;
  }
};
