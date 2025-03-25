
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
    message: string;
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
        <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-white">
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-gray-200"></div>
          </div>
          
          <div className="z-10 max-w-3xl mx-auto flex flex-col items-center justify-center h-full">
            <h1 className="text-gray-300 font-serif text-5xl md:text-6xl font-semibold mb-2 tracking-wide">
              Certificate of Love
            </h1>
            
            <h2 className="text-gray-300 font-serif text-3xl md:text-4xl font-medium mb-10 tracking-wide">
              {formData.awardTitle || "Cutest Person Ever"}
            </h2>
            
            <p className="text-gray-400 font-serif italic text-xl mb-10">
              This is to certify that
            </p>
            
            <h3 className="text-gray-300 font-serif text-5xl font-medium mb-10">
              {formData.recipientName || "Recipient Name"}
            </h3>
            
            <p className="text-gray-400 font-serif italic text-xl mb-10 max-w-2xl">
              Certified as the cutest, most adorable, and sweetest soul who melts hearts effortlessly.
            </p>
            
            <div className="text-pink-500 mb-6">
              <Heart className="h-12 w-12 fill-pink-500" />
            </div>
            
            <div className="mt-10">
              <p className="text-gray-400 font-serif italic text-xl">
                Given with love on {formData.issueDate ? formatDate(formData.issueDate) : "Date"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CertificatePreview;
