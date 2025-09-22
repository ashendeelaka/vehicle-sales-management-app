# Vehicle Sales Management System

This is a **full-stack application** for managing vehicle sales, with separate **frontend** and **backend** applications.  
The system provides **admin management**, **customer vehicle browsing**, and **AI-powered vehicle descriptions** using OpenAI.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

---

## Features

### Admin Features
- JWT-based admin login.
- Add, edit, and delete vehicles.
- Upload multiple images with preview.
- Generate AI-powered vehicle descriptions (editable before saving).
- Regenerate AI descriptions if needed.
- View all vehicles with sorting and pagination.
- Minimal and modern admin dashboard.

### Customer Features
- Browse vehicles in list/grid view.
- Search and filter vehicles by type, brand, year, color, engine size, and price.
- View detailed page for each vehicle with images, specifications, and AI-generated description.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **HTTP Requests:** Axios
- **Icons:** react-icons
- **Form Handling:** React Hooks
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **ORM:** TypeORM
- **AI Integration:** OpenAI ChatGPT API
- **Authentication:** JWT

---

## Frontend Setup

1. Clone the repository and navigate to frontend folder:
```bash
git clone https://github.com/ashendeelaka/vehicle-sales-management-app.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```
3. Create .env file in the root of frontend:

I already have provided .env-example file in repository. Check it
```bash
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```
4. Start development server:
```bash
npm run dev
```


## Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:
```bash
npm install

```
3. Create .env file in backend:

I have provied .env-example file in the reposiory. check it
```bash

# Server
PORT=5000

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=vehicle_db

# JWT Authentication
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=8h

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Optional: image upload folder
UPLOAD_DIR=uploads

```
4. Start development server:

```bash
npm run dev

```

## Folder Structure
```bash

frontend/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ services/
│  ├─ context/
│  ├─ models/
│  └─ App.tsx
├─ vite.config.ts
└─ package.json

backend/
├─ src/
│  ├─ controllers/
│  ├─ entities/
│  ├─ routes/
│  ├─ config/
│  └─ middleware/
├─ app.ts
└─ package.json

```
## API Endpoints

### Vehicle Routes

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| GET    | /vehicles                      | Get all vehicles        |
| GET    | /vehicles/\:id                 | Get vehicle by ID       |
| POST   | /vehicles/create               | Create new vehicle      |
| PUT    | /vehicles/:id                 | Update vehicle          |
| DELETE | /vehicles/:id                 | Delete vehicle          |
| POST   | /vehicles/generate-description | Generate AI description |

### Admin Routes

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| POST   | /admin/login | Admin login and JWT token |


## Usage

Access frontend at http://localhost:5173

Access backend API at http://localhost:5000 or your port

Admin can login, manage vehicles, generate AI descriptions.

Customers can browse, search, filter, and view vehicle details.

## Notes

Ensure MySQL database is running and environment variables are set.

AI-powered descriptions require a valid OpenAI API key.

Images are stored in uploads/ folder and served via backend.

---

## Conclusion

This project demonstrates a full-stack Vehicle Sales Management system with modern frontend, robust backend, and AI-powered features.  
It showcases **React with TypeScript**, **Vite**, **Tailwind CSS**, **Express.js**, **TypeORM**, and **OpenAI integration** for generating creative vehicle descriptions.  

Thank you for reviewing.

**Ashen Deelaka**