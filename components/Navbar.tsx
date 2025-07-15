"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import localFont from 'next/font/local'

const brushscript = localFont({
    src: '../app/fonts/brushsci.ttf',
    // display: 'swap',
  })

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex flex-col items-center gap-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
              
              <Image src="/logo-solnova.png" alt="logo" width={100} height={100} className="object-contain w-20 h-20" />
            </Link>
            {/* <p className={`text-sm font-bold text-green-600 ${brushscript.className}`}>Community based solutions</p> */}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</Link>
            <Link href="/track" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Track Request</Link>
            <Link href="/admin" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Admin</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">Home</Link>
            <Link href="/track" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">Track Request</Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  )
} 