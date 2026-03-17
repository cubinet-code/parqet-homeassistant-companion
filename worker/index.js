/**
 * Cloudflare Worker — Parqet token proxy
 *
 * Proxies POST requests to connect.parqet.com/oauth2/token and adds
 * Access-Control-Allow-Origin headers so browser-based PKCE apps can
 * exchange authorization codes and refresh tokens without CORS errors.
 *
 * This worker receives no credentials of its own — it is a transparent
 * pass-through. All OAuth parameters come from the caller.
 */

const TARGET = 'https://connect.parqet.com/oauth2/token';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
    }

    const body = await request.text();

    let upstream;
    try {
      upstream = await fetch(TARGET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'upstream_error', error_description: String(err) }), {
        status: 502,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const responseBody = await upstream.text();

    return new Response(responseBody, {
      status: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      },
    });
  },
};
