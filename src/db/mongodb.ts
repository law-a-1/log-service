import mongoose, { Document } from "mongoose";
import { LogType } from "../util/types";

export interface ILog extends Document {
  created_at?: Date,
  type: LogType,
  service: string,
  message: string
}

export function isLog(arg: any): arg is ILog {
  return arg?.type in LogType
  && typeof(arg?.service) === 'string' 
  && typeof(arg?.message) === 'string'
}

const LogSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  type: String,
  service: String,
  message: String
}, {
  toJSON: {
    transform: function (_doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
});

export class DB {
  private static logModel: mongoose.Model<ILog>
  
  public static async init() {
    console.log(`[...] Creating MongoDB Connection: ${process.env.DATABASE_URL}`)
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('[ ✓ ] MongoDB connected!')
    this.logModel =  mongoose.model('Log', LogSchema)
  }

  static get LogModel() {
    if (!this.logModel) {
      throw 'Please Init DB first'
    }
    return this.logModel
  }
}