
import { PlagiarismResultType } from '@/components/plagiarism/PlagiarismChecker';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => { finalY: number };
  }
}

interface GenerateReportProps {
  title: string;
  content: string;
  result: PlagiarismResultType;
}

export const generatePDFReport = async ({
  title,
  content,
  result
}: GenerateReportProps): Promise<Blob> => {
  if (!result) throw new Error("No result data available");
  
  const doc = new jsPDF();
  const textColor = result.isPlagiarized ? '#d32f2f' : '#2e7d32';
  const similarity = Math.round(result.similarity * 100);
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Plagiarism Check Report', 105, 20, { align: 'center' });
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 27, { align: 'center' });
  
  // Add divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 30, 190, 30);
  
  // Document title
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Document Title:', 20, 40);
  doc.setFontSize(12);
  doc.text(title || 'Untitled Document', 20, 47);
  
  // Plagiarism result
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Plagiarism Check Result:', 20, 60);
  
  doc.setFontSize(16);
  doc.setTextColor(textColor);
  doc.text(
    result.isPlagiarized ? '⚠️ Plagiarism Detected' : '✓ Original Content',
    20, 67
  );
  
  // Similarity score
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Similarity Score:', 20, 80);
  
  // Add similarity gauge
  doc.setFillColor(230, 230, 230);
  doc.rect(20, 85, 100, 10, 'F');
  
  let fillColor;
  if (similarity > 80) fillColor = [217, 48, 48]; // Red
  else if (similarity > 60) fillColor = [245, 158, 11]; // Amber
  else if (similarity > 40) fillColor = [245, 185, 11]; // Lighter amber
  else fillColor = [46, 125, 50]; // Green
  
  doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
  doc.rect(20, 85, similarity, 10, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`${similarity}%`, 125, 93);
  
  // Add message
  doc.setFontSize(12);
  doc.text('Analysis:', 20, 105);
  doc.setTextColor(80, 80, 80);
  doc.text(result.message.replace('⚠️ ', '').replace('✅ ', ''), 20, 112);
  
  // Add matched sources if available
  let finalY = 125;
  if (result.matchedSources && result.matchedSources.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Matched Sources:', 20, finalY);
    
    const tableColumn = ['Source', 'Similarity'];
    const tableRows = result.matchedSources.map(source => [
      source.url,
      `${Math.round(source.similarity * 100)}%`
    ]);
    
    try {
      const tableResult = doc.autoTable({
        startY: finalY + 5,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [66, 133, 244], textColor: 255 },
        columnStyles: { 
          0: { cellWidth: 130 },
          1: { cellWidth: 30, halign: 'center' }
        }
      });

      finalY = tableResult.finalY + 10;
    } catch (error) {
      console.error('Error generating table:', error);
      // In case autoTable fails, move down and continue
      finalY += 20;
    }
  }
  
  // Add content excerpt
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Content Excerpt:', 20, finalY);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  // Wrap text to fit in page
  const contentExcerpt = content.length > 500 ? content.substring(0, 500) + '...' : content;
  const splitText = doc.splitTextToSize(contentExcerpt, 170);
  doc.text(splitText, 20, finalY + 10);
  
  // Highlight plagiarized sections if applicable
  if (result.isPlagiarized) {
    doc.setFontSize(12);
    doc.setTextColor(217, 48, 48);
    doc.text('Warning: This document contains plagiarized content!', 105, 275, { align: 'center' });
  }
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('TextGuardian - Plagiarism Checker', 105, 285, { align: 'center' });
  
  return doc.output('blob');
};
