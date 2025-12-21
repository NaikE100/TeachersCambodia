import { Mail, Phone, MapPin } from 'lucide-react';
import logo from 'figma:asset/bda411d0cf69961e9fd1ed4168e4c5db4a3281eb.png';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: 'About Us', id: 'about' },
      { label: 'Services', id: 'services' },
      { label: 'Destinations', id: 'destinations' },
      { label: 'Apply Now', id: 'upload' },
      { label: 'Contact', id: 'contact' }
    ],
    services: [
      { label: 'CV Upgrade', id: 'services' },
      { label: 'Interview Prep', id: 'services' },
      { label: 'Teaching Placements', id: 'services' },
      { label: 'Document Support', id: 'services' }
    ],
    destinations: [
      { label: 'Cambodia Teaching', id: 'destinations' },
      { label: 'Online Teaching', id: 'destinations' },
      { label: 'Malta Jobs', id: 'destinations' },
      { label: 'UAE Jobs', id: 'destinations' },
      { label: 'UK & Europe Jobs', id: 'destinations' }
    ]
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img 
                  src={logo} 
                  alt="TeachersCambodia" 
                  className="h-16 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Connecting educators and professionals with life-changing opportunities around the world.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 text-[#FBBE3C]" />
                  <a href="mailto:info@teacherscambodia.com" className="hover:text-[#FBBE3C] transition-colors">
                    info@teacherscambodia.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4 text-[#FBBE3C]" />
                  <a href="tel:+27725411340" className="hover:text-[#FBBE3C] transition-colors">
                    +27 72 541 1340
                  </a>
                </div>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#FBBE3C] mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span>Phnom Penh, Cambodia</span>
                    <span>George, South Africa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-sm text-gray-400 hover:text-[#FBBE3C] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-white">Our Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-sm text-gray-400 hover:text-[#FBBE3C] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="mb-4 text-white">Destinations</h4>
              <ul className="space-y-2">
                {footerLinks.destinations.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-sm text-gray-400 hover:text-[#FBBE3C] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} TeachersCambodia. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <button className="text-gray-400 hover:text-[#FBBE3C] transition-colors">
                  Privacy Policy
                </button>
                <button className="text-gray-400 hover:text-[#FBBE3C] transition-colors">
                  Terms of Service
                </button>
                <button className="text-gray-400 hover:text-[#FBBE3C] transition-colors">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
