
interface CodeExecutionRequest {
  code: string;
  language: string;
}

interface CodeExecutionResult {
  output: string;
  error?: string;
  success: boolean;
}

// List of supported languages and their execution environments
const SUPPORTED_LANGUAGES = {
  javascript: {
    execute: (code: string): CodeExecutionResult => {
      try {
        // For JavaScript, we can use the built-in Function constructor to evaluate code
        // Create a safe execution context with console output capture
        let output: string[] = [];
        const originalConsoleLog = console.log;
        
        // Override console.log to capture output
        console.log = (...args) => {
          output.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalConsoleLog(...args);
        };
        
        // Create a function from the code and execute it
        const executableFn = new Function(`
          "use strict";
          // Create a sandboxed environment
          const console = {
            log: (...args) => {
              window.console.log(...args);
            }
          };
          
          try {
            ${code}
          } catch (error) {
            console.log("Error:", error.message);
            return { success: false, error: error.message };
          }
        `);
        
        executableFn();
        
        // Restore original console.log
        console.log = originalConsoleLog;
        
        return {
          output: output.join('\n'),
          success: true
        };
      } catch (error) {
        return {
          output: `Execution Error: ${error instanceof Error ? error.message : String(error)}`,
          success: false,
          error: String(error)
        };
      }
    }
  },
  typescript: {
    execute: (code: string): CodeExecutionResult => {
      // For TypeScript, we'll treat it as JavaScript for now (browser can't compile TS)
      // In a production environment, this would connect to a backend service that compiles TS
      try {
        // Strip type annotations using simple regex replacements
        // This is a very basic approach and not a real TypeScript compiler
        const jsCode = code
          .replace(/:\s*[A-Za-z<>\[\]|,\s]+\s*(?=[,)=])/g, '') // Remove type annotations
          .replace(/<[A-Za-z<>\[\]|,\s]+>/g, '') // Remove generic type parameters
          .replace(/interface\s+\w+\s*\{[^}]*\}/g, '') // Remove interfaces
          .replace(/type\s+\w+\s*=\s*[^;]*/g, ''); // Remove type aliases
        
        return SUPPORTED_LANGUAGES.javascript.execute(jsCode);
      } catch (error) {
        return {
          output: `TypeScript Conversion Error: ${error instanceof Error ? error.message : String(error)}`,
          success: false,
          error: String(error)
        };
      }
    }
  },
  python: {
    execute: (code: string): CodeExecutionResult => {
      return {
        output: `Python Execution:\n\nPython execution requires a backend service. In this environment, we're showing a simulation.\n\nYour Python code:\n\n${code}\n\nFor real Python execution, the app would need to connect to a Python interpreter service.`,
        success: true
      };
    }
  },
  java: {
    execute: (code: string): CodeExecutionResult => {
      return {
        output: `Java Execution:\n\nJava execution requires a backend service. In this environment, we're showing a simulation.\n\nYour Java code:\n\n${code}\n\nFor real Java execution, the app would need to connect to a Java compiler service.`,
        success: true
      };
    }
  },
  csharp: {
    execute: (code: string): CodeExecutionResult => {
      return {
        output: `C# Execution:\n\nC# execution requires a backend service. In this environment, we're showing a simulation.\n\nYour C# code:\n\n${code}\n\nFor real C# execution, the app would need to connect to a .NET compiler service.`,
        success: true
      };
    }
  },
  cpp: {
    execute: (code: string): CodeExecutionResult => {
      return {
        output: `C++ Execution:\n\nC++ execution requires a backend service. In this environment, we're showing a simulation.\n\nYour C++ code:\n\n${code}\n\nFor real C++ execution, the app would need to connect to a C++ compiler service.`,
        success: true
      };
    }
  },
  ruby: {
    execute: (code: string): CodeExecutionResult => {
      return {
        output: `Ruby Execution:\n\nRuby execution requires a backend service. In this environment, we're showing a simulation.\n\nYour Ruby code:\n\n${code}\n\nFor real Ruby execution, the app would need to connect to a Ruby interpreter service.`,
        success: true
      };
    }
  }
};

export const executeCode = async (request: CodeExecutionRequest): Promise<CodeExecutionResult> => {
  const { code, language } = request;
  
  // Check if language is supported
  if (!SUPPORTED_LANGUAGES[language]) {
    return {
      output: `Language '${language}' is not supported. Supported languages are: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`,
      success: false,
      error: `Unsupported language: ${language}`
    };
  }
  
  try {
    // Execute the code using the appropriate language executor
    return SUPPORTED_LANGUAGES[language].execute(code);
  } catch (error) {
    return {
      output: `System Error: ${error instanceof Error ? error.message : String(error)}`,
      success: false,
      error: String(error)
    };
  }
};

// Function to validate if code might contain potentially harmful operations
export const validateCodeSafety = (code: string): { safe: boolean; reason?: string } => {
  // List of potentially dangerous patterns to check for
  const dangerousPatterns = [
    { pattern: /process\.exit/g, reason: "Attempting to exit the process" },
    { pattern: /require\s*\(/g, reason: "Attempting to import modules" },
    { pattern: /import\s+/g, reason: "Attempting to import modules" },
    { pattern: /eval\s*\(/g, reason: "Using eval" },
    { pattern: /Function\s*\(/g, reason: "Creating dynamic functions" },
    { pattern: /localStorage/g, reason: "Accessing localStorage" },
    { pattern: /sessionStorage/g, reason: "Accessing sessionStorage" },
    { pattern: /document\.cookie/g, reason: "Accessing cookies" },
    { pattern: /fetch\s*\(/g, reason: "Making network requests" },
    { pattern: /XMLHttpRequest/g, reason: "Making network requests" },
    { pattern: /window\.open/g, reason: "Opening windows" },
    { pattern: /document\.write/g, reason: "Writing to document" },
    { pattern: /while\s*\(\s*true\s*\)/g, reason: "Potential infinite loop" },
    { pattern: /for\s*\(\s*;;\s*\)/g, reason: "Potential infinite loop" }
  ];
  
  // Check for dangerous patterns
  for (const { pattern, reason } of dangerousPatterns) {
    if (pattern.test(code)) {
      return { safe: false, reason };
    }
  }
  
  return { safe: true };
};
