import React from 'react';
import { Search, ShoppingBag, Menu, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenCheckout }) {
  return (
    <>
      {/* 1. Minimalist Top Apple Bar */}
      <header className="w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between text-[#1D1D1F]">
          {/* Apple / Aero-X Logo Icon */}
          <div className="flex items-center gap-1.5 font-semibold tracking-tight text-sm">
            <span className="w-4 h-4 rounded-full bg-apple-dark text-white flex items-center justify-center text-[10px] font-bold"></span>
            <span>Aero-X</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-normal text-apple-dark/80">
            <a href="#hero" className="hover:text-apple-blue transition-colors">Aero-X Horizon</a>
            <a href="#wyróżnia" className="hover:text-apple-blue transition-colors">Co go wyróżnia</a>
            <a href="#configurator" className="hover:text-apple-blue transition-colors">Konfigurator 3D</a>
            <a href="#specs" className="hover:text-apple-blue transition-colors">Specyfikacja Q9</a>
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Szukaj na stronie" className="text-apple-dark/80 hover:text-apple-blue">
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={onOpenCheckout}
              aria-label="Koszyk / Kup" 
              className="text-apple-dark/80 hover:text-apple-blue"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button aria-label="Menu" className="md:hidden text-apple-dark/80">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Apple Education/Innovation Banner (1:1 match for IMG_2151.png) */}
      <div className="w-full bg-[#F5F5F7] border-b border-gray-200/60 py-2.5 px-4 text-center text-xs text-apple-dark">
        <span>Kup Aero-X Horizon od 499 000 zł ze zniżką dla sektora innowacji*. </span>
        <button 
          onClick={onOpenCheckout}
          className="text-apple-blue font-medium hover:underline inline-flex items-center ml-1"
        >
          <span>Kup</span>
          <span className="ml-0.5">&gt;</span>
        </button>
      </div>

      {/* 3. Sticky Product Sub-header (1:1 match for IMG_2151.png & IMG_2152.png) */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/60 sticky top-11 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-lg text-[#1D1D1F]">
            <span>Aero-X Horizon</span>
            <ChevronDown className="w-4 h-4 text-apple-sub" />
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-apple-sub">
              Od 499 000 zł <span className="text-apple-dark font-medium">(lub 6 499 zł/m)</span>
            </span>
            <button
              onClick={onOpenCheckout}
              className="px-4 py-1.5 rounded-full bg-[#0071E3] text-white text-xs font-medium hover:bg-apple-blue-hover transition-all shadow-sm"
            >
              Kup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
