
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
  doc.setFillColor(248, 248, 245); // Ivory background
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

  // Set document properties for better metadata
  doc.setProperties({
    title: `${data.awardTitle} - ${data.recipientName}`,
    subject: "Certificate",
    author: data.issuerName,
    creator: "Certificate Generator",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Draw border decorations
  doc.setDrawColor(212, 175, 55); // Gold color
  doc.setLineWidth(0.5);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  
  doc.setDrawColor(184, 134, 11); // Darker gold
  doc.setLineWidth(0.3);
  doc.rect(margin + 5, margin + 5, pageWidth - (margin + 5) * 2, pageHeight - (margin + 5) * 2);

  // Issuer name (small text at top)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55); // Gold color
  doc.text(data.issuerName || "Organization Name", pageWidth / 2, margin + 15, { align: "center" });

  // Certificate title
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.setTextColor(26, 54, 93); // Navy color
  doc.text(data.awardTitle || "Certificate of Achievement", pageWidth / 2, margin + 40, { align: "center" });

  // Presented to text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 70, 100); // Lighter navy
  doc.text("This certificate is proudly presented to", pageWidth / 2, margin + 60, { align: "center" });

  // Recipient name
  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.setTextColor(26, 54, 93); // Navy color
  doc.text(data.recipientName || "Recipient Name", pageWidth / 2, margin + 80, { align: "center" });

  // Description text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 70, 100); // Lighter navy
  doc.text("In recognition of exceptional achievement and outstanding accomplishment", 
    pageWidth / 2, margin + 95, { align: "center" });

  // Signature line
  const signatureY = pageHeight - margin - 30;
  const dateY = signatureY + 5;
  
  // Signature
  doc.setLineWidth(0.2);
  doc.setDrawColor(90, 90, 90);
  doc.line(pageWidth / 2 - 50, signatureY, pageWidth / 2 - 10, signatureY);
  doc.text(data.signature || "Signature", pageWidth / 2 - 30, signatureY - 5, { align: "center" });
  doc.setFontSize(8);
  doc.text("Authorized Signature", pageWidth / 2 - 30, signatureY + 5, { align: "center" });

  // Date
  doc.setLineWidth(0.2);
  doc.line(pageWidth / 2 + 10, signatureY, pageWidth / 2 + 50, signatureY);
  doc.setFontSize(12);
  doc.text(formatDate(data.issueDate), pageWidth / 2 + 30, signatureY - 5, { align: "center" });
  doc.setFontSize(8);
  doc.text("Date Issued", pageWidth / 2 + 30, signatureY + 5, { align: "center" });

  // Download the PDF
  doc.save(`${data.recipientName.replace(/\s+/g, "_")}_Certificate.pdf`);
};
