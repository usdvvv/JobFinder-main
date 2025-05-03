import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Difficulty levels for the game
type Difficulty = 'easy' | 'medium' | 'hard';

const Sudoku = () => {
  // Store the current puzzle, solution, and selected cell
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  // Generate a new puzzle when difficulty changes
  useEffect(() => {
    generateNewPuzzle();
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isGameStarted && !isGameCompleted) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameStarted, isGameCompleted]);

  // Check if the puzzle is solved
  useEffect(() => {
    if (board.length > 0 && !isLoading) {
      const isSolved = checkIfSolved();
      if (isSolved) {
        setIsGameCompleted(true);
        toast({
          title: "Congratulations!",
          description: `You solved the ${difficulty} puzzle in ${formatTime(timer)}!`,
        });
      }
    }
  }, [board]);

  // Format the timer display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate a fresh Sudoku puzzle
  const generateNewPuzzle = async () => {
    setIsLoading(true);
    setIsGameCompleted(false);
    
    try {
      // Create a solved Sudoku board
      const solvedBoard = generateSolvedBoard();
      setSolution(solvedBoard);
      
      // Create a puzzle by removing numbers based on difficulty
      const puzzleBoard = createPuzzle(solvedBoard, difficulty);
      setBoard(puzzleBoard);
      
      setIsLoading(false);
      setTimer(0);
      setIsGameStarted(true);
    } catch (error) {
      console.error("Error generating puzzle:", error);
      toast({
        title: "Error",
        description: "Failed to generate a new puzzle. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Generate a solved Sudoku board
  const generateSolvedBoard = (): number[][] => {
    // Initialize empty 9x9 board
    const board: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    
    // Fill the board using backtracking
    solveSudoku(board);
    return board;
  };

  // Solve the Sudoku puzzle using backtracking
  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // Try placing numbers 1-9
          const shuffledNumbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          
          for (const num of shuffledNumbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              
              if (solveSudoku(board)) {
                return true;
              }
              
              // If placing the number doesn't lead to a solution, backtrack
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true; // Board is filled
  };

  // Check if a number can be placed at a specific position
  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let y = 0; y < 9; y++) {
      if (board[y][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let y = boxRow; y < boxRow + 3; y++) {
      for (let x = boxCol; x < boxCol + 3; x++) {
        if (board[y][x] === num) return false;
      }
    }
    
    return true;
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Create a puzzle by removing numbers from the solved board
  const createPuzzle = (solvedBoard: number[][], difficulty: Difficulty): (number | null)[][] => {
    // Create a deep copy of the solved board
    const puzzle: (number | null)[][] = JSON.parse(JSON.stringify(solvedBoard));
    
    // Determine how many cells to remove based on difficulty
    let cellsToRemove: number;
    switch (difficulty) {
      case 'easy':
        cellsToRemove = 40; // ~45% empty
        break;
      case 'medium':
        cellsToRemove = 50; // ~55% empty
        break;
      case 'hard':
        cellsToRemove = 60; // ~67% empty
        break;
      default:
        cellsToRemove = 40;
    }
    
    // Randomly remove cells
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (puzzle[row][col] !== null) {
        puzzle[row][col] = null;
        removed++;
      }
    }
    
    return puzzle;
  };

  // Check if the current board is solved correctly
  const checkIfSolved = (): boolean => {
    // Check if there are any empty cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) return false;
      }
    }
    
    // Check if the current board matches the solution
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solution[row][col]) return false;
      }
    }
    
    return true;
  };

  // Handle cell selection
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] === null || board[rowIndex][colIndex] !== null) {
      setSelectedCell([rowIndex, colIndex]);
    }
  };

  // Handle number input
  const handleNumberInput = (number: number) => {
    if (!selectedCell || isGameCompleted) return;
    
    const [row, col] = selectedCell;
    
    // Create a new board with the updated cell
    const newBoard = [...board];
    newBoard[row][col] = number;
    setBoard(newBoard);
  };

  // Handle cell clearing
  const handleClearCell = () => {
    if (!selectedCell || isGameCompleted) return;
    
    const [row, col] = selectedCell;
    
    // Create a new board with the cleared cell
    const newBoard = [...board];
    newBoard[row][col] = null;
    setBoard(newBoard);
  };

  // Check if a cell is in the original puzzle
  const isOriginalCell = (rowIndex: number, colIndex: number): boolean => {
    // If the cell was initially filled, it's part of the original puzzle
    return board[rowIndex][colIndex] !== null && !selectedCell;
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Sudoku</span>
          <span className="text-lg font-normal">{formatTime(timer)}</span>
        </CardTitle>
        <CardDescription>
          {isGameCompleted 
            ? `Completed! (${difficulty})` 
            : `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} mode`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Generating puzzle...</p>
          </div>
        ) : (
          <div className="grid grid-cols-9 gap-px bg-gray-600">
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const isSelected = 
                  selectedCell && 
                  selectedCell[0] === rowIndex && 
                  selectedCell[1] === colIndex;
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      aspect-square flex items-center justify-center text-lg font-semibold 
                      cursor-pointer select-none
                      ${(rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'border-b-2 border-gray-600' : ''}
                      ${(colIndex + 1) % 3 === 0 && colIndex < 8 ? 'border-r-2 border-gray-600' : ''}
                      ${isSelected ? 'bg-blue-500 text-white' : 'bg-card'}
                      ${isOriginalCell(rowIndex, colIndex) ? 'font-bold' : 'font-normal'}
                    `}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell !== null ? cell : ''}
                  </div>
                );
              })
            ))}
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <Button 
              key={number}
              className="py-2 px-4"
              onClick={() => handleNumberInput(number)}
              disabled={isLoading || isGameCompleted}
            >
              {number}
            </Button>
          ))}
          <Button 
            variant="outline"
            onClick={handleClearCell}
            disabled={isLoading || isGameCompleted || !selectedCell}
          >
            Clear
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant={difficulty === 'easy' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDifficulty('easy')}
            disabled={isLoading}
          >
            Easy
          </Button>
          <Button 
            variant={difficulty === 'medium' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDifficulty('medium')}
            disabled={isLoading}
          >
            Medium
          </Button>
          <Button 
            variant={difficulty === 'hard' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDifficulty('hard')}
            disabled={isLoading}
          >
            Hard
          </Button>
        </div>
        <Button
          onClick={generateNewPuzzle}
          disabled={isLoading}
        >
          New Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Sudoku;
