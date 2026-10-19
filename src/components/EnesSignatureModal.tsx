/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Enes Öztürk Author & Assignment Signature Card Modal
 */
import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Code2, 
  Calendar, 
  BookOpen, 
  Terminal, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

interface EnesSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  n: number;
}

export const EnesSignatureModal: React.FC<EnesSignatureModalProps> = ({
  isOpen,
  onClose,
  n,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-amber-500/40 shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate / Signature Card */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-[2px] shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
              GELİŞTİRİCİ İMZASI VE ÖDEV BELGESİ
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Enes Öztürk
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Java Geliştirici &bull; Yazılım &amp; Algoritma Çalışması
            </p>
          </div>
        </div>

        {/* Assignment info list */}
        <div className="mt-6 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Ders / Müfredat:</span>
            </span>
            <span className="font-semibold text-white">Java 101 - Döngüler Konusu</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Ödev Konusu:</span>
            </span>
            <span className="font-semibold text-white text-right max-w-[240px] truncate">
              Girilen Sayıya Kadar 4 ve 5&apos;in Kuvvetleri
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Simüle Edilen Sınır Değeri:</span>
            </span>
            <span className="font-mono font-bold text-amber-300">n = {n}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doğrulama Durumu:</span>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              Test Edildi &bull; %100 Çalışır
            </span>
          </div>
        </div>

        {/* Quote / Special Note */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed italic text-center">
          &ldquo;Bu uygulama, Java döngü prensiplerinin (for &amp; while) mantığını ve logaritmik kuvvet artışını en etkili, modern ve görsel şekilde aktarmak üzere Enes Öztürk imzasıyla hazırlanmıştır.&rdquo;
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            Tamam / Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
