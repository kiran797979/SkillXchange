# SkillXchange

SkillXchange is a modern, space-themed platform for discovering, exchanging, and learning new skills with a trusted community. Built with React, Vite, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **🔐 Authentication:** Email/password & Google login, secure sessions (Supabase Auth)
- **👤 User Profiles:** Setup wizard, edit info, manage skills, public/private, points system
- **🔍 Smart Discovery:** Search by skills, name, location; AI-powered matching; filters; compatibility scores
- **🔄 Skill Swaps:** Send/accept/reject requests, real-time status, messaging, swap history
- **⭐ Ratings & Reviews:** Rate after swaps, view ratings, gamification points, trust indicators
- **🔔 Notifications:** Real-time alerts for requests, status, and feedback
- **🛡️ Admin Dashboard:** User management, activity monitoring, charts, admin actions
- **🎨 Premium UI/UX:** Space theme, glassmorphism, gradients, Framer Motion, fully responsive
- **🗄️ Supabase Database:** Secure schema, RLS, triggers, optimized for performance

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Supabase project (get your URL and anon key)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/kiran797979/SkillXchange.git
   cd SkillXchange/project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `project` directory and add your Supabase credentials:
   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```sh
   npm run dev -- --host
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Database
- The platform uses Supabase for authentication, user profiles, skills, swaps, reviews, and notifications.
- Make sure to apply the provided SQL schema to your Supabase project for full functionality.

## Deployment
- Deploy the frontend to Vercel, Netlify, or your preferred host.
- Set environment variables in your deployment platform.

## License
MIT 
