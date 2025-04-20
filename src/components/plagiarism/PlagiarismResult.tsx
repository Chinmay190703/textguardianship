
import React from 'react';
import { cn } from '@/lib/utils';
import { PlagiarismResultType } from './PlagiarismChecker';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface PlagiarismResultProps {
  result: PlagiarismResultType;
  className?: string;
}

const PlagiarismResult: React.FC<PlagiarismResultProps> = ({ result, className }) => {
  if (!result) return null;
  
  const { similarity, isPlagiarized, matchedSources } = result;
  
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
        <Progress 
          value={percentage} 
          className={cn("h-2.5", getColorClass())}
        />
        
        <div className="mt-6 rounded-lg border p-4 bg-card shadow-sm">
          <div className="flex items-start gap-3">
            <div className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              isPlagiarized ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"
            )}>
              <span className="text-xl">
                {isPlagiarized ? "⚠️" : "✓"}
              </span>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-lg">
                {isPlagiarized ? "Plagiarism Detected" : "Original Content"}
              </p>
              <p className="text-muted-foreground">
                {isPlagiarized 
                  ? "This text shows significant similarity to existing content. Consider revising or properly citing sources."
                  : "Great job! Your text appears to be original with no significant matches to existing content."
                }
              </p>
            </div>
          </div>
        </div>
        
        {matchedSources && matchedSources.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Matched Sources</h3>
            <div className="grid gap-3">
              {matchedSources.map((source, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline flex items-center"
                          >
                            {source.url.replace(/(^\w+:|^)\/\//, '').split('/')[0]}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          source.similarity > 0.7 ? "bg-destructive/15 text-destructive" : "bg-amber-500/15 text-amber-700"
                        )}>
                          {Math.round(source.similarity * 100)}% Match
                        </span>
                      </div>
                    </div>
                    <div 
                      className="h-1" 
                      style={{ 
                        background: `linear-gradient(to right, 
                          ${source.similarity > 0.7 ? 'rgb(239 68 68)' : 'rgb(245 158 11)'}, 
                          transparent)`,
                        width: `${source.similarity * 100}%`
                      }} 
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlagiarismResult;
