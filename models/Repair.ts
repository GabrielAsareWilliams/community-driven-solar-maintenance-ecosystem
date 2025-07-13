import mongoose from 'mongoose'

export interface IRepair extends mongoose.Document {
  trackingId: string
  name: string
  email: string
  phone: string
  location: string
  description: string
  status: 'RECEIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const repairSchema = new mongoose.Schema<IRepair>(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      default: 'RECEIVED',
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

// Create index for faster queries
repairSchema.index({ trackingId: 1 })
repairSchema.index({ email: 1 })
repairSchema.index({ status: 1 })
repairSchema.index({ createdAt: -1 })

export default mongoose.models.Repair || mongoose.model<IRepair>('Repair', repairSchema) 