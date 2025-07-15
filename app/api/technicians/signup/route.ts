import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Technician from '@/models/Technician'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const { name, email, phone, skills, location, password } = body

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    const existing = await Technician.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }
    const hashedPassword = await hashPassword(password)
    const tech = await Technician.create({
      name,
      email,
      phone,
      skills,
      location,
      password: hashedPassword,
    })
    return NextResponse.json({ success: true, technician: { name: tech.name, email: tech.email, phone: tech.phone, skills: tech.skills, location: tech.location } })
  } catch (error) {
    console.error('Technician signup error:', error)
    return NextResponse.json({ error: 'Failed to create technician account' }, { status: 500 })
  }
} 