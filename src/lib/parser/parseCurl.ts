import { ParsedCurl } from '@/types/curl';

/**
 * Memecah string command line menjadi array token dengan menghormati tanda kutip (' dan ")
 */
function tokenize(cmd: string): string[] {
  // Bersihkan line continuation (\ untuk Unix/Mac, ^ untuk Windows CMD)
  const normalized = cmd
    .replace(/\\\r?\n/g, ' ')
    .replace(/\^\r?\n/g, ' ')
    .trim();

  const tokens: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let escapeNext = false;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];

    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }

    if (char === '\\' && !inSingleQuote) {
      escapeNext = true;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (/\s/.test(char) && !inSingleQuote && !inDoubleQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  if (inSingleQuote || inDoubleQuote) {
    throw new Error('Unclosed quote detected in cURL command.');
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

export function parseCurlCommand(rawCmd: string): ParsedCurl {
  const tokens = tokenize(rawCmd);

  if (tokens.length === 0 || tokens[0].toLowerCase() !== 'curl') {
    throw new Error('Command must start with "curl".');
  }

  let rawUrl = '';
  let method = '';
  const headers: Record<string, string> = {};
  let rawBody: string | null = null;

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === '-X' || token === '--request') {
      method = (tokens[++i] || 'GET').toUpperCase();
    } else if (token === '-H' || token === '--header') {
      const headerStr = tokens[++i] || '';
      const colonIdx = headerStr.indexOf(':');
      if (colonIdx !== -1) {
        const key = headerStr.slice(0, colonIdx).trim();
        const val = headerStr.slice(colonIdx + 1).trim();
        headers[key] = val;
      }
    } else if (
      token === '-d' ||
      token === '--data' ||
      token === '--data-raw' ||
      token === '--data-binary'
    ) {
      rawBody = tokens[++i] ?? '';
    } else if (token === '-u' || token === '--user') {
      const creds = tokens[++i] || '';
      const encoded = typeof btoa !== 'undefined' ? btoa(creds) : Buffer.from(creds).toString('base64');
      headers['Authorization'] = `Basic ${encoded}`;
    } else if (!token.startsWith('-') && !rawUrl) {
      rawUrl = token;
    }
  }

  if (!rawUrl) {
    throw new Error('No valid URL found in cURL command.');
  }

  // Default method ke POST jika ada body namun -X tidak disebutkan
  if (!method) {
    method = rawBody !== null ? 'POST' : 'GET';
  }

  // Extract Query Params dari URL
  const queryParams: Record<string, string> = {};
  let cleanUrl = rawUrl;

  try {
    const urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    urlObj.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    cleanUrl = `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    // Biarkan rawUrl apa adanya jika berupa template URL seperti {{baseUrl}}/users
  }

  // Cek apakah body berupa JSON valid
  let parsedBody: string | object | null = rawBody;
  let isJsonBody = false;

  if (rawBody !== null) {
    try {
      parsedBody = JSON.parse(rawBody);
      isJsonBody = true;
    } catch {
      parsedBody = rawBody;
    }
  }

  return {
    url: cleanUrl,
    method,
    headers,
    queryParams,
    body: parsedBody,
    isJsonBody,
  };
}