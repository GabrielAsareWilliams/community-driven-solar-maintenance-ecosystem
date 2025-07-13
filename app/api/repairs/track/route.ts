import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Repair from '@/models/Repair'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const trackingId = searchParams.get('tracking')
    const email = searchParams.get('email')

    if (!trackingId && !email) {
      return NextResponse.json(
        { error: 'Tracking ID or email is required' },
        { status: 400 }
      )
    }

    let repair

    if (trackingId) {
      repair = await Repair.findOne({ trackingId })
    } else if (email) {
      repair = await Repair.findOne({ email }).sort({ createdAt: -1 })
    }

    if (!repair) {
      return NextResponse.json(
        { error: 'No repair request found' },
        { status: 404 }
      )
    }

    return NextResponse.json(repair)
  } catch (error) {
    console.error('Error tracking repair request:', error)
    return NextResponse.json(
      { error: 'Failed to track repair request' },
      { status: 500 }
    )
  }
} 