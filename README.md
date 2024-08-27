# QuickAuth File

## Overview

QuickAuth File is a full-stack MERN application that provides user authentication and authorization, along with file management functionalities. Users can register, log in, upload, delete, and download files.

## Features

- **Authentication**: Secure user registration and login.
- **Authorization**: Role-based access control to restrict certain actions.
- **File Upload**: Upload files to the server.
- **File Delete**: Remove files from the server.
- **File Download**: Download files from the server.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Local storage (can be replaced with cloud storage like AWS S3)
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/mwaseem1923/QuickAuth.git
   cd QuickAuth

# For the backend
    cd backend
    npm install
    # or
    yarn install

# For the frontend
    cd ../frontend
    npm install
    # or
    yarn install

Configure environment variables

  Create a .env file in the backend directory with the following content:

    MONGO_URI=mongodb://localhost:27017/quickauth-file
    JWT_SECRET=your_jwt_secret

Create a .env file in the frontend directory with the following content:

    REACT_APP_API_URL=http://localhost:5000/api


# Start backend server
    cd backend
    npm start
    # or
    yarn start

# Start frontend client
    cd ../frontend
    npm start
    # or
    yarn start


The backend server will be available at http://localhost:5000, and the frontend client at http://localhost:3000.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For questions or issues, please contact the project maintainers at mwaseem00064@gmail.com.


### Summary:

- **Unified Flow**: All steps are integrated into one continuous flow.
- **Straightforward Commands**: Commands for installing dependencies and running the application are presented consecutively.
- **Environment Variables**: Instructions for creating and configuring `.env` files are included directly with the installation steps.

This structure maintains a smooth, uninterrupted guide for setting up the project, from cloning the repository to running the application.


