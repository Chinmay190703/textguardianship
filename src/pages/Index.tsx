
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PlagiarismChecker from '@/components/plagiarism/PlagiarismChecker';
import InfoSection from '@/components/home/InfoSection';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      title: "Advanced AI Detection",
      description: "Our system uses state-of-the-art AI to analyze text patterns and identify potential plagiarism."
    },
    {
      title: "Fast & Accurate Results",
      description: "Get quick analysis with high precision similarity scores to make informed decisions about your content."
    },
    {
      title: "Easy to Use",
      description: "Simple interface that makes checking for plagiarism straightforward and accessible for everyone."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Input Your Text",
      description: "Enter the title and content you want to check for plagiarism."
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our system processes your text using advanced natural language processing and compares it against a vast database."
    },
    {
      number: "03",
      title: "Review Results",
      description: "Receive a detailed similarity report with a clear indication of whether your content is original or potentially plagiarized."
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-4 animate-fade-in">
            AI-POWERED PLAGIARISM DETECTION
          </span>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 animate-slide-up">
            Ensure Your Content is 
            <span className="text-primary"> Original</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 animate-slide-up">
            TextGuardian helps you verify the originality of your writing with advanced 
            AI-powered plagiarism detection technology.
          </p>
        </div>

        <PlagiarismChecker />

        <InfoSection
          id="features"
          title="Key Features"
          subtitle="Discover what makes our plagiarism checker stand out"
          className="border-t"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-all-300">
                <CardContent className="p-6">
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
          subtitle="Our simplified process to check your content"
          className="border-t"
        >
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-6 p-4 rounded-lg hover:bg-accent transition-all-200"
              >
                <div className="text-3xl font-light text-primary">{step.number}</div>
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
          subtitle="Why we built this plagiarism detection tool"
          className="border-t"
        >
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                TextGuardian was developed to provide writers, students, and content creators with 
                a reliable tool to ensure the originality of their work. In an age where content 
                is constantly being created and shared, maintaining originality and proper 
                attribution is more important than ever.
              </p>
              <p className="text-muted-foreground">
                Our plagiarism detection system uses advanced natural language processing and 
                machine learning algorithms to compare your text against a vast database of 
                existing content, helping you maintain academic and creative integrity.
              </p>
            </CardContent>
          </Card>
        </InfoSection>
      </div>
    </MainLayout>
  );
};

export default Index;
