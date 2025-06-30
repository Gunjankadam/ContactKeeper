
# ContactKeeper

A complete contact management system with a styled HTML/CSS/JS frontend (for demo purpose) and a secure Node.js/Express/MongoDB backend. Includes **4-digit email OTP verification**, **form validations**, **JWT authentication**, and full CRUD for contact data.

---

## Features

- User registration with 4-digit OTP email verification
- Login with JWT and secure storage in localStorage
- Contact CRUD operations (Create, Read, Update, Delete)
- Clean UI with OTP input boxes
- Password strength validation (1 uppercase, 1 special char, 2 digits, min 6 chars)

---

## File Structure

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

```
contactkeeper-frontend/
├── index.html            # Login Page
├── register.html         # Registration with OTP verification
├── dashboard.html        # Contact list
├── add-contact.html      # Create contact
├── edit-contact.html     # Edit contact
├── main.js               # Full app logic (login, otp, CRUD)
├── style.css             # Responsive & modern UI styles
```

---

## API Endpoints

| Method | Endpoint                    | Description                            | Auth |
|--------|-----------------------------|----------------------------------------|------|
| POST   | `/api/users/register`       | Register new user                      | ❌   |
| POST   | `/api/users/login`          | Login and get JWT                      | ❌   |
| POST   | `/api/users/send-otp`       | Send OTP email to user                 | ❌   |
| GET    | `/api/contacts`             | Get all contacts for logged-in user    | ✅   |
| POST   | `/api/contacts`             | Add new contact                        | ✅   |
| PUT    | `/api/contacts/:id`         | Update a contact                       | ✅   |
| DELETE | `/api/contacts/:id`         | Delete a contact                       | ✅   |

---

## Authentication

- JWT-based authentication is used.
- Include token in headers as:  
  `Authorization: Bearer <your_token>`

---

## Setup Instructions

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
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=your-secret-key
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Frontend Highlights

- OTP sent via backend and stored temporarily in `tempOtp` (demo mode)
- Frontend form validates:
  - Email format
  - Password security
  - Username length
- OTP input as 4 separate boxes
- Clear alert messages and automatic redirects

---

## Authentication

All protected routes require a JWT token stored in `localStorage` and sent in:

```http
Authorization: Bearer <token>
```

---

### 2.  Connect Frontend to Backend

Edit this line in `main.js`:
```js
const API_BASE = 'https://your-backend-url';
```

### 3. Frontend Deployment and backend deployment

Frontend [Netlify](https://contactkeeper-77.netlify.app/)
Backend [Render](https://contactkeeper-ulq2.onrender.com)

---

##  Screenshots of Demo

![Image 3](https://github.com/Gunjankadam/ContactKeeper/blob/main/33.png)
![Image 3](https://github.com/Gunjankadam/ContactKeeper/blob/main/new.png)
![Image 3](https://github.com/Gunjankadam/ContactKeeper/blob/main/22.png)


