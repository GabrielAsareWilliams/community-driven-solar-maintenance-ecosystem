import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Repair from '@/models/Repair'
import { verifyToken } from '@/lib/auth'

async function authenticateAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  const decoded = verifyToken(token)
  
  if (!decoded) {
    return null
  }

  return decoded
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const admin = await authenticateAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const repairs = await Repair.find().sort({ createdAt: -1 })

    return NextResponse.json(repairs)
  } catch (error) {
    console.error('Error fetching repairs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repairs' },
      { status: 500 }
    )
  }
} 