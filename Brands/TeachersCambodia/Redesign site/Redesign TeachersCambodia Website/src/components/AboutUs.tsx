import { motion } from 'motion/react';
import { Globe, Award, Users, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutUs() {
  const features = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connections with schools and institutions across 5 countries and growing.'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Professional support from application to placement with proven success.'
    },
    {
      icon: Users,
      title: 'Candidate-Focused',
      description: 'We put professionals first, ensuring the best opportunities for your career.'
    },
    {
      icon: Shield,
      title: 'Trusted Partner',
      description: 'Transparent processes and secure payments for peace of mind.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
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
              <span className="text-[#FBBE3C]">About Us</span>
            </div>
            <h2 className="mb-4 text-black">Who We Are</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TeachersCambodia is a leading global recruitment platform connecting educators with teaching 
              opportunities in Cambodia and online, plus professionals with diverse job sectors worldwide.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4 text-black">Empowering Careers Worldwide</h3>
              <p className="text-gray-600 mb-6">
                Founded with a mission to bridge the gap between talented professionals and exceptional 
                opportunities globally, we've helped hundreds of individuals embark on international 
                careers that transform lives.
              </p>
              <p className="text-gray-600 mb-6">
                Our comprehensive services go beyond simple job placement. We provide end-to-end 
                support including CV optimization, interview preparation, document processing, and 
                continuous guidance throughout your journey.
              </p>
              <p className="text-gray-600">
                Specializing in teaching placements in Cambodia and online platforms, plus diverse job 
                opportunities across Malta, UAE, UK, and Europe in hospitality, healthcare, IT, finance, 
                and other sectors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGluZyUyMGVuZ2xpc2glMjBhc2lhbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MjM3MDYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Teaching English to Asian students"
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FBBE3C] rounded-2xl -z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FBBE3C]/30 rounded-2xl -z-10" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FBBE3C]/10 rounded-2xl mb-4">
                  <feature.icon className="w-8 h-8 text-[#FBBE3C]" />
                </div>
                <h4 className="mb-2 text-black">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
