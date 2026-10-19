/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Interactive Java Loops Knowledge Test
 * Hazırlayan: Enes Öztürk
 */
import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/javaSnippets';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === QUIZ_QUESTIONS.length;

  const correctCount = QUIZ_QUESTIONS.filter(
    q => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Öğrenme Değerlendirmesi
              </span>
              <span className="text-xs text-slate-400">Hazırlayan: <strong>Enes Öztürk</strong></span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Java Döngüler ve Kuvvet Mantığı Testi</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              For döngüsü, artış operatörleri ve algoritma mantığı bilginizi 4 pratik soruyla pekiştirin.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {showResults ? (
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Çöz</span>
              </button>
            ) : (
              <button
                onClick={() => setShowResults(true)}
                disabled={answeredCount === 0}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sonuçları Değerlendir ({answeredCount}/{QUIZ_QUESTIONS.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Score banner when evaluated */}
        {showResults && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <Award className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Başarı Skoru: %{scorePercentage} ({correctCount}/{QUIZ_QUESTIONS.length} Doğru)
                </h4>
                <p className="text-xs text-slate-400">
                  {scorePercentage >= 75
                    ? 'Tebrikler! Java döngü ve kuvvet algoritmalarını harika kavramışsınız.'
                    : 'Çözüm açıklamalarını inceleyerek döngü mantığını tekrar gözden geçirebilirsiniz.'}
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-xs text-indigo-300 font-mono font-semibold">
                Enes Öztürk &bull; Java 101
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl p-6 border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-950/10 border-emerald-500/40'
                    : 'bg-rose-950/10 border-rose-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {q.question}
                    </h3>
                    {q.codeSnippet && (
                      <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 inline-block">
                        {q.codeSnippet}
                      </div>
                    )}
                  </div>
                </div>

                {showResults && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4" /> Doğru
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                        <XCircle className="w-4 h-4" /> Yanlış
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5 ml-0 sm:ml-10">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-300';
                    } else {
                      optionStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-500/15 border-amber-500/60 text-amber-200 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5 ${
                          showResults && isThisCorrect
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                            : isSelected
                            ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                            : 'border-slate-700 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when showing results */}
              {showResults && (
                <div className="mt-4 ml-0 sm:ml-10 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Çözüm &amp; Açıklama (Enes Öztürk):
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
