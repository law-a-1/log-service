import * as dotenv from 'dotenv';
import express from "express";
import { defaultRouter } from "./routes";
import { logRouter } from "./routes/log";
import { loggerMiddleware } from "./util/middleware";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

// Middlewares
app.use(loggerMiddleware)
app.use(express.json())

// Routes
app.use('/', defaultRouter())
app.use('/api/v1/', logRouter())

app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`))