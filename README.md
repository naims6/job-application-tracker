# Job Application Tracker 📋

A modern, intuitive web application to help you organize and track your job applications throughout your job search journey.

## What is this?

Job Application Tracker is a Kanban-style board application that helps job seekers stay organized during their job search. Instead of losing track of applications in spreadsheets or sticky notes, you can visually manage your entire job search process in one place.

## Features ✨

- **Visual Kanban Boards**: Organize your job applications with drag-and-drop columns (Applied, Interview, Offer, etc.)
- **Application Management**: Keep track of company names, positions, application dates, and status
- **User Authentication**: Secure sign-up and sign-in with Better Auth
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Free to Use**: No credit card required, free forever

## How it works

1. **Sign up** for a free account
2. **Add job applications** to your board
3. **Move applications** through different stages as you progress
4. **Stay organized** and never lose track of an opportunity

## Tech Stack 🛠️

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: MongoDB with Mongoose
- **Authentication**: Better Auth

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)

### Installation

1. Clone the repository

```bash
git clone https://github.com/naims6/job-application-tracker.git
cd application-tracker
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory:

```env
# Add your MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# Add your authentication secrets
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

4. Seed sample data (optional)

```bash
npm run seed:jobs
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed:jobs` - Seed sample job data

---

**Happy job hunting! 🎯**
