# UniDeliver – University Delivery Platform

A full-stack (MERN) university delivery website connecting Students, Runners, and Shopkeepers.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Running locally on port 27017)

### Installation & Run

1.  **Backend (Server)**
    ```bash
    cd server
    npm install
    # Seed Database with sample data (optional)
    npm run seed
    # Start Server
    npm run dev
    ```
    Server runs on `http://localhost:5000`

2.  **Frontend (Client)**
    ```bash
    cd client
    npm install
    npm run dev
    ```
    Client runs on `http://localhost:5173`

## 👤 Sample Users (Password: 123456)

- **Student**: `student@example.com`
- **Runner**: `runner@example.com`
- **Shopkeeper**: `shop@example.com`

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Context API
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT (HttpOnly Cookies)

## ✨ Features

- **Students**: Browse shops, Add to Cart (Persistence), Place Orders, Track Status.
- **Runners**: View Available Jobs, Accept Deliveries, Update Status (Picked Up -> Delivered).
- **Shopkeepers**: Create Shop, Add Products, View Sales (Logic implemented).

## 📂 Project Structure

- `/client` - React Frontend
- `/server` - Express Backend API

Author: Antigravity
