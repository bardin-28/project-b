import express from 'express';
import sequelize from '@/database';
import monitoringRegister from "@/monitoring";
// import cors from "cors";
import api from "./routes/api";


const app = express();
const port = process.env.PORT || 80;

// app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Database
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

app.get('/', (req, res) => {
    res.send('Hello');
});

// Monitoring
app.get('/metrics', async (_, res) => {
    try {
        res.set('Content-Type', monitoringRegister.contentType);
        res.end(await monitoringRegister.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.use('/api', api);
