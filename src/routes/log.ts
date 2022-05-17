import { Router } from "express"
import { getLog, getLogById, postLog } from "../controller/log"

export function logRouter() {
  const route: Router = Router()

  route.get('/', getLog)
  route.get('/:id', getLogById)
  route.post('/', postLog)

  return route
}