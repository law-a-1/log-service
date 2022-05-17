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