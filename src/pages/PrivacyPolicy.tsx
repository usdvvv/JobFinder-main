
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient animate-fade-in">Privacy Policy</h1>
          
          <div className="space-y-6 text-blue-100 relative z-10">
            <div className="animate-slide-up animate-delay-100">
              <h2 className="text-xl font-semibold mb-2 text-white">Introduction</h2>
              <p className="text-blue-200">
                This Privacy Policy explains how JobFinder collects, uses, and protects your personal information. 
                We are committed to ensuring that your privacy is protected. If we ask you to provide certain information
                by which you can be identified when using this website, then you can be assured that it will only be used 
                in accordance with this privacy statement.
              </p>
            </div>
            
            <div className="animate-slide-up animate-delay-200">
              <h2 className="text-xl font-semibold mb-2 text-white">Information We Collect</h2>
              <p className="text-blue-200">
                We may collect the following information:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-blue-200">
                <li>Name and contact information including email address</li>
                <li>Professional information such as resume, skills, and work experience</li>
                <li>Demographic information such as preferences and interests</li>
                <li>Other information relevant to customer surveys and/or offers</li>
              </ul>
            </div>
            
            <div className="animate-slide-up animate-delay-300">
              <h2 className="text-xl font-semibold mb-2 text-white">How We Use Your Information</h2>
              <p className="text-blue-200">
                We use this information to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-blue-200">
                <li>Match you with appropriate job opportunities</li>
                <li>Improve our products and services</li>
                <li>Send promotional emails about new products, special offers or other information</li>
                <li>Conduct research to improve the user experience</li>
              </ul>
            </div>
            
            <div className="animate-slide-up animate-delay-400">
              <h2 className="text-xl font-semibold mb-2 text-white">Data Security</h2>
              <p className="text-blue-200">
                We are committed to ensuring that your information is secure. We have implemented suitable physical, 
                electronic, and managerial procedures to safeguard and secure the information we collect online.
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

export default PrivacyPolicy;
