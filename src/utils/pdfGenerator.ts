
import { jsPDF } from "jspdf";
import { formatDate } from "./dateUtils";

interface CertificateData {
  recipientName: string;
  awardTitle: string;
  issuerName: string;
  issueDate: string;
  signature: string;
  message: string;
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

  // Certificate of Love subheading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(219, 39, 119); // Pink color
  doc.text("Certificate of Love", pageWidth / 2, margin + 15, { align: "center" });

  // Award title
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
  
  // Message text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(219, 39, 119); // Pink
  
  // Split message into multiple lines to fit within page width
  const maxWidth = pageWidth - (margin * 2 + 40);
  const messageText = data.message || `This certificate is lovingly presented to ${data.recipientName} for being an endless source of joy and inspiration. Your presence brightens every moment, and you are truly cherished.`;
  
  const splitMessage = doc.splitTextToSize(messageText, maxWidth);
  const messageY = margin + 70;
  doc.text(splitMessage, pageWidth / 2, messageY, { align: "center" });

  // Calculate where the signature should be based on message length
  const messageHeight = splitMessage.length * 7; // Approximate height based on number of lines
  const signatureY = messageY + messageHeight + 40;
  
  // Signature lines
  const dateY = signatureY + 5;
  
  // Signature
  doc.setLineWidth(0.2);
  doc.setDrawColor(219, 39, 119);
  doc.line(pageWidth / 2 - 50, signatureY, pageWidth / 2 - 10, signatureY);
  doc.text(data.signature || "With boundless admiration,", pageWidth / 2 - 30, signatureY - 10, { align: "center" });
  
  // Issuer name
  doc.line(pageWidth / 2 - 50, signatureY + 15, pageWidth / 2 - 10, signatureY + 15);
  doc.text(data.issuerName || "Your Name", pageWidth / 2 - 30, signatureY + 5, { align: "center" });
  doc.setFontSize(8);
  doc.text("With Love From", pageWidth / 2 - 30, signatureY + 25, { align: "center" });

  // Date
  doc.setLineWidth(0.2);
  doc.line(pageWidth / 2 + 10, signatureY, pageWidth / 2 + 50, signatureY);
  doc.setFontSize(12);
  doc.text(formatDate(data.issueDate), pageWidth / 2 + 30, signatureY - 5, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Date", pageWidth / 2 + 30, signatureY + 5, { align: "center" });

  // Bottom decorative line
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 40, pageHeight - margin - 20, pageWidth / 2 - 10, pageHeight - margin - 20);
  doc.line(pageWidth / 2 + 10, pageHeight - margin - 20, pageWidth / 2 + 40, pageHeight - margin - 20);
  drawHeart(pageWidth / 2, pageHeight - margin - 20, 10);

  // Download the PDF
  doc.save(`${data.recipientName.replace(/\s+/g, "_")}_Love_Certificate.pdf`);
};
