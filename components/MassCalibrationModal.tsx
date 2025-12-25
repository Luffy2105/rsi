
import React, { useState, useRef, useEffect } from 'react';
import { X, Settings2, Zap, AlertCircle, CheckCircle2, RefreshCw, ChevronDown } from 'lucide-react';

interface MassCalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MassCalibrationModal: React.FC<MassCalibrationModalProps> = ({ isOpen, onClose }) => {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [step, setStep] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSektor, setSelectedSektor] = useState('Semua Sektor (Global)');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    'Semua Sektor (Global)',
    'Sektor A - Gambut Utara',
    'Sektor B - Pesisir Timur',
    'Sektor C - Pedalaman Barat'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const startCalibration = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setStep(2);
      setIsCalibrating(false);
    }, 3000);
  };

  const handleClose = () => {
    setStep(1);
    setIsCalibrating(false);
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleClose} />
      
      <div className="relative w-full max-w-lg bg-[#0d1614] border border-white/10 rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <Settings2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Kalibrasi Massal</h3>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">Sinkronisasi Offset Perangkat</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <div className="space-y-10">
              {/* Alert Box */}
              <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-[24px] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="text-orange-500" size={20} />
                </div>
                <p className="text-[11px] text-orange-200/60 font-bold leading-relaxed">
                  Perhatian: Kalibrasi massal akan menyebabkan jeda penerimaan data selama kurang lebih 5-10 menit untuk semua perangkat yang dipilih.
                </p>
              </div>

              {/* Sektor Selector */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pilih Sektor Target</label>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-white/[0.03] border rounded-2xl py-5 px-6 flex items-center justify-between text-sm font-black transition-all ${isDropdownOpen ? 'border-emerald-500 text-emerald-500' : 'border-white/10 text-white'}`}
                  >
                    {selectedSektor}
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#111d1a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedSektor(opt);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-6 py-4 text-xs font-bold transition-colors ${selectedSektor === opt ? 'bg-emerald-500 text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Value Input */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nilai Offset Referensi (cm)</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm font-black text-white outline-none focus:border-emerald-500 transition-all group-hover:border-white/20" 
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500 uppercase">CM</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-in zoom-in duration-500">
                <CheckCircle2 size={48} className="text-[#0d1614]" />
              </div>
              <div>
                <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Kalibrasi Berhasil</h4>
                <p className="text-slate-500 font-bold text-sm mt-3 leading-relaxed">Parameter offset baru telah disinkronkan ke<br/>seluruh infrastruktur di {selectedSektor}.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
          <button 
            onClick={handleClose}
            className="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            {step === 1 ? 'Batalkan' : 'Tutup Konsol'}
          </button>
          
          {step === 1 && (
            <button 
              onClick={startCalibration}
              disabled={isCalibrating}
              className="bg-emerald-500 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-3 shadow-[0_12px_24px_-8px_rgba(16,185,129,0.4)] disabled:opacity-50"
            >
              {isCalibrating ? (
                <>Sedang Memproses <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Mulai Kalibrasi <Zap size={18} fill="currentColor" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MassCalibrationModal;
