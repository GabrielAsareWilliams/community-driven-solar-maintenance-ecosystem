import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Technician from '@/models/Technician'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    const tech = await Technician.findOne({ email })
    if (!tech) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const isValid = await comparePassword(password, tech.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const token = generateToken({ id: tech._id, email: tech.email, name: tech.name, role: 'technician' })
    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Technician login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
} 