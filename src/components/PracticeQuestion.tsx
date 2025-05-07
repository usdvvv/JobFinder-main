
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface PracticeQuestionProps {
  question: string;
  description: string;
  suggestedAnswer: string;
  tips: string[];
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const PracticeQuestion: React.FC<PracticeQuestionProps> = ({
  question,
  description,
  suggestedAnswer,
  tips,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackProvided, setFeedbackProvided] = useState(false);
  
  const handleSubmit = () => {
    setShowSuggestion(true);
  };
  
  const handleReset = () => {
    setUserAnswer('');
    setShowSuggestion(false);
    setShowFeedback(false);
    setFeedbackProvided(false);
  };
  
  const provideFeedback = (positive: boolean) => {
    // In a real app, this would send feedback to a backend
    setFeedbackProvided(true);
    setShowFeedback(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          placeholder="Type your answer here..."
          className="min-h-[150px] resize-none"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showSuggestion}
        />
        
        {showSuggestion && (
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Suggested approach:</h3>
              <p className="text-sm whitespace-pre-line">{suggestedAnswer}</p>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Tips:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm">{tip}</li>
                ))}
              </ul>
            </div>
            
            {!feedbackProvided && (
              <div className="flex justify-center space-x-4">
                <p className="text-sm mr-2">Was this helpful?</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => provideFeedback(true)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" /> Yes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => provideFeedback(false)}
                  className="flex items-center gap-1"
                >
                  <ThumbsDown className="h-4 w-4" /> No
                </Button>
              </div>
            )}
            
            {showFeedback && (
              <div className="text-center p-2 bg-primary/10 rounded-md">
                <p className="text-sm">Thanks for your feedback!</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {hasPrevious && (
            <Button 
              variant="outline"
              onClick={onPrevious}
              className="flex items-center gap-1"
            >
              Previous Question
            </Button>
          )}
        </div>
        <div className="space-x-2">
          {!showSuggestion ? (
            <Button onClick={handleSubmit} disabled={userAnswer.trim().length === 0}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline">
              Try Again
            </Button>
          )}
          {hasNext && (
            <Button 
              onClick={onNext}
              className="flex items-center gap-1"
            >
              Next Question <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PracticeQuestion;
