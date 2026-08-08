import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, ShieldCheck, Cpu } from 'lucide-react';

export default function WhySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio playback error:", e);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section id="wyróżnia" className="py-20 bg-[#F5F5F7] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* 1. Apple Section Heading (1:1 match for IMG_2152.png) */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D2A44]">
            Co go wyróżnia.
          </h2>

          {/* Carousel Navigation Arrows (< >) in circular grey buttons (1:1 IMG_2152.png) */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Poprzednia karta"
              className="w-10 h-10 rounded-full bg-white border border-gray-300/80 flex items-center justify-center text-apple-dark hover:bg-gray-100 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Następna karta"
              className="w-10 h-10 rounded-full bg-white border border-gray-300/80 flex items-center justify-center text-apple-dark hover:bg-gray-100 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Horizontal Scrolling Cards Carousel (1:1 match for IMG_2152.png) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1: 1:1 match for Apple M5 Chip card in IMG_2152.png */}
          <div className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] bg-white rounded-3xl p-8 shadow-apple-card border border-gray-200/60 flex flex-col justify-between relative snap-start">
            <div>
              <p className="text-base sm:text-lg font-medium text-[#1D1D1F] leading-relaxed">
                Q9 to nie tylko czip nowej generacji. To czip, który przesuwa granice awioniki. Fenomenalny potencjał. Odrzutowy.
              </p>
            </div>

            {/* Glowing Q9 Chip Image (1:1 M5 match) */}
            <div className="my-8 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border border-gray-300/50 bg-[#1D1D1F]">
                <img
                  src="./images/chip-q9-quantum.jpg"
                  alt="Czip Q9 Aerospace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10"></div>
              </div>
            </div>

            {/* Apple Pause / Play Button (||) in bottom right (1:1 match for IMG_2152.png) */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-apple-blue transition-all duration-200 ${
                      isPlaying ? 'animate-pulse' : 'h-2 opacity-30'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(8, Math.sin(i * 0.8) * 16 + 12)}px` : '6px',
                      animationDelay: `${i * 70}ms`
                    }}
                  />
                ))}
                <span className="ml-1 text-[11px] text-apple-sub font-mono uppercase">
                  {isPlaying ? 'Odtwarzanie Keynote PL...' : 'Keynote Audio PL'}
                </span>
              </div>

              <button
                onClick={toggleAudio}
                aria-label="Odtwórz lub wstrzymaj nagranie Keynote Q9"
                className="w-10 h-10 rounded-full bg-[#E8E8ED] hover:bg-gray-300 transition-colors flex items-center justify-center text-[#1D1D1F] shadow-sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <audio
                ref={audioRef}
                src="./audio/jacek-keynote.mp3"
                onEnded={handleAudioEnded}
                preload="auto"
              />
            </div>
          </div>

          {/* Card 2: Range & Alpine Flight */}
          <div className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] bg-white rounded-3xl overflow-hidden shadow-apple-card border border-gray-200/60 flex flex-col justify-between relative snap-start group">
            <div className="p-8 relative z-10">
              <p className="text-base sm:text-lg font-medium text-white drop-shadow-md leading-relaxed">
                Do 450 km zasięgu na jednym ładowaniu. Nie spocznie oka nad szczytami Karkonoszy.
              </p>
            </div>

            <div className="absolute inset-0 z-0">
              <img
                src="./images/hero-evtol-sky.jpg"
                alt="Aero-X Horizon w locie nad szczytami"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            <div className="p-8 relative z-10 text-white/90 text-xs font-mono">
              <span>ZASIĘG W KORYTARZU WROCŁAW — KARPACZ: 18 MINUT</span>
            </div>
          </div>

          {/* Card 3: Acoustic Stealth & Bionic Rotors */}
          <div className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] bg-white rounded-3xl p-8 shadow-apple-card border border-gray-200/60 flex flex-col justify-between snap-start">
            <div>
              <div className="text-xs font-semibold text-apple-blue uppercase tracking-wider mb-2">
                Acoustic Stealth 2026
              </div>
              <p className="text-base sm:text-lg font-medium text-[#1D1D1F] leading-relaxed">
                Sześć wirników z powłoką bioniczną. Ciszej niż szum wiatru w dolinie.
              </p>
            </div>

            <div className="my-8 p-6 rounded-2xl bg-[#F5F5F7] border border-gray-200 text-center">
              <div className="text-3xl font-bold text-[#1D1D1F] font-mono">38 dB</div>
              <div className="text-xs text-apple-sub mt-1">Poziom hałasu na wysokości przelotowej</div>

              <div className="mt-6 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0071E3] w-1/4 rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] text-apple-sub mt-2 font-mono">
                <span>38 dB (Aero-X)</span>
                <span>85 dB (Tradycyjny śmigłowiec)</span>
              </div>
            </div>

            <div className="text-xs text-apple-sub">
              <span>* Weryfikowane w alpejskiej strefie ciszy Karkonoskiego Parku Narodowego.</span>
            </div>
          </div>

          {/* Card 4: Cockpit & Autopilot AI */}
          <div className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] bg-white rounded-3xl overflow-hidden shadow-apple-card border border-gray-200/60 flex flex-col justify-between relative snap-start group">
            <div className="p-8 relative z-10">
              <p className="text-base sm:text-lg font-medium text-white drop-shadow-md leading-relaxed">
                W pełni autonomiczny start i lądowanie z dowolnego lądowiska. Karkonoski Autopilot AI 2026.
              </p>
            </div>

            <div className="absolute inset-0 z-0">
              <img
                src="./images/cockpit-interior.jpg"
                alt="Wnętrze kokpitu Aero-X Horizon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            <div className="p-8 relative z-10 text-white/90 text-xs font-mono">
              <span>2-OSOBOWA KABINA Z PANORAMICZNĄ SZYBĄ Q-GLASS</span>
            </div>
          </div>
        </div>

        {/* Note about 100% Custom AI photography */}
        <div className="mt-8 text-center text-[11px] text-apple-sub font-mono">
          * WSZYSTKIE MATERIAŁY WIZUALNE I MODELE 3D W PORTFOLIO SĄ AUTORSKIMI KOMPONENTAMI AGENCYJNYMI AAAS • ZERO STOCKÓW
        </div>
      </div>
    </section>
  );
}
