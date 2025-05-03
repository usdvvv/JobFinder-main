
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully! We'll get back to you soon."
      });
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient animate-fade-in">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6 text-blue-100 animate-slide-up">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Get in Touch</h2>
                <p className="text-blue-200">
                  Have questions, feedback, or need assistance? We're here to help! 
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Contact Information</h2>
                <div className="space-y-2 text-blue-200">
                  <p>Email: <a href="mailto:seifmezned.2004@gmail.com" className="text-blue-400 hover:underline">seifmezned.2004@gmail.com</a></p>
                  <p>Website: <a href="https://jobfinder.com" className="text-blue-400 hover:underline">jobfinder.com</a></p>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white">Developer Contact</h3>
                <p className="text-blue-200">
                  For technical issues or collaboration opportunities, please contact the developer directly:
                </p>
                <p className="mt-2 text-blue-200">
                  Seif Eddine Mezned - AI Engineer & Full Stack Developer<br />
                  Email: <a href="mailto:seifmezned.2004@gmail.com" className="text-blue-400 hover:underline">seifmezned.2004@gmail.com</a>
                </p>
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg animate-slide-up animate-delay-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">Name</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-blue-900/30 border-blue-500/30 text-white focus:border-blue-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-blue-900/30 border-blue-500/30 text-white focus:border-blue-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-1">Message</label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-blue-900/30 border-blue-500/30 text-white focus:border-blue-400 min-h-[150px]"
                    placeholder="Your message..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
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

export default ContactUs;
