
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, MapPin, Building, Heart, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  skills: string[];
  remote: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  type,
  posted,
  description,
  skills,
  remote
}: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <Card className="group w-full overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 hover:border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-2 items-center mt-1">
              <span className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {company}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {salary}
              </span>
            </CardDescription>
          </div>
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors duration-300 ${
              favorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="flex items-center gap-1 font-normal">
            <Briefcase className="w-3 h-3" /> {type}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 font-normal">
            <Clock className="w-3 h-3" /> {posted}
          </Badge>
          {remote && (
            <Badge variant="secondary" className="flex items-center gap-1 font-normal">
              Remote
            </Badge>
          )}
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-96' : 'max-h-16'}`}>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
          className="text-xs flex items-center"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" /> Show More
            </>
          )}
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm">Save</Button>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 transition-colors duration-300"
            asChild
          >
            <Link to={`/apply/${id}`}>
              Apply Now
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
