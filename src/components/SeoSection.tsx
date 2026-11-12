export function SeoSection() {
  return (
    <section className="w-full border-t border-slate-900 bg-slate-950/60 py-16 px-4 sm:px-6 text-slate-400">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-200 tracking-tight">
            Convert cURL Commands to Fetch, Axios &amp; TanStack Query Instantly
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">cURL to Code Converter</strong> transforms raw terminal or Chrome DevTools <code className="text-cyan-400">curl</code> commands into clean, production-ready <strong className="text-cyan-400">JavaScript Fetch API</strong>, <strong className="text-cyan-400">Axios</strong>, and <strong className="text-emerald-400">React Query (TanStack Query)</strong> hooks. Everything executes 100% locally in your browser so your API keys and bearer tokens remain completely private.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-base font-semibold text-slate-200">cURL to Native Fetch</h3>
            <p className="text-xs leading-relaxed">
              Automatically extracts query parameters into <code className="text-cyan-400">URLSearchParams</code>, parses JSON payloads, sets HTTP headers, and wraps requests in clean <code className="text-cyan-400">async/await</code> blocks.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-base font-semibold text-slate-200">cURL to Axios</h3>
            <p className="text-xs leading-relaxed">
              Generates structured <code className="text-cyan-400">axios.request()</code> configurations with separated <code className="text-cyan-400">params</code>, <code className="text-cyan-400">headers</code>, and <code className="text-cyan-400">data</code> properties.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-base font-semibold text-slate-200">cURL to TanStack Query</h3>
            <p className="text-xs leading-relaxed">
              Intelligently detects <code className="text-emerald-400">GET</code> requests to generate <code className="text-emerald-400">useQuery</code> hooks, while <code className="text-amber-400">POST/PUT/DELETE</code> commands generate ready-to-use <code className="text-amber-400">useMutation</code> hooks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}