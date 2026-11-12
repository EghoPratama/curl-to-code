import { GeneratorOptions, ParsedCurl } from '@/types/curl';
import { generateFetch } from './toFetch';

export function generateTanStackQuery(parsed: ParsedCurl, options: GeneratorOptions): string {
  const isMutation = parsed.method !== 'GET';
  const fetchLogic = generateFetch(parsed, {
    ...options,
    useAsyncAwait: true,
    includeErrorHandling: false,
  })
    .replace('console.log(data);', 'return data;')
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n');

  if (isMutation) {
    return [
      `import { useMutation } from '@tanstack/react-query';\n`,
      `export function useApiMutation() {`,
      `  return useMutation({`,
      `    mutationFn: async () => {`,
      fetchLogic,
      `    },`,
      `  });`,
      `}`,
    ].join('\n');
  }

  return [
    `import { useQuery } from '@tanstack/react-query';\n`,
    `export function useApiQuery() {`,
    `  return useQuery({`,
    `    queryKey: ['${parsed.url}'],`,
    `    queryFn: async () => {`,
    fetchLogic,
    `    },`,
    `  });`,
    `}`,
  ].join('\n');
}