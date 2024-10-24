import express from 'express';
import sequelize from '@/database';
import User from '@/database/models/user';
import monitoringRegister, { monitoringRequestMs } from "@/monitoring";
import redisClient from "@/redis/client";
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const end = monitoringRequestMs.startTimer();

    try {
        res.send('Hello World!');
    } catch (err: any) {
        res.status(500).send(err.message);
    } finally {
        end({ method: req.method, route: req.route.path, code: res.statusCode });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Database
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

// Monitoring
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', monitoringRegister.contentType);
        res.end(await monitoringRegister.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.get('/users', async (req, res) => {
    const end = monitoringRequestMs.startTimer();
    try {
        // let cachedUsers = await redisClient.get('users');
        let cachedUsers = null

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
