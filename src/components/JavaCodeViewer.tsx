/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Java Source Code Viewer with Syntax Highlighting, Copy & Download
 * Hazırlayan: Enes Öztürk
 */
import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Terminal
} from 'lucide-react';
import { JAVA_SNIPPETS, JavaSnippet } from '../data/javaSnippets';

interface JavaCodeViewerProps {
  onRunTerminalWithCode?: (snippet: JavaSnippet) => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({ onRunTerminalWithCode }) => {
  const [activeSnippetId, setActiveSnippetId] = useState<string>(JAVA_SNIPPETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = JAVA_SNIPPETS.find(s => s.id === activeSnippetId) || JAVA_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentSnippet.code], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentSnippet.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Syntax highlighting helper for Java code
  const renderHighlightedCode = (rawCode: string) => {
    const lines = rawCode.split('\n');
    return lines.map((line, idx) => {
      let styledLine = line;

      // Color comments
      const isComment = /^\s*(\/\/|\/\*|\*)/.test(line);

      return (
        <div key={idx} className="table-row hover:bg-slate-900/60 transition-colors">
          <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-xs w-10">
            {idx + 1}
          </span>
          <span
            className={`table-cell font-mono text-xs whitespace-pre ${
              isComment ? 'text-emerald-500/80 italic' : 'text-slate-200'
            }`}
          >
            {highlightJavaKeywords(line)}
          </span>
        </div>
      );
    });
  };

  // Basic regex tokenizer for Java in UI
  const highlightJavaKeywords = (text: string) => {
    // If entire line is comment, return as is
    if (/^\s*(\/\/|\/\*|\*)/.test(text)) {
      return text;
    }

    const tokens = text.split(/(\b(?:public|class|static|void|main|int|long|String|for|while|if|else|return|new|import)\b|"(?:\\.|[^"\\])*")/g);

    return tokens.map((part, i) => {
      if (!part) return null;
      if (/^"(?:\\.|[^"\\])*"$/.test(part)) {
        return <span key={i} className="text-amber-300">{part}</span>;
      }
      if (/^(public|class|static|void|return|new|import)$/.test(part)) {
        return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
      }
      if (/^(int|long|String)$/.test(part)) {
        return <span key={i} className="text-cyan-400 font-semibold">{part}</span>;
      }
      if (/^(for|while|if|else)$/.test(part)) {
        return <span key={i} className="text-rose-400 font-semibold">{part}</span>;
      }
      if (part === 'System' || part === 'Scanner') {
        return <span key={i} className="text-blue-400 font-semibold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      {/* Code Header & Tab Selector */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Java Kod Kütüphanesi
              </span>
              <span className="text-xs text-slate-400">Hazırlayan: <strong>Enes Öztürk</strong></span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileCode className="w-5 h-5 text-amber-400" />
              <span>Döngü Çözümleri &amp; Java Sınıfları</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Patika Java 101 ödev gereksinimlerine tam uygun, test edilmiş ve derlenmeye hazır Java kodları.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all border border-slate-700/60 shadow-sm"
              title="Kodu panoya kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
              title="Java dosyasını bilgisayarına indir"
            >
              <Download className="w-4 h-4" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          {JAVA_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setActiveSnippetId(snippet.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                activeSnippetId === snippet.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="block">{snippet.title}</span>
              <span className={`text-[10px] block opacity-80 ${activeSnippetId === snippet.id ? 'text-slate-900' : 'text-slate-500'}`}>
                {snippet.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-1.5 ml-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              {currentSnippet.fileName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Java 8+ / SE 17 / SE 21 Uyumlu
            </span>
            <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              Enes Öztürk
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[550px] overflow-y-auto">
          <div className="table w-full">
            {renderHighlightedCode(currentSnippet.code)}
          </div>
        </div>

        {/* Footer Notes on active snippet */}
        <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentSnippet.description}</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="text-amber-400 hover:text-amber-300 font-medium underline flex items-center gap-1"
            >
              Panoya Kopyala
            </button>
          </div>
        </div>
      </div>

      {/* Code Breakdown & Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            1. Başlangıç Değeri (int i = 1)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Döngü <strong>1</strong> ile başlatılır çünkü 4⁰ = 1 ve 5⁰ = 1&apos;dir. 0 ile başlanırsa <code>0 * 4 = 0</code> olacağından sonsuz döngü oluşur.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            2. Artış Adımı (i *= 4 / j *= 5)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            <code>i++</code> yerine her adımda tabanla çarpılır (<code>i = i * 4</code>). Böylece gereksiz turlar atılmadan doğrudan üsler hesaplanır.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            3. Koşul Kontrolü (i &le; n)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Değer girilen sınır sayısını (<strong className="text-white">n</strong>) aştığı anda döngü anında kesilir ve fazladan işlem yapılmaz.
          </p>
        </div>
      </div>
    </div>
  );
};
