import mongoose from 'mongoose'

export interface IAdmin extends mongoose.Document {
  username: string
  password: string
  createdAt: Date
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create index for faster queries
adminSchema.index({ username: 1 })

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema) 