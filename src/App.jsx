import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhySection from './components/WhySection';
import Configurator3D from './components/Configurator3D';
import BookingCheckoutModal from './components/BookingCheckoutModal';
import Footer from './components/Footer';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState('silver');
  const [explodedValue, setExplodedValue] = useState(0);

  const handleScrollToConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-apple-dark font-sans">
      <Navbar
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <main className="flex-grow">
        <Hero
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          onScrollToConfigurator={handleScrollToConfigurator}
          colorTheme={colorTheme}
          explodedValue={explodedValue}
        />

        <WhySection />

        <Configurator3D
          colorTheme={colorTheme}
          setColorTheme={setColorTheme}
          explodedValue={explodedValue}
          setExplodedValue={setExplodedValue}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      </main>

      <BookingCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <Footer />
    </div>
  );
}
