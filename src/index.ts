import express from "express";
import { defaultRouter } from "./routes";
import * as dotenv from 'dotenv'
import LogRouter from "./routes/log";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

app.use(express.json())

app.use('/', defaultRouter())
app.use('/api/v1/', LogRouter())

app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`))