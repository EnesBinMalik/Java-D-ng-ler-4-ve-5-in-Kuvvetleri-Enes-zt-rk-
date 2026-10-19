/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Interactive Calculator for Java Loop Powers (4, 5, and 2)
 */
import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Layers, 
  ArrowRight, 
  Copy, 
  Check, 
  Info, 
  TrendingUp, 
  RotateCcw,
  Sparkles,
  Calculator,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { computePowers } from '../data/javaSnippets';

interface InteractiveCalculatorProps {
  n: number;
  setN: (val: number) => void;
  onRunTerminal: () => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  n,
  setN,
  onRunTerminal,
}) => {
  const [activeMode, setActiveMode] = useState<'4and5' | '2only' | 'all'>('4and5');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const presets = [20, 100, 625, 1000, 3125, 10000];

  const powers4 = useMemo(() => computePowers(4, n), [n]);
  const powers5 = useMemo(() => computePowers(5, n), [n]);
  const powers2 = useMemo(() => computePowers(2, n), [n]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getResultsString = () => {
    let out = `Java Döngüler - 4 ve 5'in Kuvvetleri (Sınır Sayı: ${n})\nHazırlayan: Enes Öztürk\n\n`;
    out += `--- 4'ün Kuvvetleri (Toplam ${powers4.length} adet) ---\n`;
    out += powers4.map(p => `4^${p.exponent} = ${p.power}`).join('\n');
    out += `\n\n--- 5'in Kuvvetleri (Toplam ${powers5.length} adet) ---\n`;
    out += powers5.map(p => `5^${p.exponent} = ${p.power}`).join('\n');
    return out;
  };

  return (
    <div className="space-y-6">
      {/* Banner / Assignment Context */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 p-6 border border-slate-800 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Java 101 Döngüler Ödevi
              </span>
              <span className="text-xs text-slate-400">
                İmza: <strong className="text-slate-200">Enes Öztürk</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Girilen Sayıya Kadar Olan Kuvvetleri Hesaplama
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Java döngülerinde <code className="text-amber-300 bg-slate-950/80 px-1.5 py-0.5 rounded text-xs border border-slate-800">i *= 4</code> ve <code className="text-emerald-300 bg-slate-950/80 px-1.5 py-0.5 rounded text-xs border border-slate-800">j *= 5</code> adımlarıyla çalışarak, girilen <strong className="text-white">n</strong> değerine kadar olan tüm kuvvetleri gerçek zamanlı hesaplayın.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => copyToClipboard(getResultsString(), 'all')}
              className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2 border border-slate-700/60 transition-all shadow-sm"
              title="Sonuçları kopyala"
            >
              {copiedSection === 'all' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Çıktıyı Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={onRunTerminal}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Konsolda Çalıştır</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveMode('4and5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === '4and5'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>4 ve 5&apos;in Kuvvetleri (Ödev)</span>
          </button>
          <button
            onClick={() => setActiveMode('2only')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === '2only'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2&apos;nin Kuvvetleri (Ders Konusu)</span>
          </button>
          <button
            onClick={() => setActiveMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2, 4 ve 5 Karşılaştırması</span>
          </button>
        </div>
      </div>

      {/* Input Control Center */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 sm:p-6 backdrop-blur">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Sınır Sayı Girişi */}
          <div className="lg:col-span-6 space-y-2">
            <label htmlFor="limit-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sınır Sayısı (<span className="text-amber-400 font-mono">n</span>)
            </label>
            <div className="relative flex items-center">
              <input
                id="limit-input"
                type="number"
                min="1"
                max="10000000"
                value={n || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setN(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="w-full h-12 pl-4 pr-24 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white font-mono text-lg font-bold placeholder-slate-600 transition-all"
                placeholder="Örn: 100"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setN(100)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                  title="Varsayılan 100 yap"
                >
                  Sıfırla
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {n < 1 ? (
                <span className="text-rose-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Lütfen 1 veya daha büyük bir pozitif tam sayı giriniz.
                </span>
              ) : (
                <span>
                  Java döngü koşulu: <code className="text-slate-300">i &lt;= {n}</code>
                </span>
              )}
            </p>
          </div>

          {/* Hızlı Örnek Değerler (Presets) */}
          <div className="lg:col-span-6 space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Hızlı Test Değerleri
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setN(val)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    n === val
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  n = {val.toLocaleString('tr-TR')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick summary stats strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">4&apos;ün Kuvvetleri</span>
            <span className="text-lg font-bold text-cyan-400 font-mono">{powers4.length} Adım</span>
            <span className="text-[10px] text-slate-500 block">En büyük: {powers4[powers4.length - 1]?.power || '-'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">5&apos;in Kuvvetleri</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">{powers5.length} Adım</span>
            <span className="text-[10px] text-slate-500 block">En büyük: {powers5[powers5.length - 1]?.power || '-'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">2&apos;nin Kuvvetleri</span>
            <span className="text-lg font-bold text-amber-400 font-mono">{powers2.length} Adım</span>
            <span className="text-[10px] text-slate-500 block">En büyük: {powers2[powers2.length - 1]?.power || '-'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">Zaman Karmaşıklığı</span>
            <span className="text-lg font-bold text-indigo-400 font-mono">O(log n)</span>
            <span className="text-[10px] text-slate-500 block">Bellek: O(1) sabit</span>
          </div>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className={`grid grid-cols-1 ${activeMode === 'all' ? 'lg:grid-cols-3' : activeMode === '2only' ? 'max-w-xl mx-auto' : 'lg:grid-cols-2'} gap-6`}>
        
        {/* 4'ün Kuvvetleri Kartı */}
        {(activeMode === '4and5' || activeMode === 'all') && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
                  4<sup>k</sup>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>4&apos;ün Kuvvetleri</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      i *= 4
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    4⁰, 4¹, 4², 4³ ... ≤ {n}
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(powers4.map(p => p.power).join(', '), '4')}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
                title="Sayıları Kopyala"
              >
                {copiedSection === '4' ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* List of powers of 4 */}
            <div className="mt-4 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {powers4.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Sınır sayısı 1&apos;den küçük olduğu için hiçbir kuvvet bulunamadı.
                </div>
              ) : (
                powers4.map((item) => {
                  const percent = Math.min(100, Math.max(2, (item.power / Math.max(1, n)) * 100));
                  return (
                    <div
                      key={item.power}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center">
                            #{item.step}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            4<sup>{item.exponent}</sup> =
                          </span>
                          <span className="text-base font-bold font-mono text-cyan-300">
                            {item.power.toLocaleString('tr-TR')}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.power} &le; {n} &#10003;
                        </span>
                      </div>

                      {/* Visual progress relative to n */}
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Next non-matching power */}
            {powers4.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Döngüyü sonlandıran değer:</span>
                <span className="font-mono text-rose-400/90 font-semibold">
                  4<sup>{powers4.length}</sup> = {(powers4[powers4.length - 1].power * 4).toLocaleString('tr-TR')} &gt; {n}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 5'in Kuvvetleri Kartı */}
        {(activeMode === '4and5' || activeMode === 'all') && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                  5<sup>k</sup>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>5&apos;in Kuvvetleri</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      j *= 5
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    5⁰, 5¹, 5², 5³ ... ≤ {n}
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(powers5.map(p => p.power).join(', '), '5')}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
                title="Sayıları Kopyala"
              >
                {copiedSection === '5' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* List of powers of 5 */}
            <div className="mt-4 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {powers5.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Sınır sayısı 1&apos;den küçük olduğu için hiçbir kuvvet bulunamadı.
                </div>
              ) : (
                powers5.map((item) => {
                  const percent = Math.min(100, Math.max(2, (item.power / Math.max(1, n)) * 100));
                  return (
                    <div
                      key={item.power}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-center">
                            #{item.step}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            5<sup>{item.exponent}</sup> =
                          </span>
                          <span className="text-base font-bold font-mono text-emerald-300">
                            {item.power.toLocaleString('tr-TR')}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.power} &le; {n} &#10003;
                        </span>
                      </div>

                      {/* Visual progress relative to n */}
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Next non-matching power */}
            {powers5.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Döngüyü sonlandıran değer:</span>
                <span className="font-mono text-rose-400/90 font-semibold">
                  5<sup>{powers5.length}</sup> = {(powers5[powers5.length - 1].power * 5).toLocaleString('tr-TR')} &gt; {n}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 2'nin Kuvvetleri Kartı (Temel Soru) */}
        {(activeMode === '2only' || activeMode === 'all') && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
                  2<sup>k</sup>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>2&apos;nin Kuvvetleri</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      i *= 2
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    2⁰, 2¹, 2², 2³ ... ≤ {n} (Ders Örneği)
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(powers2.map(p => p.power).join(', '), '2')}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
                title="Sayıları Kopyala"
              >
                {copiedSection === '2' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* List of powers of 2 */}
            <div className="mt-4 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {powers2.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Sınır sayısı 1&apos;den küçük olduğu için hiçbir kuvvet bulunamadı.
                </div>
              ) : (
                powers2.map((item) => {
                  const percent = Math.min(100, Math.max(2, (item.power / Math.max(1, n)) * 100));
                  return (
                    <div
                      key={item.power}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center">
                            #{item.step}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            2<sup>{item.exponent}</sup> =
                          </span>
                          <span className="text-base font-bold font-mono text-amber-300">
                            {item.power.toLocaleString('tr-TR')}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.power} &le; {n} &#10003;
                        </span>
                      </div>

                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-600 to-amber-400 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {powers2.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Döngüyü sonlandıran değer:</span>
                <span className="font-mono text-rose-400/90 font-semibold">
                  2<sup>{powers2.length}</sup> = {(powers2[powers2.length - 1].power * 2).toLocaleString('tr-TR')} &gt; {n}
                </span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Synchronous Comparison Matrix */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Döngü Adımları Karşılaştırma Matrisi (Üsler Tablosu)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Her adım k için 4 ve 5&apos;in aldığı değerlerin yan yana karşılaştırması
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
            Hazırlayan: Enes Öztürk
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                <th className="py-2.5 px-3">Üs (k)</th>
                <th className="py-2.5 px-3">4^k İfadesi</th>
                <th className="py-2.5 px-3">Değer (4)</th>
                <th className="py-2.5 px-3">Durum (i &le; {n})</th>
                <th className="py-2.5 px-3">5^k İfadesi</th>
                <th className="py-2.5 px-3">Değer (5)</th>
                <th className="py-2.5 px-3">Durum (j &le; {n})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {Array.from({ length: Math.max(powers4.length, powers5.length) + 1 }).map((_, idx) => {
                const val4 = Math.pow(4, idx);
                const val5 = Math.pow(5, idx);
                const ok4 = val4 <= n;
                const ok5 = val5 <= n;

                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-slate-300 font-bold">k = {idx}</td>
                    <td className="py-2.5 px-3 text-cyan-400">4<sup>{idx}</sup></td>
                    <td className="py-2.5 px-3 font-bold text-cyan-300">{val4.toLocaleString('tr-TR')}</td>
                    <td className="py-2.5 px-3">
                      {ok4 ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Yazdırılır
                        </span>
                      ) : (
                        <span className="text-rose-400/80">Döngüden Çıktı</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-400">5<sup>{idx}</sup></td>
                    <td className="py-2.5 px-3 font-bold text-emerald-300">{val5.toLocaleString('tr-TR')}</td>
                    <td className="py-2.5 px-3">
                      {ok5 ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Yazdırılır
                        </span>
                      ) : (
                        <span className="text-rose-400/80">Döngüden Çıktı</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
