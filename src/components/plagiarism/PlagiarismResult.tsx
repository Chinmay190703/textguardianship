
import React from 'react';
import { cn } from '@/lib/utils';
import { PlagiarismResultType } from './PlagiarismChecker';

interface PlagiarismResultProps {
  result: PlagiarismResultType;
  className?: string;
}

const PlagiarismResult: React.FC<PlagiarismResultProps> = ({ result, className }) => {
  if (!result) return null;
  
  const { similarity, isPlagiarized } = result;
  
  const percentage = Math.round(similarity * 100);
  
  // Determine colors based on plagiarism level
  const getColorClass = () => {
    if (similarity > 0.8) return "bg-destructive text-destructive-foreground";
    if (similarity > 0.6) return "bg-amber-500 text-white";
    if (similarity > 0.4) return "bg-amber-400 text-black";
    return "bg-success text-success-foreground";
  };
  
  return (
    <div className={cn("animate-slide-up", className)}>
      <div className="relative pt-4">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Similarity Score</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-1000", getColorClass())}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="mt-6 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              isPlagiarized ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"
            )}>
              <span className="text-lg">
                {isPlagiarized ? "⚠️" : "✓"}
              </span>
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                {isPlagiarized ? "Plagiarism Detected" : "Original Content"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isPlagiarized 
                  ? "This text shows significant similarity to existing content. Consider revising or properly citing sources."
                  : "Great job! Your text appears to be original with no significant matches to existing content."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismResult;
