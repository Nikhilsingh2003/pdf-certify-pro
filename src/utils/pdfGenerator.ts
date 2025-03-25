
import { jsPDF } from "jspdf";
import { formatDate } from "./dateUtils";

interface CertificateData {
  recipientName: string;
  awardTitle: string;
  issuerName: string;
  issueDate: string;
  signature: string;
}

export const generatePDF = (data: CertificateData) => {
  // Create PDF document (A4 size)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Set background color
  doc.setFillColor(253, 242, 248); // Soft pink background
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

  // Set document properties for better metadata
  doc.setProperties({
    title: `${data.awardTitle} - ${data.recipientName}`,
    subject: "Love Certificate",
    author: data.issuerName,
    creator: "Love Certificate Generator",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Draw border decorations
  doc.setDrawColor(236, 72, 153); // Pink color
  doc.setLineWidth(0.5);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  
  doc.setDrawColor(212, 175, 55); // Gold color
  doc.setLineWidth(0.3);
  doc.rect(margin + 5, margin + 5, pageWidth - (margin + 5) * 2, pageHeight - (margin + 5) * 2);

  // Draw hearts in corners
  function drawHeart(x: number, y: number, size: number) {
    // Draw a heart using bezier curves
    doc.setDrawColor(236, 72, 153);
    doc.setFillColor(252, 231, 243);
    const halfSize = size / 2;
    
    doc.circle(x - halfSize/2, y - halfSize/4, halfSize/2, 'F');
    doc.circle(x + halfSize/2, y - halfSize/4, halfSize/2, 'F');
    
    // Triangle for bottom of heart
    doc.setDrawColor(236, 72, 153);
    doc.setFillColor(252, 231, 243);
    doc.triangle(
      x - halfSize, y - halfSize/4,
      x + halfSize, y - halfSize/4,
      x, y + halfSize,
      'F'
    );
  }
  
  // Draw hearts in the corners
  drawHeart(margin + 10, margin + 10, 12);
  drawHeart(pageWidth - margin - 10, margin + 10, 12);
  drawHeart(margin + 10, pageHeight - margin - 10, 12);
  drawHeart(pageWidth - margin - 10, pageHeight - margin - 10, 12);

  // Issuer name (small text at top)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(219, 39, 119); // Pink color
  doc.text(data.issuerName || "Your Name", pageWidth / 2, margin + 15, { align: "center" });

  // Certificate title
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.setTextColor(157, 23, 77); // Darker pink
  doc.text(data.awardTitle || "Certificate of Love", pageWidth / 2, margin + 40, { align: "center" });

  // Decorative line with heart
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 40, margin + 50, pageWidth / 2 - 10, margin + 50);
  doc.line(pageWidth / 2 + 10, margin + 50, pageWidth / 2 + 40, margin + 50);
  drawHeart(pageWidth / 2, margin + 50, 10);
  
  // Presented to text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(219, 39, 119); // Pink
  doc.text("This certificate is lovingly presented to", pageWidth / 2, margin + 70, { align: "center" });

  // Recipient name
  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.setTextColor(157, 23, 77); // Darker pink
  doc.text(data.recipientName || "Your Loved One", pageWidth / 2, margin + 90, { align: "center" });

  // Description text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(219, 39, 119); // Pink
  doc.text("With all my love, appreciation, and admiration for being amazing in every way", 
    pageWidth / 2, margin + 105, { align: "center" });

  // Signature line
  const signatureY = pageHeight - margin - 30;
  const dateY = signatureY + 5;
  
  // Signature
  doc.setLineWidth(0.2);
  doc.setDrawColor(219, 39, 119);
  doc.line(pageWidth / 2 - 50, signatureY, pageWidth / 2 - 10, signatureY);
  doc.text(data.signature || "Your Signature", pageWidth / 2 - 30, signatureY - 5, { align: "center" });
  doc.setFontSize(8);
  doc.text("With Love From", pageWidth / 2 - 30, signatureY + 5, { align: "center" });

  // Date
  doc.setLineWidth(0.2);
  doc.line(pageWidth / 2 + 10, signatureY, pageWidth / 2 + 50, signatureY);
  doc.setFontSize(12);
  doc.text(formatDate(data.issueDate), pageWidth / 2 + 30, signatureY - 5, { align: "center" });
  doc.setFontSize(8);
  doc.text("Date", pageWidth / 2 + 30, signatureY + 5, { align: "center" });

  // Download the PDF
  doc.save(`${data.recipientName.replace(/\s+/g, "_")}_Love_Certificate.pdf`);
};
