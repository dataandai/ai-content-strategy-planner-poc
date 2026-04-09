 'use client';

import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, Calendar, Search, ArrowRight, Loader2, Target, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);
  const [form, setForm] = useState({ niche: '', audience: '', goal: 'Growth' });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStrategy(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ContentAI</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-slate-400 font-medium">
          <a href="#" className="hover:text-indigo-400 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Calendar</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Analytics</a>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all">
          Upgrade Pro
        </button>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
                AI Content Strategy Planner
              </h1>
              <p className="text-slate-400 text-lg">
                Transform your niche into a data-driven 30-day content engine in seconds.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" /> Your Niche
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI SaaS, Sustainable Fashion"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" /> Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g. CTOs, Hobbyist Gardeners"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Strategy</>}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            {!strategy ? (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                <LayoutDashboard className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg">Your personalized strategy will appear here</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-indigo-400 mb-2">{strategy.strategy_name}</h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {strategy.pillars.map((pillar: string, idx: number) => (
                      <span key={idx} className="bg-slate-800 text-xs font-semibold px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 font-bold text-xl">
                    <Calendar className="w-5 h-5 text-indigo-500" /> 7-Day Roadmap Preview
                  </h3>
                  <div className="grid gap-4">
                    {strategy.schedule.map((item: any) => (
                      <div key={item.day} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:border-slate-600 transition-colors">
                        <div className="flex items-center gap-5">
                          <div className="bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-indigo-400">
                            {item.day}
                          </div>
                          <div>
                            <p className="font-bold">{item.topic}</p>
                            <p className="text-sm text-slate-500">{item.format} • Goal: {item.objective}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-700" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}