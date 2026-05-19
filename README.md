<div align="center">
  <img src="public/favicon.svg" alt="GoalSync Logo" width="120" height="120" />
  <h1>GoalSync</h1>
  <p><strong>Enterprise-Grade Goal Setting & Tracking Portal</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

<br />

GoalSync is a modern, high-performance, and responsive full-stack platform designed for organizations to streamline employee goal management, team alignment, and performance tracking.

With a beautiful interface powered by Tailwind CSS and Framer Motion, and secure, robust RESTful APIs backed by Node.js and MongoDB, GoalSync is built for scale and premium user experience.

## ✨ Features

- **Role-Based Access Control (RBAC)**: Distinct, tailored dashboard views for Employees, Managers, and Administrators.
- **Goal Management Lifecycle**: Create, assign, track, and update goals with real-time status changes.
- **Interactive Analytics**: Rich, data-driven charts and visualizations powered by Recharts.
- **Secure Authentication**: JWT-based authentication system with encrypted passwords using bcrypt.
- **Modern UI/UX**: Glassmorphism design elements, responsive layouts, and seamless micro-animations.
- **Vercel Serverless Ready**: Architected to deploy seamlessly as a unified full-stack application on Vercel's Edge Network.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Security**: JSON Web Tokens (JWT), bcryptjs
- **Environment**: dotenv, cors

---

## 🛠️ Local Development Setup

To run GoalSync locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/sanant456/Goal-Setting-tracking-portal.git
cd Goal-Setting-tracking-portal
```

### 2. Install Dependencies
Dependencies for both the frontend and backend are managed at the root level for easy deployment and setup.
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (or use `backend/.env`) with the following values:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/goal-tracking  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Start the Application
Run both the React development server and the Express API concurrently:
```bash
# Terminal 1: Start the backend server
node backend/server.js

# Terminal 2: Start the Vite frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`. API requests are automatically proxied to `http://localhost:5000`.

---

## ☁️ Deployment

This project is configured to deploy instantly on **Vercel** as a unified application.

1. Connect your GitHub repository to Vercel.
2. Ensure you add `MONGO_URI` (pointing to a cloud DB like MongoDB Atlas) and `JWT_SECRET` in the Vercel **Environment Variables** settings.
3. Vercel automatically reads `vercel.json` and configures the Express backend as Serverless Functions (`api/index.js`), while building and serving the React frontend.

**Live URL**: [https://goal-setting-and-tracking-portal-rho.vercel.app/](https://goal-setting-and-tracking-portal-rho.vercel.app/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sanant456/Goal-Setting-tracking-portal/issues).

## 📄 License

This project is licensed under the MIT License.
