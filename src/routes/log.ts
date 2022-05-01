import { Router } from "express"
import { getLog, postLog } from "../controller/log"

export default function LogRouter() {
  const route: Router = Router()

  route.get('/log/', getLog)
  route.post('/log/', postLog)

  return route
}