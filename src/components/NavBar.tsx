import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Home, FileText, Video, UserRound, Code, Brain, Bot, LogOut, Puzzle, MessageSquare } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  useEffect(() => {
    const hasAuthToken = localStorage.getItem('authToken');
    
    if (hasAuthToken) {
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

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
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-md' 
          : 'bg-background/50 backdrop-blur-sm dark:bg-background/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">JobFinder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Home" />
              <NavLink to="/jobs" icon={<Briefcase className="h-4 w-4" />} text="Browse Jobs" />
              <NavLink to="/resume" icon={<FileText className="h-4 w-4" />} text="Resume Maker" />
              <NavLink to="/interview" icon={<Video className="h-4 w-4" />} text="Interview Prep" />
              <NavLink to="/practice" icon={<Code className="h-4 w-4" />} text="Practice Coding" />
              <NavLink to="/therapist" icon={<Brain className="h-4 w-4" />} text="AI Therapist" />
              <NavLink to="/peer-chat" icon={<MessageSquare className="h-4 w-4" />} text="Peer Chat" />
              <NavLink to="/ai-assistant" icon={<Bot className="h-4 w-4" />} text="AI Assistant" />
              <NavLink to="/entertainment" icon={<Puzzle className="h-4 w-4" />} text="Entertainment" />
              
              <div className="ml-2">
                <ThemeToggle />
              </div>
              
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={handleLogin}
                >
                  <UserRound className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
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

      {isOpen && (
        <div className="md:hidden bg-background/80 dark:bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <MobileNavLink to="/jobs" icon={<Briefcase className="h-5 w-5" />} text="Browse Jobs" />
            <MobileNavLink to="/resume" icon={<FileText className="h-5 w-5" />} text="Resume Maker" />
            <MobileNavLink to="/interview" icon={<Video className="h-5 w-5" />} text="Interview Prep" />
            <MobileNavLink to="/practice" icon={<Code className="h-5 w-5" />} text="Practice Coding" />
            <MobileNavLink to="/therapist" icon={<Brain className="h-5 w-5" />} text="AI Therapist" />
            <MobileNavLink to="/peer-chat" icon={<MessageSquare className="h-5 w-5" />} text="Peer Chat" />
            <MobileNavLink to="/ai-assistant" icon={<Bot className="h-5 w-5" />} text="AI Assistant" />
            <MobileNavLink to="/entertainment" icon={<Puzzle className="h-5 w-5" />} text="Entertainment" />
            
            <div className="pt-2 border-t border-gray-200/30 mt-2">
              {isLoggedIn ? (
                <button 
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-blue-500 flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              ) : (
                <button 
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-blue-600 flex items-center"
                  onClick={handleLogin}
                >
                  <UserRound className="h-5 w-5 mr-3" />
                  Login
                </button>
              )}
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
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-foreground hover:text-blue-600 hover:bg-muted dark:hover:text-blue-400'
      }`}
    >
      {icon}
      <span>{text}</span>
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded"></span>
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
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
          : 'text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavBar;
