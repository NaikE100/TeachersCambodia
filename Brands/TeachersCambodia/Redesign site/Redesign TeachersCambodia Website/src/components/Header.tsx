import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/bda411d0cf69961e9fd1ed4168e4c5db4a3281eb.png';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Apply', id: 'upload' },
    { label: 'Payment', id: 'payment' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img 
              src={logo} 
              alt="TeachersCambodia - Your Passport to a Brighter Future" 
              className="h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 hover:text-[#FBBE3C] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              onClick={() => handleNavClick('payment')}
              className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#FBBE3C] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-gray-700 hover:text-[#FBBE3C] transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => handleNavClick('payment')}
                className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black w-full"
              >
                Apply Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
