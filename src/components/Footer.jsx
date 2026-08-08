import React from 'react';
import { Shield, CheckCircle2, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-gray-200/80 py-16 text-apple-sub text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-apple-dark font-sans text-base font-bold">
            <Cpu className="w-4 h-4 text-apple-blue" />
            <span>Aero-X Horizon</span>
          </div>
          <p className="text-[11px] text-apple-sub font-sans leading-relaxed">
            Pierwszy polski w pełni autonomiczny pojazd pionowego startu eVTOL z czipem Q9 Aerospace.
          </p>
          <div className="text-[11px] text-apple-sub">
            ul. Karkonoska 99, 58-540 Karpacz <br />
            Alt. 1 200m n.p.m. • Karkonosze
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <div className="text-apple-dark uppercase font-bold tracking-wider">DOSTĘPNOŚĆ & WCAG 2.2 AA</div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>WCAG 2.2 AA Compliance</span>
          </div>
          <p className="text-[11px] text-apple-sub font-sans">
            Wysoki kontrast min. 4.5:1, pełna obsługa klawiaturą oraz opisowe etykiety ARIA.
          </p>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <div className="text-apple-dark uppercase font-bold tracking-wider">WYDAJNOŚĆ & EDGE CDN</div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>PageSpeed A+ (&lt; 1000ms)</span>
          </div>
          <p className="text-[11px] text-apple-sub font-sans">
            Fastly CDN na GitHub Pages, zero przekierowań 301, zero CLS (0.00), relatywne ścieżki zasobów.
          </p>
        </div>

        {/* Col 4 */}
        <div className="space-y-2">
          <div className="text-apple-dark uppercase font-bold tracking-wider">PRAWO W POLSCE 2026</div>
          <div className="flex items-center gap-2 text-apple-blue">
            <Shield className="w-4 h-4" />
            <span>Zgodność prawna B2B/B2C</span>
          </div>
          <p className="text-[11px] text-apple-sub font-sans">
            Fakturowanie przez Inkubatory TwójStartup / Useme (VAT 23%) oraz Działalność Nierejestrowaną art. 5 Prawa przedsiębiorców.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-300/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-apple-sub">
        <div>
          © 2026 AERO-X HORIZON • Q9 AEROSPACE. WSZELKIE PRAWA ZASTRZEŻONE.
        </div>
        <div className="flex items-center gap-4">
          <span>APPLE 3D DESIGN STANDARD</span>
          <span>•</span>
          <span>100% CUSTOM AI PHOTOGRAPHY</span>
          <span>•</span>
          <span>ZERO AI SLOP</span>
        </div>
      </div>
    </footer>
  );
}
