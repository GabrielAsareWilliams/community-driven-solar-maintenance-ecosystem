'use client'

import { useState } from 'react'

interface RepairStatus {
  id: string
  trackingId: string
  name: string
  email: string
  phone: string
  location: string
  description: string
  status: 'RECEIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function TrackPage() {
  const [searchType, setSearchType] = useState<'tracking' | 'email'>('tracking')
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [repair, setRepair] = useState<RepairStatus | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue.trim()) return

    setIsSearching(true)
    setError('')
    setRepair(null)

    try {
      const response = await fetch(`/api/repairs/track?${searchType}=${encodeURIComponent(searchValue.trim())}`)
      
      if (response.ok) {
        const data = await response.json()
        setRepair(data)
      } else {
        setError('No repair request found with the provided information.')
      }
    } catch (error) {
      setError('An error occurred while searching. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 'Request Received'
      case 'IN_PROGRESS':
        return 'In Progress'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Repair Request
          </h1>
          <p className="text-lg text-gray-600">
            Enter your tracking ID or email address to check the status of your repair request
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="tracking"
                      checked={searchType === 'tracking'}
                      onChange={(e) => setSearchType(e.target.value as 'tracking' | 'email')}
                      className="mr-2"
                    />
                    Tracking ID
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="email"
                      checked={searchType === 'email'}
                      onChange={(e) => setSearchType(e.target.value as 'tracking' | 'email')}
                      className="mr-2"
                    />
                    Email Address
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'tracking' ? 'Tracking ID' : 'Email Address'}
              </label>
              <input
                type={searchType === 'tracking' ? 'text' : 'email'}
                id="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={searchType === 'tracking' ? 'Enter your tracking ID' : 'Enter your email address'}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSearching || !searchValue.trim()}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Repair Status */}
        {repair && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Repair Request Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(repair.status)}`}>
                {getStatusText(repair.status)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Tracking ID:</span>
                    <p className="font-mono text-lg">{repair.trackingId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Customer Name:</span>
                    <p className="text-lg">{repair.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-lg">{repair.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <p className="text-lg">{repair.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Location:</span>
                    <p className="text-lg">{repair.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Description</h3>
                <p className="text-gray-700 leading-relaxed">{repair.description}</p>
              </div>
            </div>

            {repair.notes && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes from Technician</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{repair.notes}</p>
                </div>
              </div>
            )}

            <div className="border-t pt-6 mt-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Submitted:</span> {new Date(repair.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {new Date(repair.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
} 