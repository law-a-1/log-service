
export enum LogType {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR'
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