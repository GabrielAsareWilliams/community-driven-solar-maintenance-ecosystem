// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AdminSignupPage() {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     setSuccess('')

//     // Validation
//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       setIsLoading(false)
//       return
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long')
//       setIsLoading(false)
//       return
//     }

//     try {
//       const response = await fetch('/api/admin/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       })

//       if (response.ok) {
//         setSuccess('Admin account created successfully! Redirecting to login...')
//         setTimeout(() => {
//           router.push('/admin')
//         }, 2000)
//       } else {
//         const errorData = await response.json()
//         setError(errorData.message || 'Signup failed')
//       }
//     } catch (error) {
//       setError('An error occurred during signup')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
//             <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Admin Signup
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Create a new admin account for the solar panel maintenance system
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//             <div>
//               <label htmlFor="confirmPassword" className="sr-only">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                 placeholder="Confirm Password"
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-4">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-md p-4">
//               <p className="text-sm text-green-600">{success}</p>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? 'Creating account...' : 'Create Account'}
//             </button>
//           </div>

//           <div className="text-center">
//             <a
//               href="/admin"
//               className="font-medium text-green-600 hover:text-green-500"
//             >
//               ← Back to Login
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// } 