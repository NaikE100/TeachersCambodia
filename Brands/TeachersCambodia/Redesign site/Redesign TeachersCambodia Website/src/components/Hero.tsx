import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwdGVhbSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MjM3MDYxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="International team collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBBE3C]/20 to-transparent" />
      </div>

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#FBBE3C]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-[#FBBE3C]/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-[#FBBE3C]/20 backdrop-blur-sm rounded-full border border-[#FBBE3C]/40">
              <span className="text-[#FBBE3C]">Global Teaching & Job Recruitment</span>
            </div>
            
            <h1 className="mb-6 text-white drop-shadow-lg">
              Your Passport to a Brighter Future
            </h1>
            
            <p className="mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              Teaching opportunities in Cambodia and online platforms worldwide. Job placements in various 
              sectors across Malta, UAE, UK, and Europe. Professional support every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('payment')}
                size="lg"
                className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => onNavigate('services')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm"
              >
                Our Services
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '500+', label: 'Teachers Placed' },
              { value: '5', label: 'Countries' },
              { value: '95%', label: 'Success Rate' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl text-[#FBBE3C] mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm text-gray-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
