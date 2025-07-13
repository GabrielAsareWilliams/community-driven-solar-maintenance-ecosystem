import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'
import { comparePassword, generateToken } from '@/lib/auth'

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

    // Find admin user
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await comparePassword(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      id: admin._id.toString(),
      username: admin.username,
    })

    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Error during admin login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
} 