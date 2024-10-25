import {Router} from "express";
import {monitoringRequestMs} from "@/monitoring";
import redisClient from "@/redis/client";
import User from "@/database/models/user";

const router = Router();

router.get('/', async (req, res) => {
    const end = monitoringRequestMs.startTimer();
    try {
        let cachedUsers = await redisClient.get('users');

        if (cachedUsers) {
            res.json(JSON.parse(cachedUsers));
        } else {
            const users = await User.findAll();
            await redisClient.setEx('users', 60, JSON.stringify(users));
            res.json(users);
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    } finally {
        end({ method: req.method, route: req.route.path, code: res.statusCode });
    }
});

export default router;

