import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VisualShowcase() {
  const showcaseImages = [
    {
      src: 'https://images.unsplash.com/photo-1551155674-6d39c2140d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYSUyMGFuZ2tvciUyMHdhdCUyMHN1bnJpc2V8ZW58MXx8fHwxNzYyMzcwNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Angkor Wat Cambodia at sunrise',
      title: 'Cambodia',
      subtitle: 'Ancient Culture Meets Modern Teaching'
    },
    {
      src: 'https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBidXJqJTIwa2hhbGlmYXxlbnwxfHx8fDE3NjIzMTc5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Dubai Burj Khalifa skyline',
      title: 'UAE & Middle East',
      subtitle: 'Premium Opportunities in Dubai & Kuwait'
    },
    {
      src: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MjM0NDYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Paris Eiffel Tower Europe',
      title: 'Europe',
      subtitle: 'Career Opportunities Across the Continent'
    },
    {
      src: 'https://images.unsplash.com/photo-1629893250402-bc171e8bbe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wJTIwY29mZmVlfGVufDF8fHx8MTc2MjM3MDYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Remote online teaching workspace',
      title: 'Online Teaching',
      subtitle: 'Work From Anywhere Worldwide'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-[#FBBE3C]/10 rounded-full">
            <span className="text-[#FBBE3C]">Explore Opportunities</span>
          </div>
          <h2 className="mb-4 text-black">Your Journey Starts Here</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From bustling European cities to serene Cambodian temples, discover the diverse 
            opportunities waiting for you across the globe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-1 text-white group-hover:text-[#FBBE3C] transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {image.subtitle}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-[#FBBE3C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-[#FBBE3C]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#FBBE3C]/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
}
