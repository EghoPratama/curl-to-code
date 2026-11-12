import { CurlPreset } from '@/types/curl';

export const CURL_PRESETS: CurlPreset[] = [
  {
    id: 'get-users',
    name: 'GET with Query & Auth',
    command: `curl -X GET 'https://api.example.com/v1/users?role=admin&limit=10' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \\
  -H 'Accept: application/json'`,
  },
  {
    id: 'post-json',
    name: 'POST JSON Payload',
    command: `curl 'https://api.example.com/v1/orders' \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-Key: secret_live_9921' \\
  --data-raw '{"productId":"prod_881","quantity":2,"notes":"Fast delivery"}'`,
  },
  {
    id: 'basic-auth',
    name: 'Basic Auth PUT',
    command: `curl -X PUT https://api.example.com/v1/profile \\
  -u admin:supersecret123 \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Alex Rivera","active":true}'`,
  },
];