# Scalable Task Dashboard 🚀

A modern, secure, and aesthetic web application built with **Next.js 15**, **MongoDB**, **NextAuth.js**, and **TailwindCSS**.

![Dashboard Preview](https://github.com/nextjs/next.js/assets/placeholder.png) 
*(Replace with actual screenshot if available)*

## ✨ Features

- **🔐 Secure Authentication**: Full Sign Up / Login flow using NextAuth.js (JWT Strategy) with Bcrypt password hashing.
- **🎨 Premium Aesthetic**: Dark mode UI with glassmorphism effects, smooth gradients, and responsive components.
- **📊 Interactive Dashboard**:
  - Create, Read, Update, Delete (CRUD) tasks.
  - Real-time UI updates with optimistic rendering.
- **👤 User Profile**:
  - Update user details including **Name**, **Age**, and **Phone Number**.
  - Persisted session data for instant access.
- **📱 Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TailwindCSS, Lucide Icons.
- **Backend**: Next.js API Routes (Serverless functions).
- **Database**: MongoDB (Mongoose ODM).
- **Auth**: NextAuth.js v4.
- **Validation**: Zod + React Hook Form.

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskapp

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key_here
```

> **Tip**: Generate a secret key using `openssl rand -base64 32` or just type a long random string.

### 4. Run the Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `GET` | `/api/tasks` | Get all tasks for logged-in user |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/[id]` | Update task status |
| `DELETE` | `/api/tasks/[id]` | Delete a task |
| `PUT` | `/api/profile` | Update user profile (Name, Age, Phone) |

## 🏗️ Folder Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components (including glassmorphism inputs)
├── lib/              # Utility functions, DB connection, Auth config
├── models/           # Mongoose schemas (User, Task)
└── types/            # TypeScript definitions (NextAuth extensions)
```