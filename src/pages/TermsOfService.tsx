
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="background"></div>
      <div className="particles"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Button variant="outline" className="mb-8" asChild>
          <Link to="/home" className="flex items-center text-blue-300 hover:text-blue-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="glass-effect rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient animate-fade-in">Terms of Service</h1>
          
          <div className="space-y-6 text-blue-100 relative z-10">
            <div className="animate-slide-up animate-delay-100">
              <h2 className="text-xl font-semibold mb-2 text-white">Acceptance of Terms</h2>
              <p className="text-blue-200">
                By accessing or using JobFinder services, you agree to be bound by these Terms of Service.
                If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services.
              </p>
            </div>
            
            <div className="animate-slide-up animate-delay-200">
              <h2 className="text-xl font-semibold mb-2 text-white">User Accounts</h2>
              <p className="text-blue-200">
                When you create an account with us, you must provide accurate, complete, and up-to-date information.
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
              </p>
            </div>
            
            <div className="animate-slide-up animate-delay-300">
              <h2 className="text-xl font-semibold mb-2 text-white">Content and Conduct</h2>
              <p className="text-blue-200">
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material.
                You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
              </p>
              <p className="mt-2 text-blue-200">
                You agree not to post or upload any content that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-blue-200">
                <li>Is false, misleading, or fraudulent</li>
                <li>Infringes upon any third party's intellectual property rights</li>
                <li>Contains software viruses or any other code designed to disrupt functionality</li>
                <li>Is offensive, abusive, or violates the legal rights of others</li>
              </ul>
            </div>
            
            <div className="animate-slide-up animate-delay-400">
              <h2 className="text-xl font-semibold mb-2 text-white">Termination</h2>
              <p className="text-blue-200">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
              </p>
            </div>
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

export default TermsOfService;
