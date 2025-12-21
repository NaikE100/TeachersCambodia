import { motion } from 'motion/react';
import { FileText, MapPin, MessageSquare, FileCheck, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      icon: FileText,
      title: 'CV Upgrade & Review',
      description: 'Professional CV optimization tailored for teaching, hospitality, construction, skilled trades, and all international job sectors. Stand out with a compelling application.',
      features: ['ATS-Friendly Format', 'Industry-Specific Keywords', 'International Standards']
    },
    {
      icon: MapPin,
      title: 'Job Placements',
      description: 'Access exclusive opportunities across teaching, hospitality, construction, healthcare, and skilled trades in Cambodia, UAE, and 6+ European countries.',
      features: ['Multiple Sectors', '100+ Positions', 'Competitive Packages']
    },
    {
      icon: MessageSquare,
      title: 'Interview Preparation',
      description: 'Sector-specific coaching and mock interviews to help you succeed in securing positions across all industries.',
      features: ['Mock Interviews', 'Industry Insights', 'Confidence Building']
    },
    {
      icon: FileCheck,
      title: 'Document Support',
      description: 'Complete assistance with visa applications, work permits, credential verification, and all required documentation for any destination.',
      features: ['Visa Processing', 'Work Permits', 'Legal Guidance']
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
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
              <span className="text-[#FBBE3C]">Our Services</span>
            </div>
            <h2 className="mb-4 text-black">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support services for all job sectors including teaching, hospitality, construction, 
              skilled trades, and more across Cambodia, UAE, and Europe.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FBBE3C]/20 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#FBBE3C]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FBBE3C] transition-colors">
                      <service.icon className="w-7 h-7 text-[#FBBE3C] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3 text-black">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#FBBE3C] rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-black to-gray-900 text-white border-0">
              <h3 className="mb-4 text-white">Ready to Start Your Journey?</h3>
              <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
                Join hundreds of professionals who have transformed their careers with our comprehensive services. 
                Get started today and unlock your international career potential.
              </p>
              <Button 
                onClick={() => onNavigate('payment')}
                size="lg"
                className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black gap-2 group"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
