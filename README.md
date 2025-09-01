# Full-Stack Note-Taking Application 📝

This is a complete note-taking web application featuring a modern, responsive frontend and a secure backend. The application supports user authentication via email OTP and allows users to create, view, and delete their personal notes.

The project is structured as a monorepo with two main folders:
- `/client`: The React (Vite + TypeScript) frontend.
- `/server`: The Node.js (Express + TypeScript) backend.

---

## ✨ Key Features

- **Pixel-Perfect UI**: A responsive and visually accurate interface based on the provided design mockups.
- **Secure OTP Authentication**: Passwordless sign-up and sign-in flow using One-Time Passwords sent to the user's email.
- **JWT-Based Sessions**: Secure API endpoints using JSON Web Tokens for session management.
- **CRUD Functionality**: Users can **C**reate, **R**ead, and **D**elete their own notes.
- **Data Isolation**: Each user can only access their own data.
- **Modern Tech Stack**: Built with TypeScript on both the frontend and backend for a robust and type-safe codebase.

---

## 🛠️ Tech Stack

| Area | Technology |
| :-------- | :-------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, TailwindCSS, Axios |
| **Backend** | Node.js, Express, TypeScript, MongoDB |
| **Database** | MongoDB (with Mongoose) |
| **Auth** | JSON Web Tokens (JWT), Nodemailer (for OTP) |

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or later.
- **npm** or **yarn**: A package manager for Node.js.
- **MongoDB**: A running instance, either locally or on a cloud service like MongoDB Atlas.
- **Email Service**: An SMTP-enabled email account (like Gmail with an "App Password") to send OTPs.

---

## 🚀 Getting Started

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/yashjainme/hd-note-app.git
cd hd-note-app
```

### 2. Backend Setup (/server)

The backend server handles all API logic, database interactions, and authentication.

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` in backend and fill in your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Note**: For Gmail, you must generate an "App Password" to use for `EMAIL_PASS`. Standard passwords will not work if 2FA is enabled.

Run the Backend Server:

```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

### 3. Frontend Setup (/client)

The frontend is a React single-page application that provides the user interface.

Open a new terminal window and navigate to the client directory from the project root:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run the Frontend Development Server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

---

## 📚 Additional Information

Once both servers are running, you can:

1. Navigate to `http://localhost:5173` in your browser
2. Sign up with your email address
3. Check your email for the OTP code
4. Enter the code to authenticate
5. Start creating and managing your notes!

The application provides a clean, intuitive interface for managing your personal notes with secure authentication and data isolation.