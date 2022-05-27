import axios from 'axios'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export function loggerMiddleware(req: Request, res: Response, next : NextFunction) {
  const requestInfo = `HTTP ${req.method} "${req.url}"`
  res.on('finish', () => {
    const responseInfo = `${res.statusCode} ${res.statusMessage}`
    console.log(requestInfo, responseInfo)
  })
  next()
}

export function errorHandler(err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction) {
  console.error(err)
  res.status(500).send({
    error: 'Internal server error'
  })
  next()
}

export async function useAuth(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers

  if (!headers.authorization) {
    return res.status(401).send({ error: 'Authorization header missing' })
  }

  try {
    const authToken = (headers.authorization as string).split(' ')[1]
    
    const BASE_URL_AUTH = process.env.BASE_URL_AUTH || 'https://auth-law-a1.herokuapp.com'
    const response = await axios.get(`${BASE_URL_AUTH}/user`, {
      headers: { authorization: `Bearer ${authToken}` }
    })
    if (response.status != 200) {
      res.status(response.status).send({ error : 'Authentication Failed'})
    }
  } catch (error) {
    console.error(error)
    return
  }
  next()
}