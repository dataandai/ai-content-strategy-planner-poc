"use client";

import React, { useState } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Calendar, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Loader2
} from 'lucide-react';

export default function Dashboard() {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          niche, 
          goal: 'Brand Growth', 
          platforms: ['LinkedIn', 'Instagram', 'Twitter'] 
        }),
      });
      const data = await res.json();
      setStrategy(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-400">
          <Sparkles className="w-6 h-6" />
          <span>Stratos AI</span>
        </div>
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2 bg-slate-900 rounded-lg text-indigo-400 font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors">
            <Calendar size={18} /> Schedule
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors">
            <PieChart size={18} /> Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Content Strategy Planner</h1>
          <p className="text-slate-400">Generate high-converting content roadmaps in seconds.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <section className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Strategy Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Industry/Niche</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SaaS, Fitness, Coffee"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !niche}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  {loading ? 'Analyzing...' : 'Generate Roadmap'}
                </button>
              </div>
            </div>
          </section>

          {/* Result Section */}
          <section className="lg:col-span-2">
            {!strategy ? (
              <div className="h-64 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                <Layers className="mb-2 opacity-20" size={48} />
                <p>Results will appear here after generation</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Executive Summary */}
                <div className="bg-indigo-900/10 border border-indigo-500/30 p-6 rounded-2xl">
                  <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Executive Strategy
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{strategy.executive_summary}</p>
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-2 gap-4">
                  {strategy.pillars.map((pillar: string, idx: number) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Pillar {idx + 1}</span>
                      <p className="font-medium mt-1">{pillar}</p>
                    </div>
                  ))}
                </div>

                {/* Content Plan */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-sm">
                      <tr>
                        <th className="px-6 py-3">Content Title</th>
                        <th className="px-6 py-3">Platform</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.content_plan.map((item: any) => (
                        <tr key={item.id} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-medium">{item.title}</td>
                          <td className="px-6 py-4 text-slate-400 text-sm">
                            <span className="bg-slate-800 px-2 py-1 rounded">{item.platform}</span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                              Review <ArrowRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}