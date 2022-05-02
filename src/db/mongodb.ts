import mongoose, { Document } from "mongoose";

export interface ILog extends Document {
  created_at?: Date,
  type: string,
  service: string,
  message: string
}

export function isLog(arg: any) {
  return typeof(arg?.type) === 'string' 
  && typeof(arg?.service) === 'string' 
  && typeof(arg?.message) === 'string'
}

const LogSchema = new mongoose.Schema({
  created_at: Date,
  type: String,
  service: String,
  message: String
});

export class DB {
  private static logModel: mongoose.Model<ILog>
  
  public static async init() {
    console.log(`[...] Creating MongoDB Connection: ${process.env.DATABASE_URL}`)
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('[ ✓ ] MongoDB connected!')
    this.logModel =  mongoose.model('LogItem', LogSchema)
  }

  static get LogModel() {
    if (!this.logModel) {
      throw 'Please Init DB first'
    }
    return this.logModel
  }
}