# 🚚 UniDeliver – University Delivery Mobile App

UniDeliver is a **multi-role university delivery mobile application** designed to connect **students**, **campus shops/cafes**, and **student runners** in a single delivery ecosystem. The app enables students to order food or products from nearby campus businesses and get them delivered by registered runners in a fast and organized way.

This project is built as a **portfolio-grade / final-year project**, focusing on real-world logic, scalability, and clean architecture.

---

## ✨ Features

### 👨‍🎓 Student (Customer)

* Register & login
* Browse nearby cafes and shops
* View menus and product details
* Add items to cart and place orders
* Track order status in real time
* View order history
* Rate runners and shops
* Manage profile information

### 🏃 Runner (Delivery Person)

* Register & login
* Toggle availability (Online / Offline)
* Receive nearby delivery requests
* Accept or reject orders
* View pickup and drop-off details
* Update delivery status
* View delivery history and earnings summary

### 🏪 Shopkeeper / Café Owner

* Register & login
* Create and manage shop profile
* Add, edit, or remove products
* Accept or reject incoming orders
* Update order preparation status
* View sales and order history

---

## 🔄 Order Flow

1. Student places an order from a shop
2. Shopkeeper accepts the order
3. Available runners receive delivery request
4. One runner accepts the order
5. Runner picks up the order
6. Runner delivers the order to the student
7. Order is marked as delivered
8. Student rates the runner and shop

---

## 🧠 System Design

* **Role-based access control** (Student, Runner, Shopkeeper)
* **Strict order status lifecycle** to avoid invalid transitions
* **Runner matching logic** based on availability and proximity (mocked)
* **Earnings calculation** with platform commission

---

## 🛠 Tech Stack

### Mobile App (Frontend)

* **Flutter**
* Material UI
* Clean and responsive design
* State management (Provider / Riverpod / Bloc)

### Backend

* **Node.js**
* **Express.js**
* RESTful APIs
* JWT Authentication
* Role-based authorization

### Database

* **MongoDB**
* Collections:

  * Users
  * Shops
  * Products
  * Orders
  * Reviews

---

## 📂 Project Structure

```
UniDeliver/
├── mobile_app/        # Flutter mobile application
│   ├── lib/
│   ├── assets/
│   └── pubspec.yaml
│
├── backend/           # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Flutter SDK
* Node.js
* MongoDB
* Android Studio or VS Code

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Mobile App Setup

```bash
cd mobile_app
flutter pub get
flutter run
```

---

## 📸 Screenshots

> Screenshots will be added soon (Student, Runner, and Shopkeeper dashboards).

---

## 📌 Future Improvements

* Real-time chat between users and runners
* Online payment integration
* Push notifications
* Admin dashboard
* Live map tracking

---

## 🎓 Academic / Portfolio Use

This project is suitable for:

* Final-year project
* Portfolio showcase
* Startup MVP demonstration

---

## 👤 Author

**Alferid**
Software Engineering Student

---

## 📄 License

This project is licensed for educational and portfolio use.
