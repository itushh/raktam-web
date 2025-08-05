# Donor Registration Features

## Overview
This document describes the new donor registration functionality added to the Raktam application.

## Features Implemented

### 1. Become Donor Page
- **Location**: `/become-donor`
- **Access**: Only logged-in users can access this page
- **Theme**: Matches the design theme of the Register page
- **Functionality**: 
  - Register as a new donor
  - Update existing donor profile
  - Form validation with error handling
  - Responsive design for mobile and desktop

### 2. Input Fields
The donor registration form includes the following fields:
- **Date of Birth**: Required, validates age (18-65 years)
- **Blood Group**: Required, dropdown with all blood types (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Mobile Number**: Required, validates 10-digit format
- **Address**: Required, minimum 10 characters
- **Donated Before**: Checkbox to indicate previous donation experience
- **Date Donated**: Conditional field, visible only if "Donated Before" is checked
- **Willing to Donate in Emergency**: Checkbox for emergency donation willingness
- **Willing to be Called for Camps**: Checkbox for donation camp participation

### 3. Navigation Integration
- **Header**: "Become Donor" button added to the main navigation (visible only for logged-in users)
- **Mobile Menu**: "Become Donor" option added to mobile navigation
- **Home Page**: Hero section "Become a Donor" button now links to the new page
- **Features Section**: "Become a Donor" card links to the new page

### 4. Backend API

#### Database Model
- **Collection**: `donors`
- **Schema**: Includes all form fields with proper validation
- **Relationships**: Links to User model via `userId` field

#### API Endpoints
- `POST /api/donor/register` - Register as a new donor
- `GET /api/donor/profile` - Get donor profile
- `PUT /api/donor/profile` - Update donor profile

#### Authentication
- All donor endpoints require JWT authentication
- User must be logged in to access donor functionality

### 5. Form Validation
- **Client-side**: Real-time validation with error messages
- **Server-side**: Comprehensive validation with detailed error responses
- **Age validation**: Ensures donors are between 18-65 years old
- **Mobile number**: Validates 10-digit format
- **Address**: Minimum length requirement
- **Conditional fields**: Date donated required only if donated before

### 6. User Experience
- **Loading states**: Shows loading spinner while checking existing profile
- **Edit mode**: Automatically detects if user is already a donor and switches to edit mode
- **Success feedback**: Redirects to dashboard after successful registration
- **Error handling**: Displays specific error messages for validation failures
- **Responsive design**: Works seamlessly on mobile and desktop devices

## Technical Implementation

### Frontend
- **Component**: `BecomeDonor.jsx` in `frontend/src/pages/`
- **Protected Route**: Wrapped with `ProtectedRoute` component
- **State Management**: Uses React hooks for form state and validation
- **API Integration**: Uses `getApiEndpoint` for consistent API calls

### Backend
- **Model**: `Donor.js` in `backend/models/`
- **Controller**: `donorController.js` in `backend/controllers/`
- **Routes**: `donor.js` in `backend/routes/`
- **Middleware**: Uses existing authentication middleware

### Database Schema
```javascript
{
  userId: ObjectId (ref: User),
  dateOfBirth: Date,
  bloodGroup: String (enum),
  mobileNumber: String,
  address: String,
  donatedBefore: Boolean,
  dateDonated: Date (conditional),
  willingToDonateInEmergency: Boolean,
  willingToBeCalledForCamps: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

### Backend Setup
1. Create `.env` file in backend directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/raktam_app
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   PORT=3000
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Register/login to the application
2. Click "Become Donor" in the header or hero section
3. Fill out the donor registration form
4. Submit to save your donor profile
5. You can update your profile anytime by visiting the same page

## Security Features
- JWT authentication required for all donor operations
- User can only access/modify their own donor profile
- Input validation on both client and server side
- Secure password handling (inherited from existing auth system) 