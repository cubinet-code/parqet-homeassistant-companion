/**
 * Cloudflare Worker — Parqet Connect CORS proxy
 *
 * Transparently proxies all requests to connect.parqet.com and adds
 * Access-Control-Allow-Origin headers so browser-based apps (like the
 * Parqet HA card running on a Home Assistant origin) can call the API.
 *
 * Covers both the OAuth token endpoint (/oauth2/token) and all REST API
 * endpoints (/portfolios, etc.) which currently return no CORS headers.
 *
 * This worker stores no credentials — Authorization headers are forwarded
 * as-is from the caller.
 */

const UPSTREAM = 'https://connect.parqet.com';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Forward path + query string to upstream
    const url = new URL(request.url);
    const upstreamUrl = UPSTREAM + url.pathname + url.search;

    // Forward relevant headers; omit Host (CF sets it automatically)
    const forwardHeaders = new Headers();
    for (const [key, value] of request.headers) {
      if (key.toLowerCase() === 'host') continue;
      forwardHeaders.set(key, value);
    }

    let upstream;
    try {
      upstream = await fetch(upstreamUrl, {
        method: request.method,
        headers: forwardHeaders,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'upstream_error', error_description: String(err) }),
        { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
      );
    }

    const responseBody = await upstream.arrayBuffer();

    return new Response(responseBody, {
      status: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      },
    });
  },
};
