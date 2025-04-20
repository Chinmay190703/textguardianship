
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  accept: string;
  isDisabled?: boolean;
  file: File | null;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelected, 
  accept, 
  isDisabled = false,
  file
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled: isDisabled,
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  // Check if there are file rejections
  const hasErrors = fileRejections.length > 0;
  const errorMessage = hasErrors 
    ? fileRejections[0]?.errors[0]?.message || "Invalid file" 
    : "";

  return (
    <div className="space-y-2">
      <Card
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-md transition-all duration-300 cursor-pointer p-6 text-center hover:border-primary/50",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          isDisabled && "opacity-50 cursor-not-allowed hover:border-muted-foreground/25",
          hasErrors && "border-destructive bg-destructive/5",
          file && "border-success/50",
          "overflow-visible relative"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={cn(
            "rounded-full p-4 transition-all duration-300",
            isDragActive ? "bg-primary/20 scale-110" : "bg-primary/10",
            file && "bg-success/10",
            hasErrors && "bg-destructive/10"
          )}>
            {hasErrors ? (
              <AlertCircle className="h-8 w-8 text-destructive" />
            ) : (
              <UploadCloud className={cn(
                "h-8 w-8 transition-all duration-300",
                isDragActive ? "text-primary scale-110" : "text-primary/80",
                file && "text-success"
              )} />
            )}
          </div>
          <div className="text-sm">
            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 text-success mb-2" />
                <p className="font-medium text-foreground">File uploaded: {file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="w-full mt-3">
                  <Progress value={100} className="h-1 bg-muted/30" />
                </div>
              </div>
            ) : hasErrors ? (
              <div className="text-destructive animate-pulse">
                <p className="font-medium">{errorMessage}</p>
                <p className="text-xs mt-1">Please try uploading a valid PDF file</p>
              </div>
            ) : isDragActive ? (
              <p className="font-medium text-primary animate-pulse">Drop the PDF file here</p>
            ) : (
              <>
                <p className="font-medium text-foreground">Drag & drop your PDF here</p>
                <p className="text-muted-foreground mt-1">or click to browse files</p>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            (PDF files only, max size 10MB)
          </p>
        </div>

        {isDragActive && !hasErrors && (
          <div className="absolute inset-0 rounded-md bg-primary/5 border-2 border-primary animate-pulse pointer-events-none" />
        )}
      </Card>
    </div>
  );
};
