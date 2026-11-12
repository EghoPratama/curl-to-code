import { GeneratorOptions, ParsedCurl } from '@/types/curl';

export function generateAxios(parsed: ParsedCurl, options: GeneratorOptions): string {
  const hasParams = Object.keys(parsed.queryParams).length > 0;
  const hasHeaders = Object.keys(parsed.headers).length > 0;
  const hasBody = parsed.body !== null;

  const lines: string[] = [`import axios from 'axios';\n`];

  const configProps: string[] = [
    `  method: '${parsed.method.toLowerCase()}',`,
    `  url: '${parsed.url}',`,
  ];

  if (hasParams) {
    const formattedParams = JSON.stringify(parsed.queryParams, null, 2)
      .split('\n')
      .map((l, idx) => (idx === 0 ? l : `  ${l}`))
      .join('\n');
    configProps.push(`  params: ${formattedParams},`);
  }

  if (hasHeaders) {
    const formattedHeaders = JSON.stringify(parsed.headers, null, 2)
      .split('\n')
      .map((l, idx) => (idx === 0 ? l : `  ${l}`))
      .join('\n');
    configProps.push(`  headers: ${formattedHeaders},`);
  }

  if (hasBody) {
    const formattedData = JSON.stringify(parsed.body, null, 2)
      .split('\n')
      .map((l, idx) => (idx === 0 ? l : `  ${l}`))
      .join('\n');
    configProps.push(`  data: ${formattedData},`);
  }

  const configStr = `{\n${configProps.join('\n')}\n}`;

  if (options.useAsyncAwait) {
    const indent = options.includeErrorHandling ? '  ' : '';
    if (options.includeErrorHandling) lines.push('try {');

    const generic = options.useTypeScript ? '<any>' : '';
    lines.push(`${indent}const { data } = await axios.request${generic}(${configStr.replace(/\n/g, `\n${indent}`)});`);
    lines.push(`${indent}console.log(data);`);

    if (options.includeErrorHandling) {
      lines.push('} catch (error) {');
      lines.push('  console.error(\'Axios error:\', error);');
      lines.push('}');
    }
  } else {
    lines.push(`axios.request(${configStr})`);
    lines.push(`  .then((response) => console.log(response.data))`);
    if (options.includeErrorHandling) {
      lines.push(`  .catch((error) => console.error('Axios error:', error));`);
    }
  }

  return lines.join('\n');
}