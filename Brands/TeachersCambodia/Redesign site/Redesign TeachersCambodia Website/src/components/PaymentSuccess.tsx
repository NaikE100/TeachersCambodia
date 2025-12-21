import { motion } from 'motion/react';
import { CheckCircle, Download, Home, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PaymentSuccessProps {
  onBackToHome: () => void;
}

export function PaymentSuccess({ onBackToHome }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBBE3C]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBBE3C]/10 rounded-full blur-3xl animate-pulse delay-700" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className="p-8 md:p-12 text-center border-2 border-[#FBBE3C]/20">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-[#FBBE3C]/10 rounded-full mb-6"
          >
            <CheckCircle className="w-16 h-16 text-[#FBBE3C]" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="mb-4 text-black">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for choosing TeachersCambodia. Your payment has been processed successfully 
              and we've received your application.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-6 mb-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <span className="text-gray-500">Transaction ID:</span>
                <p className="text-black mt-1">TC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Date:</span>
                <p className="text-black mt-1">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Payment Method:</span>
                <p className="text-black mt-1">PayFast</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Status:</span>
                <p className="text-[#FBBE3C] mt-1">Completed</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#FBBE3C]/10 rounded-lg p-6 mb-8 text-left"
          >
            <h3 className="mb-3 text-black">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                <span>You'll receive a confirmation email with your receipt within 5 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                <span>Our team will contact you within 24 hours to begin your journey</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full mt-1.5" />
                <span>You'll be assigned a dedicated consultant to guide you through the process</span>
              </li>
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onBackToHome}
              className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:info@teacherscambodia.com" className="text-[#FBBE3C] hover:underline">
                info@teacherscambodia.com
              </a>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
