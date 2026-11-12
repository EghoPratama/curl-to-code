'use client';

import { OutputTarget } from '@/types/curl';
import { Terminal, Globe, Boxes, RefreshCw } from 'lucide-react';

interface HeaderProps {
  target: OutputTarget;
  setTarget: (target: OutputTarget) => void;
}

export function Header({ target, setTarget }: HeaderProps) {
  const targets: { id: OutputTarget; label: string; icon: any }[] = [
    { id: 'fetch', label: 'Fetch API', icon: Globe },
    { id: 'axios', label: 'Axios', icon: Boxes },
    { id: 'tanstack-query', label: 'TanStack Query', icon: RefreshCw },
  ];

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
      <div>
        <h1 className="text-xl font-bold tracking-wider text-cyan-400 flex items-center gap-2">
          <Terminal className="w-6 h-6" /> cURL ➔ Code Converter
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Convert cURL commands to Fetch, Axios &amp; TanStack Query hooks instantly
        </p>
      </div>

      <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
        {targets.map((t) => {
          const Icon = t.icon;
          const active = target === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTarget(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                active
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}