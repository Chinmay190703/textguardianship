
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PlagiarismChecker from '@/components/plagiarism/PlagiarismChecker';
import InfoSection from '@/components/home/InfoSection';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Search, Download } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Search className="h-5 w-5 text-primary" />,
      title: "Python-Powered Detection",
      description: "Our system uses advanced Python algorithms and NLP to analyze text patterns and identify potential plagiarism with high accuracy."
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "PDF Support",
      description: "Upload PDF documents directly to check for plagiarism. Our Python backend extracts and analyzes text from PDFs efficiently."
    },
    {
      icon: <Download className="h-5 w-5 text-primary" />,
      title: "Detailed Reports",
      description: "Generate comprehensive PDF reports showing similarity scores, matched sources, and highlighted text segments."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Text or PDF",
      description: "Enter text directly or upload a PDF document to be checked for plagiarism."
    },
    {
      number: "02",
      title: "Python Analysis",
      description: "Our Python backend processes your content using advanced NLP techniques and compares it against a vast database."
    },
    {
      number: "03",
      title: "Review Detailed Results",
      description: "Receive a comprehensive report showing similarity scores, matched sources, and downloadable PDF reports."
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full px-3 py-1 mb-4 animate-fade-in">
            PYTHON & AI-POWERED PLAGIARISM DETECTION
          </span>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 animate-slide-up">
            Ensure Your Content is 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"> Original</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 animate-slide-up">
            TextGuardian helps you verify the originality of your writing with Python-powered
            plagiarism detection technology and comprehensive PDF support.
          </p>
        </div>

        <PlagiarismChecker />

        <InfoSection
          id="features"
          title="Key Features"
          subtitle="Python-powered plagiarism detection with advanced capabilities"
          className="border-t"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-all-300 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/20" />
                <CardContent className="p-6 pt-5">
                  <div className="bg-primary/10 p-2 rounded-md inline-block mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </InfoSection>

        <InfoSection
          id="how-it-works"
          title="How It Works"
          subtitle="Our Python-powered process to check your content"
          className="border-t"
        >
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-6 p-4 rounded-lg hover:bg-accent transition-all-200 border border-transparent hover:border-primary/10"
              >
                <div className="text-3xl font-light bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-full">
                  {step.number.split('').pop()}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection
          id="about"
          title="About TextGuardian"
          subtitle="Why we built this Python-powered plagiarism detection tool"
          className="border-t"
        >
          <Card className="border shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/20" />
            <CardContent className="p-6 pt-5">
              <p className="text-muted-foreground mb-4">
                TextGuardian was developed to provide writers, students, and content creators with 
                a reliable tool to ensure the originality of their work. Our Python-powered backend 
                leverages advanced natural language processing techniques to deliver highly accurate 
                plagiarism detection.
              </p>
              <p className="text-muted-foreground">
                Our system uses Python libraries like NLTK, scikit-learn, and TensorFlow to analyze 
                text using sophisticated algorithms including TF-IDF vectorization, cosine similarity 
                measurements, and semantic analysis. The integration of PDF support makes it easy to 
                check documents in their original format, while our detailed reports help you 
                understand exactly where potential issues exist.
              </p>
            </CardContent>
          </Card>
        </InfoSection>
      </div>
    </MainLayout>
  );
};

export default Index;
