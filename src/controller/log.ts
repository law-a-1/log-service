import { Request, Response } from 'express';
import { DB, ILog, isLog } from '../db/mongodb';

export async function getLog(req : Request, res: Response) {
  // TODO: Implement filters
  const filters = req.params
  const logs = await DB.LogModel.find({})
  return res.status(200).send({
    status: 200,
    data: logs,
    filters: filters
  })
}

export async function postLog(req : Request, res: Response) {
  const logData: ILog = {
    ...req.body,
    created_at: new Date()
  }

  // TODO: validation feedback
  if (!isLog(logData)) {
    return res.status(400).send({
      status: '400',
      error: 'Invalid Request Format'
    })
  }

  try {
    const log = await new DB.LogModel(logData).save()
    return res.status(201).send({
      status: 201,
      data: log
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: error
    })
  }
}