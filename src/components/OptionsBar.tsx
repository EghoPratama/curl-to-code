'use client';

import { GeneratorOptions, OutputTarget } from '@/types/curl';

interface OptionsBarProps {
  options: GeneratorOptions;
  setOptions: (val: GeneratorOptions | ((prev: GeneratorOptions) => GeneratorOptions)) => void;
  target: OutputTarget;
}

export function OptionsBar({ options, setOptions, target }: OptionsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs">
      <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={options.useTypeScript}
          onChange={(e) => setOptions((prev) => ({ ...prev, useTypeScript: e.target.checked }))}
          className="rounded border-slate-800 bg-slate-950 text-cyan-600 focus:ring-0"
        />
        TypeScript annotations
      </label>

      {target !== 'tanstack-query' && (
        <>
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.useAsyncAwait}
              onChange={(e) => setOptions((prev) => ({ ...prev, useAsyncAwait: e.target.checked }))}
              className="rounded border-slate-800 bg-slate-950 text-cyan-600 focus:ring-0"
            />
            Use <code className="text-cyan-400">async / await</code>
          </label>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeErrorHandling}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, includeErrorHandling: e.target.checked }))
              }
              className="rounded border-slate-800 bg-slate-950 text-cyan-600 focus:ring-0"
            />
            Include <code className="text-amber-400">try / catch</code> handling
          </label>
        </>
      )}
    </div>
  );
}