'use client'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

interface TechnicianToken {
  id: string
  email: string
  name: string
  role: string
  exp?: number
}

export default function TechnicianDashboard() {
  const [tech, setTech] = useState<TechnicianToken | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('technicianToken')
    if (!token) {
      router.push('/technicians/login')
      return
    }
    try {
      const decoded = jwtDecode<TechnicianToken>(token)
      setTech(decoded)
    } catch {
      localStorage.removeItem('technicianToken')
      router.push('/technicians/login')
    }
    setLoading(false)
  }, [router])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!tech) return null

  const handleLogout = () => {
    localStorage.removeItem('technicianToken')
    router.push('/technicians/login')
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {tech.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Info</h2>
        <p><span className="font-medium">Email:</span> {tech.email}</p>
        <p><span className="font-medium">ID:</span> {tech.id}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Assigned Work</h2>
        <p className="text-gray-600">(This is a placeholder. Assigned repairs will appear here when implemented.)</p>
      </div>
    </div>
  )
} 