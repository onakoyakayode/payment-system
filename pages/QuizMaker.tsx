import React, { useState } from "react";
// import { generateQuizFromTopic } from '../services/geminiService';
import { Sparkles, Loader2, Save, Play, Plus, Trash2 } from "lucide-react";
import { Quiz } from "../types";

const QuizMaker: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  // const handleGenerate = async () => {
  //   if (!topic) return;
  //   setLoading(true);
  //   const result = await generateQuizFromTopic(topic);
  //   if (result) {
  //     setQuiz({
  //       id: Math.random().toString(36).substr(2, 9),
  //       ...result,
  //     });
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Quiz Center</h1>
        <p className="text-slate-500">
          Create interactive assessments manually or with AI assistance.
        </p>
      </header>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-indigo-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
              AI Powered Creator
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Generate questions in seconds
          </h2>
          <p className="text-indigo-100 mb-6 text-sm opacity-90 leading-relaxed">
            Enter a subject, topic, or even paste a lesson transcript to
            automatically generate high-quality multiple choice questions.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Quantum Physics basics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40 text-sm"
            />
            <button
              // onClick={handleGenerate}
              disabled={loading || !topic}
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Sparkles size={20} />
              )}
              Generate
            </button>
          </div>
        </div>
        <div className="hidden md:block w-48 h-48 bg-white/10 rounded-full border-8 border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={64} className="text-white/20" />
          </div>
        </div>
      </div>

      {quiz && (
        <div className="space-y-6 animate-in slide-in-from-top-8 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">{quiz.title}</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
                <Play size={16} /> Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-100">
                <Save size={16} /> Save Quiz
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {quiz.questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">
                      {idx + 1}
                    </span>
                    <p className="font-semibold text-slate-800">{q.text}</p>
                  </div>
                  <button className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-11">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-sm font-medium ${
                        optIdx === q.correctAnswer
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-100 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {opt}
                      {optIdx === q.correctAnswer && (
                        <span className="ml-2 text-[10px] font-bold uppercase bg-emerald-100 px-1.5 py-0.5 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 font-semibold">
              <Plus size={20} /> Add New Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizMaker;
