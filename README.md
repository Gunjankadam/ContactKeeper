# 📇 ContactKeeper API

A secure and modular RESTful API for managing user contacts and authentication, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Project Overview

**ContactKeeper API** enables users to register, log in, and perform full CRUD operations on their personal contacts. This API is structured for scalability and includes token-based authentication, input validation, and error handling middleware.

---

## 📁 File Structure

```
contact-backend-api-main/
├── server.js                     # Main entry point
├── package.json                  # Project metadata and dependencies
├── .gitignore
├── config/
│   └── dbConnection.js           # MongoDB connection setup
├── controllers/
│   ├── contactControllers.js     # Logic for contact CRUD operations
│   └── userControllers.js        # Logic for user registration & login
├── middleware/
│   ├── errorHandler.js           # Centralized error handling
│   └── validtokenhandler.js      # Token verification middleware
├── models/
│   ├── contactModels.js          # Contact schema definition
│   └── userModels.js             # User schema definition
├── routes/
│   ├── contactRoutes.js          # Contact API routes
│   ├── userRoutes.js             # User auth routes
│   └── constants.js              # Response status messages
└── .vscode/
    └── extensions.json
```

---

## 🌐 API Endpoints

| Method | Endpoint               | Description                            | Auth Required |
|--------|------------------------|----------------------------------------|---------------|
| POST   | `/api/users/register`  | Register a new user                    | ❌            |
| POST   | `/api/users/login`     | Log in and receive a JWT token         | ❌            |
| GET    | `/api/contacts/`       | Get all contacts of logged-in user     | ✅            |
| GET    | `/api/contacts/:id`    | Get a specific contact by ID           | ✅            |
| POST   | `/api/contacts/`       | Create a new contact                   | ✅            |
| PUT    | `/api/contacts/:id`    | Update an existing contact by ID       | ✅            |
| DELETE | `/api/contacts/:id`    | Delete a contact by ID                 | ✅            |

---

## 🔐 Authentication

- JWT-based authentication is used.
- Include token in headers as:  
  `Authorization: Bearer <your_token>`

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd contact-backend-api-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add:
   ```env
   MONGO_URI=<your-mongo-db-uri>
   JWT_SECRET=<your-secret>
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Postman (for API testing)

---

## 📌 Notes

- All routes are prefixed with `/api/`.
- The project includes custom error handling and token validation middleware.

---

## 📧 Contact

For any support, reach out to the maintainer or open an issue.
