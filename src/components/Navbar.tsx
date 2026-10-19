/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Header & Author Signature Bar
 */
import React from 'react';
import { Code2, Sparkles, Terminal, CheckCircle2, Award, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSignatureModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSignatureModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-[2px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Java Döngüler</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Ödev Çözümü
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                Girilen sayıya kadar 4 ve 5&apos;in kuvvetlerini bulan interaktif Java programı
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Hesaplayıcı & Analiz
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'visualizer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Adım Adım İzleyici
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Java Kodları
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'terminal'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Konsol Simülatörü
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Test
            </button>
          </nav>

          {/* Enes Öztürk Signature Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSignatureModal}
              className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-amber-500/30 hover:border-amber-400/60 text-slate-200 hover:text-white transition-all shadow-md shadow-amber-950/20"
              title="Geliştirici İmzası ve Ödev Bilgisi"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                EÖ
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    Enes Öztürk
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <span className="text-[10px] text-amber-400/80 block leading-tight">
                  Ödev İmzası &times; Java 101
                </span>
              </div>
              <Award className="w-4 h-4 text-amber-400 ml-1 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-transform hidden sm:block" />
            </button>
          </div>

        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-900 gap-2 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Hesaplayıcı
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'visualizer' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Adım İzleyici
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'code' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Java Kodları
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'terminal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Konsol
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Test
          </button>
        </div>
      </div>
    </header>
  );
};
