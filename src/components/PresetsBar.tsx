'use client';

import { CURL_PRESETS } from '@/lib/presets';

interface PresetsBarProps {
  onSelectPreset: (command: string) => void;
}

export function PresetsBar({ onSelectPreset }: PresetsBarProps) {
  return (
    <div className="flex items-center gap-2 text-xs flex-wrap">
      <span className="text-slate-500 font-medium">Try Presets:</span>
      <div className="flex gap-2 flex-wrap">
        {CURL_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset.command)}
            className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 rounded-md transition cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}