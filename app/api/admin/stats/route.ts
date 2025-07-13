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

    // Get all repairs
    const repairs = await Repair.find()

    // Calculate basic stats
    const totalRepairs = repairs.length
    const completedRepairs = repairs.filter((r: any) => r.status === 'COMPLETED').length
    const inProgressRepairs = repairs.filter((r: any) => r.status === 'IN_PROGRESS').length
    const pendingRepairs = repairs.filter((r: any) => r.status === 'RECEIVED').length

    // Generate monthly data for the last 6 months
    const monthlyData = []
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthName = months[date.getMonth()]
      const year = date.getFullYear()
      
      const monthRepairs = repairs.filter((repair: any) => {
        const repairDate = new Date(repair.createdAt)
        return repairDate.getMonth() === date.getMonth() && repairDate.getFullYear() === year
      }).length

      monthlyData.push({
        month: monthName,
        repairs: monthRepairs
      })
    }

    // Generate status distribution data
    const statusData = [
      { status: 'Received', count: pendingRepairs },
      { status: 'In Progress', count: inProgressRepairs },
      { status: 'Completed', count: completedRepairs },
      { status: 'Cancelled', count: repairs.filter((r: any) => r.status === 'CANCELLED').length }
    ]

    return NextResponse.json({
      totalRepairs,
      completedRepairs,
      pendingRepairs,
      inProgressRepairs,
      monthlyData,
      statusData
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 