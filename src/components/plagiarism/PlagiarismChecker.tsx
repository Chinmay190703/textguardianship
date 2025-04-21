import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import PlagiarismResult from './PlagiarismResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from './FileUploader';
import { Loader2, Download, FileText, BookOpen, ShieldCheck } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PDFViewer from './PDFViewer';
import { generatePDFReport } from '@/utils/reportGenerator';

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
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

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
          ? `⚠️ Plagiarism Detected! Similarity Score: ${(mockSimilarity * 100).toFixed(2)}%`
          : `✅ No Plagiarism Detected. Similarity Score: ${(mockSimilarity * 100).toFixed(2)}%`,
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
    if (!result) {
      toast.error('No plagiarism check results available');
      return;
    }
    
    try {
      setIsGeneratingReport(true);
      toast.info('Generating PDF report...');
      
      const textToInclude = activeTab === 'text' ? content : extractedText;
      const documentTitle = title || 'Untitled Document';
      
      console.log('Generating report with:', { 
        title: documentTitle, 
        content: textToInclude, 
        result 
      });
      
      const pdfBlob = await generatePDFReport({
        title: documentTitle,
        content: textToInclude,
        result
      });
      
      // Create download link for the generated PDF
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `plagiarism-report-${documentTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-primary/10 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-black/30">
        <CardHeader className="space-y-1 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-medium">Plagiarism Checker</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Check your text for plagiarism using AI-powered analysis
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 shadow-md">
              <TabsTrigger value="text" className="data-[state=active]:bg-primary/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Text Input</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="pdf" className="data-[state=active]:bg-primary/10">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Upload PDF</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="focus-visible:outline-none focus-visible:ring-0">
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
                      "resize-none h-14 transition-all duration-300 border focus:border-primary bg-white/80 dark:bg-black/20",
                      result && "opacity-75"
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
                      "resize-none min-h-[200px] transition-all duration-300 border focus:border-primary bg-white/80 dark:bg-black/20",
                      result && "opacity-75"
                    )}
                    disabled={isChecking || !!result}
                  />
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="pdf" className="focus-visible:outline-none focus-visible:ring-0">
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
                      "resize-none h-14 transition-all duration-300 border focus:border-primary bg-white/80 dark:bg-black/20",
                      result && "opacity-75"
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
                    <div className="bg-muted/30 p-4 rounded-md text-sm max-h-[200px] overflow-y-auto border">
                      {extractedText}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {result && <PlagiarismResult result={result} className="mt-6" />}
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          {result ? (
            <div className="w-full flex justify-between items-center">
              <Button 
                onClick={generateReport} 
                className="transition-all duration-300 bg-primary hover:bg-primary/90"
                disabled={!result || isGeneratingReport}
              >
                {isGeneratingReport ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Generate Report
                  </>
                )}
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="transition-all duration-300"
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
                className="transition-all duration-300"
              >
                Reset
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isChecking || (activeTab === 'text' && (!title || !content)) || (activeTab === 'pdf' && (!title || !pdfFile))}
                className={cn(
                  "transition-all duration-300 bg-primary hover:bg-primary/90",
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
