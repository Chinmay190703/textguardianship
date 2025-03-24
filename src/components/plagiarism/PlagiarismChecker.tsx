
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import PlagiarismResult from './PlagiarismResult';

export type PlagiarismResultType = {
  similarity: number;
  isPlagiarized: boolean;
  message: string;
} | null;

const PlagiarismChecker: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PlagiarismResultType>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both title and content to check');
      return;
    }
    
    setIsChecking(true);
    setResult(null);
    
    try {
      // Mock API call - in a real app, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API response
      const mockSimilarity = Math.random();
      const isPlagiarized = mockSimilarity > 0.8;
      
      setResult({
        similarity: mockSimilarity,
        isPlagiarized,
        message: isPlagiarized 
          ? `⚠️ Plagiarism Detected! Similarity Score: ${mockSimilarity.toFixed(2)}`
          : `✅ No Plagiarism Detected. Similarity Score: ${mockSimilarity.toFixed(2)}`
      });
      
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      toast.error('Failed to check plagiarism. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-medium">Plagiarism Checker</CardTitle>
          <CardDescription>
            Check your text for plagiarism using AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Textarea
                id="title"
                placeholder="Enter the title or header of your text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={cn(
                  "resize-none h-14 transition-all duration-300 border focus:border-primary",
                  result && "opacity-50"
                )}
                disabled={isChecking || !!result}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Enter the content you want to check for plagiarism"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cn(
                  "resize-none min-h-[200px] transition-all duration-300 border focus:border-primary",
                  result && "opacity-50"
                )}
                disabled={isChecking || !!result}
              />
            </div>
          </form>
          
          {result && <PlagiarismResult result={result} className="mt-6" />}
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t p-6">
          {result ? (
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="transition-all-200"
            >
              Check Another Text
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isChecking || (!title && !content)}
                className="transition-all-200"
              >
                Reset
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isChecking || !title || !content}
                className={cn(
                  "transition-all-200",
                  isChecking && "animate-pulse-soft"
                )}
              >
                {isChecking ? "Analyzing..." : "Check Plagiarism"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;
