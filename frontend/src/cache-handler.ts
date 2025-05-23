// Define the structure of the cache entry
interface CacheEntry {
  value: any; // Using `any` for flexibility; you can replace with a specific type if known
  lastModified: number;
  tags: string[];
}

// Define the structure of the context object passed to set
interface CacheContext {
  tags: string[];
}

// Define the options type for the constructor
interface CacheHandlerOptions {
  // Add specific option properties if known, e.g., cacheDuration?: number;
  [key: string]: any; // Flexible options object
}

const cache = new Map<string, CacheEntry>();

export class CacheHandler {
  private options: CacheHandlerOptions;

  constructor(options: CacheHandlerOptions) {
    this.options = options;
  }

  async get(key: string): Promise<CacheEntry | undefined> {
    // Retrieve from cache (e.g., in-memory Map or durable storage)
    return cache.get(key);
  }

  async set(key: string, data: any, ctx: CacheContext): Promise<void> {
    // Store in cache with metadata
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tags: string | string[]): Promise<void> {
    // Normalize tags to an array
    const tagArray = Array.isArray(tags) ? tags : [tags];

    // Iterate over all entries in the cache
    for (const [key, value] of cache) {
      // If the value's tags include any of the specified tags, delete the entry
      if (value.tags.some((tag) => tagArray.includes(tag))) {
        cache.delete(key);
      }
    }
  }

  // Reset temporary in-memory cache for a single request
  resetRequestCache(): void {
    // Implementation can be added if needed, e.g., clearing specific cache entries
  }
}
