/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Realistic Interactive Java Terminal / Console Simulator
 * Hazırlayan: Enes Öztürk
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  Trash2, 
  CornerDownLeft, 
  CheckCircle2, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { computePowers } from '../data/javaSnippets';

interface TerminalSimulatorProps {
  initialN?: number;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ initialN = 100 }) => {
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [logs, setLogs] = useState<Array<{ type: 'command' | 'output' | 'prompt' | 'error' | 'success'; text: string }>>([]);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Initial greeting
  useEffect(() => {
    runProgram(initialN);
  }, []);

  const runProgram = (limitVal: number) => {
    const p4 = computePowers(4, limitVal);
    const p5 = computePowers(5, limitVal);

    const newLogs: Array<{ type: 'command' | 'output' | 'prompt' | 'error' | 'success'; text: string }> = [
      { type: 'command', text: 'javac KuvvetlerOdev.java && java KuvvetlerOdev' },
      { type: 'output', text: '==================================================' },
      { type: 'output', text: '   4 ve 5\'in Kuvvetlerini Bulan Program' },
      { type: 'output', text: '   Hazırlayan: Enes Öztürk' },
      { type: 'output', text: '==================================================' },
      { type: 'prompt', text: `Lütfen sınır sayısını giriniz: ${limitVal}` },
    ];

    if (limitVal < 1) {
      newLogs.push({ type: 'error', text: 'Uyarı: Pozitif bir tam sayı (en az 1) girmelisiniz!' });
    } else {
      newLogs.push({ type: 'output', text: `\n--- ${limitVal} Sayısına Kadar 4'ün Kuvvetleri ---` });
      p4.forEach(item => {
        newLogs.push({ type: 'output', text: `${item.power}  (4^${item.exponent})` });
      });

      newLogs.push({ type: 'output', text: `\n--- ${limitVal} Sayısına Kadar 5'in Kuvvetleri ---` });
      p5.forEach(item => {
        newLogs.push({ type: 'output', text: `${item.power}  (5^${item.exponent})` });
      });

      newLogs.push({ type: 'success', text: '\nİşlem başarıyla tamamlandı. (Enes Öztürk)' });
      newLogs.push({ type: 'output', text: `[Döngü istatistiği: 4'ün ${p4.length} kuvveti, 5'in ${p5.length} kuvveti bulundu]` });
    }

    setLogs(newLogs);
    setIsWaitingForInput(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const val = parseInt(terminalInput.trim(), 10);
    if (isNaN(val)) {
      setLogs(prev => [
        ...prev,
        { type: 'command', text: terminalInput },
        { type: 'error', text: 'Hata: Lütfen geçerli bir tamsayı giriniz!' }
      ]);
    } else {
      runProgram(val);
    }
    setTerminalInput('');
  };

  const handleClear = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Java Runtime Environment
              </span>
              <span className="text-xs text-slate-400">Enes Öztürk</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-amber-400" />
              <span>İnteraktif Java Konsolu &amp; Terminali</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Komut satırında <code>KuvvetlerOdev.java</code> dosyasını çalıştırın ve girdi vererek çıktıları test edin.
            </p>
          </div>

          {/* Quick preset run buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Test:</span>
            {[50, 100, 625, 1000, 5000].map(val => (
              <button
                key={val}
                onClick={() => runProgram(val)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                n={val}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors ml-2"
              title="Konsolu Temizle"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-[11px]">
              enes@java-dev: ~/patika-java101
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              OpenJDK 21.0.2 Active
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-1.5 text-slate-200">
          <div className="text-slate-500 pb-2 border-b border-slate-800/80">
            OpenJDK 64-Bit Server VM (build 21.0.2+13-58, mixed mode, sharing)
            <br />
            Proje: 4 ve 5&apos;in Kuvvetleri Ödevi | Geliştirici: Enes Öztürk
          </div>

          {logs.map((log, index) => {
            if (log.type === 'command') {
              return (
                <div key={index} className="pt-2 text-slate-400 flex items-center gap-2">
                  <span className="text-amber-400 font-bold">enes@java-dev:~$</span>
                  <span className="text-white font-semibold">{log.text}</span>
                </div>
              );
            }
            if (log.type === 'prompt') {
              return (
                <div key={index} className="text-cyan-400 font-bold pt-1">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={index} className="text-rose-400 bg-rose-950/30 p-2 rounded border border-rose-900/50">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={index} className="text-emerald-400 font-bold pt-1">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={index} className="text-slate-300">
                {log.text}
              </div>
            );
          })}

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleManualSubmit} className="flex items-center border-t border-slate-800 bg-[#161b22] px-4 py-3">
          <span className="text-amber-400 font-bold mr-2 shrink-0">
            enes@java-dev:~$
          </span>
          <span className="text-slate-400 mr-2 shrink-0 hidden sm:inline">
            java KuvvetlerOdev
          </span>
          <input
            type="number"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Sınır sayısı girin ve Enter'a basın (Örn: 250)"
            className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Çalıştır</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Terminal Feature Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300">
          <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Scanner Sınıfı ile Girdi Alma
          </h4>
          <p className="text-slate-400">
            <code>Scanner input = new Scanner(System.in);</code> ifadesi standart klavye girdisini dinler. <code>nextInt()</code> fonksiyonu tamsayıyı okur.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300">
          <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Bellek Sızıntısı Koruması (Scanner.close)
          </h4>
          <p className="text-slate-400">
            Ödev kodunda <code>input.close();</code> çağrısı yapılarak sistem kaynağı (System.in resource stream) temiz bir şekilde serbest bırakılır.
          </p>
        </div>
      </div>
    </div>
  );
};
