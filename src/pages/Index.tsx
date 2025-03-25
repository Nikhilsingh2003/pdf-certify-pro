
import React, { useState } from "react";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import { Button } from "@/components/ui/button";
import { FileText, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    awardTitle: "Certificate of Achievement",
    issuerName: "",
    issueDate: "",
    signature: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-certificate-gold" />
            <span className="font-serif text-lg font-semibold text-certificate-navy">Certificate Generator</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-certificate-navy hover:text-certificate-gold transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-certificate-navy hover:text-certificate-gold transition-colors">
              About
            </Link>
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Info className="h-4 w-4" />
                <span>Help</span>
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto pt-24 pb-12 px-4 md:px-6">
        <div className="mb-10 animate-fade-in text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-certificate-navy mb-3 tracking-tight">
            Create Professional Certificates
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Generate beautiful, high-quality certificates with our easy-to-use tool. 
            Perfect for recognition, awards, and achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-slide-in">
          <div className="flex flex-col space-y-6">
            <CertificateForm 
              formData={formData} 
              setFormData={setFormData} 
            />
          </div>
          <div className="flex flex-col">
            <CertificatePreview formData={formData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Certificate Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
