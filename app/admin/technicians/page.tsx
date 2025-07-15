import dbConnect from '@/lib/db'
import Technician from '@/models/Technician'

export const dynamic = 'force-dynamic'

export default async function AdminTechniciansPage() {
  await dbConnect()
  const technicians = await Technician.find().lean()

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Technicians</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {technicians.map((tech: any) => (
              <tr key={tech._id}>
                <td className="px-6 py-4 whitespace-nowrap">{tech.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tech.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tech.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tech.skills}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tech.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 