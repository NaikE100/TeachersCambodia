import { motion } from 'motion/react';
import { XCircle, Home, Mail, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PaymentCancelProps {
  onBackToHome: () => void;
  onRetryPayment: () => void;
}

export function PaymentCancel({ onBackToHome, onRetryPayment }: PaymentCancelProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gray-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className="p-8 md:p-12 text-center border-2 border-gray-200">
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6"
          >
            <XCircle className="w-16 h-16 text-gray-600" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="mb-4 text-black">Payment Cancelled</h1>
            <p className="text-gray-600 mb-8">
              Your payment was not completed. No charges have been made to your account. 
              If this was a mistake, you can try again.
            </p>
          </motion.div>

          {/* Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-6 mb-8 text-left"
          >
            <h3 className="mb-3 text-black">Common Reasons for Payment Issues:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                <span>Payment was cancelled by user</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                <span>Insufficient funds or card limit reached</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                <span>Incorrect payment details entered</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                <span>Network or connection timeout</span>
              </li>
            </ul>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#FBBE3C]/10 rounded-lg p-6 mb-8"
          >
            <h4 className="mb-2 text-black">Need Assistance?</h4>
            <p className="text-sm text-gray-600 mb-4">
              If you're experiencing technical difficulties or have questions about payment options, 
              our support team is here to help.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-[#FBBE3C]" />
              <a href="mailto:info@teacherscambodia.com" className="text-[#FBBE3C] hover:underline">
                info@teacherscambodia.com
              </a>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onRetryPayment}
              className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              All payments are securely processed through PayFast. 
              We accept Visa, Mastercard, EFT, and Instant EFT.
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
