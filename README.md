# 🚖 Uber Clone Backend API

## Overview
This is the backend API for the Uber Clone application built using the **MERN stack**.  
It handles:
- User registration & login
- Captain registration & login
- Ride management
- Authentication & authorization

## Base URL
```
http://localhost:5000/api
```

---

## Authentication
Some endpoints require authentication. Pass the JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token_here>
```
For cookie-based auth, the token will be set automatically on login/registration.

---

## Endpoints

---

### **1. Register a New User**
**Endpoint**
```
POST /users/register
```

**Description**  
Registers a new user in the system and returns an authentication token.

---

**Request Headers**
| Key           | Value             | Required | Description                  |
|---------------|-------------------|----------|------------------------------|
| Content-Type  | application/json  | Yes      | Request body format          |

---

**Request Body**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "Pass@1234"
}
```

| Field                  | Type   | Required | Description                     |
|------------------------|--------|----------|---------------------------------|
| `fullName.firstName`   | string | Yes      | User's first name               |
| `fullName.lastName`    | string | Yes      | User's last name                |
| `email`                | string | Yes      | Valid email address             |
| `password`             | string | Yes      | Minimum 8 characters, secure    |

---

**Validation Rules**
- `firstName` and `lastName` must not be empty.
- `email` must be in valid email format.
- `password` must meet security requirements.

---

**Success Response**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "token": "jwt_token_here",
  "user": {
    "_id": "64cd1e1d5e0f0b1eac345f9a",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```
**Status:** `201 Created`

---

**Error Responses**
**Email Already Exists (400)**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

**Validation Errors (400)**
```json
{
  "success": false,
  "errors": [
    { "msg": "Invalid email format", "param": "email", "location": "body" }
  ]
}
```

**Server Error (500)**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

**Notes**
- On success, a JWT token is set in the `token` cookie.
- Passwords are hashed using bcrypt before saving.
- The token can be used for authentication in protected routes.

---





## Development Setup
1. Clone the repo:
```bash
git clone https://github.com/your-username/uber-clone-backend.git
```
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. Run the server:
```bash
npm run dev
```

---

## License
This project is licensed under the MIT License.
