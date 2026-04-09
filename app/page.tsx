import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Plus, 
  Target, 
  ChevronRight,
  Calendar
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden lg:flex">
        <div className="flex items-center gap-2 font-bold text-xl text-accent">
          <Sparkles size={24} />
          <span>StratAI</span>
        </div>
        <nav className="flex flex-col gap-2">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
          <NavItem icon={<Calendar size={18}/>} label="Calendar" />
          <NavItem icon={<BarChart3 size={18}/>} label="Analytics" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Content Strategy Planner
            </h1>
            <p className="text-slate-400 mt-1">Generate high-performance content pipelines in seconds.</p>
          </div>
          <button className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Plus size={18} />
            New Strategy
          </button>
        </header>

        {/* Planner UI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target size={18} className="text-accent"/> Parameters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Niche</label>
                  <input type="text" placeholder="e.g. Fintech SaaS" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Primary Goal</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none">
                    <option>Lead Generation</option>
                    <option>Brand Awareness</option>
                    <option>Product Education</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-medium transition-all">
                  Update Strategy
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Recommended Content Roadmap</h3>
            <StrategyCard 
              title="The Future of Decentralized Finance"
              desc="A deep dive into how 2025 will change retail banking accessibility."
              tag="Video Reel"
              priority="High"
            />
            <StrategyCard 
              title="5 Mistakes SaaS Founders Make with SEO"
              desc="Educational carousel highlighting common organic growth pitfalls."
              tag="Carousel"
              priority="Medium"
            />
            <StrategyCard 
              title="Scaling Content with AI Agents"
              desc="Process-oriented blog post with actionable code snippets."
              tag="Article"
              priority="High"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-accent/10 text-accent' : 'hover:bg-white/5 text-slate-400'
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function StrategyCard({ title, desc, tag, priority }: any) {
  return (
    <div className="glass-panel p-5 rounded-2xl group hover:border-accent/40 transition-all cursor-pointer flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-accent/20 text-accent tracking-tighter">
            {tag}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${
            priority === 'High' ? 'text-orange-400' : 'text-blue-400'
          }`}>
            {priority} Priority
          </span>
        </div>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-slate-400 text-sm max-w-lg">{desc}</p>
      </div>
      <ChevronRight className="text-slate-600 group-hover:text-accent transition-colors" size={20} />
    </div>
  );
}