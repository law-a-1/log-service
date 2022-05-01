import { Router } from "express";
import { ping, version } from "../controller";

export function defaultRouter(): Router {
  const route: Router = Router()

  route.get('/', (_req, res) => {
    res.send('Logservice API')
  })

  route.get('/ping', ping)
  route.get('/version', version)

  return route
}