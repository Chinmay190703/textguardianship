
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import PlagiarismResult from './PlagiarismResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from './FileUploader';
import { Loader2, Download, FileText } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PDFViewer from './PDFViewer';

export type PlagiarismResultType = {
  similarity: number;
  isPlagiarized: boolean;
  message: string;
  matchedSources?: { url: string; similarity: number }[];
} | null;

const PlagiarismChecker: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PlagiarismResultType>(null);
  const [activeTab, setActiveTab] = useState('text');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const textToCheck = activeTab === 'text' ? content : extractedText;
    
    if ((!title.trim() || !textToCheck.trim()) && activeTab === 'text') {
      toast.error('Please provide both title and content to check');
      return;
    }
    
    if ((!title.trim() || !textToCheck.trim()) && activeTab === 'pdf') {
      toast.error('Please upload a PDF file and provide a title');
      return;
    }
    
    setIsChecking(true);
    setResult(null);
    
    try {
      // Mock API call - in a real app, replace with actual Python backend API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API response from Python backend
      const mockSimilarity = Math.random() * 0.9 + 0.1; // Between 0.1 and 1.0
      const isPlagiarized = mockSimilarity > 0.6;

      // Mock matched sources - simulating what Python backend would return
      const mockSources = isPlagiarized ? [
        { url: 'https://example.com/source1', similarity: mockSimilarity * 0.9 },
        { url: 'https://example.org/source2', similarity: mockSimilarity * 0.7 },
        { url: 'https://test.edu/paper', similarity: mockSimilarity * 0.5 },
      ] : [];
      
      setResult({
        similarity: mockSimilarity,
        isPlagiarized,
        message: isPlagiarized 
          ? `⚠️ Plagiarism Detected! Similarity Score: ${mockSimilarity.toFixed(2)}`
          : `✅ No Plagiarism Detected. Similarity Score: ${mockSimilarity.toFixed(2)}`,
        matchedSources: mockSources
      });
      
      toast.success('Plagiarism check completed!');
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
    setPdfFile(null);
    setExtractedText('');
  };

  const handlePdfUpload = (file: File) => {
    setPdfFile(file);
    
    // In a real app, this would send the file to the Python backend for processing
    // For now, we'll simulate text extraction with a timeout
    toast.info('Processing PDF file...');
    setIsChecking(true);
    
    setTimeout(() => {
      // Simulate text extraction - in a real app this would come from Python backend
      const simulatedText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Suspendisse varius enim in eros elementum tristique. 
      This is extracted text from ${file.name}.`;
      
      setExtractedText(simulatedText);
      setIsChecking(false);
      toast.success('PDF processed successfully');
    }, 2000);
  };

  const generateReport = async () => {
    if (!result) return;
    
    toast.info('Generating PDF report...');
    
    // In a real app, this would call the Python backend to generate the report
    // For now, we'll simulate generation with a timeout
    setTimeout(() => {
      toast.success('Report generated! Downloading...');
      
      // This is just a mock - in a real app the Python backend would return a PDF blob
      const link = document.createElement('a');
      link.href = '#';
      link.download = `plagiarism-report-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="shadow-md border-primary/10 overflow-hidden backdrop-blur-sm">
        <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardTitle className="text-2xl font-medium">Plagiarism Checker</CardTitle>
          <CardDescription>
            Check your text for plagiarism using AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text">Text Input</TabsTrigger>
              <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text">
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
            </TabsContent>
            
            <TabsContent value="pdf">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="pdf-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Textarea
                    id="pdf-title"
                    placeholder="Enter title for your PDF"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={cn(
                      "resize-none h-14 transition-all duration-300 border focus:border-primary",
                      result && "opacity-50"
                    )}
                    disabled={isChecking || !!result}
                  />
                </div>
                
                <FileUploader 
                  onFileSelected={handlePdfUpload}
                  accept=".pdf"
                  isDisabled={isChecking || !!result}
                  file={pdfFile}
                />
                
                {pdfFile && (
                  <div className="flex items-center justify-between bg-muted/50 rounded-md p-3 mt-2">
                    <div className="flex items-center">
                      <FileText className="text-primary mr-2" />
                      <span className="text-sm font-medium truncate max-w-[200px]">{pdfFile.name}</span>
                    </div>
                    <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Preview</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>PDF Preview: {pdfFile.name}</DialogTitle>
                          <DialogDescription>
                            Preview of the uploaded PDF document
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-hidden h-full">
                          <PDFViewer file={pdfFile} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                
                {extractedText && (
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium">
                      Extracted Text
                    </label>
                    <div className="bg-muted/30 p-4 rounded-md text-sm max-h-[200px] overflow-y-auto">
                      {extractedText}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {result && <PlagiarismResult result={result} className="mt-6" />}
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          {result ? (
            <div className="w-full flex justify-between items-center">
              <Button 
                onClick={generateReport} 
                className="transition-all-200 bg-primary hover:bg-primary/90"
                disabled={!result}
              >
                <Download className="mr-2 h-4 w-4" /> Generate Report
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="transition-all-200"
              >
                Check Another Text
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isChecking || (!title && !content && !pdfFile)}
                className="transition-all-200"
              >
                Reset
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isChecking || (activeTab === 'text' && (!title || !content)) || (activeTab === 'pdf' && (!title || !pdfFile))}
                className={cn(
                  "transition-all-200 bg-primary hover:bg-primary/90",
                  isChecking && "animate-pulse-soft"
                )}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Analyzing...
                  </>
                ) : (
                  "Check Plagiarism"
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;
