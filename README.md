# MealMatch - Fitness Meal Companion Application

A full-stack web application connecting fitness enthusiasts with local cooks for healthy, macro-friendly meals. Built as a companion to the Tribe - Sport & Fitness App that is currently available for download on the Apple App Store and the Google Play Store.

## Project Overview

MealMatch allows users to discover local verified cooks, browse nutritious recipes tailored to fitness goals, and manage meal orders - all with detailed nutritional information to support their fitness journey.

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **Express-validator** for input validation
- RESTful API architecture

### Frontend
- **Next.js** (Pages Router) with TypeScript
- **React** for UI components
- **Tailwind CSS** for styling
- **Axios** for API calls
- Responsive design

## Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes with auth middleware
- ✅ User profile management

### Core Functionality
- ✅ Browse local verified cooks with ratings and specialties
- ✅ View available recipes with detailed nutritional information
- ✅ Filter recipes by dietary tags (vegan, gluten-free, keto, etc.)
- ✅ View cook ratings, prep times, and order history
- ✅ User order history tracking

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user profile (protected)

### Cooks Routes (`/api/cooks`)
- `GET /nearby` - Get nearby local cooks

### Recipes Routes (`/api/recipes`)
- `GET /` - Get all available recipes

### Orders Routes (`/api/orders`)
- `GET /user` - Get user's orders (protected)

## Database Models

- **User** - User accounts with location and preferences
- **Cook** - Local cook profiles with business info and ratings
- **Recipe** - Meal recipes with nutrition data and pricing
- **Order** - User order history and status

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# JWT_EXPIRES_IN=7d
npm start
# Server runs on http://localhost:4000