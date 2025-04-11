# 📹 Zoom Integration

## 📋 Overview

**Zoom Integration** is a web application that seamlessly integrates Zoom, enabling users to log in either with a regular account or through Google OAuth. It offers functionalities for managing Zoom meetings, authenticating users, and creating a smooth user experience.

This project contains both the **backend** and **frontend** components:

- **Frontend**: A modern React app built with TypeScript, styled using Tailwind CSS, and provides a seamless user experience with the help of React-Toastify for notifications.
- **Backend**: A robust Express server using MongoDB (Mongoose), JWT authentication, and Zoom OAuth integration.

---

## ✨ Features

- **User Authentication**: Log in via a regular account or using Google OAuth.
- **Zoom Integration**: Create and manage Zoom meetings directly from the app.
- **Responsive Design**: Tailored for both desktop and mobile views.
- **Automated Email Notifications**: Send email notifications using **Nodemailer** when the scheduled meeting time arrives, powered by **Agenda** for background task scheduling.

---

## 🎥 Demo Preview

Take a quick look at how the app works in action! From logging in to creating meetings — it's all here:

![Video Demo](https://raw.githubusercontent.com/mariam-elsarag/Zoom-integration/main/assets/Demo.gif)

---

## 🛠️ Tech Stack

### 🌐 Frontend

- Framework: **React**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- Notifications: **React-Toastify**

### 💻 Backend

- Runtime: **Node.js**
- Framework: **Express.js**
- Database: **MongoDB** (with **Mongoose**)
- Auth: **Passport.js** (with **Google OAuth2**), **JWT**
- File Uploads: **Multer**
- Emails: **Nodemailer**
- Background Jobs: **Agenda**
- 3rd Party Integration: **Zoom API**

---

## 📦 API Documentation

You can access the full API documentation via Postman using the link below 👇:

🔗 [View API Docs on Postman](https://documenter.getpostman.com/view/39898064/2sB2cU9hVn)

---

## 📋 Prerequisites

- Node.js (vXX.X.X)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- A `.env` file with required configs
- Optional: `nodemon` for development

---

## 🧪 Environment Variables

The backend application requires the following environment variables to be set in your `.env` file:

```env
NODE_ENV="production"
PORT=8000

# Database Configuration
DATABASE=""
DATABASE_PASSWORD=""

# Google OAuth Configuration
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET_KEY=""
GOOGLE_CALLBACK_URL="http://localhost:8000/api/auth/google/callback"

# Frontend Server URL
FRONT_SERVER_URL="http://localhost:5173"

# Zoom API Integration
ZOOM_ACCOUNT_ID=""
ZOOM_CLIENT_ID=""
ZOOM_CLIENT_SECRET=""
ZOOM_REDIRECT_URI="http://localhost:8000/api/zoom/callback"

# JWT Configuration
JWT_SECRET_KEY=""
JWT_EXPIRE_IN="15d"

# Sending Email
EMAIL_FROM=""
EMAIL_USER=""
EMAIL_PASSWORD=""
```

### ✅ Notes

- If you set `NODE_ENV="development"`, you’ll see **detailed error messages** to help with debugging.
- If you set `NODE_ENV="production"`, the app will only show **custom handled errors** via a global error middleware called `globalError`.
- The **backend server** runs on port **8000** (`PORT=8000`).
- The **frontend app** runs on **http://localhost:5173** by default.
- Make sure your frontend `.env` contains this variable to correctly reach the backend:

```env
VITE_REACT_APP_BASE_URL=http://localhost:8000
```

## ⚙️ Project Setup

### 🧰 Backend Setup

1- Navigate to the backend folder (if applicable), then install dependencies:

```bash
npm install
```

2- Run the backend server using the development script:

```bash
npm start
```

> ⚠️ Important: Make sure your .env file includes the correct MongoDB connection:

```env
DATABASE="your_mongo_connection_string"
DATABASE_PASSWORD="your_password_here"

```

Otherwise, the app will throw a database connection error.

## 🔧 Installing nodemon Globally (Optional for Dev)

If nodemon is not installed globally, you can install it with:

```bash
npm install -g nodemon
```

The backend uses the following script in package.json:

```json
"scripts": {
  "start": "nodemon --env-file .env ./server/server.js"
}

```

### 💻 Frontend Setup

1- Navigate to the frontend folder:

```bash
cd client
```

2- Install dependencies:

```bash
npm install
```

3- Run the frontend development server:

```bash
npm run dev

```
