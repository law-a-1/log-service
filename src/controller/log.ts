import { Request, Response } from 'express';

export function getLog(req : Request, res: Response) {
  const filters = req.params
  return res.status(200).send({
    status: 200,
    message: 'Log Success',
    filters: filters
  })
}

export function postLog(req : Request, res: Response) {
  const data = req.body
  return res.status(201).send({
    status: 201,
    data: data
  })
}