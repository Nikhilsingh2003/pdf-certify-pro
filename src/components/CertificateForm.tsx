
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Award, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateFormProps {
  formData: {
    recipientName: string;
    awardTitle: string;
    issuerName: string;
    issueDate: string;
    signature: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      recipientName: string;
      awardTitle: string;
      issuerName: string;
      issueDate: string;
      signature: string;
    }>
  >;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  formData,
  setFormData,
}) => {
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set today's date as default
  useEffect(() => {
    if (!formData.issueDate) {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        issueDate: today,
      }));
    }
  }, []);

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-certificate-gold/10 text-certificate-navy">
              <Award className="h-3.5 w-3.5 mr-2" />
              <span className="text-xs font-medium">Certificate Details</span>
            </div>
            <h3 className="text-xl font-serif font-semibold text-certificate-navy tracking-tight">
              Create Your Certificate
            </h3>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-2.5">
              <Label htmlFor="recipientName" className="text-sm text-gray-600">
                Recipient's Name
              </Label>
              <Input
                id="recipientName"
                name="recipientName"
                placeholder="Enter full name"
                value={formData.recipientName}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-certificate-gold/50 bg-gray-50/70",
                  formData.recipientName ? "border-certificate-gold/50" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="awardTitle" className="text-sm text-gray-600">
                Award Title
              </Label>
              <Input
                id="awardTitle"
                name="awardTitle"
                placeholder="e.g. Certificate of Achievement"
                value={formData.awardTitle}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-certificate-gold/50 bg-gray-50/70",
                  formData.awardTitle ? "border-certificate-gold/50" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="issuerName" className="text-sm text-gray-600">
                Issuer Name
              </Label>
              <Input
                id="issuerName"
                name="issuerName"
                placeholder="Organization or individual"
                value={formData.issuerName}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-certificate-gold/50 bg-gray-50/70",
                  formData.issuerName ? "border-certificate-gold/50" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="issueDate" className="text-sm text-gray-600">
                Issue Date
              </Label>
              <div className="relative">
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-300 focus:ring-1 focus:ring-certificate-gold/50 bg-gray-50/70",
                    formData.issueDate ? "border-certificate-gold/50" : ""
                  )}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="signature" className="text-sm text-gray-600">
                Signature (Optional)
              </Label>
              <Input
                id="signature"
                name="signature"
                placeholder="Name of signatory"
                value={formData.signature}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-certificate-gold/50 bg-gray-50/70",
                  formData.signature ? "border-certificate-gold/50" : ""
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateForm;
