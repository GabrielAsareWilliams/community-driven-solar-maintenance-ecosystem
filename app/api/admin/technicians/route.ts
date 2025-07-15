import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Technician from '@/models/Technician'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const technicians = await Technician.find().select('_id name email').lean()
    return NextResponse.json(technicians)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
} 