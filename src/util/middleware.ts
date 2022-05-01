import { Request, Response, NextFunction } from 'express'

export function loggerMiddleware(req: Request, res: Response, next : NextFunction) {
  const requestInfo = `HTTP ${req.method} "${req.url}"`
  res.on('finish', () => {
    const responseInfo = `${res.statusCode} ${res.statusMessage}`
    console.log(requestInfo, responseInfo)
  })
  next()
}