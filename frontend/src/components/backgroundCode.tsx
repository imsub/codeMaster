"use client"
import { Code, Terminal, FileCode, Braces } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
//import { clearTimeout } from "timers";
// export interface CodeBackgroundProps {
//   // existing props
//   routeName?: string;
// }
const codeSnippets: string[] = [
  `// Binary Search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  
  `// Fibonacci Sequence
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
  
  `// Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,  
  `// Two Sum
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
`// Reverse Link List
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
`// Palindrome
function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`
];
const CodeBackground: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const cursorRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(false);

  // Typewriter effect
  useEffect(() => {
    isMountedRef.current = true;
    let charIndex = 0;
    const snippet = codeSnippets[activeSnippet];
    
    const type = () => {
      if (!isMountedRef.current) return;
      
      if (charIndex <= snippet.length) {
        setDisplayedCode(snippet.substring(0, charIndex));
        charIndex++;
        timeoutRef.current = setTimeout(type, Math.random() * 30 + 10);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
          }
        }, 3000);
      }
    };

    type();

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeSnippet]);

  // Cursor effect
  useEffect(() => {
    isMountedRef.current = true;
    intervalRef.current = setInterval(() => {
      if (isMountedRef.current) {
        setCursorVisible((prev) => !prev);
      }
    }, 500);

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center text-white p-12 relative overflow-hidden">
      {/* Animated code symbols in background */}
      <div className="absolute inset-0 opacity-100">
        <div className="absolute top-[10%] left-[15%] animate-pulse">
          <Braces size={40} />
        </div>
        <div className="absolute top-[30%] left-[80%] animate-pulse delay-300">
          <FileCode size={50} />
        </div>
        <div className="absolute top-[70%] left-[20%] animate-pulse delay-700">
          <Terminal size={45} />
        </div>
        <div className="absolute top-[60%] left-[75%] animate-pulse delay-500">
          <Code size={55} />
        </div>
        <div className="absolute top-[85%] left-[45%] animate-pulse delay-200">
          <Braces size={35} />
        </div>
        <div className="absolute top-[15%] left-[60%] animate-pulse delay-100">
          <Terminal size={30} />
        </div>
      </div>

      <div className="absolute inset-0 opacity-5" />
      
      <div className="w-full max-w-2xl bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl overflow-hidden z-10">
        <div className="px-6 py-3 bg-[#1e293b] border-b border-gray-800 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-sm text-gray-400">algorithm.js</div>
        </div>
        
        <div className="p-6 font-mono text-sm bg-[#0f172a]">
          {displayedCode.split('\n').map((line, i) => (
            <div key={i} className="flex mb-1">
              <span className="text-gray-600 mr-4 w-8 text-right">{i + 1}</span>
              <span className="text-gray-300">
                {line}
                {i === displayedCode.split('\n').length - 1 && (
                  <span 
                    ref={cursorRef}
                    className={`inline-block w-2 h-5 ml-1 bg-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CodeBackground };
