# 🛍️ ShoppyGlobe E-commerce Backend

This is the backend API for **ShoppyGlobe**, built with **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. It handles product listings, cart management, and user login/registration.

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- ThunderClient/Postman for API testing

---

## 🔐 Features Implemented

### ✅ Products

- `GET /products` – Fetch all products
- `GET /products/:id` – Fetch single product by ID

### ✅ Cart (Protected with JWT)

- `POST /cart` – Add item to cart
- `PUT /cart/:id` – Update quantity of cart item
- `DELETE /cart/:id` – Remove item from cart

### ✅ Authentication

- `POST /register` – Register a new user
- `POST /login` – Login and receive JWT token
- All cart routes are protected with JWT middleware

---

## 🔧 Setup Instructions

1. **Clone this repo**
2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` in root directory**

```
JWT_SECRET=shoppySecretKey
MONGO_URI=mongodb://localhost:27017
DB_NAME=Shoppy_Globe
PORT=7000
```

4. **Run MongoDB locally**

5. **Start the server**

```bash
npm start
```

---

## 🧪 API Testing (with ThunderClient or Postman)

1. Register a new user  
   `POST /register`  
   ```json
   {
     "username": "testuser",
     "password": "test123"
   }
   ```

2. Login to receive JWT  
   `POST /login`  
   ```json
   {
     "username": "testuser",
     "password": "test123"
   }
   ```

3. Use the token in headers:  
   ```
   Authorization: <token>
   ```

4. Add product to cart:  
   `POST /cart`  
   ```json
   {
     "productId": "YOUR_PRODUCT_ID",
     "quantity": 2
   }
   ```

---

## 📁 Folder Structure

```
shoppy-globe-backend/
│
├── Controller/
│   ├── Products.controller.js
│   ├── Cart.controller.js
│   └── User.controller.js
│
├── Model/
│   ├── Products.model.js
│   ├── Cart.model.js
│   └── User.model.js
│
├── Routes/
│   └── routes.js
│
├── Middleware/
│   └── authMiddleware.js
│
├── .env
├── Server.js
├── package.json
└── README.md
```

---

## ✅ Status

✅ All required features completed  
✅ Authentication with JWT  
✅ All APIs tested  
✅ Ready for submission ✅

---

## 📬 Developed By

**Keerthi N Chiranjeevi**  
Internshala Full-Stack Internship Project
