
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, Eye } from "lucide-react";
import { generatePDF } from "../utils/pdfGenerator";
import { formatDate } from "../utils/dateUtils";

interface CertificatePreviewProps {
  formData: {
    recipientName: string;
    awardTitle: string;
    issuerName: string;
    issueDate: string;
    signature: string;
  };
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ formData }) => {
  const handleDownload = () => {
    generatePDF(formData);
  };

  return (
    <div className="space-y-6 w-full h-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-certificate-navy/10 text-certificate-navy">
            <Eye className="h-3.5 w-3.5 mr-2" />
            <span className="text-xs font-medium">Certificate Preview</span>
          </div>
          <h3 className="text-xl font-serif font-semibold text-certificate-navy tracking-tight">
            Preview & Download
          </h3>
        </div>
        <Button 
          onClick={handleDownload} 
          className="bg-certificate-navy hover:bg-certificate-navy/90 text-white"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <Card className="certificate-container gold-border animate-scale-up overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-certificate-ivory">
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-3 left-3 right-3 bottom-3 border-[1px] border-certificate-gold/30"></div>
            <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-certificate-gold/30"></div>
            <div className="absolute top-0 left-8 right-8 h-16 border-b-[1px] border-certificate-gold/20"></div>
            <div className="absolute bottom-0 left-8 right-8 h-16 border-t-[1px] border-certificate-gold/20"></div>
          </div>
          
          <div className="z-10 max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
            <div className="mb-2 text-certificate-gold text-sm font-medium tracking-widest uppercase">
              {formData.issuerName || "Organization Name"}
            </div>
            
            <h1 className="text-certificate-navy font-serif text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              {formData.awardTitle || "Certificate of Achievement"}
            </h1>
            
            <div className="text-sm text-certificate-navy/70 mb-8">
              This certificate is proudly presented to
            </div>
            
            <div className="text-3xl md:text-4xl font-serif font-bold text-certificate-navy mb-8 tracking-wide">
              {formData.recipientName || "Recipient Name"}
            </div>
            
            <div className="text-sm text-certificate-navy/70 mb-2 max-w-md">
              In recognition of exceptional achievement and outstanding accomplishment
            </div>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-certificate-navy/30 pb-1 mb-1">
                  {formData.signature || "Signature"}
                </div>
                <div className="text-xs text-certificate-navy/70">
                  Authorized Signature
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-36 border-b border-certificate-navy/30 pb-1 mb-1">
                  {formData.issueDate ? formatDate(formData.issueDate) : "Date"}
                </div>
                <div className="text-xs text-certificate-navy/70">
                  Date Issued
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CertificatePreview;
