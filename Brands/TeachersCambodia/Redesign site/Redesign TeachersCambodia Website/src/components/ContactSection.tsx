import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@teacherscambodia.com',
      link: 'mailto:info@teacherscambodia.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+27 72 541 1340',
      link: 'tel:+27725411340'
    },
    {
      icon: MapPin,
      label: 'Locations',
      value: 'Phnom Penh, Cambodia & George, South Africa',
      link: null
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', link: '#' },
    { icon: Instagram, label: 'Instagram', link: '#' },
    { icon: Linkedin, label: 'LinkedIn', link: '#' }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FBBE3C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBBE3C]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FBBE3C]/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <span className="text-[#FBBE3C]">Get In Touch</span>
            </div>
            <h2 className="mb-4 text-black">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team and we'll respond 
              as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 border-2 border-gray-200">
                <h3 className="mb-6 text-black">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 72 541 1340"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your teaching background and interests..."
                      required
                      rows={5}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FBBE3C] hover:bg-[#e5ab35] text-black gap-2"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="mb-6 text-black">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-6 border-2 border-gray-200 hover:border-[#FBBE3C]/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#FBBE3C]/10 rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-[#FBBE3C]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="text-black hover:text-[#FBBE3C] transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-black">{info.value}</div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-black">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={social.label}
                      className="w-12 h-12 bg-gray-100 hover:bg-[#FBBE3C] rounded-lg flex items-center justify-center transition-all group"
                    >
                      <social.icon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-[#FBBE3C]/10 to-white border-2 border-[#FBBE3C]/20">
                <h4 className="mb-2 text-black">Office Hours</h4>
                <p className="text-sm text-gray-600 mb-2">Monday - Friday: 9:00 AM - 6:00 PM (ICT)</p>
                <p className="text-sm text-gray-600">Saturday: 10:00 AM - 2:00 PM (ICT)</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
