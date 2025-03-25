
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Award, Download, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-certificate-navy hover:text-certificate-gold"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Link>
          </Button>

          <div className="mb-10 animate-fade-in">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-certificate-navy mb-6 tracking-tight">
              About Certificate Generator
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our Certificate Generator is designed to help you create professional,
              high-quality certificates for any occasion. Whether you need to recognize
              achievements, celebrate completions, or acknowledge contributions, our
              tool makes it simple to generate beautiful certificates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-in">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-certificate-gold/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-certificate-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-certificate-navy mb-2">
                    Professional Design
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our certificates feature elegant, professionally designed templates
                    with perfect typography and layout.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-certificate-gold/10 flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-certificate-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-certificate-navy mb-2">
                    High Quality PDFs
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Generate print-ready, high-resolution PDF certificates with no
                    watermarks or compression artifacts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-certificate-navy/5 rounded-xl p-6 md:p-8 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold text-certificate-navy mb-4">
              How to Use
            </h2>
            <ol className="space-y-4 text-gray-600 list-decimal pl-5">
              <li className="pl-2">
                <span className="text-certificate-navy font-medium">Enter certificate details</span>
                <p className="mt-1 text-sm">
                  Fill in the recipient's name, award title, issuer name, and date.
                </p>
              </li>
              <li className="pl-2">
                <span className="text-certificate-navy font-medium">Preview your certificate</span>
                <p className="mt-1 text-sm">
                  See a real-time preview of how your certificate will look.
                </p>
              </li>
              <li className="pl-2">
                <span className="text-certificate-navy font-medium">Download as PDF</span>
                <p className="mt-1 text-sm">
                  Click the download button to get your high-quality PDF certificate.
                </p>
              </li>
              <li className="pl-2">
                <span className="text-certificate-navy font-medium">Print or share</span>
                <p className="mt-1 text-sm">
                  Print your certificate on high-quality paper or share it digitally.
                </p>
              </li>
            </ol>
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

export default About;
