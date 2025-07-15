import mongoose from 'mongoose'

export interface ITechnician extends mongoose.Document {
  name: string
  email: string
  phone: string
  skills?: string
  location?: string
  password: string
  createdAt: Date
}

const technicianSchema = new mongoose.Schema<ITechnician>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: String },
  location: { type: String },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

technicianSchema.index({ email: 1 })

export default mongoose.models.Technician || mongoose.model<ITechnician>('Technician', technicianSchema) 