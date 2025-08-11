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
| Key | Value | Required | Description |
|---------------|-------------------|----------|------------------------------|
| Content-Type | application/json | Yes | Request body format |

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

| Field                | Type   | Required | Description                  |
| -------------------- | ------ | -------- | ---------------------------- |
| `fullName.firstName` | string | Yes      | User's first name            |
| `fullName.lastName`  | string | Yes      | User's last name             |
| `email`              | string | Yes      | Valid email address          |
| `password`           | string | Yes      | Minimum 8 characters, secure |

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

### **2. Login an Existing User**

**Endpoint**

```
POST /users/login
```

**Description**  
Login an existing user in the system and generate an authentication token and finally returns the token with the user information.

---

**Request Headers**
| Key | Value | Required | Description |
|---------------|-------------------|----------|------------------------------|
| Content-Type | application/json | Yes | Request body format |

---

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "Pass@1234"
}
```

| Field      | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | string | Yes      | Valid email address          |
| `password` | string | Yes      | Minimum 6 characters, secure |

---

**Validation Rules**

- `email` must be in valid email format.
- `password` must meet security requirements and must not be anything less than 6 character.

---

**Success Response**

```json
{
  "success": true,
  "message": "User loggedin successfully!",
  "token": "jwt_token_here",
  "user": {
    "_id": "64cd1e1d5e0f0b1eac345f9a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "jhon@example.com",
    "__v": 0
  }
}
```

**Status:** `201 Created`

---

**Error Responses**
**Email and Password do not match (401)**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Validation Errors (401)**

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
- The token can be used for authentication in protected routes.

---

### **3. Get User Profile Information**

**Endpoint**

```
GET /user/profile
```

**Description**  
Get a loggedin user's profile information.

---

**Validation Rules**

- an authentication token must be sent through the `Headers.Authorization` or by `http-cookies`
- `token` must be in valid token format.

---

**Success Response**

```json
{
  "success": true,
  "message": "User profile is returned successfully!",
  "token": "jwt_token_here",
  "user": {
    "_id": "64cd1e1d5e0f0b1eac345f9a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "jhon@example.com",
    "__v": 0
  }
}
```

**Status:** `201 Created`

---

**Error Responses**
**Validate token (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

**If the token is a Balacklist token (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- On success, user information is provided to the client
- The token can be used for authentication in protected routes.

---


### **4. Loutout user**

**Endpoint**

```
GET /user/logout
```

**Description**  
Allow an user to logout of the system.

---

**Validation Rules**

- an authentication token must be sent through the `Headers.Authorization` or by `http-cookies`
- `token` must be in valid token format.

---

**Success Response**

```json
{
  "success": true,
  "message": "User logout successful",
  "blacklistToken": "blacklist_token_here"
}
```

**Status:** `201 Created`

---

**Error Responses**
**Validate token (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

**If the token is a Balacklist token (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- On success, the ` blacklistToken ` gets sent to the client
- The token can be used for authentication in protected routes.

---


## Development Setup

1. Clone the repo:

```bash
git clone https://github.com/omarbinsaleh/uber-clone-backend.git
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
