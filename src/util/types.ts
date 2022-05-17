export enum LogType {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR'
}

export interface Log extends Document {
  created_at?: Date,
  type: LogType,
  service: string,
  message: string
}

export function isLog(arg: any): arg is Log {
  return arg?.type in LogType
  && typeof(arg?.service) === 'string' 
  && typeof(arg?.message) === 'string'
}

export type LogQueryParams = {
  page?: number,
  type?: LogType,
  service?: string,
  time_start?: Date,
  time_end?: Date
}

export type LogFilter = {
  type?: LogType,
  service?: string,
  created_at?: object 
}