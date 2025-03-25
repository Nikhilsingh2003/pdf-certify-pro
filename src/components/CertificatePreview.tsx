
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, Heart, Eye } from "lucide-react";
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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700">
            <Eye className="h-3.5 w-3.5 mr-2" />
            <span className="text-xs font-medium">Certificate Preview</span>
          </div>
          <h3 className="text-xl font-serif font-semibold text-pink-800 tracking-tight">
            Preview & Download
          </h3>
        </div>
        <Button 
          onClick={handleDownload} 
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <Card className="certificate-container gold-border animate-scale-up overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-pink-50">
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-3 left-3 right-3 bottom-3 border-[1px] border-pink-300/50"></div>
            <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-certificate-gold/30"></div>
            
            {/* Corner Hearts */}
            <div className="absolute top-8 left-8 text-pink-300 opacity-50">
              <Heart className="h-10 w-10 fill-pink-100" />
            </div>
            <div className="absolute top-8 right-8 text-pink-300 opacity-50">
              <Heart className="h-10 w-10 fill-pink-100" />
            </div>
            <div className="absolute bottom-8 left-8 text-pink-300 opacity-50">
              <Heart className="h-10 w-10 fill-pink-100" />
            </div>
            <div className="absolute bottom-8 right-8 text-pink-300 opacity-50">
              <Heart className="h-10 w-10 fill-pink-100" />
            </div>
          </div>
          
          <div className="z-10 max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
            <div className="mb-2 text-pink-700 text-sm font-medium tracking-widest uppercase">
              {formData.issuerName || "Your Name"}
            </div>
            
            <h1 className="text-pink-800 font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {formData.awardTitle || "Certificate of Love"}
            </h1>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-pink-300 mr-4"></div>
              <Heart className="h-5 w-5 text-pink-500 fill-pink-200" />
              <div className="h-px w-16 bg-pink-300 ml-4"></div>
            </div>
            
            <div className="text-sm text-pink-700/70 mb-4">
              This certificate is lovingly presented to
            </div>
            
            <div className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-6 tracking-wide">
              {formData.recipientName || "Your Loved One"}
            </div>
            
            <div className="text-sm text-pink-700/70 mb-2 max-w-md">
              With all my love, appreciation, and admiration for being amazing in every way
            </div>
            
            <div className="flex items-center justify-center mt-8">
              <div className="flex flex-col items-center mx-5">
                <div className="w-36 border-b border-pink-300 pb-1 mb-1">
                  {formData.signature || "Your Signature"}
                </div>
                <div className="text-xs text-pink-700/70">
                  With Love From
                </div>
              </div>
              
              <div className="flex flex-col items-center mx-5">
                <div className="w-36 border-b border-pink-300 pb-1 mb-1">
                  {formData.issueDate ? formatDate(formData.issueDate) : "Date"}
                </div>
                <div className="text-xs text-pink-700/70">
                  Date
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
