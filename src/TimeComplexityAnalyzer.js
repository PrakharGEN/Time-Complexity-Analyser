import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Clock, Code, Zap } from 'lucide-react';

const TimeComplexityAnalyzer = () => {
  const [code, setCode] = useState('');
  const [complexity, setComplexity] = useState('');
  const [explanation, setExplanation] = useState('');

  const analyzeComplexity = () => {
    let timeComplexity = 'O(1)';
    let explanation = 'The code appears to have constant time complexity.';

    // Check for binary search
    if (code.includes('binary search') || 
        (code.includes('while') && code.includes('mid') && 
         (code.includes('left') || code.includes('right')))) {
      timeComplexity = 'O(log n)';
      explanation = 'The code appears to implement a binary search algorithm, which has logarithmic time complexity.';
    }
    // Check for nested loops
    else if (code.match(/for.*for/) || code.match(/while.*while/)) {
      timeComplexity = 'O(n^2)';
      explanation = 'The code contains nested loops, suggesting quadratic time complexity.';
    }
    // Check for single loops
    else if (code.includes('for') || code.includes('while')) {
      timeComplexity = 'O(n)';
      explanation = 'The code contains a single loop, suggesting linear time complexity.';
    }

    // Check for sorting
    if (code.includes('sort')) {
      timeComplexity = 'O(n log n)';
      explanation = 'The code includes a sorting operation, which typically has O(n log n) time complexity.';
    }

    // Check for recursion
    if (code.includes('recursion') || (code.includes('function') && code.match(/function.*\{.*\1/s))) {
      timeComplexity = 'O(2^n)';
      explanation = 'The code appears to use recursion, which can lead to exponential time complexity in worst cases.';
    }

    setComplexity(timeComplexity);
    setExplanation(explanation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-8 w-8 text-indigo-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Time Complexity Analyzer</h1>
          </div>
          <div className="mb-6">
            <Textarea
              className="w-full h-64 p-4 border-2 border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
            />
          </div>
          <div className="flex justify-center">
            <Button
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={analyzeComplexity}
            >
              <Zap className="h-5 w-5 mr-2" />
              Analyze Time Complexity
            </Button>
          </div>
          {complexity && (
            <div className="mt-8">
              <Alert className="bg-indigo-100 border-l-4 border-indigo-500 p-4">
                <AlertTitle className="text-lg font-semibold text-indigo-800 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Estimated Time Complexity: {complexity}
                </AlertTitle>
                <AlertDescription className="mt-2 text-indigo-700">
                  {explanation}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeComplexityAnalyzer;