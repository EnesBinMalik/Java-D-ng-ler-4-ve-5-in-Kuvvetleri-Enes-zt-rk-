/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Algorithmic Analysis & Teacher Notes
 * Hazırlayan: Enes Öztürk
 */
import React from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  AlertTriangle, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp,
  FileText
} from 'lucide-react';

export const AlgorithmicExplanation: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Hero */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Algoritma &amp; Matematiksel Temeller
          </span>
          <span className="text-xs text-slate-400">Enes Öztürk Rehberi</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Java Döngülerinde Kuvvet Hesaplama Mantığı</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Bu program, kullanıcının girdiği pozitif bir tam sayıya (<code className="text-amber-300">n</code>) kadar olan 4 ve 5&apos;in kuvvetlerini ekrana yazdırır. Aşağıda döngünün çalışma prensibi ve kritik tasarım kararları detaylandırılmıştır.
        </p>
      </div>

      {/* Grid of Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Concept 1: Neden i *= 4 ve j *= 5? */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            1. Neden &apos;i *= 4&apos; Kullanıyoruz? (Aritmetik vs Geometrik Artış)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Standart döngülerde kullanılan <code>i++</code> (veya <code>i += 4</code>) doğrusal/aritmetik artış sağlar ve 4&apos;ün <strong>katlarını</strong> üretir (4, 8, 12, 16...).
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Oysa ödev bizden 4&apos;ün <strong>kuvvetlerini</strong> (üslerini) istemektedir. Bir sayının kuvvetleri geometrik olarak katlanarak büyür:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
            i = 1 &rarr; i = 1 * 4 = 4 &rarr; i = 4 * 4 = 16 &rarr; i = 16 * 4 = 64 ...
          </div>
          <p className="text-xs text-slate-400">
            <code>i *= 4</code> komutu, her döngü adımında i&apos;yi doğrudan 4 ile çarparak bir sonraki kuvvete zıplatır.
          </p>
        </div>

        {/* Concept 2: Başlangıç Değeri (0 mı 1 mi?) */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            2. Kritik Hata Uyarısı: &apos;int i = 0&apos; Sonsuz Döngüsü
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Yeni başlayan öğrencilerin en sık düştüğü tuzak döngüyü <code>i = 0</code> ile başlatmaktır.
          </p>
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 font-mono">
            for (int i = 0; i &lt;= n; i *= 4) &#123; ... &#125; // &times; SONSUZ DÖNGÜ!
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Çünkü <code>0 * 4 = 0</code> olacağından, i değeri hiçbir zaman 0&apos;dan farklı bir değere ulaşamaz. Koşul (<code className="text-rose-300">0 &lt;= n</code>) daima doğru kalır ve program kilitlenir.
          </p>
          <p className="text-xs text-slate-400">
            Ayrıca matematiksel olarak <strong>4⁰ = 1</strong> ve <strong>5⁰ = 1</strong> olduğundan, başlangıç değeri kesinlikle <strong>1</strong> olmalıdır.
          </p>
        </div>

        {/* Concept 3: Zaman ve Alan Karmaşıklığı */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            3. Algoritmik Karmaşıklık (Time &amp; Space Complexity)
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zaman Karmaşıklığı: O(log₄ n) ve O(log₅ n)</strong><br />
                Her adımda değişken 4 veya 5 katına çıktığı için, döngü logaritmik hızda çalışır. Örneğin n = 1.000.000 için döngü sadece 10 adımda tamamlanır!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Alan (Bellek) Karmaşıklığı: O(1)</strong><br />
                Hiçbir dizi veya liste oluşturulmadan, yalnızca tek bir ilkel tamsayı (int) değişkeni tutulduğu için bellek tüketimi sabittir.
              </span>
            </li>
          </ul>
        </div>

        {/* Concept 4: Sayı Taşması ve Veri Tipleri */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            4. Tamsayı Taşması (Integer Overflow) ve Sınırlar
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Java&apos;da standart <code>int</code> türü 32-bittir ve en fazla <code>2.147.483.647</code> değerini tutabilir.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div>4&sup1;&sup5; = 1.073.741.824 (int sınırları içinde)</div>
            <div className="text-rose-400">4&sup1;&sup6; = 4.294.967.296 (int taşar! long gerekir)</div>
          </div>
          <p className="text-xs text-slate-400">
            Programımız standart öğrenci senaryoları için <code>int</code>, çok büyük sayılar için ise <code>long</code> tipiyle güvenli çalışacak şekilde tasarlanmıştır.
          </p>
        </div>

      </div>

      {/* Enes Öztürk Signature Box */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-base shadow-inner">
              EÖ
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Enes Öztürk&apos;ten Temiz Kod Tavsiyesi</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                &ldquo;Döngü kurarken `Math.pow()` metoduna başvurmak yerine doğrudan çarpım operatörünü (`i *= 4`) kullanmak, hem işlemci döngülerini minimuma indirir hem de kayan nokta (double hassasiyeti) hatalarının önüne geçer.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
