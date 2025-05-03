
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="background"></div>
      <div className="particles"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Button variant="outline" className="mb-8" asChild>
          <Link to="/" className="flex items-center text-blue-300 hover:text-blue-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="glass-effect rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <div className="text-center relative z-10 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 text-gradient">404</h1>
            <p className="text-xl text-blue-200 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Button size="lg" asChild>
              <Link to="/" className="flex items-center">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-[#1e293b] border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">JobFinder</span>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
              <Link to="/about" className="text-sm text-blue-300 hover:text-blue-100">About Us</Link>
              <Link to="/privacy" className="text-sm text-blue-300 hover:text-blue-100">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-blue-300 hover:text-blue-100">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-blue-300 hover:text-blue-100">Contact Us</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-blue-300">
            &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
