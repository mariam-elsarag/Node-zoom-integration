# Zoom Integration

## Overview

**Zoom Integration** is a web application that seamlessly integrates Zoom, enabling users to log in either with a regular account or through Google OAuth. It offers functionalities for managing Zoom meetings, authenticating users, and creating a smooth user experience for both admins and regular users.

This project contains both the **backend** and **frontend** components:

- **Frontend**: A modern React app built with TypeScript, styled using Tailwind CSS, and provides a seamless user experience with the help of React-Toastify for notifications.
- **Backend**: A robust Express server using MongoDB (Mongoose), JWT authentication, and Zoom OAuth integration.

## Features

- **User Authentication**: Log in via a regular account or using Google OAuth.
- **Zoom Integration**: Create and manage Zoom meetings directly from the app.
- **Responsive Design**: Tailored for both desktop and mobile views.
- **Notifications**: Real-time feedback to the users with React-Toastify.

## Tech Stack

### Frontend:

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Tailwind CSS**: For rapid and customizable styling.
- **React-Toastify**: For elegant and easy-to-use notifications.

### Backend:

- **Express.js**: For building the server-side application.
- **MongoDB & Mongoose**: For data storage and schema management.
- **Passport.js & Google OAuth2**: For user authentication via Google.
- **JWT**: For secure user authentication and token management.
- **Multer**: For handling file uploads.
- **Zoom API Integration**: To manage Zoom meetings and authentication.

## Environment Variables

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
