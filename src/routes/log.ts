import { Router } from "express"
import { getLog, getLogById, postLog } from "../controller/log"
import { useAuth } from "../util/middleware"

export function logRouter() {
  const route: Router = Router()

  route.get('/', useAuth, getLog)
  route.get('/:id', useAuth, getLogById)
  route.post('/', postLog)

  return route
}