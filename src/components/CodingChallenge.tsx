import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Check, RefreshCw, Code, FileText, EyeOff, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { executeCode, validateCodeSafety } from "@/services/codeExecutionService";

interface CodingChallengeProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: string;
  solution: string;
  onClose: () => void;
}

// List of supported programming languages
const programmingLanguages = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'typescript', label: 'TypeScript', extension: 'ts' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'csharp', label: 'C#', extension: 'cs' },
  { value: 'cpp', label: 'C++', extension: 'cpp' },
  { value: 'ruby', label: 'Ruby', extension: 'rb' },
];

// Language-specific starter code templates
const getLanguageTemplate = (language: string, functionName: string) => {
  switch (language) {
    case 'python':
      return `def ${functionName}(nums, target):
    # TODO: Implement this function
    # Write your code here
    
    pass

# Example usage (uncomment to test):
# print(${functionName}([2,7,11,15], 9))`;
    
    case 'java':
      return `public class Solution {
    public int[] ${functionName}(int[] nums, int target) {
        // TODO: Implement this function
        // Write your code here
        
        return new int[]{0, 0};
    }
    
    // Example usage
    public static void main(String[] args) {
        // Uncomment to test
        // Solution solution = new Solution();
        // int[] result = solution.${functionName}(new int[]{2,7,11,15}, 9);
        // System.out.println(Arrays.toString(result));
    }
}`;
    
    case 'csharp':
      return `public class Solution {
    public int[] ${functionName}(int[] nums, int target) {
        // TODO: Implement this function
        // Write your code here
        
        return new int[]{0, 0};
    }
    
    // Example usage
    static void Main() {
        // Uncomment to test
        // Solution solution = new Solution();
        // int[] result = solution.${functionName}(new int[]{2,7,11,15}, 9);
        // Console.WriteLine(string.Join(", ", result));
    }
}`;

    case 'cpp':
      return `#include <vector>
#include <iostream>

class Solution {
public:
    std::vector<int> ${functionName}(std::vector<int>& nums, int target) {
        // TODO: Implement this function
        // Write your code here
        
        return {0, 0};
    }
};

// Example usage
int main() {
    // Uncomment to test
    // Solution solution;
    // std::vector<int> nums = {2, 7, 11, 15};
    // std::vector<int> result = solution.${functionName}(nums, 9);
    // for (int i : result) std::cout << i << " ";
    // return 0;
}`;

    case 'ruby':
      return `def ${functionName}(nums, target)
    # TODO: Implement this function
    # Write your code here
    
    return [0, 0]
end

# Example usage (uncomment to test):
# p ${functionName}([2,7,11,15], 9)`;
    
    case 'typescript':
      return `function ${functionName}(nums: number[], target: number): number[] {
    // TODO: Implement this function
    // Write your code here
    
    return [0, 0];
}

// Example usage (uncomment to test):
// console.log(${functionName}([2,7,11,15], 9));`;
    
    case 'javascript':
    default:
      return `function ${functionName}(nums, target) {
    // TODO: Implement this function
    // Write your code here
    
    return [0, 0];
}

// Example usage (uncomment to test):
// console.log(${functionName}([2,7,11,15], 9));`;
  }
};

// Function to extract function name from starter code
const extractFunctionName = (starterCode: string): string => {
  // Default function name if we can't extract
  let defaultName = "solution";
  
  try {
    // Simple regex to find function name
    const match = starterCode.match(/function\s+(\w+)\s*\(/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (error) {
    console.error("Error extracting function name:", error);
  }
  
  return defaultName;
};

const CodingChallenge = ({
  title,
  description,
  difficulty,
  category,
  examples,
  starterCode,
  solution,
  onClose
}: CodingChallengeProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('problem');
  const [showSolution, setShowSolution] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [hasCompileError, setHasCompileError] = useState(false);
  
  const { toast } = useToast();
  
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };
  
  // Update code when language changes
  useEffect(() => {
    if (hasSelectedLanguage) {
      const functionName = extractFunctionName(starterCode);
      setCode(getLanguageTemplate(selectedLanguage, functionName));
    }
  }, [selectedLanguage, hasSelectedLanguage, starterCode]);
  
  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value);
    setHasSelectedLanguage(true);
    setOutput('');
    setIsCorrect(null);
    setHasCompileError(false);
    
    toast({
      title: `Language changed to ${programmingLanguages.find(lang => lang.value === value)?.label}`,
      description: "Your code has been reset to the starter template.",
      variant: "default",
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setHasCompileError(false);
    
    // Check for potentially unsafe code
    const safetyCheck = validateCodeSafety(code);
    if (!safetyCheck.safe) {
      setIsRunning(false);
      setOutput(`⚠️ Safety Warning: Your code contains potentially unsafe operations (${safetyCheck.reason}).\n\nFor security reasons, certain operations like network requests, imports, and access to browser storage are restricted.`);
      setHasCompileError(true);
      return;
    }
    
    try {
      const result = await executeCode({
        code,
        language: selectedLanguage
      });
      
      setOutput(result.output || '');
      
      if (!result.success) {
        setHasCompileError(true);
        setIsCorrect(false);
      } else {
        setHasCompileError(false);
        
        // Check if the code likely contains a solution (not just starter code)
        if (result.output && code.includes('return') && !code.includes('// TODO')) {
          // For simplicity, consider any output as potentially correct
          // In a real implementation, we'd verify against test cases
          setIsCorrect(true);
          toast({
            title: "Code executed successfully",
            description: "Your solution produced an output. Check if it matches the expected result.",
            variant: "default",
          });
        } else {
          setIsCorrect(null);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setHasCompileError(true);
      setIsCorrect(false);
    } finally {
      setIsRunning(false);
    }
  };
  
  const resetCode = () => {
    const functionName = extractFunctionName(starterCode);
    setCode(getLanguageTemplate(selectedLanguage, functionName));
    setOutput('');
    setIsCorrect(null);
    setHasCompileError(false);
    
    toast({
      title: "Code Reset",
      description: "Your code has been reset to the starter template.",
      variant: "default",
    });
  };
  
  const toggleSolution = () => {
    if (!showSolution) {
      toast({
        title: "Viewing Solution",
        description: "Remember, learning happens when you solve problems yourself!",
        variant: "default",
      });
    }
    setShowSolution(!showSolution);
  };

  if (!hasSelectedLanguage) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Choose Programming Language</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Select the programming language you want to use for this challenge.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {programmingLanguages.map((lang) => (
                <Button
                  key={lang.value}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleLanguageSelect(lang.value)}
                >
                  <span className="font-bold">{lang.label}</span>
                  <Badge variant="secondary">.{lang.extension}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => handleLanguageSelect('javascript')}>
              Continue with JavaScript
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
                {difficulty}
              </span>
              <Badge variant="secondary">{category}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {programmingLanguages.find(lang => lang.value === selectedLanguage)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {programmingLanguages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.value}
                      onClick={() => handleLanguageSelect(lang.value)}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <div className="flex-1 min-h-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-hidden p-4">
              {/* Problem Tab */}
              <TabsContent value="problem" className="h-full mt-0">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Problem Description</h3>
                      <p className="mt-2 text-muted-foreground whitespace-pre-line">{description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Examples</h3>
                      <div className="space-y-4 mt-2">
                        {examples.map((example, idx) => (
                          <div key={idx} className="border rounded-md p-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium">Input:</h4>
                                <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                                  {example.input}
                                </pre>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Output:</h4>
                                <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                                  {example.output}
                                </pre>
                              </div>
                            </div>
                            {example.explanation && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium">Explanation:</h4>
                                <p className="mt-1 text-sm text-muted-foreground">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              {/* Code Tab */}
              <TabsContent value="code" className="h-full mt-0 flex flex-col">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <Textarea
                      className="font-mono text-sm h-full min-h-[400px] p-3"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Write your solution here..."
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetCode}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Code
                    </Button>
                    
                    <div className="space-x-2">
                      <Button variant="outline" onClick={toggleSolution}>
                        {showSolution ? <EyeOff className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                        {showSolution ? "Hide Solution" : "View Solution"}
                      </Button>
                      
                      <Button onClick={runCode} disabled={isRunning}>
                        {isRunning ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {showSolution && (
                    <div className="border rounded-md overflow-hidden" style={{ height: "240px" }}>
                      <ScrollArea className="h-full w-full">
                        <div className="p-4">
                          <h4 className="text-sm font-medium mb-2">Solution ({programmingLanguages.find(lang => lang.value === selectedLanguage)?.label}):</h4>
                          <pre className="p-3 bg-muted rounded text-xs whitespace-pre-wrap overflow-visible">
                            {solution}
                          </pre>
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Output Tab */}
              <TabsContent value="output" className="h-full mt-0">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">Output</h3>
                    {isCorrect === true && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">Code executed successfully!</span>
                      </div>
                    )}
                    {hasCompileError && (
                      <div className="flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Execution error</span>
                      </div>
                    )}
                  </div>
                  
                  <ScrollArea className="flex-1 min-h-[400px] border rounded-md p-3 bg-muted">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {output || "Output will appear here after running your code."}
                    </pre>
                  </ScrollArea>
                  
                  {selectedLanguage !== 'javascript' && selectedLanguage !== 'typescript' && (
                    <div className="p-3 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/30 rounded-md">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Note: Full compilation for {programmingLanguages.find(lang => lang.value === selectedLanguage)?.label} 
                        requires a backend service. This is a simulated execution showing the expected output format.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <CardFooter className="border-t py-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                {difficulty} · {category}
              </div>
              <Select value={selectedLanguage} onValueChange={handleLanguageSelect}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="default" onClick={runCode} disabled={isRunning}>
              {isRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Submit Solution
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CodingChallenge;
