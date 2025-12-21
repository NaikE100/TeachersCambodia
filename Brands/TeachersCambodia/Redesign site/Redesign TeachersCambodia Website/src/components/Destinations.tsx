import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResumeUploadDialog } from './ResumeUploadDialog';
import { JobListingsDialog } from './JobListingsDialog';
import { ArrowRight } from 'lucide-react';

export function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobListingsOpen, setJobListingsOpen] = useState(false);

  const handleDestinationClick = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination);
    
    // If UAE or Europe - show job listings
    const jobBrowserDestinations = ['UAE', 'Europe'];
    if (jobBrowserDestinations.includes(destination.name)) {
      setJobListingsOpen(true);
    } else {
      // For teaching destinations, show direct resume upload
      setDialogOpen(true);
    }
  };
  const destinations = [
    {
      name: 'Cambodia',
      sector: 'Teaching',
      image: 'https://images.unsplash.com/photo-1611581719398-08fe2eb020c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYW4lMjBjaGlsZHJlbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjIzNzA2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Teaching positions in international schools and local education institutions.',
      highlights: ['Teaching Jobs', 'Low Cost of Living', 'Cultural Immersion']
    },
    {
      name: 'Online Teaching',
      sector: 'Teaching',
      image: 'https://images.unsplash.com/photo-1629893250402-bc171e8bbe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wJTIwY29mZmVlfGVufDF8fHx8MTc2MjM3MDYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Work from anywhere with global online teaching platforms and virtual classrooms.',
      highlights: ['Remote Work', 'Flexible Hours', 'Global Students']
    },
    {
      name: 'UAE',
      sector: 'Various Sectors',
      image: 'https://images.unsplash.com/photo-1738260530641-f945fa20a6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMG1hcmluYSUyMGx1eHVyeSUyMGhvdGVsc3xlbnwxfHx8fDE3NjIzNzA2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Premium hospitality positions in Kuwait & Dubai with competitive salaries and comprehensive benefits.',
      highlights: ['Tax-Free Income', 'Full Benefits', 'Hospitality Focus']
    },
    {
      name: 'Europe',
      sector: 'Various Sectors',
      image: 'https://images.unsplash.com/photo-1706363941346-2a5b6f16f424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFpbiUyMGJhcmNlbG9uYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjIzMTY2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Construction, transportation, automotive, and skilled trade positions across 6 European countries with accommodation included.',
      highlights: ['€2,000-€4,325', 'Housing Included', '100+ Positions']
    }
  ];

  return (
    <section id="destinations" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#FBBE3C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-[#FBBE3C]/5 rounded-full blur-3xl" />
      
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
              <span className="text-[#FBBE3C]">Partner Destinations</span>
            </div>
            <h2 className="mb-4 text-black">Where Will Your Journey Take You?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Teaching opportunities in Cambodia and online platforms, plus job placements across 
              various sectors in Malta, UAE, UK, and Europe.
            </p>
          </motion.div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white mb-1">{destination.name}</h3>
                      <Badge className={`${
                        destination.sector === 'Teaching' 
                          ? 'bg-[#FBBE3C] text-black' 
                          : 'bg-white/20 text-white backdrop-blur-sm'
                      }`}>
                        {destination.sector}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.map((highlight, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="bg-[#FBBE3C]/10 text-[#FBBE3C] border-[#FBBE3C]/20"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleDestinationClick(destination)}
                      className="w-full bg-[#FBBE3C] hover:bg-[#e5ab35] text-black group/btn"
                    >
                      {destination.sector === 'Various Sectors' ? 'View Jobs' : 'Apply Now'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-[#FBBE3C]/20">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="mb-3 text-black">Not Sure Which Opportunity is Right for You?</h3>
                <p className="text-gray-600">
                  Our expert team will help match you with the perfect opportunity based on your 
                  qualifications, experience, and career goals. Whether you're a teacher looking for 
                  positions in Cambodia or online platforms, or seeking opportunities in other sectors 
                  across Malta, UAE, UK, and Europe, we're here to guide you every step of the way.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Job Listings Dialog (for Various Sectors destinations) */}
      {selectedDestination?.sector === 'Various Sectors' && (
        <JobListingsDialog
          destination={selectedDestination.name}
          open={jobListingsOpen}
          onOpenChange={setJobListingsOpen}
        />
      )}

      {/* Resume Upload Dialog (for direct applications) */}
      <ResumeUploadDialog
        destination={selectedDestination}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
