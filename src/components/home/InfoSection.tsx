
import React from 'react';
import { cn } from '@/lib/utils';

interface InfoSectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className 
}) => {
  return (
    <section id={id} className={cn("py-16", className)}>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-medium mb-3">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
};

export default InfoSection;
