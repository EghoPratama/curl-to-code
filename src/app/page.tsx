'use client';

import { useMemo } from 'react';
import { GeneratorOptions, OutputTarget } from '@/types/curl';
import { parseCurlCommand } from '@/lib/parser/parseCurl';
import { generateFetch } from '@/lib/parser/toFetch';
import { generateAxios } from '@/lib/parser/toAxios';
import { generateTanStackQuery } from '@/lib/parser/toReactQuery';
import { CURL_PRESETS } from '@/lib/presets';
import { Header } from '@/components/Header';
import { OptionsBar } from '@/components/OptionsBar';
import { PresetsBar } from '@/components/PresetsBar';
import { CodeEditor } from '@/components/CodeEditor';
import { SeoSection } from '@/components/SeoSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const DEFAULT_OPTIONS: GeneratorOptions = {
  useAsyncAwait: true,
  includeErrorHandling: true,
  useTypeScript: true,
};

export default function Home() {
  const [curlInput, setCurlInput] = useLocalStorage<string>(
    'curl_converter_input',
    CURL_PRESETS[0].command
  );
  const [target, setTarget] = useLocalStorage<OutputTarget>('curl_converter_target', 'fetch');
  const [options, setOptions] = useLocalStorage<GeneratorOptions>(
    'curl_converter_options',
    DEFAULT_OPTIONS
  );

  const { output, error } = useMemo(() => {
    if (!curlInput.trim()) return { output: '', error: null };
    try {
      const parsed = parseCurlCommand(curlInput);
      let code = '';
      if (target === 'fetch') code = generateFetch(parsed, options);
      else if (target === 'axios') code = generateAxios(parsed, options);
      else if (target === 'tanstack-query') code = generateTanStackQuery(parsed, options);

      return { output: code, error: null };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }, [curlInput, target, options]);

  const fileExt = options.useTypeScript ? 'ts' : 'js';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <main className="h-screen p-4 sm:p-6 flex flex-col gap-4 w-full overflow-hidden">
        <Header target={target} setTarget={setTarget} />
        <OptionsBar options={options} setOptions={setOptions} target={target} />
        <PresetsBar onSelectPreset={(cmd) => setCurlInput(cmd)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
          <CodeEditor
            label="INPUT CURL COMMAND"
            value={curlInput}
            onChange={setCurlInput}
            error={error}
          />
          <CodeEditor
            label={`OUTPUT (${target.toUpperCase()})`}
            value={output}
            readOnly
            downloadFileName={`api-request.${fileExt}`}
          />
        </div>
      </main>

      <SeoSection />
    </div>
  );
}