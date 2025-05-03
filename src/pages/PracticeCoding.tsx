
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Play, 
  BookOpen, 
  Star, 
  Filter, 
  SortDesc, 
  Check, 
  X, 
  ChevronRight, 
  FileText,
  Eye,
  Trophy
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from "@/components/ui/badge";
import CodingChallenge from '@/components/CodingChallenge';
import CodingLeaderboard from '@/components/CodingLeaderboard';

const codingProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    categories: ["Arrays", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    solvedRate: "85%",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ],
    starterCode: "function twoSum(nums, target) {\n  // Your code here\n}",
    solution: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    categories: ["Stack", "String"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    solvedRate: "76%",
    examples: [
      { input: "s = '()'", output: "true", explanation: "The parentheses match." },
      { input: "s = '()[]{}'", output: "true", explanation: "All brackets match and close in the correct order." }
    ],
    starterCode: "function isValid(s) {\n  // Your code here\n}",
    solution: "function isValid(s) {\n  const stack = [];\n  const map = {\n    '(': ')',\n    '[': ']',\n    '{': '}'\n  };\n  for (let i = 0; i < s.length; i++) {\n    const char = s[i];\n    if (map[char]) {\n      stack.push(map[char]);\n    } else if (stack.pop() !== char) {\n      return false;\n    }\n  }\n  return stack.length === 0;\n}"
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    categories: ["Linked List"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    solvedRate: "82%",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "The list is reversed." },
      { input: "head = [1,2]", output: "[2,1]", explanation: "The list is reversed." }
    ],
    starterCode: "function reverseList(head) {\n  // Your code here\n}",
    solution: "function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current !== null) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}"
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    categories: ["Array", "Dynamic Programming"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    solvedRate: "68%",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The subarray [1] has the largest sum 1." }
    ],
    starterCode: "function maxSubArray(nums) {\n  // Your code here\n}",
    solution: "function maxSubArray(nums) {\n  let maxCurrent = nums[0];\n  let maxGlobal = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);\n    if (maxCurrent > maxGlobal) {\n      maxGlobal = maxCurrent;\n    }\n  }\n  return maxGlobal;\n}"
  },
  {
    id: 5,
    title: "Merge Intervals",
    difficulty: "Medium",
    categories: ["Array", "Sorting"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    solvedRate: "62%",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals [1,4] and [4,5] are considered overlapping." }
    ],
    starterCode: "function merge(intervals) {\n  // Your code here\n}",
    solution: "function merge(intervals) {\n  if (intervals.length <= 1) return intervals;\n  intervals.sort((a, b) => a[0] - b[0]);\n  const result = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const current = intervals[i];\n    const last = result[result.length - 1];\n    if (current[0] <= last[1]) {\n      last[1] = Math.max(last[1], current[1]);\n    } else {\n      result.push(current);\n    }\n  }\n  return result;\n}"
  },
  {
    id: 6,
    title: "LRU Cache",
    difficulty: "Medium",
    categories: ["Hash Table", "Linked List", "Design"],
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    solvedRate: "52%",
    examples: [
      { 
        input: "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1);\nlRUCache.put(2, 2);\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // evicts key 2\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // evicts key 1\nlRUCache.get(1);    // returns -1 (not found)\nlRUCache.get(3);    // returns 3\nlRUCache.get(4);    // returns 4", 
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]", 
        explanation: "LRU Cache implementation with capacity 2."
      }
    ],
    starterCode: "class LRUCache {\n  constructor(capacity) {\n    // Initialize your data structure here\n  }\n  \n  get(key) {\n    // Your code here\n  }\n  \n  put(key, value) {\n    // Your code here\n  }\n}",
    solution: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  \n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    \n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  \n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    \n    this.cache.set(key, value);\n  }\n}"
  },
  {
    id: 7,
    title: "Word Break",
    difficulty: "Medium",
    categories: ["Dynamic Programming", "Trie", "Memoization"],
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    solvedRate: "49%",
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: "Return true because 'leetcode' can be segmented as 'leet code'." },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true", explanation: "Return true because 'applepenapple' can be segmented as 'apple pen apple'." }
    ],
    starterCode: "function wordBreak(s, wordDict) {\n  // Your code here\n}",
    solution: "function wordBreak(s, wordDict) {\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  \n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordDict.includes(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  \n  return dp[s.length];\n}"
  },
  {
    id: 8,
    title: "Number of Islands",
    difficulty: "Medium",
    categories: ["Depth-First Search", "Breadth-First Search", "Union Find"],
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    solvedRate: "59%",
    examples: [
      { 
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]', 
        output: "1", 
        explanation: "There is one island (connected land cells)." 
      },
      { 
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]', 
        output: "3", 
        explanation: "There are three islands." 
      }
    ],
    starterCode: "function numIslands(grid) {\n  // Your code here\n}",
    solution: "function numIslands(grid) {\n  if (!grid || grid.length === 0) return 0;\n  \n  const m = grid.length;\n  const n = grid[0].length;\n  let count = 0;\n  \n  function dfs(i, j) {\n    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;\n    \n    grid[i][j] = '0';\n    dfs(i + 1, j);\n    dfs(i - 1, j);\n    dfs(i, j + 1);\n    dfs(i, j - 1);\n  }\n  \n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  \n  return count;\n}"
  },
  {
    id: 9,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    categories: ["Array", "Two Pointers", "Stack"],
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    solvedRate: "38%",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The elevation map represents the histogram where the width of each bar is 1. The above water is captured in blue on the diagram." },
      { input: "height = [4,2,0,3,2,5]", output: "9", explanation: "The elevation map represents the histogram where the width of each bar is 1." }
    ],
    starterCode: "function trap(height) {\n  // Your code here\n}",
    solution: "function trap(height) {\n  if (!height || height.length === 0) return 0;\n  \n  let left = 0;\n  let right = height.length - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let result = 0;\n  \n  while (left < right) {\n    if (height[left] < height[right]) {\n      height[left] >= leftMax ? (leftMax = height[left]) : (result += leftMax - height[left]);\n      left++;\n    } else {\n      height[right] >= rightMax ? (rightMax = height[right]) : (result += rightMax - height[right]);\n      right--;\n    }\n  }\n  \n  return result;\n}"
  },
  {
    id: 10,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    categories: ["Linked List", "Divide and Conquer", "Heap"],
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    solvedRate: "35%",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "The linked-lists are merged in ascending order." },
      { input: "lists = []", output: "[]", explanation: "The input is an empty list." }
    ],
    starterCode: "function mergeKLists(lists) {\n  // Your code here\n}",
    solution: "function mergeKLists(lists) {\n  if (!lists || lists.length === 0) return null;\n  \n  function mergeTwoLists(l1, l2) {\n    const dummy = new ListNode(0);\n    let curr = dummy;\n    \n    while (l1 && l2) {\n      if (l1.val < l2.val) {\n        curr.next = l1;\n        l1 = l1.next;\n      } else {\n        curr.next = l2;\n        l2 = l2.next;\n      }\n      curr = curr.next;\n    }\n    \n    curr.next = l1 || l2;\n    \n    return dummy.next;\n  }\n  \n  function divideAndConquer(start, end) {\n    if (start === end) return lists[start];\n    if (start > end) return null;\n    \n    const mid = Math.floor((start + end) / 2);\n    const left = divideAndConquer(start, mid);\n    const right = divideAndConquer(mid + 1, end);\n    \n    return mergeTwoLists(left, right);\n  }\n  \n  return divideAndConquer(0, lists.length - 1);\n}"
  }
];

const PracticeCoding = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProblem, setActiveProblem] = useState<typeof codingProblems[0] | null>(null);
  const [activeTab, setActiveTab] = useState("problems");

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? null : difficulty);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProblems = codingProblems.filter(problem => {
    if (selectedDifficulty && problem.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }
    
    if (selectedCategory) {
      const problemCategories = problem.categories.map(cat => cat.toLowerCase());
      const normalizedSelectedCategory = selectedCategory.toLowerCase();
      
      if (!problemCategories.some(cat => {
        return cat === normalizedSelectedCategory || 
               (normalizedSelectedCategory === 'arrays' && cat.includes('array')) ||
               (normalizedSelectedCategory === 'linked-lists' && cat.includes('linked list')) ||
               (normalizedSelectedCategory === 'trees' && (cat.includes('tree') || cat.includes('graph'))) ||
               (normalizedSelectedCategory === 'dp' && cat.includes('dynamic')) ||
               (normalizedSelectedCategory === 'sorting' && (cat.includes('sort') || cat.includes('search')));
      })) {
        return false;
      }
    }
    
    return true;
  });

  const handleOpenProblem = (problem: typeof codingProblems[0]) => {
    setActiveProblem(problem);
  };

  const handleCloseProblem = () => {
    setActiveProblem(null);
  };

  const resetFilters = () => {
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Practice Coding</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Sharpen your coding skills with practice problems and challenges
            </p>
          </AnimatedSection>

          <Tabs defaultValue="problems" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="problems">Coding Problems</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="problems">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <AnimatedSection animation="slide-up" className="lg:col-span-1">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <Filter className="h-5 w-5 mr-2" />
                          Filters
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                          <div className="space-y-2">
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedDifficulty === 'easy' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleDifficultySelect('easy')}
                            >
                              <span>Easy</span>
                              {selectedDifficulty === 'easy' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedDifficulty === 'medium' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleDifficultySelect('medium')}
                            >
                              <span>Medium</span>
                              {selectedDifficulty === 'medium' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedDifficulty === 'hard' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleDifficultySelect('hard')}
                            >
                              <span>Hard</span>
                              {selectedDifficulty === 'hard' && <Check className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Categories</h3>
                          <div className="space-y-2">
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedCategory === 'arrays' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleCategorySelect('arrays')}
                            >
                              <span>Arrays & Strings</span>
                              {selectedCategory === 'arrays' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedCategory === 'linked-lists' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleCategorySelect('linked-lists')}
                            >
                              <span>Linked Lists</span>
                              {selectedCategory === 'linked-lists' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedCategory === 'trees' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleCategorySelect('trees')}
                            >
                              <span>Trees & Graphs</span>
                              {selectedCategory === 'trees' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedCategory === 'dp' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleCategorySelect('dp')}
                            >
                              <span>Dynamic Programming</span>
                              {selectedCategory === 'dp' && <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                                selectedCategory === 'sorting' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleCategorySelect('sorting')}
                            >
                              <span>Sorting & Searching</span>
                              {selectedCategory === 'sorting' && <Check className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full text-xs" onClick={resetFilters}>
                          Reset Filters <X className="ml-2 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-500" />
                          Your Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Problems Solved</span>
                          <span className="font-medium">12/150</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '8%' }}></div>
                        </div>
                        
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Easy</span>
                          <span className="text-xs font-medium">7/50</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '14%' }}></div>
                        </div>
                        
                        <div className="pt-1 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Medium</span>
                          <span className="text-xs font-medium">4/70</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '6%' }}></div>
                        </div>
                        
                        <div className="pt-1 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Hard</span>
                          <span className="text-xs font-medium">1/30</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: '3%' }}></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm" className="w-full text-xs">
                          View Solved Problems
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animation="slide-up" delay={100} className="lg:col-span-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Coding Problems</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <SortDesc className="h-3 w-3 mr-1" />
                            Sort By
                          </Button>
                          <Button size="sm" className="text-xs" onClick={() => {
                            const randomIndex = Math.floor(Math.random() * codingProblems.length);
                            handleOpenProblem(codingProblems[randomIndex]);
                          }}>
                            Random Problem
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Choose a problem to solve and practice your coding skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredProblems.length > 0 ? (
                          filteredProblems.map((problem) => (
                            <ProblemCard 
                              key={problem.id}
                              title={problem.title} 
                              difficulty={problem.difficulty} 
                              categories={problem.categories} 
                              description={problem.description}
                              solvedRate={problem.solvedRate}
                              onSolve={() => handleOpenProblem(problem)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No problems match your filters.</p>
                            <Button variant="link" onClick={resetFilters} className="mt-2">
                              Reset Filters
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex justify-center">
                        <div className="flex items-center space-x-1">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">...</Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">15</Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <AnimatedSection animation="slide-up" delay={200} className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Coding Interview Patterns</CardTitle>
                        <CardDescription>
                          Learn essential patterns that are commonly used to solve coding problems
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">Sliding Window</span>
                            <span className="text-xs text-muted-foreground">8 problems</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">Two Pointers</span>
                            <span className="text-xs text-muted-foreground">12 problems</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">Fast & Slow Pointers</span>
                            <span className="text-xs text-muted-foreground">6 problems</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">Merge Intervals</span>
                            <span className="text-xs text-muted-foreground">7 problems</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">Cyclic Sort</span>
                            <span className="text-xs text-muted-foreground">5 problems</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">BFS/DFS</span>
                            <span className="text-xs text-muted-foreground">14 problems</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </AnimatedSection>
              </div>
            </TabsContent>
            
            <TabsContent value="leaderboard">
              <AnimatedSection animation="fade-in">
                <CodingLeaderboard />
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {activeProblem && (
        <CodingChallenge 
          title={activeProblem.title}
          description={activeProblem.description}
          difficulty={activeProblem.difficulty as "Easy" | "Medium" | "Hard"}
          category={activeProblem.categories[0]}
          examples={activeProblem.examples}
          starterCode={activeProblem.starterCode}
          solution={activeProblem.solution}
          onClose={handleCloseProblem}
        />
      )}
    </div>
  );
};

interface ProblemCardProps {
  title: string;
  difficulty: string;
  categories: string[];
  description: string;
  solvedRate: string;
  onSolve: () => void;
}

const ProblemCard = ({ title, difficulty, categories, description, solvedRate, onSolve }: ProblemCardProps) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="border rounded-md p-4 hover:border-primary/50 hover:shadow-sm transition-all">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium hover:text-primary transition-colors">{title}</h3>
          <div className="flex items-center mt-1 flex-wrap gap-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty as "Easy" | "Medium" | "Hard"]}`}>
              {difficulty}
            </span>
            {categories.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8" onClick={onSolve}>
            <Code className="h-4 w-4 mr-1" />
            Solve
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          Solution Rate: {solvedRate}
        </div>
        <div className="flex items-center text-xs">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeCoding;
