/**
 * In-memory Rate Limiter for AI API Routes
 *
 * Simple sliding-window rate limiter using a Map.
 * State resets on server restart (acceptable for this use case).
 *
 * Default: 10 requests per 60 seconds per IP.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodically clean up expired entries to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
let lastCleanup = Date.now();

function cleanupExpiredEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  for (const [key, record] of rateLimitStore) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check if a request from the given IP is within rate limits.
 *
 * @param ip - Client IP address
 * @param windowMs - Rate limit window in milliseconds (default: 60000)
 * @param maxRequests - Maximum requests per window (default: 10)
 * @returns Object with `allowed` boolean and `remaining` count
 */
export function checkRateLimit(
  ip: string,
  windowMs: number = 60_000,
  maxRequests: number = 10
): { allowed: boolean; remaining: number } {
  cleanupExpiredEntries();

  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // No existing record or window expired -- start fresh
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // Within window -- check count
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}
