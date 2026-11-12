'use client';

import { useState } from 'react';
import { Copy, Check, Download, Trash2 } from 'lucide-react';

interface CodeEditorProps {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  error?: string | null;
  downloadFileName?: string;
}

export function CodeEditor({
  label,
  value,
  onChange,
  readOnly = false,
  error,
  downloadFileName = 'request.ts',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono font-semibold text-slate-400 tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {!readOnly && onChange && value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {readOnly && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={!value}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-40 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1 min-h-100">
        <textarea
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={
            readOnly
              ? 'Generated JavaScript/TypeScript code will appear here...'
              : "Paste your cURL command here (e.g., curl 'https://api.example.com/users')..."
          }
          className={`w-full h-full font-mono text-sm p-4 rounded-xl border bg-slate-900 resize-none focus:outline-none transition ${
            readOnly
              ? 'text-cyan-300 border-slate-800'
              : error
              ? 'border-rose-700 focus:border-rose-600 text-slate-200'
              : 'border-slate-800 focus:border-cyan-500 text-slate-200'
          }`}
        />
      </div>

      {error && (
        <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 p-3 rounded-lg font-mono">
          🚨 {error}
        </div>
      )}
    </div>
  );
}