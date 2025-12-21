import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DestinationGallery() {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1551155674-6d39c2140d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYSUyMGFuZ2tvciUyMHdhdCUyMHN1bnJpc2V8ZW58MXx8fHwxNzYyMzcwNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Angkor Wat sunrise',
      span: 'col-span-2 row-span-2'
    },
    {
      src: 'https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBidXJqJTIwa2hhbGlmYXxlbnwxfHx8fDE3NjIzMTc5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Dubai skyline',
      span: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1680270462854-909d7d694775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWx0YSUyMHZhbGxldHRhJTIwbWVkaXRlcnJhbmVhbnxlbnwxfHx8fDE3NjIzNzA2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Malta Valletta',
      span: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzYWdyYWRhJTIwZmFtaWxpYXxlbnwxfHx8fDE3NjIzMDMzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Barcelona Sagrada Familia',
      span: 'col-span-1 row-span-2'
    },
    {
      src: 'https://images.unsplash.com/photo-1728740303677-da7b05eba98e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYSUyMGNvdW50cnlzaWRlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2MjM3MDcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Cambodia countryside',
      span: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1655803815059-8a0fabf5baad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW4lMjB1a3xlbnwxfHx8fDE3NjIzNzA2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'London Big Ben',
      span: 'col-span-1 row-span-1'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${image.span} relative overflow-hidden rounded-xl group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500`}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-sm drop-shadow-lg">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
