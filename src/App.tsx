/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Java Döngüler: 4 ve 5'in Kuvvetleri Programı & Simülatörü
 * Hazırlayan: Enes Öztürk
 */
import React, { useState } from 'react';
import { 
  Calculator, 
  Cpu, 
  FileCode, 
  Terminal as TerminalIcon, 
  HelpCircle, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Flame,
  ArrowRight,
  Layers,
  Heart
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { LoopVisualizer } from './components/LoopVisualizer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { QuizSection } from './components/QuizSection';
import { AlgorithmicExplanation } from './components/AlgorithmicExplanation';
import { EnesSignatureModal } from './components/EnesSignatureModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [n, setN] = useState<number>(100);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/25 selection:text-amber-300">
      {/* Top Navbar with Enes Öztürk signature */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Tab Content Rendering */}
        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <InteractiveCalculator
              n={n}
              setN={setN}
              onRunTerminal={() => setActiveTab('terminal')}
            />
            {/* Embedded Algorithmic Explanation below the calculator for full context */}
            <div className="pt-4 border-t border-slate-800">
              <AlgorithmicExplanation />
            </div>
          </div>
        )}

        {activeTab === 'visualizer' && (
          <div className="animate-in fade-in duration-200">
            <LoopVisualizer n={n} />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-in fade-in duration-200">
            <JavaCodeViewer />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="animate-in fade-in duration-200">
            <TerminalSimulator initialN={n} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="animate-in fade-in duration-200">
            <QuizSection />
          </div>
        )}

      </main>

      {/* Author & Homework Signature Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              EÖ
            </div>
            <div>
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Java 101: 4 ve 5&apos;in Kuvvetleri Ödevi</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 inline" />
              </p>
              <p className="text-slate-500">
                Hazırlayan &amp; Geliştiren: <strong className="text-amber-400/90">Enes Öztürk</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-slate-300 transition-colors"
            >
              Kaynak Kodları (.java)
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="hover:text-slate-300 transition-colors"
            >
              Konsol Testi
            </button>
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              İmza Belgesi
            </button>
          </div>

          <div className="text-slate-600 font-mono text-[11px]">
            &copy; {new Date().getFullYear()} Enes Öztürk &bull; Tüm Hakları Saklıdır
          </div>

        </div>
      </footer>

      {/* Signature Modal */}
      <EnesSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        n={n}
      />
    </div>
  );
}
