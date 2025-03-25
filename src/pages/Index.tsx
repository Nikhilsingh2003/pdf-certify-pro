
import React, { useState } from "react";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import { Button } from "@/components/ui/button";
import { FileText, Heart, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    awardTitle: "Certificate of Love",
    issuerName: "",
    issueDate: "",
    signature: "",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500 fill-pink-100" />
            <span className="font-serif text-lg font-semibold text-pink-700">Love Certificate Generator</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-pink-700 hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-pink-700 hover:text-pink-500 transition-colors">
              About
            </Link>
            <Button asChild variant="ghost" size="sm" className="gap-1.5 text-pink-700 hover:text-pink-500 hover:bg-pink-50">
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
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-pink-700 mb-3 tracking-tight">
            Create Beautiful Love Certificates
          </h1>
          <p className="text-pink-600/80 mb-6 leading-relaxed">
            Generate romantic, high-quality certificates to express your love and appreciation. 
            Perfect for Valentine's Day, anniversaries, or just because.
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
      <footer className="py-6 px-4 bg-pink-50 border-t border-pink-100">
        <div className="container mx-auto">
          <div className="text-center text-sm text-pink-600/70">
            <p>
              &copy; {new Date().getFullYear()} Love Certificate Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
