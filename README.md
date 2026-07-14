# Rosavie - Full-Stack E-Commerce Web Application

Welcome to the **Rosavie** project repository! This is a complete, production-ready MERN (MongoDB, Express, React, Node.js) stack e-commerce web application. Built with modern UI/UX principles inspired by premium clothing brands, this project features robust backend security, stateful cart management, and seamless dynamic routing.

This document serves as a comprehensive guide to understanding the application's architecture, data flow, libraries, and security implementations.

---

## 🏗️ Architecture & Technology Stack

The application is divided into two decoupled architectures: the **Client (Frontend)** and the **Server (Backend)**.

### Frontend (Client-Side)
- **Framework**: React 18 powered by Vite for lightning-fast HMR and building.
- **Routing**: `react-router-dom` for Single Page Application (SPA) navigation without reloading.
- **State Management**: React Context API (`CartContext`, `AuthContext`) for global state across components.
- **Styling**: Vanilla CSS (`index.css`, `cart.css`). A strict design system using CSS variables (converted to raw hex for ultimate compatibility) ensuring a premium, cohesive UI without relying on heavy frameworks like Tailwind.
- **Libraries**:
  - `swiper`: Used for creating the dynamic, auto-playing Hero section sliders.
  - `lucide-react`: For lightweight, scalable SVG icons across the interface.

### Backend (Server-Side)
- **Environment**: Node.js running an Express.js REST API server.
- **Database**: MongoDB Atlas cloud database for persistent storage.
- **ORM**: Mongoose for modeling application data (Users, Products, Orders/Cart).
- **Security & Authentication**:
  - `jsonwebtoken` (JWT): For stateless user authentication.
  - `bcryptjs`: For cryptographic hashing of user passwords before storing them in the database.
- **Middleware**: `cors` (Cross-Origin Resource Sharing) and `dotenv` (Environment variables).

---

## 🔄 Application Flow & Features

### 1. User Journey & Routing
- **Landing (`/`)**: Displays the dynamic `HeroSlider`, a scrolling "New In" section, and fetches "Trending Now" products dynamically from the API (`/api/products?category=Trending`).
- **Dynamic Categories**: Routes like `/new-arrivals`, `/unstitched`, and `/bridal-collection` share a single `CategoryPage` component that queries the backend API to filter products accordingly.
- **Product Search (`/search?q=...`)**: The header includes a functional search bar. Upon searching, it redirects to the SearchPage, calling the backend with a regex query to securely find matching product names.

### 2. State Management & Cart System
- **Cart Sidebar**: The shopping cart is managed via `CartContext`. It persists data, calculates totals, and handles additions/removals instantly.
- **Checkout (`/checkout`)**: Features a **Protected Route**. If an unauthenticated user attempts to checkout, they are safely redirected to `/login` with a persistent state message ("You need to login first before checking out"). Once logged in, they can place a COD (Cash on Delivery) order.

### 3. Account & Authentication Flow
- **Login/Signup (`/login`)**: A unified interface utilizing `AuthContext`.
- When a user signs up, the backend hashes their password using `bcryptjs` and saves it.
- Upon successful login, the backend signs a secure JWT and sends it to the frontend. The `AuthContext` decodes this token and persists the user session.
- The footer UI reacts dynamically, changing from "Login/Sign Up" to "Logged in as [Name]" and "Log Out".

---

## 🛡️ Security Implementation

Security is a massive priority in this application:

1. **Password Hashing (bcrypt)**: Passwords are NEVER saved as plain text. The backend hashes all passwords with a cryptographic salt before inserting them into MongoDB. Even database administrators cannot read user passwords.
2. **Stateless JWT Authentication**: Once authenticated, users receive a JSON Web Token. The server uses an `authMiddleware` to verify this token on protected routes (like adding to a persistent cart or making an order). If the token is tampered with, the request is blocked (`401 Unauthorized`).
3. **No Hidden Endpoints**: The checkout page forces route-level protection, ensuring ghost checkouts are completely impossible.
4. **CORS Restrictions**: Cross-Origin Resource Sharing is enabled, meaning the backend will only accept requests from the designated frontend host, protecting against external API hijacking.

---

## 💻 Commands & Scripts

We configured the project to be extremely developer-friendly. You can run both the frontend and backend simultaneously with a single command.

### Installation
1. Install root dependencies (which includes `concurrently`):
   ```bash
   npm install
   ```
2. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```

### Running the Project
From the root directory (`d:\Project\web`), simply run:
```bash
npm run dev
```
*How it works: We use the `concurrently` package in the root `package.json` to trigger both `vite` (frontend on port 5173) and `node server.js` (backend on port 5000) at the exact same time.*

### Database Seeding
If you need to populate the database with the initial catalog of Rosavie products (e.g., Elegance, Bridal, etc.):
```bash
cd backend
npm run seed
```
*This executes `seed.js`, which securely connects to MongoDB, drops the current product collection, and injects the predefined premium products.*

---

## 🧹 Codebase Optimization
Prior to deployment, the application underwent a severe optimization audit:
- Completely unused components (e.g., `ProductSlider.jsx`) and orphaned CSS rules (e.g., `.btn-outline`, `.hero`) were purged.
- Unnecessary library imports were cleaned from components to reduce bundle size.
- CSS variables (`var(--primary)`) were refactored into absolute values across all stylesheets to guarantee maximum cross-browser rendering speeds. 

The result is a highly scalable, secure, and blazing-fast modern e-commerce storefront!
