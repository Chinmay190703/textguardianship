
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled: isDisabled,
    maxFiles: 1,
  });

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "border-2 border-dashed rounded-md transition-colors cursor-pointer p-6 text-center hover:border-primary/50",
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        isDisabled && "opacity-50 cursor-not-allowed hover:border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="bg-primary/10 text-primary rounded-full p-3">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div className="text-sm">
          {file ? (
            <p className="font-medium text-foreground">File uploaded: {file.name}</p>
          ) : isDragActive ? (
            <p className="font-medium text-primary">Drop the PDF file here</p>
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
    </div>
  );
};
