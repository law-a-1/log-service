import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());

import express from "express";
import formData from 'express-form-data';
import { DB } from './db/mongodb';
import { defaultRouter } from "./routes";
import { logRouter } from "./routes/log";
import { loggerMiddleware } from "./util/middleware";

(async () => {
  try {
    const app = express()
    const PORT = process.env.PORT || 8000
    const HOST = process.env.HOST || 'localhost'
   
    // Init Database
    await DB.init() 
  
    // Middlewares
    app.use(loggerMiddleware)
    app.use(formData.parse())
    app.use(express.json())
  
    // Routes
    app.use('/', defaultRouter())
    app.use('/api/v1/', logRouter())
  
    app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})();