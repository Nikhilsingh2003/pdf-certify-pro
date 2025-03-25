
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CalendarIcon, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CertificateFormProps {
  formData: {
    recipientName: string;
    awardTitle: string;
    issuerName: string;
    issueDate: string;
    signature: string;
    message: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      recipientName: string;
      awardTitle: string;
      issuerName: string;
      issueDate: string;
      signature: string;
      message: string;
    }>
  >;
}

const AWARD_TITLES = [
  "Certificate of Love",
  "Most Beautiful Person",
  "Cutest Partner",
  "Best Girlfriend/Boyfriend",
  "Most Caring Partner",
  "Most Supportive Partner",
  "Best Kisser Award",
  "Certificate of Appreciation",
  "Partner of the Year",
  "Heart of Gold Award",
];

const DEFAULT_MESSAGE = "This certificate is lovingly presented to {name} for being an endless source of joy and inspiration. Your presence brightens every moment, and you are truly cherished.";

const CertificateForm: React.FC<CertificateFormProps> = ({
  formData,
  setFormData,
}) => {
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set today's date as default and default message
  useEffect(() => {
    if (!formData.issueDate) {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        issueDate: today,
      }));
    }
    
    if (!formData.message) {
      setFormData((prev) => ({
        ...prev,
        message: DEFAULT_MESSAGE,
      }));
    }
  }, []);

  // Update message when recipient name changes
  useEffect(() => {
    if (formData.recipientName && formData.message === DEFAULT_MESSAGE) {
      const personalizedMessage = DEFAULT_MESSAGE.replace('{name}', formData.recipientName);
      setFormData((prev) => ({
        ...prev,
        message: personalizedMessage,
      }));
    } else if (!formData.recipientName && formData.message.includes(formData.recipientName)) {
      setFormData((prev) => ({
        ...prev,
        message: DEFAULT_MESSAGE.replace('{name}', ''),
      }));
    }
  }, [formData.recipientName]);

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm border border-pink-100 shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700">
              <Heart className="h-3.5 w-3.5 mr-2 text-pink-500" />
              <span className="text-xs font-medium">Romantic Certificate</span>
            </div>
            <h3 className="text-xl font-serif font-semibold text-pink-800 tracking-tight">
              Create Your Love Certificate
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
                placeholder="Enter your loved one's name"
                value={formData.recipientName}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70",
                  formData.recipientName ? "border-pink-300" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="awardTitle" className="text-sm text-gray-600">
                Award Title
              </Label>
              <Select
                value={formData.awardTitle}
                onValueChange={(value) => handleSelectChange("awardTitle", value)}
              >
                <SelectTrigger className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70",
                  formData.awardTitle ? "border-pink-300" : ""
                )}>
                  <SelectValue placeholder="Select an award title" />
                </SelectTrigger>
                <SelectContent>
                  {AWARD_TITLES.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2.5">
              <Label htmlFor="message" className="text-sm text-gray-600">
                Certificate Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter a personalized message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70 resize-none",
                  formData.message ? "border-pink-300" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="issuerName" className="text-sm text-gray-600">
                Your Name (Issuer)
              </Label>
              <Input
                id="issuerName"
                name="issuerName"
                placeholder="Enter your name"
                value={formData.issuerName}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70",
                  formData.issuerName ? "border-pink-300" : ""
                )}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="issueDate" className="text-sm text-gray-600">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70",
                    formData.issueDate ? "border-pink-300" : ""
                  )}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="signature" className="text-sm text-gray-600">
                Signature
              </Label>
              <Input
                id="signature"
                name="signature"
                placeholder="With boundless admiration,"
                value={formData.signature || "With boundless admiration,"}
                onChange={handleChange}
                className={cn(
                  "transition-all duration-300 focus:ring-1 focus:ring-pink-300 bg-gray-50/70",
                  formData.signature ? "border-pink-300" : ""
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
