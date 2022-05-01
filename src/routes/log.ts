import { Router } from "express"
import { getLog, postLog } from "../controller/log"

export function logRouter() {
  const route: Router = Router()

  route.get('/log/', getLog)
  route.post('/log/', postLog)

  return route
}