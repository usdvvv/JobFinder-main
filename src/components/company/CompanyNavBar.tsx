import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Building2, 
  LayoutDashboard, 
  FileText, 
  FileSearch, 
  LogOut, 
  PlusCircle, 
  User,
  Puzzle,
  HeartPulse,
  MessageSquare
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import ThemeToggle from '@/components/ThemeToggle';

const CompanyNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-background/90 dark:bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/company/dashboard" 
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">JobFinder Business</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/company/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} text="Dashboard" />
              <NavLink to="/company/jobs" icon={<FileText className="h-4 w-4" />} text="Job Postings" />
              <NavLink to="/company/applications" icon={<FileSearch className="h-4 w-4" />} text="Applications" />
              <NavLink to="/company/profile" icon={<User className="h-4 w-4" />} text="Profile" />
              <NavLink to="/company/entertainment" icon={<Puzzle className="h-4 w-4" />} text="Entertainment" />
              <NavLink to="/company/therapist" icon={<HeartPulse className="h-4 w-4" />} text="AI Therapist" />
              <NavLink to="/company/peer-chat" icon={<MessageSquare className="h-4 w-4" />} text="Peer Chat" />
              <Link to="/company/create-job" className="post-job-button">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 ml-2">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </Link>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-blue-500 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-effect animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/company/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" />
            <MobileNavLink to="/company/jobs" icon={<FileText className="h-5 w-5" />} text="Job Postings" />
            <MobileNavLink to="/company/applications" icon={<FileSearch className="h-5 w-5" />} text="Applications" />
            <MobileNavLink to="/company/profile" icon={<User className="h-5 w-5" />} text="Profile" />
            <MobileNavLink to="/company/entertainment" icon={<Puzzle className="h-5 w-5" />} text="Entertainment" />
            <MobileNavLink to="/company/therapist" icon={<HeartPulse className="h-5 w-5" />} text="AI Therapist" />
            <MobileNavLink to="/company/peer-chat" icon={<MessageSquare className="h-5 w-5" />} text="Peer Chat" />
            <div className="pt-2 border-t border-gray-200/30 mt-2">
              <Link 
                to="/company/create-job"
                className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-3" />
                Post New Job
              </Link>
            </div>
            <div className="pt-2">
              <button 
                className="w-full px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-blue-500 flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-all duration-300 ${
        isActive 
          ? 'text-blue-600' 
          : 'text-foreground hover:text-blue-600 hover:bg-muted'
      }`}
    >
      {icon}
      <span>{text}</span>
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-foreground hover:bg-muted hover:text-blue-600'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default CompanyNavBar;
