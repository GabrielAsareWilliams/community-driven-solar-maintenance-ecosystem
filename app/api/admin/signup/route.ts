import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new admin
    const admin = await Admin.create({
      username,
      password: hashedPassword,
    })

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        createdAt: admin.createdAt,
      },
    })
  } catch (error) {
    console.error('Error during admin signup:', error)
    return NextResponse.json(
      { error: 'Failed to create admin account' },
      { status: 500 }
    )
  }
} 