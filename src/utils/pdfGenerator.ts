
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
  doc.setFillColor(255, 255, 255); // White background
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

  // Draw border
  doc.setDrawColor(220, 220, 220); // Light gray color
  doc.setLineWidth(0.5);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  // Certificate of Love heading
  doc.setFont("helvetica", "normal");
  doc.setFontSize(48);
  doc.setTextColor(200, 200, 200); // Light gray color
  doc.text("Certificate of Love", pageWidth / 2, margin + 30, { align: "center" });

  // Award title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(32);
  doc.setTextColor(200, 200, 200); // Light gray color
  doc.text(data.awardTitle || "Cutest Person Ever", pageWidth / 2, margin + 50, { align: "center" });

  // "This is to certify that" text
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(180, 180, 180); // Gray color
  doc.text("This is to certify that", pageWidth / 2, margin + 70, { align: "center" });
  
  // Recipient name
  doc.setFont("helvetica", "normal");
  doc.setFontSize(36);
  doc.setTextColor(200, 200, 200); // Light gray color
  doc.text(data.recipientName || "Recipient Name", pageWidth / 2, margin + 90, { align: "center" });

  // Certificate message
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(180, 180, 180); // Gray color
  const messageText = "Certified as the cutest, most adorable, and sweetest soul who melts hearts effortlessly.";
  const splitMessage = doc.splitTextToSize(messageText, pageWidth - margin * 4);
  doc.text(splitMessage, pageWidth / 2, margin + 110, { align: "center" });

  // Draw heart
  function drawHeart(x: number, y: number, size: number) {
    // Draw a heart using bezier curves
    doc.setDrawColor(255, 105, 180); // Pink color
    doc.setFillColor(255, 105, 180); // Pink color
    
    const halfSize = size / 2;
    
    doc.circle(x - halfSize/2, y - halfSize/4, halfSize/2, 'F');
    doc.circle(x + halfSize/2, y - halfSize/4, halfSize/2, 'F');
    
    // Triangle for bottom of heart
    doc.setFillColor(255, 105, 180); // Pink color
    doc.triangle(
      x - halfSize, y - halfSize/4,
      x + halfSize, y - halfSize/4,
      x, y + halfSize,
      'F'
    );
  }
  
  // Draw heart in the center
  drawHeart(pageWidth / 2, margin + 130, 20);

  // Date
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(180, 180, 180); // Gray color
  doc.text(`Given with love on ${formatDate(data.issueDate)}`, pageWidth / 2, pageHeight - margin - 20, { align: "center" });

  // Download the PDF
  doc.save(`${data.recipientName.replace(/\s+/g, "_")}_Love_Certificate.pdf`);
};
