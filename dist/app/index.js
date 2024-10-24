"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import client from 'prom-client';
const database_1 = __importDefault(require("@/database"));
const user_1 = __importDefault(require("@/database/models/user"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Создаем реестр метрик
// const register = new client.Registry();
// Добавляем стандартные метрики для Node.js
// client.collectDefaultMetrics({ register });
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
database_1.default.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});
app.get('/users', async (req, res) => {
    const users = await user_1.default.findAll();
    res.json([{ message: 'Hello World! No!' }]);
});
