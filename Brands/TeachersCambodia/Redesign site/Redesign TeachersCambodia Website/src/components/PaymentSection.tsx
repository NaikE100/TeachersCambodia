import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Shield, Lock, CreditCard } from 'lucide-react';

interface PaymentSectionProps {
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

export function PaymentSection({ onPaymentSuccess, onPaymentCancel }: PaymentSectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'CV Review',
      price: 'R500',
      description: 'Professional CV optimization for all industries and career paths',
      features: [
        'Professional CV review',
        'ATS optimization',
        'Format enhancement',
        'Basic consultation',
        '48-hour turnaround'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 'R1,299',
      description: 'Complete application support for your career journey',
      features: [
        'CV upgrade & review',
        'Cover letter writing',
        'Interview preparation',
        'Document checklist',
        'Email support',
        'Priority processing'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 'R2,499',
      description: 'Full-service career support with end-to-end assistance',
      features: [
        'Everything in Standard',
        'Dedicated consultant',
        'Visa support & guidance',
        'Job placement assistance',
        'Mock interviews (3 sessions)',
        'Post-placement support',
        '24/7 priority support'
      ],
      popular: false
    }
  ];

  const handlePayment = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsProcessing(true);
    
    // Simulate PayFast redirect/processing
    setTimeout(() => {
      // Randomly simulate success or cancel (for demo)
      const success = Math.random() > 0.3; // 70% success rate for demo
      setIsProcessing(false);
      if (success) {
        onPaymentSuccess();
      } else {
        onPaymentCancel();
      }
    }, 2000);
  };

  return (
    <section id="payment" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-[#FBBE3C]/10 rounded-full">
              <span className="text-[#FBBE3C]">Pricing & Payment</span>
            </div>
            <h2 className="mb-4 text-black">Choose Your Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with secure PayFast payment processing. 
              Select the package that best fits your needs and start your journey today.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-[#FBBE3C] text-black border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={`p-8 h-full flex flex-col ${
                  pkg.popular 
                    ? 'border-2 border-[#FBBE3C] shadow-xl' 
                    : 'border-2 border-gray-200'
                }`}>
                  <div className="mb-6">
                    <h3 className="mb-2 text-black">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl text-black">{pkg.price}</span>
                      <span className="text-gray-500">ZAR</span>
                    </div>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FBBE3C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePayment(pkg.id)}
                    disabled={isProcessing && selectedPackage === pkg.id}
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-[#FBBE3C] hover:bg-[#e5ab35] text-black'
                        : 'bg-black hover:bg-gray-800 text-white'
                    }`}
                  >
                    {isProcessing && selectedPackage === pkg.id ? 'Processing...' : 'Select Package'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security & Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-white border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="mb-2 text-black">Secure Payment with PayFast</h3>
                <p className="text-gray-600">
                  All payments are processed securely through PayFast, South Africa's leading payment gateway.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBBE3C]/10 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-[#FBBE3C]" />
                  </div>
                  <h4 className="mb-1 text-black">SSL Encrypted</h4>
                  <p className="text-sm text-gray-600">Bank-level security</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBBE3C]/10 rounded-full mb-3">
                    <Lock className="w-6 h-6 text-[#FBBE3C]" />
                  </div>
                  <h4 className="mb-1 text-black">PCI Compliant</h4>
                  <p className="text-sm text-gray-600">Industry standards</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBBE3C]/10 rounded-full mb-3">
                    <CreditCard className="w-6 h-6 text-[#FBBE3C]" />
                  </div>
                  <h4 className="mb-1 text-black">Multiple Methods</h4>
                  <p className="text-sm text-gray-600">Cards, EFT & more</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50'%3E%3Crect fill='%23FBBE3C' width='150' height='50' rx='4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23000' font-family='Arial' font-size='16' font-weight='bold'%3EPayFast%3C/text%3E%3C/svg%3E" 
                    alt="PayFast" 
                    className="h-8"
                  />
                  <span className="text-sm text-gray-500">Accepted payment methods: Visa, Mastercard, EFT, Instant EFT</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>
              Need a custom package? Contact us for enterprise solutions and bulk discounts.
              All prices in ZAR (South African Rand). Payment is processed securely through PayFast.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
