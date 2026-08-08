import React from 'react';
import { Sliders, Cpu, Shield, Sparkles } from 'lucide-react';

export default function Configurator3D({ colorTheme, setColorTheme, explodedValue, setExplodedValue, onOpenCheckout }) {
  const themes = [
    { id: 'silver', name: 'Tytanowy Srebrny', hex: '#CBD5E1' },
    { id: 'black', name: 'Alpejska Czerń', hex: '#1E293B' },
    { id: 'navy', name: 'Gwiezdny Błękit', hex: '#1E3A8A' }
  ];

  return (
    <section id="configurator" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-apple-blue uppercase tracking-wider mb-2">
            Interaktywna Inżynieria 3D
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Skonfiguruj swój Aero-X Horizon.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-apple-sub leading-relaxed">
            Poznaj wewnętrzną architekturę karbonowego kadłuba i rdzenia awioniki Q9, przesuwając suwak rzutu rozstrzelonego w czasie rzeczywistym.
          </p>
        </div>

        {/* Configurator Card */}
        <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-apple-card grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Controls Column (6 cols) */}
          <div className="md:col-span-6 space-y-8">
            {/* 1. Color switcher */}
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
                1. Wybierz wykończenie kadłuba (3D WebGL):
              </label>
              <div className="flex flex-wrap gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setColorTheme(t.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all ${
                      colorTheme === t.id
                        ? 'bg-white border-apple-blue shadow-md font-semibold text-apple-dark'
                        : 'bg-white/60 border-gray-300 text-apple-sub hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="text-xs">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Apple Keynote Exploded View Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="exploded-slider" className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider">
                  2. Rzut Rozstrzelony 3D (Apple Hardware View):
                </label>
                <span className="text-xs font-mono font-bold text-apple-blue">
                  {explodedValue}% SEPARACJI
                </span>
              </div>
              <input
                id="exploded-slider"
                type="range"
                min="0"
                max="100"
                value={explodedValue}
                onChange={(e) => setExplodedValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-apple-blue"
                aria-label="Suwak rozstrzelenia komponentów 3D statku"
              />
              <div className="flex justify-between text-[11px] font-mono text-apple-sub mt-2">
                <span>Zwarty kadłub (0%)</span>
                <span>Rdzeń Q9 i wirniki (50%)</span>
                <span>Pełna separacja (100%)</span>
              </div>
            </div>

            {/* Spec readout card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-sub">Wybrane wykończenie:</span>
                <span className="font-semibold text-apple-dark">
                  {themes.find((t) => t.id === colorTheme)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-sub">Czip sterujący:</span>
                <span className="font-mono text-apple-blue font-bold">Q9 Aerospace (16-rdzeniowy)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-sub">Status lądowiska:</span>
                <span className="text-green-600 font-medium">Karpacz Alt. 1200m (Gotowy)</span>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-apple-sub block">Cena rezerwacji BLIK 10s:</span>
                  <span className="text-xl font-bold text-[#1D1D1F] font-mono">10 000 PLN</span>
                </div>
                <button
                  onClick={onOpenCheckout}
                  className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-xs font-medium hover:bg-apple-blue-hover transition-all shadow-sm"
                >
                  Rezerwuj alokację BLIK
                </button>
              </div>
            </div>
          </div>

          {/* Visual Showcase / Info Column (6 cols) */}
          <div className="md:col-span-6 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-inner flex flex-col justify-between h-full min-h-[320px]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-apple-blue uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>ARCHITEKTURA AWIONIKI Q9</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mt-1">
                Kwantowy rdzeń autonomiczny
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-apple-sub leading-relaxed">
                Po przesunięciu suwaka rzutu rozstrzelonego powyżej 10%, model WebGL ujawnia centralny czip sterujący Q9, który odpowiada za bioniczną synchronizację 6 wirników pionowych i wykrywanie przeszkód górskich w czasie rzeczywistym.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-apple-sub block">CZAS REAKCJI AUTOPILOTA:</span>
                <span className="font-bold text-apple-dark text-sm">0.4 ms</span>
              </div>
              <div>
                <span className="text-apple-sub block">REZERWA ZASILANIA NAD+:</span>
                <span className="font-bold text-apple-dark text-sm">45 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
