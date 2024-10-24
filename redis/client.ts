import { createClient } from "redis";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    password: REDIS_PASSWORD
});

redisClient.on('error', (err: any) => console.log('Redis Client Error', err));
redisClient.on('ready', () => console.log('Redis connected'));

// Функция для подключения к Redis
async function connectRedis() {
    try {
        await redisClient.connect();
        console.log('Successfully connected to Redis');
    } catch (error: any) {
        console.error('Failed to connect to Redis:', error);
    }
}

// Вызываем функцию подключения
connectRedis();

export default redisClient;
