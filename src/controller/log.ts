import { NextFunction, Request, Response } from 'express';
import { DB } from '../db/mongodb';
import { isLog, Log, LogFilter, LogQueryParams, LogType } from '../util/types';

export async function getLog(req : Request, res: Response, next: NextFunction) {
  const { page, page_size, type, service, time_start, time_end } = req.query as unknown as LogQueryParams

  const pageNum = (page && page > 0) ? page -1 : 0
  const pageSize = page_size || 10

  const filters: LogFilter = {
    ...(type) && {type: type.toUpperCase() as LogType},
    ...service && {service},
    ...(time_start || time_end) && {created_at : {
      ...time_start && {"$gte": time_start},
      ...time_end && {"$lt": time_end},
    }}
  }

  try {
    const logs = await DB.LogModel
      .find(filters)
      .limit(pageSize)
      .skip(pageNum * pageSize)
      .sort( '-created_at' )
    const totalPages = await DB.LogModel.countDocuments(filters)
    const pages = Math.ceil(totalPages/pageSize) 
    
    return res.status(200).send({
      page: pageNum + 1,
      pages,
      data: logs,
    })
  } catch (error) {
    next(error)
  }
}

export async function getLogById(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // ID Validation check
      const log = await DB.LogModel.findById(id)
      if (log) {
        return res.status(200).send(log)
      }
    }
  } catch (error) {
    next(error)
  }

  return res.status(404).send({
    error: 'Log not found'
  })
}

export async function postLog(req : Request, res: Response, next: NextFunction) {
  const logData: Log = req.body

  // TODO: validation feedback
  if (!isLog(logData)) {
    return res.status(400).send({
      status: '400',
      error: 'Invalid Request Format'
    })
  }

  try {
    const log = await new DB.LogModel(logData).save()
    const verbose = req.query.verbose || false
    return res.status(201).send({
      message: 'Success',
      ...(verbose === 'true') && {data: log}
    })
  } catch (error) {
    next(error)
  }
}