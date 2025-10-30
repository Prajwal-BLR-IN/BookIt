---
#  Bookit — Experience Booking Platform

Bookit is a **full-stack web application** built using the **MERN Stack + TypeScript** that allows users to explore, book, and manage adventure experiences. It emphasizes **clean architecture**, **code reusability**, **responsive design**, and **production-ready best practices**.
---

## Live Preview

👉 **[View the live application](https://your-deployment-link.com)**

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)

   - [Frontend](#frontend)
   - [Backend](#backend)

3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)

   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)

5. [Project Structure](#project-structure)
6. [API Examples](#api-examples)
7. [Custom Hooks](#custom-hooks)
8. [Future Enhancements](#future-enhancements)
9. [Author](#author)
10. [License](#project-context--license)

---

## Overview

Bookit enables users to:

- **Browse and search** for adventure experiences
- **View detailed information** for each experience
- **Select slots and quantity check availability** for bookings
- **Apply promo codes** for discounts
- **Complete checkout** with booking confirmation

The app also features **custom hooks**, **error handling**, **promo and booking validation to avoid overlapping**, and **Framer Motion animations** for a polished user experience.

---

## Features

### Frontend

- **React + TypeScript + Vite**
- **Tailwind CSS** for modern, responsive design
- **Framer Motion** for animations
- **React Query (TanStack)** for API state management
- **Zustand** for lightweight global state (search filters)
- **Custom reusable hooks**:

  - `useCustomQuery` for fetching data
  - `useCustomMutation` for API mutations with toast feedback

- **Promo code and booking slot validation** before booking
- **Smooth booking flow** with navigation and success/error handling

### Backend

- **Node.js + Express.js**
- **MongoDB + Mongoose ORM**
- **RESTful APIs** for Experiences, Bookings, and Promos
- **Slot and quantity-based booking logic**
- **Promo API** supporting both flat and percentage discounts (eg: `SAVE10`, `FLAT100`)
- Centralized **error and validation handling**

---

## Tech Stack

| Layer          | Technologies                                            |
| -------------- | ------------------------------------------------------- |
| **Frontend**   | React, TypeScript, Tailwind CSS, Zustand, Framer Motion |
| **API State**  | React Query                                             |
| **Backend**    | Node.js, Express.js                                     |
| **Database**   | MongoDB (Mongoose)                                      |
| **Utilities**  | Axios, React Hot Toast                                  |
| **Build Tool** | Vite                                                    |

---

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/Prajwal-BLR-IN/BookIt.git
cd bookit
```

---

### Backend Setup

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Run development server
npm run dev
```

Backend runs on **[http://localhost:5000](http://localhost:5000)**

---

### Frontend Setup

```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

**Promo code for testing**: `SAVE10` - for 10% discount and `FLAT100` for 100₹ discount

---

## Project Structure

```
BookIt/
├── .vscode/
│   └── settings.json
├── client/
│   ├── .env
│   ├── .gitignore
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── vite.svg
│   ├── README.md
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   ├── assets.ts
│   │   │   ├── back arrow icon.svg
│   │   │   ├── logo_favicon.png
│   │   │   ├── logo.png
│   │   │   ├── logo1.png
│   │   │   ├── menu close icon.svg
│   │   │   ├── menu icon.svg
│   │   │   ├── react.svg
│   │   │   ├── tick circle.svg
│   │   │   └── warning icon.svg
│   │   ├── components/
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── ExperienceListSkeleton.tsx
│   │   │   ├── ExpienceDetailCardSkeleton.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── SkeletonCard.tsx
│   │   ├── hooks/
│   │   │   ├── useCustomMutation.ts
│   │   │   └── useQuery.ts
│   │   ├── index.css
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── Checkout.tsx
│   │   │   ├── Details.tsx
│   │   │   ├── Home.tsx
│   │   │   └── Results.tsx
│   │   ├── store/
│   │   │   └── searchStore.ts
│   │   └── types/
│   │       └── type.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── server/
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── src/
        ├── configs/
        │   └── db.js
        ├── controllers/
        │   ├── booking.controller.js
        │   ├── experience.controller.js
        │   └── promo.controller.js
        ├── models/
        │   ├── Booking.js
        │   ├── Experience.js
        │   └── Promo.js
        ├── routes/
        │   ├── booking.route.js
        │   ├── experience.routes.js
        │   └── promo.routes.js
        └── server.js

```

---

## API Examples

### 1. **Create Booking**

**POST** `/api/bookings`

**Request Body:**

```json
{
  "experienceId": "6718bca122fe0b...",
  "name": "John Doe",
  "email": "john@example.com",
  "slot": { "date": "2025-11-03", "time": "10:00 AM" },
  "qty": 2,
  "promoCode": "SAVE10",
  "subtotal": 1000,
  "tax": 50,
  "finalPrice": 850
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking confirmed",
  "bookingRef": "BK-123456",
  "experienceTitle": "Sky Diving",
  "slot": { "date": "2025-11-03", "time": "10:00 AM" },
  "finalPrice": 850
}
```

---

### 2. **Validate Promo**

**POST** `/api/promo/validate`

**Promo code for testing**: `SAVE10` - for 10% discount and `FLAT100` for 100₹ discount

**Request Body:**

```json
{
  "code": "SAVE10",
  "subtotal": 1000
}
```

**Response:**

```json
{
  "valid": true,
  "code": "SAVE10",
  "discount": 200,
  "newTotal": 800,
  "message": "Promo applied: SAVE10"
}
```

---

## Custom Hooks

### `useCustomQuery.ts`

Simplifies API data fetching using React Query.

```ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export default function useCustomQuery<T>(key: string, url: string) {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => (await axiosInstance.get(url)).data,
  });
}
```

---

### `useCustomMutation.ts`

Handles mutations with automatic toast feedback and query invalidation.

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useCustomMutation = ({
  url,
  invalidateKey,
  onSuccessRedirect,
}: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axiosInstance.post(url, payload);
      if (!data.success && !data.valid) throw new Error(data.message);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Success");
      if (invalidateKey)
        await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      if (onSuccessRedirect) onSuccessRedirect();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};
```

---

## Future Enhancements

- JWT-based authentication
- Razorpay / Stripe integration
- Admin dashboard for management
- Advanced filtering and pagination
- Email notifications after booking

---

## Author

**Prajwal K** |
Full Stack Developer |
Bangalore, India

[LinkedIn](https://www.linkedin.com/in/prajwal-k-b26344173/) |
[prajwalsjp2000@gmail.com](mailto:prajwalsjp2000@gmail.com)

---

## Project Context & License

This project was developed as a take-home assignment as part of a technical interview process.

---
