
import React from 'react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg bg-primary/10 text-primary px-3 py-1 rounded-md">
              TextGuardian
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground"
            >
              About
            </a>
            <a 
              href="#features" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground"
            >
              How It Works
            </a>
          </nav>
        </div>
      </header>
      
      <main className={cn("flex-1 container my-8", className)}>
        {children}
      </main>
      
      <footer className="border-t border-border/40 py-6 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TextGuardian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
