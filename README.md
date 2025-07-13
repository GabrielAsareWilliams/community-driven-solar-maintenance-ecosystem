# Solar Panel Maintenance Ecosystem

A comprehensive Next.js 14 application for managing solar panel repair requests and maintenance operations.

## Features

### 🌐 Public Website (Customer-Facing)
- **Company Hero Section**: Professional introduction and service highlights
- **Repair Request Form**: Easy-to-use form for customers to submit repair requests
  - Name, email, phone, location, and issue description
  - Automatic email notifications to the company
  - Database storage with unique tracking IDs
- **Repair Tracking**: Customers can track their requests using tracking ID or email
  - Real-time status updates (Received, In Progress, Completed)
  - Detailed request information and technician notes

### 📊 Admin Dashboard (Internal Use)
- **Secure Authentication**: Protected admin login with JWT tokens
- **Admin Signup**: Create new admin accounts with secure password hashing
- **Overview Dashboard**: 
  - Total repairs, completed repairs, pending repairs statistics
  - Interactive charts showing repair trends and status distribution
- **Repair Management**: 
  - View all repair submissions in a comprehensive table
  - Update repair statuses and add technician notes
  - Real-time data updates

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email**: Nodemailer for automated notifications
- **UI**: Tailwind CSS with responsive design
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with validation

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd community-driven-solar-maintenance-ecosystem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI="mongodb://localhost:27017/solar-maintenance"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   ```

4. **Set up admin user**
   ```bash
   npm run setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Public website: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin
   - Admin credentials: `admin` / `admin123`

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── repairs/           # Repair request endpoints
│   │   └── admin/             # Admin API endpoints
│   ├── admin/                 # Admin pages
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/        # Admin dashboard
│   ├── track/                # Repair tracking page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # Reusable components
│   └── RepairRequestForm.tsx
├── lib/                     # Utility functions
│   ├── auth.ts              # Authentication utilities
│   ├── db.ts                # Database client
│   ├── email.ts             # Email utilities
│   └── utils.ts             # General utilities
├── models/                  # Mongoose models
│   ├── Repair.ts
│   └── Admin.ts
└── scripts/                 # Setup scripts
    └── setup.js
```

## API Endpoints

### Public Endpoints
- `POST /api/repairs` - Submit repair request
- `GET /api/repairs/track` - Track repair by ID or email

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/signup` - Create new admin account
- `GET /api/admin/repairs` - Get all repairs
- `GET /api/admin/stats` - Get dashboard statistics
- `PUT /api/admin/repairs/[id]` - Update repair status

## Database Schema

### Repair Model
- `id`: Unique identifier
- `trackingId`: Customer-facing tracking ID
- `name`, `email`, `phone`, `location`: Customer information
- `description`: Issue description
- `status`: Current status (RECEIVED, IN_PROGRESS, COMPLETED, CANCELLED)
- `notes`: Technician notes
- `createdAt`, `updatedAt`: Timestamps

### Admin Model
- `id`: Unique identifier
- `username`: Admin username
- `password`: Hashed password
- `createdAt`: Account creation timestamp

## Email Configuration

To enable email notifications, configure your Gmail account:

1. Enable 2-factor authentication
2. Generate an App Password
3. Update `.env.local` with your credentials

## Security Features

- JWT-based authentication for admin access
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- Secure environment variable handling

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Ensure environment variables are configured
- Set up a production database (PostgreSQL recommended)
- Configure email service for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
