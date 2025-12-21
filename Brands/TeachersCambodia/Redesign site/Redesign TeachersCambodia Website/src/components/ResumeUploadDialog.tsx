import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, FileText, X, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Destination {
  name: string;
  sector: string;
  description: string;
  jobDetails?: {
    position: string;
    company: string;
    salaryRange: string;
    jobId: string;
  };
}

interface ResumeUploadDialogProps {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeUploadDialog({ destination, open, onOpenChange }: ResumeUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are accepted. Please upload a PDF version of your resume.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB. Please compress your PDF and try again.');
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are accepted. Please upload a PDF version of your resume.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB. Please compress your PDF and try again.');
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a resume file to upload.');
      return;
    }

    if (!name || !email) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      const jobInfo = destination?.jobDetails 
        ? `${destination.jobDetails.position} position` 
        : destination?.name;
      toast.success(`Application for ${jobInfo} submitted successfully! Our team will review it and contact you within 48 hours.`);
      
      // Reset form after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 2000);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  if (!destination) return null;

  // Check if this is Online Teaching - show WhatsApp group option
  const isOnlineTeaching = destination.name === 'Online Teaching';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-black">
            {destination.jobDetails 
              ? `Apply for ${destination.jobDetails.position}`
              : `Apply for ${destination.name}`
            }
          </DialogTitle>
          <DialogDescription>
            {destination.jobDetails 
              ? `Submit your application for ${destination.jobDetails.position} at ${destination.jobDetails.company}.`
              : destination.sector === 'Teaching' 
                ? `Submit your application for teaching positions in ${destination.name}.`
                : `Submit your application for opportunities in ${destination.name} - ${destination.sector}.`
            }
          </DialogDescription>
        </DialogHeader>

        {/* WhatsApp Community for Online Teaching - No Resume Needed */}
        {isOnlineTeaching ? (
          <div className="space-y-4 mt-4">
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-black mb-2">Join Our SA TEFL Teachers Community</h4>
                  <p className="text-sm text-gray-700 mb-6">
                    Connect with South African TEFL teachers, get instant job updates, share experiences, 
                    and access exclusive online teaching opportunities in our active WhatsApp community.
                  </p>
                  <Button
                    type="button"
                    onClick={() => window.open('https://chat.whatsapp.com/Dh654enClbp6PchwXFA1uU', '_blank')}
                    className="bg-green-500 hover:bg-green-600 text-white gap-2"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Join WhatsApp Group Now
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong>What happens next?</strong> Once you join the group, introduce yourself and our 
                community managers will guide you through available online teaching opportunities.
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-6 mt-4">
          {/* Job Details (if specific job selected) */}
          {destination.jobDetails && (
            <div className="p-4 bg-[#FBBE3C]/10 rounded-lg border border-[#FBBE3C]/20">
              <h4 className="text-black mb-3">Position Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span className="text-black">{destination.jobDetails.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="text-black">{destination.jobDetails.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="text-black">{destination.jobDetails.salaryRange}</span>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-black">Personal Information</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={uploadSuccess}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={uploadSuccess}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={uploadSuccess}
              />
            </div>
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <Label>Resume / CV *</Label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                selectedFile 
                  ? 'border-[#FBBE3C] bg-[#FBBE3C]/5' 
                  : 'border-gray-300 hover:border-[#FBBE3C] hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploadSuccess}
              />

              {!selectedFile ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBBE3C]/10 rounded-full">
                    <Upload className="w-6 h-6 text-[#FBBE3C]" />
                  </div>
                  <div>
                    <p className="mb-2 text-black">Drop your resume here</p>
                    <p className="text-xs text-gray-600 mb-3">
                      or click to browse from your device
                    </p>
                    <Button
                      type="button"
                      onClick={triggerFileInput}
                      className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black"
                      size="sm"
                    >
                      Choose PDF File
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    <strong>Accepted format:</strong> PDF only • <strong>Max size:</strong> 5MB
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadSuccess ? (
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBBE3C]/10 rounded-full">
                      <FileText className="w-6 h-6 text-[#FBBE3C]" />
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <p className="text-sm text-black">{selectedFile.name}</p>
                      {!uploadSuccess && (
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  {uploadSuccess && (
                    <div className="inline-flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Resume uploaded successfully!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-[#FBBE3C]/10 rounded-lg border border-[#FBBE3C]/20">
            <AlertCircle className="w-5 h-5 text-[#FBBE3C] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              {destination.sector === 'Teaching' ? (
                <p>
                  <strong>For Teaching Positions:</strong> Please ensure your resume includes 
                  teaching qualifications (TEFL/TESOL/CELTA), teaching experience, and relevant certifications.
                </p>
              ) : (
                <p>
                  <strong>For {destination.sector}:</strong> Please ensure your resume includes 
                  relevant work experience, qualifications, and any required certifications for your field.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {!uploadSuccess && (
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-2"
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="flex-1 bg-[#FBBE3C] hover:bg-[#e5ab35] text-black"
              >
                {isUploading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          )}
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
