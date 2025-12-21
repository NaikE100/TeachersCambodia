import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { VisualShowcase } from './components/VisualShowcase';
import { DestinationGallery } from './components/DestinationGallery';
import { Destinations } from './components/Destinations';
import { ResumeUpload } from './components/ResumeUpload';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentCancel } from './components/PaymentCancel';
import { ChatWidget } from './components/ChatWidget';
import { Toaster } from './components/ui/sonner';

type PageView = 'home' | 'payment-success' | 'payment-cancel';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  const handleNavigate = (section: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for the view to change before scrolling
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    } else {
      scrollToSection(section);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentView('payment-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentCancel = () => {
    setCurrentView('payment-cancel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryPayment = () => {
    setCurrentView('home');
    setTimeout(() => {
      scrollToSection('payment');
    }, 100);
  };

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      <ChatWidget />
      
      {currentView === 'home' && (
        <>
          <Header onNavigate={handleNavigate} />
          <main>
            <Hero onNavigate={handleNavigate} />
            <AboutUs />
            <VisualShowcase />
            <DestinationGallery />
            <Services onNavigate={handleNavigate} />
            <Destinations />
            <ResumeUpload />
            <PaymentSection 
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentCancel={handlePaymentCancel}
            />
            <ContactSection />
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentView === 'payment-success' && (
        <PaymentSuccess onBackToHome={handleBackToHome} />
      )}

      {currentView === 'payment-cancel' && (
        <PaymentCancel 
          onBackToHome={handleBackToHome}
          onRetryPayment={handleRetryPayment}
        />
      )}
    </div>
  );
}
