
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  };

  if (!file) {
    return <p>No PDF file provided</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto flex justify-center bg-muted/30 rounded-md p-4">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center py-12">Loading PDF...</div>}
          error={<div className="text-center py-12 text-red-500">Failed to load PDF</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-lg"
            scale={1.2}
          />
        </Document>
      </div>
      
      {numPages && (
        <div className="flex justify-between items-center mt-4 px-2">
          <Button 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <p className="text-sm">
            Page {pageNumber} of {numPages}
          </p>
          
          <Button 
            onClick={goToNextPage} 
            disabled={pageNumber >= numPages}
            variant="outline"
            size="sm"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
