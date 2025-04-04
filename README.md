# Zoom Integration

## 📋 Overview

**Zoom Integration** is a web application that seamlessly integrates Zoom, enabling users to log in either with a regular account or through Google OAuth. It offers functionalities for managing Zoom meetings, authenticating users, and creating a smooth user experience.

This project contains both the **backend** and **frontend** components:

- **Frontend**: A modern React app built with TypeScript, styled using Tailwind CSS, and provides a seamless user experience with the help of React-Toastify for notifications.
- **Backend**: A robust Express server using MongoDB (Mongoose), JWT authentication, and Zoom OAuth integration.

## ✨ Features

- **User Authentication**: Log in via a regular account or using Google OAuth.
- **Zoom Integration**: Create and manage Zoom meetings directly from the app.
- **Responsive Design**: Tailored for both desktop and mobile views.
- **Notifications**: Real-time feedback to the users with React-Toastify.

## 🛠 Tech Stack

### 🌐 Frontend:

- **React**
- **TypeScript**
- **Tailwind CSS**
- **React-Toastify**

### 🖥 Backend:

- **Express.js**
- **MongoDB & Mongoose**
- **Passport.js & Google OAuth2**
- **JWT**
- **Multer**
- **Zoom API Integration**

## 📌 Environment Variables

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
```

## 🛠 Tech Setup

### 🚀 Running the Backend

To run the backend server, I used **nodemon** to automatically restart the server during development whenever file changes are made. Additionally, **nodemon** is configured to read environment variables from the `.env` file to manage different configurations for the backend.

In the `package.json`, the following script is used:

```json
"scripts": {
  "start": "nodemon --env-file .env ./server/server.js"
}
```

### 🔧 Installing **nodemon** Globally

If **nodemon** is not installed globally on your machine, you can install it using the following command:

```bash
npm install -g nodemon
```
