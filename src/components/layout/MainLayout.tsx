import React from 'react';
import { cn } from '@/lib/utils';
import { Search, FileText, Download } from 'lucide-react';
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
            <span className="font-medium text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-md">
              TextGuardian
            </span>
            <span className="hidden md:inline-block text-xs bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-full">
              Python Powered
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              About
            </a>
            <a 
              href="#features" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground flex items-center gap-1"
            >
              <Search className="h-4 w-4" />
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm text-muted-foreground transition-all-200 hover:text-foreground flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              How It Works
            </a>
            <ThemeToggle />
          </nav>
          {/* Add toggle to mobile too */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className={cn("flex-1 container my-8", className)}>
        {children}
      </main>
      
      <footer className="border-t border-border/40 py-6 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TextGuardian. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Powered by Python & AI
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
