import { Request, Response, NextFunction } from "express";

export interface ConsumeResult {
    allowed: boolean;
    remainingTokens: number;
    retryAfter: number;
}

export interface TokenBucketOptions {
    capacity: number;
    refillRate: number; // Tokens refueled per second
}

export interface RateLimiterOptions extends TokenBucketOptions {
    message?: string;
    // Allows rate-limiting by custom parameters, e.g. req.user?.id or IP + Endpoint path
    keyGenerator?: (req: Request) => string;
}

export class TokenBucket {
    private tokens: number;
    private lastUpdated: number;

    private readonly capacity: number;
    private readonly refillRate: number;

    constructor(options: TokenBucketOptions) {
        this.capacity = options.capacity;
        this.refillRate = options.refillRate;
        this.tokens = this.capacity;
        this.lastUpdated = Date.now();
    }

    private refill(now: number): void {
        const elapsedSeconds = (now - this.lastUpdated) / 1000;
        const regeneratedTokens = elapsedSeconds * this.refillRate;

        this.tokens = Math.min(
            this.capacity,
            this.tokens + regeneratedTokens
        );
        this.lastUpdated = now;
    }

    consume(now = Date.now()): ConsumeResult {
        this.refill(now);

        if (this.tokens >= 1) {
            this.tokens--;
            return {
                allowed: true,
                remainingTokens: Math.floor(this.tokens),
                retryAfter: 0,
            };
        }

        const retryAfter = Math.ceil((1 - this.tokens) / this.refillRate);
        return {
            allowed: false,
            remainingTokens: 0,
            retryAfter,
        };
    }

    reset(): void {
        this.tokens = this.capacity;
        this.lastUpdated = Date.now();
    }

    getRemainingTokens(): number {
        return Math.floor(this.tokens);
    }

    getCapacity(): number {
        return this.capacity;
    }

    getLastUpdated(): number {
        return this.lastUpdated;
    }
}

// Default key generator (uses IP address)
const defaultKeyGenerator = (req: Request): string => {
    return req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";
};

/**
 * Creates isolated bucket stores for each instantiated rate limiter.
 */
export const rateLimit = (options: RateLimiterOptions) => {
    const { 
        capacity, 
        refillRate, 
        message = "Too many requests. Please slow down.", 
        keyGenerator = defaultKeyGenerator 
    } = options;

    const buckets = new Map<string, TokenBucket>();

    const INACTIVE_LIMIT = 10 * 60 * 1000; // 10 minutes
    const interval = setInterval(() => {
        const now = Date.now();
        for (const [key, bucket] of buckets.entries()) {
            if (now - bucket.getLastUpdated() > INACTIVE_LIMIT) {
                buckets.delete(key);
            }
        }
    }, INACTIVE_LIMIT);

    if (interval.unref) {
        interval.unref();
    }

    return (req: Request, res: Response, next: NextFunction) => {
        const rateLimitKey = keyGenerator(req);

        if (!buckets.has(rateLimitKey)) {
            buckets.set(rateLimitKey, new TokenBucket({ capacity, refillRate }));
        }

        const bucket = buckets.get(rateLimitKey)!;
        const result = bucket.consume();

        // Standard rate limit headers
        res.setHeader("X-RateLimit-Limit", bucket.getCapacity());
        res.setHeader("X-RateLimit-Remaining", result.remainingTokens);

        if (result.allowed) {
            return next();
        }

        res.setHeader("Retry-After", result.retryAfter);

        return res.status(429).json({
            success: false,
            message,
            retryAfter: result.retryAfter,
        });
    };
};
