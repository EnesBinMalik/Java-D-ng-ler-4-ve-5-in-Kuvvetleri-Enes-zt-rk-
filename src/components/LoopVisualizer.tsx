/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Step-by-Step Java Loop Execution Visualizer
 * Hazırlayan: Enes Öztürk
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Eye, 
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Terminal as TerminalIcon
} from 'lucide-react';

interface LoopVisualizerProps {
  n: number;
}

export const LoopVisualizer: React.FC<LoopVisualizerProps> = ({ n }) => {
  const [selectedBase, setSelectedBase] = useState<4 | 5 | 2>(4);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200); // ms per step

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace steps
  const steps = React.useMemo(() => {
    const list: Array<{
      stepNumber: number;
      exponent: number;
      currentValue: number;
      conditionMet: boolean;
      printed: boolean;
      nextValue: number;
      codeLine: number; // 1: loop check, 2: print, 3: increment
      explanation: string;
    }> = [];

    let current = 1;
    let exp = 0;
    let stepNum = 1;

    // We trace until condition fails
    while (true) {
      const isCond = current <= n;
      const nextVal = current * selectedBase;

      list.push({
        stepNumber: stepNum,
        exponent: exp,
        currentValue: current,
        conditionMet: isCond,
        printed: isCond,
        nextValue: nextVal,
        codeLine: isCond ? 2 : 1,
        explanation: isCond
          ? `Adım ${stepNum}: Değişken i = ${current.toLocaleString('tr-TR')} (${selectedBase}^${exp}). Koşul (${current} <= ${n}) SAĞLANDI. Ekrana ${current} yazdırılıyor.`
          : `Bitiş Adımı: i = ${current.toLocaleString('tr-TR')} (${selectedBase}^${exp}) değeri sınır sayı ${n}'den BÜYÜKTÜR. Döngü sonlandı!`
      });

      if (!isCond) break;
      if (current > Math.floor(Number.MAX_SAFE_INTEGER / selectedBase)) break;

      current = nextVal;
      exp++;
      stepNum++;
    }

    return list;
  }, [selectedBase, n]);

  // Reset step if base or n changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedBase, n]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, playbackSpeed]);

  const activeStep = steps[currentStepIndex] || steps[0];
  const printedHistory = steps
    .slice(0, currentStepIndex + 1)
    .filter(s => s.printed)
    .map(s => s.currentValue);

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Döngü Bellek & İcra İzleyicisi
              </span>
              <span className="text-xs text-slate-400">Enes Öztürk</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Adım Adım Java Döngü Simülatörü</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Java derleyicisinin değişkenleri nasıl güncellediğini ve ekrana nasıl çıktı bastığını canlı izleyin.
            </p>
          </div>

          {/* Base selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-xs text-slate-400 px-2 font-medium">Taban:</span>
            <button
              onClick={() => setSelectedBase(4)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBase === 4
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4&apos;ün Kuvvetleri (Ödev)
            </button>
            <button
              onClick={() => setSelectedBase(5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBase === 5
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5&apos;in Kuvvetleri (Ödev)
            </button>
            <button
              onClick={() => setSelectedBase(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBase === 2
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2&apos;nin Kuvvetleri
            </button>
          </div>
        </div>

        {/* Playback & Step Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Başa Dön"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
              title="Önceki Adım"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-amber-500/20"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Durdur</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Otomatik Oynat</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
              title="Sonraki Adım"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speed slider */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Hız:</span>
            {[
              { label: 'Yavaş', ms: 1800 },
              { label: 'Normal', ms: 1200 },
              { label: 'Hızlı', ms: 600 },
            ].map(spd => (
              <button
                key={spd.label}
                onClick={() => setPlaybackSpeed(spd.ms)}
                className={`px-2 py-1 rounded-md font-mono ${
                  playbackSpeed === spd.ms
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Adım <span className="text-amber-400 font-bold">{currentStepIndex + 1}</span> / {steps.length}
          </div>
        </div>
      </div>

      {/* Interactive Trace Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Java Code with Active Line Highlight */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span>KuvvetlerOdev.java [İcra Bloğu]</span>
              </span>
              <span>Enes Öztürk</span>
            </div>

            <div className="space-y-1.5">
              <div className="text-slate-500">// Girilen n = {n} değeri için döngü</div>
              <div className="text-slate-400">
                <span className="text-purple-400">int</span> n = <span className="text-amber-400">{n}</span>;
              </div>

              {/* Loop line */}
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeStep.conditionMet
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                <span className="text-purple-400">for</span> (
                <span className="text-purple-400">int</span> i = <span className="text-amber-300">1</span>;{' '}
                <span className="font-bold underline">i &lt;= n</span>;{' '}
                <span className="text-cyan-300">i *= {selectedBase}</span>) &#123;
              </div>

              {/* Body line */}
              <div
                className={`pl-6 py-2 rounded-lg transition-colors ${
                  activeStep.printed
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 font-bold'
                    : 'text-slate-500'
                }`}
              >
                System.out.<span className="text-blue-400">println</span>(i);
              </div>

              <div className="text-slate-400">&#125;</div>
            </div>
          </div>

          {/* Explanation box */}
          <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
            <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Adım Özeti:
            </div>
            {activeStep.explanation}
          </div>
        </div>

        {/* Right: RAM & Variable State Inspector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>RAM / Değişken Durumu (Bellek Haritası)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Değişken: n</span>
                <span className="text-lg font-bold text-white font-mono">{n}</span>
                <span className="text-[10px] text-slate-500 block">Sınır Limit</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
                <span className="text-[10px] text-amber-400 block uppercase font-mono">Değişken: i</span>
                <span className="text-lg font-bold text-amber-300 font-mono">
                  {activeStep.currentValue.toLocaleString('tr-TR')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedBase}<sup>{activeStep.exponent}</sup> değeri
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Koşul: i &le; n</span>
                <span className="text-sm font-bold font-mono flex items-center gap-1 mt-1">
                  {activeStep.conditionMet ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> DOĞRU
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> YANLIŞ
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {activeStep.currentValue} &le; {n}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Sonraki: i *= {selectedBase}</span>
                <span className="text-sm font-bold text-cyan-300 font-mono mt-1 block">
                  {activeStep.nextValue.toLocaleString('tr-TR')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedBase}<sup>{activeStep.exponent + 1}</sup>
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Standard Output (Console) */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <TerminalIcon className="w-4 h-4 text-amber-400" />
                <span>Standart Çıktı (System.out)</span>
              </span>
              <span className="text-[11px] text-emerald-400">
                Yazdırılan Eleman: {printedHistory.length}
              </span>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3 min-h-[110px] max-h-[160px] overflow-y-auto space-y-1">
              <div className="text-slate-500">// {selectedBase}&apos;in kuvvetleri ekrana yazdırılıyor:</div>
              {printedHistory.length === 0 ? (
                <div className="text-slate-600 italic">Henüz hiçbir satır yazdırılmadı.</div>
              ) : (
                printedHistory.map((val, idx) => (
                  <div key={idx} className="text-emerald-400 flex items-center gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className="font-bold">{val}</span>
                    <span className="text-slate-500 text-[10px]">
                      ({selectedBase}<sup>{idx}</sup>)
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
