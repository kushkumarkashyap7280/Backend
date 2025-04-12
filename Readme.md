# 🚀 Professional Backend Boilerplate – Node.js, Express & MongoDB

Welcome to a clean and scalable **backend architecture** built with real **industry standards** in mind. This is not just a project—it's a learning resource and a starter kit for building professional-grade backends using **Node.js**, **Express**, and **MongoDB**.

---

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
backend/
│
├── config/          # DB connection & global configs
│   └── db.js
│
├── controllers/     # Route logic / controllers
│
├── middleware/      # Middlewares (auth, errorHandler, etc.)
│
├── models/          # Mongoose schemas
│
├── routes/          # All express routes
│
├── utils/           # Utility functions (e.g., email, tokens)
│
├── uploads/         # Uploaded files via multer
│
├── .env             # Environment variables
├── server.js        # App entry point
└── package.json
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

## 🌐 Sample API Endpoints

```http
POST   /api/auth/register      # Register a new user
POST   /api/auth/login         # Login with JWT + Cookie
GET    /api/user/me            # Get logged-in user data
POST   /api/upload/image       # Upload file using multer
```

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
git clone https://github.com/your-username/pro-backend-boilerplate.git

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
📧 Email: your.email@example.com  
📺 YouTube: [Call of Coders](https://youtube.com/@callofcoders)

---

## 🤝 Contributing

Feel free to fork this project, create a new branch, and submit a PR!

---

## 📃 License

This project is licensed under the [MIT License](./LICENSE).

---

## ⭐️ Show some love!

If this helped you, **star the repo** and share it with others who want to learn **backend like a pro**.  
Together, let’s level up! 🚀

---

Let me know if you want:
- Badges (npm, node version, license, etc.)
- A logo/banner
- A sample Postman collection  
- This file added directly to your GitHub repo via a PR

Just say the word 💻🔥

