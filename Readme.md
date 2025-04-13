# 🚀 Professional Backend Boilerplate – Node.js, Express & MongoDB

Welcome to a clean and scalable **backend architecture** built with real **industry standards** in mind. This is not just a project—it's a learning resource and a starter kit for building professional-grade backends using **Node.js**, **Express**, and **MongoDB**.

---
# 📡 HTTP Status Codes Cheat Sheet

HTTP status codes are 3-digit responses sent by a server to indicate the outcome of a client’s request. They are categorized based on the first digit.

---

## ✅ 1xx – Informational

> Request received, continue processing.

| Code | Message              | Description                                      |
|------|----------------------|--------------------------------------------------|
| 100  | Continue             | Initial request received, continue.             |
| 101  | Switching Protocols  | Switching to a different protocol.              |
| 102  | Processing (WebDAV)  | Server has received and is processing request.  |

---

## 🟢 2xx – Success

> The request was successfully processed.

| Code | Message              | Description                                      |
|------|----------------------|--------------------------------------------------|
| 200  | OK                   | Request was successful.                         |
| 201  | Created              | New resource was successfully created.          |
| 202  | Accepted             | Request accepted but not yet processed.         |
| 204  | No Content           | Success but no content to return.               |

---

## 🟡 3xx – Redirection

> Further action is needed to complete the request.

| Code | Message              | Description                                      |
|------|----------------------|--------------------------------------------------|
| 301  | Moved Permanently    | Resource has been moved permanently.            |
| 302  | Found                | Resource temporarily moved to a new URL.        |
| 304  | Not Modified         | Use cached version of the resource.             |
| 307  | Temporary Redirect   | Redirect, but request method must not change.   |

---

## 🔴 4xx – Client Errors

> The client made a bad request.

| Code | Message              | Description                                      |
|------|----------------------|--------------------------------------------------|
| 400  | Bad Request          | Malformed syntax or invalid request.            |
| 401  | Unauthorized         | Authentication required or failed.              |
| 403  | Forbidden            | You don’t have access rights.                   |
| 404  | Not Found            | Resource not found.                             |
| 409  | Conflict             | Conflict with current state (e.g., duplicate).  |
| 422  | Unprocessable Entity | Invalid input or validation error.              |
| 429  | Too Many Requests    | Rate limit exceeded.                            |

---

## 🔥 5xx – Server Errors

> The server failed to fulfill a valid request.

| Code | Message              | Description                                      |
|------|----------------------|--------------------------------------------------|
| 500  | Internal Server Error| Generic server error.                           |
| 501  | Not Implemented      | Server doesn’t support the request method.      |
| 502  | Bad Gateway          | Invalid response from upstream server.          |
| 503  | Service Unavailable  | Server is overloaded or down.                   |
| 504  | Gateway Timeout      | Upstream server timed out.                      |

---

## 🧠 Developer Cheat Sheet

| Use Case                        | Status Code        |
|--------------------------------|--------------------|
| Success (GET, general)         | `200 OK`           |
| Resource created (POST)        | `201 Created`      |
| Missing or invalid data        | `400 Bad Request`  |
| Unauthorized (missing token)   | `401 Unauthorized` |
| Forbidden (no permission)      | `403 Forbidden`    |
| Not found (invalid route)      | `404 Not Found`    |
| Duplicate or conflict          | `409 Conflict`     |
| Validation error (form etc.)   | `422 Unprocessable Entity` |
| Too many requests              | `429 Too Many Requests` |
| Server crashed or broken       | `500 Internal Server Error` |

---

## 🛠 Express.js Example

```js
// Success response
res.status(200).json({ message: "Everything is fine!" });

// Created a new resource
res.status(201).json({ message: "Resource created!" });

// Bad input or validation failed
res.status(400).json({ error: "Bad request!" });

// Unauthorized access
res.status(401).json({ error: "Unauthorized!" });

// Server error
res.status(500).json({ error: "Internal Server Error!" });

## 🌟 Key Features

- ✅ Scalable Project Architecture (MVC Pattern)
- ✅ JWT Authentication with HttpOnly Cookies
- ✅ Multer for File Uploads
- ✅ Cookie-based Sessions
- ✅ Role-based Access Control (Admin/User/etc.)
- ✅ Secure CORS Setup
- ✅ Dotenv Config Management
- ✅ Centralized Error Handling
- ✅ MongoDB Connection with Mongoose
- ✅ Production-Ready API Setup

---

## 🛠 Tech Stack

| Tech             | Usage                           |
|------------------|----------------------------------|
| **Node.js**       | Backend runtime                 |
| **Express.js**    | Web server framework            |
| **MongoDB**       | NoSQL Database                  |
| **Mongoose**      | MongoDB ODM                     |
| **JWT**           | Auth and session management     |
| **Cookie-Parser** | Handle cookies                  |
| **Multer**        | File/image uploading            |
| **CORS**          | Cross-origin access             |
| **dotenv**        | Environment configuration       |

---

## 📁 Folder Structure

```bash
```bash
backend/
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lockfile
├── Readme.md               # Project documentation
├── public/                 # Static files or temporary uploads
│   └── temp/
└── src/                    # All core backend code lives here
    ├── app.js              # Express app configuration
    ├── index.js            # Server entry point
    ├── constants.js        # Reusable constants
    ├── controllers/        # Request handlers / route logic
    ├── db/                 # MongoDB connection setup
    ├── middlewares/        # Auth, error handling, etc.
    ├── models/             # Mongoose models (User, Post, etc.)
    ├── routes/             # Route definitions
    └── utils/              # Helper functions (e.g., token gen, validators)
```

---

## 🔐 Authentication & Authorization

- ✅ JWT stored in HttpOnly cookies
- ✅ Middleware-based route protection
- ✅ Role-based access (e.g., admin, user, seller)
- ✅ Password encryption using bcryptjs

---

## 📤 File Upload with Multer

- File upload route enabled with `multer`
- Easily connect to **Cloudinary**, **AWS S3**, or **Firebase** for cloud storage
- Default directory: `/uploads`

---

---

## 🧪 Testing the API

Use tools like **Postman**, **Thunder Client**, or **Insomnia** to test all routes. Make sure to attach your JWT token via cookies or headers depending on the route.

---

## 🧾 .env Example

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/backendProject
JWT_SECRET=yourSuperSecretJWT
CLIENT_URL=http://localhost:3000
```

---

## 📦 Installation & Setup

```bash
# Step 1: Clone the project
git clone https://github.com/kushkumarkashyap7280/Backend.git

# Step 2: Navigate into the project
cd pro-backend-boilerplate

# Step 3: Install dependencies
npm install

# Step 4: Run server in development
npm run dev
```

---

## 💡 Best Practices Followed

- MVC Design Pattern
- Clean Code with Comments
- Environment Separation (dev/prod)
- Modular and Reusable Code
- Robust Error Handling
- Secure Cookies with HttpOnly & SameSite

---

## 🎯 Goals of This Project

> This backend is more than a boilerplate—it's a **learning tool**. The goal is to help you understand how professional-grade backend systems are built, how companies structure and scale their codebase, and how to apply **real-world architecture** to your personal or client projects.

---

## 📬 Author Info

**Created by [Kush Kumar](https://callofcoders.in)**  
📧 Email: kushkumar.officialsoftwaredev@gmail.com
📺 YouTube: [Call of Coders](https://youtube.com/@callofcoders)

---

