import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ status: 429, message: 'Rate limit exceeded' });
        }
        next();
    } catch (err) {
        console.error('Rate limiting error:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err?.message });
        next(err); // pass the error to the next middleware
    }
};

export default rateLimiter;