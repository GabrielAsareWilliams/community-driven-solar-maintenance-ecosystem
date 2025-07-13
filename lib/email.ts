import formData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
})

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || ''

export async function sendRepairNotification(repairData: {
  trackingId: string
  name: string
  email: string
  phone: string
  location: string
  description: string
}) {
  const html = `
    <h2>New Repair Request Received</h2>
    <p><strong>Tracking ID:</strong> ${repairData.trackingId}</p>
    <p><strong>Customer Name:</strong> ${repairData.name}</p>
    <p><strong>Email:</strong> ${repairData.email}</p>
    <p><strong>Phone:</strong> ${repairData.phone}</p>
    <p><strong>Location:</strong> ${repairData.location}</p>
    <p><strong>Issue Description:</strong></p>
    <p>${repairData.description}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Solar Maintenance <${ADMIN_EMAIL}>`,
      to: [ADMIN_EMAIL], // Send to admin
      subject: `New Solar Panel Repair Request - ${repairData.trackingId}`,
      html,
    })
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}
