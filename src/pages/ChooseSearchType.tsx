
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';

const ChooseSearchType = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <NavBar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Choose Your Search Method</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Select how you'd like to search for jobs. Each method offers different benefits to help you find your perfect career match.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Search Card */}
          <Card className="search-method-card bg-[#1e293b] border-blue-500/20 hover:shadow-lg transition-all duration-300 hover:border-blue-500/40">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">Traditional Search</CardTitle>
              <CardDescription>Browse and filter job listings</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-blue-200 text-sm">
                Explore thousands of job postings with powerful filtering options. Sort by location, salary, experience level, and more to find the perfect match.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-blue-300">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Advanced filtering options
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Sort by relevance or date
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Save favorite job listings
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/jobs">
                  Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* AI Search Card */}
          <Card className="search-method-card bg-[#1e293b] border-blue-500/20 hover:shadow-lg transition-all duration-300 hover:border-blue-500/40">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">AI-Powered Search</CardTitle>
              <CardDescription>Let AI find your perfect match</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-blue-200 text-sm">
                Our AI analyzes your skills, experience, and preferences to recommend the most suitable job opportunities that match your profile.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-blue-300">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Personalized job recommendations
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Conversational search experience
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                  Skills-based matching
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/ai-job-search">
                  Try AI Search <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-blue-300 mb-4">Not sure where to start?</p>
          <Button asChild variant="outline" className="border-blue-400/30 text-blue-100 hover:bg-blue-800/40">
            <Link to="/resume">Create your resume first</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseSearchType;
