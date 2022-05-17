import mongoose from "mongoose";
import { Log } from "../util/types";


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
  private static logModel: mongoose.Model<Log>
  
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