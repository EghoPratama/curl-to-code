export type OutputTarget = 'fetch' | 'axios' | 'tanstack-query';

export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string | object | null;
  isJsonBody: boolean;
}

export interface GeneratorOptions {
  useAsyncAwait: boolean;
  includeErrorHandling: boolean;
  useTypeScript: boolean;
}

export interface CurlPreset {
  id: string;
  name: string;
  command: string;
}