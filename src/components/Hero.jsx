import React from 'react';
import AeroX3dCanvas from '../canvas/AeroX3dCanvas';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function Hero({ onOpenCheckout, onScrollToConfigurator, colorTheme, explodedValue }) {
  return (
    <section id="hero" className="relative w-full bg-gradient-to-b from-[#EBF5FF] via-[#F4F9FF] to-white pt-8 pb-16 border-b border-gray-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        {/* 1. 3D WebGL / HTML5 Canvas Hovering eVTOL Model (1:1 Apple 3D Hero representation) */}
        <div className="w-full h-[380px] sm:h-[460px] md:h-[540px] relative">
          <AeroX3dCanvas colorTheme={colorTheme} explodedValue={explodedValue} />
        </div>

        {/* 2. Apple Typography (1:1 match for IMG_2151.png) */}
        <div className="mt-4 max-w-2xl px-4">
          <div className="text-sm md:text-base font-semibold text-[#1D1D1F] tracking-tight">
            Aero-X Horizon
          </div>

          <h1 className="mt-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1E3A8A] leading-[1.05]">
            Lot przychodzi lekko.
          </h1>

          <p className="mt-3 text-base sm:text-lg font-medium text-[#C25E00]">
            Teraz turbodopalany przez czip Q9 Aerospace.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-apple-sub font-normal max-w-xl mx-auto leading-relaxed">
            Pierwszy w pełni autonomiczny polski luksusowy pojazd pionowego startu eVTOL. Zaprojektowany do lotów nad Karkonoszami z cichym napędem bionicznym.
          </p>
        </div>

        {/* 3. Bottom Hero Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={onOpenCheckout}
            className="px-8 py-3 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:bg-apple-blue-hover transition-all shadow-md"
          >
            Kup teraz / Rezerwuj BLIK 10s
          </button>

          <button
            onClick={onScrollToConfigurator}
            className="px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-sm font-medium hover:bg-gray-200/80 transition-all border border-gray-300/60 inline-flex items-center gap-1"
          >
            <span>Konfigurator 3D</span>
            <ChevronRight className="w-4 h-4 text-apple-blue" />
          </button>
        </div>

        {/* 4. Apple Price Sticky Row Representation */}
        <div className="mt-12 w-full max-w-md mx-auto py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-apple-sub block">Cena alokacji produkcyjnej:</span>
            <span className="text-base font-semibold text-[#1D1D1F]">Od 499 000 zł</span>
          </div>
          <button
            onClick={onOpenCheckout}
            className="px-5 py-2 rounded-full bg-[#0071E3] text-white text-xs font-medium hover:bg-apple-blue-hover transition-all"
          >
            Kup
          </button>
        </div>
      </div>
    </section>
  );
}
