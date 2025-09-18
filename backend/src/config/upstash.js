import { Ratelimit } from '@upstash/ratelimit'; // CommonJS module
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

//create a rate limiter, that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // read from env variables
    limiter: Ratelimit.slidingWindow(100, '60 s'), // 100 requests per 60 seconds
});

export default ratelimit;