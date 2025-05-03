
import { TourStep } from '@/hooks/useTourGuide';

// Define the tour steps for different pages
const landingPageSteps: TourStep[] = [
  {
    targetSelector: ".home-hero",
    title: "Welcome to JobFinder",
    description: "This is your gateway to finding your dream job. Start by searching for a job title, company, or skill.",
    position: "bottom"
  },
  {
    targetSelector: "input[placeholder*='Search for a job']",
    title: "Job Search",
    description: "Type here to search for job opportunities that match your skills and interests.",
    position: "bottom"
  },
  {
    targetSelector: "#features",
    title: "Key Features",
    description: "Explore our powerful features designed to help you in your job search journey.",
    position: "top"
  },
  {
    targetSelector: "a[href='/choose']",
    title: "Get Started",
    description: "Click here to begin your job search or create your professional profile.",
    position: "bottom"
  },
  {
    targetSelector: "nav a[href='/jobs']",
    title: "Browse Jobs",
    description: "View thousands of job listings from top companies worldwide.",
    position: "bottom"
  },
  {
    targetSelector: "nav a[href='/resume']",
    title: "Resume Maker",
    description: "Create and optimize your professional resume with our AI-powered tools.",
    position: "bottom"
  },
  {
    targetSelector: "nav a[href='/interview']",
    title: "Interview Preparation",
    description: "Practice for interviews with our AI interviewer and get real-time feedback.",
    position: "bottom"
  }
];

const roleSelectionSteps: TourStep[] = [
  {
    targetSelector: ".choice-button:first-child",
    title: "Job Seeker Role",
    description: "Select this if you're looking for job opportunities, want to create a resume, or prepare for interviews.",
    position: "right"
  },
  {
    targetSelector: ".choice-button:last-child",
    title: "Company Role",
    description: "Select this if you're an employer looking to post jobs and manage applications.",
    position: "left"
  }
];

const chooseSearchTypeSteps: TourStep[] = [
  {
    targetSelector: ".search-method-card:first-child",
    title: "Traditional Job Search",
    description: "Browse through job listings with powerful filtering options.",
    position: "right"
  },
  {
    targetSelector: ".search-method-card:last-child",
    title: "AI-Powered Job Search",
    description: "Let our AI find the perfect job matches based on your profile and preferences.",
    position: "left"
  }
];

export const getTourStepsForRoute = (pathname: string): TourStep[] => {
  switch (pathname) {
    case '/':
      return landingPageSteps;
    case '/roles':
      return roleSelectionSteps;
    case '/choose':
      return chooseSearchTypeSteps;
    default:
      return landingPageSteps; // Default to landing page steps
  }
};
