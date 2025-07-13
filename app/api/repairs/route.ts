import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Repair from '@/models/Repair'
import { generateTrackingId } from '@/lib/utils'
import { sendRepairNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { name, email, phone, location, description } = body

    // Validate required fields
    if (!name || !email || !phone || !location || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Generate unique tracking ID
    const trackingId = generateTrackingId()

    // Create repair request in database
    const repair = await Repair.create({
      trackingId,
      name,
      email,
      phone,
      location,
      description,
    })

    // Send email notification (don't block on failure)
    try {
      await sendRepairNotification({
        trackingId,
        name,
        email,
        phone,
        location,
        description,
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      trackingId: repair.trackingId,
      message: 'Repair request submitted successfully',
    })
  } catch (error) {
    console.error('Error creating repair request:', error)
    return NextResponse.json(
      { error: 'Failed to submit repair request' },
      { status: 500 }
    )
  }
} 