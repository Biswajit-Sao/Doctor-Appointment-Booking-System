

---

# 🩺 Doctor Appointment Booking System

A full-stack **Doctor Appointment Booking** application with dedicated interfaces for **Users**, **Doctors**, and **Admins**. Offers a smooth, secure, and responsive experience for managing healthcare appointments.

---

## 🌐 Live Demo

* 👤 **User Interface:** [projectdoctors.netlify.app](https://projectdoctors.netlify.app)
* 🛠️ **Admin Dashboard:** [adminapp123.netlify.app](https://adminapp123.netlify.app)

---

## 🔐 Admin Login (Demo)

> ⚠️ *These credentials are for demo/testing purposes only. Do not use them for real data.*

* **Email:** `biswajit@admin.com`
* **Password:** `biswajit123`

---

## 📋 Key Features

✅ Three-level authentication: **Patient**, **Doctor**, **Admin**
✅ Secure **online payment integration** via Razorpay
✅ Doctors can manage **appointments & earnings**
✅ Patients can **book, pay, and track** appointments
✅ Clean, responsive **UI/UX** optimized for all devices
✅ Built on the **MERN Stack** for performance and scalability

---

## 🛠 Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | React.js, CSS   |
| Backend     | Node.js, Express.js, MongoDB         |
| Hosting     | Netlify (Frontend), Render (Backend) |
| Payments    | Razorpay                             |
| Cloud Media | Cloudinary                           |

---

## ⚙️ Environment Setup

To run the project locally, you must configure `.env` files in each folder.

---

### 📂 Backend `.env`

```
PORT=8000
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=biswajit@admin.com
ADMIN_PASSWORD=biswajit123
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

---

### 📂 Frontend (User Interface) `.env`

```
VITE_BACKEND_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

### 📂 Admin Panel `.env`

```
VITE_BACKEND_URL=http://localhost:8000
```

---

## 🚀 Getting Started (Local Setup)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Biswajit-Sao/Doctor-Appointment-Booking-System.git
   ```

2. **Install Dependencies:**

   * For backend:

     ```bash
     cd backend
     npm install
     ```

   * For frontend:

     ```bash
     cd frontend
     npm install
     ```

   * For admin:

     ```bash
     cd admin
     npm install
     ```

3. **Add `.env` files** as shown above.

4. **Start Development Servers:**

   ```bash
   # Backend
   npm run start

   # Frontend (in a new terminal)
   npm run dev

   # Admin (in a new terminal)
   npm run dev
   ```

---



## 👨‍💻 Author

**Biswajit Sao**

---


