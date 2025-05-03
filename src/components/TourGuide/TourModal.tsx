
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface TourModalProps {
  isOpen: boolean;
  onStartTour: () => void;
  onSkipTour: () => void;
}

const TourModal = ({ isOpen, onStartTour, onSkipTour }: TourModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onSkipTour()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Welcome to JobFinder!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Would you like a quick tour of all the features to help you get started?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center my-4 relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center animate-pulse-slow">
            <img src="/tour-guide-icon.svg" alt="Tour Guide" className="w-16 h-16 animate-float" onError={(e) => {
              e.currentTarget.src = "https://api.dicebear.com/6.x/thumbs/svg?seed=tour&backgroundColor=1e88e5";
            }} />
          </div>
          
          {/* Add decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-blue-500/10 animate-pulse-slow"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-blue-500/20 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        </div>

        <p className="text-center text-muted-foreground">
          This interactive tour will show you how to navigate JobFinder and make the most of our features.
        </p>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={onSkipTour} className="sm:mr-2 w-full sm:w-auto group transition-all duration-300 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950">
            Skip Tour
            <span className="ml-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
              (You can restart later)
            </span>
          </Button>
          <Button onClick={onStartTour} className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all">
            Start Tour <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TourModal;
