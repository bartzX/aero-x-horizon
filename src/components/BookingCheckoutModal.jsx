import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Zap, Clock, Lock } from 'lucide-react';

export default function BookingCheckoutModal({ isOpen, onClose }) {
  const [step, setStep] = useState('summary'); // 'summary', 'blik', 'success'
  const [blikCode, setBlikCode] = useState('');
  const [blikTimer, setBlikTimer] = useState(10);
  const [blikStatus, setBlikStatus] = useState('waiting'); // 'waiting', 'verifying', 'approved'
  const [includeLeasingSub, setIncludeLeasingSub] = useState(false);

  const baseDeposit = 10000;
  const leasingMonthly = 6499;
  const totalDeposit = baseDeposit + (includeLeasingSub ? leasingMonthly : 0);

  useEffect(() => {
    let timer;
    if (step === 'blik' && blikTimer > 0 && blikStatus === 'waiting') {
      timer = setInterval(() => {
        setBlikTimer((prev) => prev - 1);
      }, 1000);
    } else if (blikTimer === 0 && blikStatus === 'waiting') {
      handleBlikSubmit();
    }
    return () => clearInterval(timer);
  }, [step, blikTimer, blikStatus]);

  const handleBlikChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 6) {
      setBlikCode(val);
      if (val.length === 6) {
        setBlikStatus('verifying');
        setTimeout(() => {
          setBlikStatus('approved');
          setTimeout(() => {
            setStep('success');
          }, 800);
        }, 1200);
      }
    }
  };

  const handleBlikSubmit = () => {
    setBlikStatus('verifying');
    setTimeout(() => {
      setBlikStatus('approved');
      setTimeout(() => {
        setStep('success');
      }, 800);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-10 text-apple-dark max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Modal rezerwacji alokacji i płatności BLIK"
      >
        <button
          onClick={onClose}
          aria-label="Zamknij okno rezerwacji"
          className="absolute top-6 right-6 text-apple-sub hover:text-apple-dark transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'summary' && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-apple-blue uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>APPLE 3D STORE CHECKOUT • PL-CRO-2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Rezerwacja alokacji produkcyjnej
            </h3>
            <p className="mt-2 text-xs text-apple-sub leading-relaxed">
              Zadatek rezerwacyjny gwarantuje priorytetowy odbiór Twojej maszyny Aero-X Horizon w Karpaczu we wrześniu 2026.
            </p>

            <div className="my-8 p-6 rounded-2xl bg-[#F5F5F7] border border-gray-200/80 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-apple-dark">Aero-X Horizon (Q9 Aerospace)</span>
                <span className="font-mono font-bold text-[#1D1D1F]">499 000 zł</span>
              </div>
              <div className="flex justify-between items-center text-xs text-apple-sub">
                <span>Lądowisko macierzyste:</span>
                <span>Karpacz, Alt. 1 200m n.p.m.</span>
              </div>

              <div className="pt-4 border-t border-gray-200/80 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="leasing-check"
                  checked={includeLeasingSub}
                  onChange={(e) => setIncludeLeasingSub(e.target.checked)}
                  className="w-4 h-4 accent-apple-blue cursor-pointer"
                />
                <label htmlFor="leasing-check" className="text-xs text-apple-dark cursor-pointer">
                  Dołącz subskrypcję leasingu operacyjnego (<span className="text-apple-blue font-mono font-bold">+6 499 zł/mies.</span> z serwisem mobilnym 24/7)
                </label>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-between mb-8">
              <div>
                <span className="text-xs text-apple-sub block">Wymagany zadatek BLIK w weryfikacji 10s:</span>
                <span className="text-2xl font-bold font-mono text-apple-blue">
                  {totalDeposit.toLocaleString('pl-PL')} PLN
                </span>
              </div>

              <button
                onClick={() => setStep('blik')}
                className="px-8 py-3.5 rounded-full bg-[#0071E3] text-white text-xs font-medium hover:bg-apple-blue-hover transition-all shadow-md uppercase tracking-wider"
              >
                Przejdź do BLIK --- ---
              </button>
            </div>

            <div className="text-[11px] text-apple-sub font-mono text-center leading-relaxed">
              * Legalna transakcja na polskim rynku bez rejestracji firmy (Inkubatory TwójStartup / Useme.com z pełną fakturą VAT 23% lub Działalność Nierejestrowana art. 5 Prawa przedsiębiorców 2026).
            </div>
          </div>
        )}

        {step === 'blik' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-apple-blue/10 border border-apple-blue/30 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-apple-blue animate-pulse" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-apple-blue">
              KROK 2/2 • WERYFIKACJA BLIK W 10 SEKUND (PL-CRO-2026)
            </span>
            <h3 className="text-3xl font-bold text-[#1D1D1F] mt-2">
              Wpisz 6-cyfrowy kod <span className="font-mono text-apple-blue">BLIK</span>
            </h3>

            <p className="text-xs text-apple-sub max-w-md mx-auto mt-2">
              Kwota do zatwierdzenia: <strong className="text-apple-dark font-mono">{totalDeposit.toLocaleString('pl-PL')} PLN</strong>. <br />
              Wpisz kod z aplikacji bankowej (PKO BP, mBank, Santander, ING):
            </p>

            <div className="my-8 max-w-xs mx-auto">
              <input
                type="text"
                value={blikCode}
                onChange={handleBlikChange}
                placeholder="--- ---"
                maxLength={6}
                className="w-full text-center font-mono text-4xl tracking-[0.4em] py-4 bg-[#F5F5F7] border-2 border-apple-blue rounded-2xl text-apple-dark placeholder-gray-400 focus:outline-none focus:bg-white shadow-inner"
                autoFocus
              />
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-apple-sub">
                <Clock className="w-4 h-4 text-apple-blue" />
                <span>Czas na akceptację w aplikacji: <strong className="text-apple-dark">{blikTimer}s</strong></span>
              </div>
            </div>

            {blikStatus === 'verifying' && (
              <div className="p-4 rounded-xl bg-[#F5F5F7] border border-apple-blue text-apple-blue text-xs font-mono animate-pulse">
                Weryfikacja kodu BLIK... Proszę potwierdzić w aplikacji bankowej...
              </div>
            )}

            {blikStatus === 'approved' && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-500 text-green-700 text-xs font-mono">
                Płatność zatwierdzona! Zapisywanie slotu produkcyjnego...
              </div>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setStep('summary')}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-xs font-mono"
              >
                POWRÓT
              </button>
              <button
                onClick={handleBlikSubmit}
                className="px-8 py-2.5 rounded-full bg-[#0071E3] text-white font-medium text-xs font-mono uppercase shadow-sm"
              >
                SYMULUJ AKCEPTACJĘ (TEST)
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-green-600">
              REZERWACJA POTWIERDZONA (0% OVERBOOKINGU)
            </span>
            <h3 className="text-3xl font-bold text-[#1D1D1F] mt-2">
              Twój Aero-X Horizon jest zarezerwowany.
            </h3>

            <p className="text-xs sm:text-sm text-apple-sub max-w-lg mx-auto mt-3 leading-relaxed">
              Zadatek rezerwacyjny (<strong className="text-apple-dark">{totalDeposit.toLocaleString('pl-PL')} PLN</strong>) został pomyślnie zweryfikowany w systemie BLIK. Twój numer seryjny awioniki Q9 to <strong className="text-apple-blue font-mono">#AERO-X-2026-991</strong>.
            </p>

            <div className="mt-6 p-6 rounded-2xl bg-[#F5F5F7] border border-gray-200/80 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-apple-sub">
              <div className="flex justify-between">
                <span>Lokalizacja odboru:</span>
                <span className="text-apple-dark font-semibold">Karpacz, ul. Karkonoska 99</span>
              </div>
              <div className="flex justify-between">
                <span>Gwarancja serwisu AI:</span>
                <span className="text-apple-blue">24/7 Autopilot Support</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('summary');
                onClose();
              }}
              className="mt-8 px-10 py-3.5 rounded-full bg-[#0071E3] text-white font-medium text-xs tracking-wider uppercase shadow-md hover:bg-apple-blue-hover transition-all"
            >
              ZAMKNIJ MODAL & WRÓĆ DO STRONY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
