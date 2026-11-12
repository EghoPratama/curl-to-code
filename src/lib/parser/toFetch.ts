import { GeneratorOptions, ParsedCurl } from '@/types/curl';

export function generateFetch(parsed: ParsedCurl, options: GeneratorOptions): string {
  const hasParams = Object.keys(parsed.queryParams).length > 0;
  const hasHeaders = Object.keys(parsed.headers).length > 0;
  const hasBody = parsed.body !== null;

  const lines: string[] = [];

  // 1. URL & Query Params
  if (hasParams) {
    lines.push(`const params = new URLSearchParams(${JSON.stringify(parsed.queryParams, null, 2)});`);
    lines.push(`const url = \`${parsed.url}?\${params.toString()}\`;\n`);
  } else {
    lines.push(`const url = '${parsed.url}';\n`);
  }

  // 2. Fetch Init Options
  const fetchOpts: string[] = [];
  if (parsed.method !== 'GET') {
    fetchOpts.push(`  method: '${parsed.method}',`);
  }
  if (hasHeaders) {
    const formattedHeaders = JSON.stringify(parsed.headers, null, 2)
      .split('\n')
      .map((l, idx) => (idx === 0 ? l : `  ${l}`))
      .join('\n');
    fetchOpts.push(`  headers: ${formattedHeaders},`);
  }
  if (hasBody) {
    if (parsed.isJsonBody) {
      const formattedBody = JSON.stringify(parsed.body, null, 2)
        .split('\n')
        .map((l, idx) => (idx === 0 ? l : `  ${l}`))
        .join('\n');
      fetchOpts.push(`  body: JSON.stringify(${formattedBody}),`);
    } else {
      fetchOpts.push(`  body: ${JSON.stringify(parsed.body)},`);
    }
  }

  const optsBlock = fetchOpts.length > 0 ? `{\n${fetchOpts.join('\n')}\n}` : '';

  // 3. Execution Block (Async/Await vs Promise .then)
  if (options.useAsyncAwait) {
    const indent = options.includeErrorHandling ? '  ' : '';
    if (options.includeErrorHandling) lines.push('try {');

    lines.push(`${indent}const response = await fetch(url${optsBlock ? `, ${optsBlock.replace(/\n/g, `\n${indent}`)}` : ''});`);
    if (options.includeErrorHandling) {
      lines.push(`${indent}if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);`);
    }
    lines.push(`${indent}const data${options.useTypeScript ? ': unknown' : ''} = await response.json();`);
    lines.push(`${indent}console.log(data);`);

    if (options.includeErrorHandling) {
      lines.push('} catch (error) {');
      lines.push('  console.error(\'Request failed:\', error);');
      lines.push('}');
    }
  } else {
    lines.push(`fetch(url${optsBlock ? `, ${optsBlock}` : ''})`);
    lines.push(`  .then((res) => {`);
    if (options.includeErrorHandling) {
      lines.push(`    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);`);
    }
    lines.push(`    return res.json();`);
    lines.push(`  })`);
    lines.push(`  .then((data) => console.log(data))`);
    if (options.includeErrorHandling) {
      lines.push(`  .catch((err) => console.error('Request failed:', err));`);
    }
  }

  return lines.join('\n');
}