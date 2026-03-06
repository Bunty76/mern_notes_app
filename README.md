# ThinkNote - Full Stack Notes App

A full-stack web application built with React, Vite, Node.js, Express, and MongoDB.

## Features

- User authentication (Register/Login/Logout) with JWT
- Create, read, and manage notes
- Protected routes
- Responsive UI with Tailwind CSS and DaisyUI
- Hot toast notifications

## Tech Stack

**Frontend:**
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- DaisyUI
- Lucide React Icons

**Backend:**
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT Authentication
- Cookie Parser
- CORS
- Bcryptjs

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Update `.env` with your values:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=7d
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Deployment to Render

This project is configured for deployment on Render using a monorepo approach with two separate services.

### Steps to Deploy:

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Create MongoDB Database:**
   - In Render Dashboard, go to "New" → "Database"
   - Select "MongoDB"
   - Choose a name (e.g., `thinknote-db`)
   - Select the free plan
   - Create database
   - Note the connection string (it will be available as `DATABASE_URL`)

3. **Create Backend Web Service:**
   - In Render Dashboard, go to "New" → "Web Service"
   - Connect your GitHub repository
   - Name: `thinknote-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add Environment Variables:
     - `NODE_ENV` = `production`
     - `PORT` = `5000`
     - `MONGO_URI` = `%DATABASE_URL%` (select from database dropdown)
     - `JWT_SECRET` = (generate a random secure string)
     - `JWT_EXPIRE` = `7d`
   - Create Web Service

4. **Create Frontend Static Site:**
   - In Render Dashboard, go to "New" → "Static Site"
   - Connect your GitHub repository
   - Name: `thinknote-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add Environment Variable:
     - `VITE_API_URL` = `https://thinknote-backend.onrender.com`
   - Create Static Site

5. **Wait for Deployment:**
   - Render will automatically build and deploy both services
   - Once complete, your app will be live at the frontend URL

### Important Notes:

- The `render.yaml` file in the root automates much of this configuration
- Both services are deployed separately for better scalability
- The frontend uses the `VITE_API_URL` environment variable to connect to the backend
- Backend API will be available at: `https://thinknote-backend.onrender.com`
- Frontend will be available at: `https://thinknote-frontend.onrender.com`

## Project Structure

```
ThinkNote/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── noteController.js
│   │   │   └── user.controllers.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── note.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── noteRoutes.js
│   │   │   └── userRoutes.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── render.yaml
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Notes
- `GET /api/notes` - Get all notes (protected)
- `GET /api/notes/:id` - Get single note (protected)
- `POST /api/notes` - Create note (protected)
- `PUT /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)

## Environment Variables Reference

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 7d) |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes (in production) |

## Troubleshooting

### Common Issues:

1. **"JWT_SECRET not defined" error:**
   - Ensure `JWT_SECRET` is set in your Render environment variables

2. **MongoDB connection failed:**
   - Check that `MONGO_URI` is correctly set
   - Ensure your MongoDB database is running and accessible
   - For Render, use the `%DATABASE_URL%` variable from the MongoDB service

3. **Frontend can't connect to backend:**
   - Verify `VITE_API_URL` is set correctly in frontend environment variables
   - Check that the backend service is running and healthy

4. **Static files not found:**
   - This app uses separate services, so frontend is served independently
   - Backend only serves API endpoints

## License

ISC
