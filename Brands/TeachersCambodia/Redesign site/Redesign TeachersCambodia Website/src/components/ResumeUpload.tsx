import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
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

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      toast.success('Resume uploaded successfully! Our team will review it and contact you within 48 hours.');
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

  return (
    <section id="upload" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-[#FBBE3C]/10 rounded-full">
              <span className="text-[#FBBE3C]">Apply Now</span>
            </div>
            <h2 className="mb-4 text-black">Quick Application</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Not sure which destination fits you best? Upload your resume here and our team will 
              match you with the right opportunities. For destination-specific applications, 
              <a href="#destinations" className="text-[#FBBE3C] hover:underline ml-1">
                click on your preferred destination above
              </a>.
            </p>
          </motion.div>

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 border-2 border-gray-200">
              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
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
                />

                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FBBE3C]/10 rounded-full mb-2">
                      <Upload className="w-8 h-8 text-[#FBBE3C]" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-black">Drop your resume here</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        or click to browse from your device
                      </p>
                      <Button
                        onClick={triggerFileInput}
                        className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black"
                      >
                        Choose PDF File
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <strong>Accepted format:</strong> PDF only • <strong>Max size:</strong> 5MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {uploadSuccess ? (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FBBE3C]/10 rounded-full mb-2">
                        <FileText className="w-8 h-8 text-[#FBBE3C]" />
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <h4 className="text-black">{selectedFile.name}</h4>
                        {!uploadSuccess && (
                          <button
                            onClick={handleRemove}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>

                    {!uploadSuccess && (
                      <div className="pt-4">
                        <Button
                          onClick={handleUpload}
                          disabled={isUploading}
                          className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black"
                        >
                          {isUploading ? 'Uploading...' : 'Upload Resume'}
                        </Button>
                      </div>
                    )}

                    {uploadSuccess && (
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-2 text-green-600 mb-4">
                          <CheckCircle className="w-5 h-5" />
                          <span>Resume uploaded successfully!</span>
                        </div>
                        <div>
                          <Button
                            onClick={handleRemove}
                            variant="outline"
                            className="border-2 border-black hover:bg-black hover:text-white"
                          >
                            Upload Another Resume
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FBBE3C]/10 rounded-lg flex items-center justify-center mt-1">
                      <AlertCircle className="w-5 h-5 text-[#FBBE3C]" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-black">Important</h4>
                      <p className="text-sm text-gray-600">
                        Only PDF format is accepted. Ensure your resume is clear and up-to-date.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FBBE3C]/10 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-5 h-5 text-[#FBBE3C]" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-black">What's Next?</h4>
                      <p className="text-sm text-gray-600">
                        Our team will review your resume within 48 hours and contact you via email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <h4 className="mb-4 text-black">Resume Tips</h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                  <span>Include all relevant teaching experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                  <span>List your qualifications and certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                  <span>Highlight international teaching experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                  <span>Include contact information and references</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
