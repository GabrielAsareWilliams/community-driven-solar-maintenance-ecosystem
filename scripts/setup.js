const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

// Import models
const Admin = require('../models/Admin')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/solar-maintenance'

async function main() {
  console.log('Setting up the solar panel maintenance app with MongoDB...')

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB successfully')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await Admin.findOneAndUpdate(
      { username: 'admin' },
      {
        username: 'admin',
        password: hashedPassword,
      },
      { upsert: true, new: true }
    )
    
    console.log('✅ Admin user created/updated successfully')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('⚠️  Please change the password after first login!')

    console.log('\n🎉 Setup completed!')
    console.log('\nNext steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Visit: http://localhost:3000')
    console.log('3. Admin login: http://localhost:3000/admin')

  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

main() 