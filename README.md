
---

## 🧠 Backend: `README.md`

```markdown
# 🧠 Blog Backend API

This is the backend of the **Blog Web App**, built using **Node.js**, **Express**, and **MongoDB**. It provides secure REST APIs for authentication, blog CRUD operations, and user management.

---

## 🌍 Live API

🔗 [Visit the backend API](https://omnify-blog-backend.onrender.com)

---

## 📸 Features

- 👤 JWT Authentication (Login/Register)
- ✍️ Create, Read, Update, Delete blogs
- 🔎 Search blogs
- 🔐 Protected Routes with Role-based access
- 📧 Email integration for notifications (optional)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JWT for Auth**
- **Nodemailer (optional)**
- **CORS**

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Shariya31/Omnify_Blog_backend.git
cd Omnify_Blog_backend
npm install

Create a .env file in the root directory:
MONGo_URI = your mongo connection string
PORT = 5400
JWT_SECRET = your jwt secret

## 🧪 Optional environment variables for email based forgot/reset password functionality

SMTP_HOST=smtp.gmail.com
SMTP_PORT= smtp port
SMTP_SECURE=false
SMTP_USER= your email id
SMTP_PASS= your apps smtp password
SMTP_FROM_EMAIL= your email id

 Start the server
npm run dev


 API Endpoints
Method	                Route	             Description
POST	            /api/auth/register	     Register user
POST	            /api/auth/login	         Login user
GET	              /api/blog	               Get all blogs
POST	            /api/blog/create	       Create new blog
PUT	              /api/blog/:id	           Update blog
DELETE	          /api/blog/:id	           Delete blog
GET	              /api/blog/my-blogs	     Get blogs by user
GET	              /api/blog/:id	           Get single blog

