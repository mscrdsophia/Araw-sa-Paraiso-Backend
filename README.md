# 🏨 Araw sa Paraiso – Backend

This is the **backend API** for the Araw sa Paraiso MERN hotel booking application. It powers the room booking, user authentication, media uploads, and scheduling features of the platform.

---

## 🌐 Live API  
Deployed via **Render**  
*(https://araw-sa-paraiso-backend.onrender.com)*

---

## ⚙️ Features

- 🔐 User authentication with JWT and hashed passwords
- 🛏 Room availability tracking and booking logic
- 📷 Cloudinary image upload via Multer
- 🍪 Cookie management for secure sessions 
- 🔄 Scheduled background tasks with Node-Cron
- 🧾 Clean HTTP logging using Morganv
- 🌍 Fully CORS-enabled for frontend integration

---

## 🧰 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Render (Deployment)
- Cloudinary (for media storage)

---

## 📦 Libraries Used

```json
"bcryptjs": "^3.0.2",
"cloudinary": "^1.41.3",
"cookie": "^1.0.2",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.12.1",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.2",
"multer-storage-cloudinary": "^4.0.0",
"node-cron": "^3.0.3",
"nodemon": "^3.1.9",
"parser": "^0.1.4",
"storage": "^0.2.0"
