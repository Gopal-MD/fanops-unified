/**
 * FanOps Unified — In-Memory LRU Cache with TTL Expiration
 * Optimizes high-frequency stadium operations read queries.
 */

interface CacheEntry<V> {
  value: V;
  expiresAt: number;
}

export class LruCache<K, V> {
  private cache = new Map<K, CacheEntry<V>>();
  private maxEntries: number;
  private defaultTtlMs: number;

  constructor(maxEntries = 100, defaultTtlMs = 15_000) {
    this.maxEntries = maxEntries;
    this.defaultTtlMs = defaultTtlMs;
  }

  /**
   * Retrieves an item from the cache if it hasn't expired.
   */
  public get(key: K): V | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresh position (LRU order)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * Inserts or updates an item in the cache.
   */
  public set(key: K, value: V, ttlMs = this.defaultTtlMs): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxEntries) {
      // Evict oldest (first item in Map keys)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Invalidates a specific key.
   */
  public delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears the entire cache map.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Returns current active size.
   */
  public size(): number {
    return this.cache.size;
  }
}

// Process-wide singletons for core operations feeds
export const crowdDensityCache = new LruCache<string, unknown>(50, 10_000); // 10s TTL
export const matchScoreboardCache = new LruCache<string, unknown>(10, 5_000); // 5s TTL
