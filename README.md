
# FoodBridge 🍽️
[Live Site URL]( https://dsdw43sds.web.app/)

Connecting communities through food — donate extra food safely & receive help instantly.

## Table of Contents 📖
- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)


## About the Project 📃

FoodBridge is a community-driven platform designed to reduce food waste and help people in need by enabling users to donate and receive extra food effortlessly.

With FoodBridge, users can upload extra food items, browse available food in their area, request food from donators, and manage donation interactions in real time. Built with a modern UI and interactive animations, FoodBridge provides a seamless and secure experience for donors and receivers.

Whether you’re donating excess meals or requesting food support, FoodBridge ensures a safe, fast, and user-friendly experience for everyone.

## Project Overview 📊
### Objective

- Build a secure and user-friendly community platform for donating and receiving extra food, reducing waste and promoting social good.

### Target Audience

- Community members with extra food

- Individuals or families in need

- Volunteers and social workers

### Key Metrics

- Food Upload Time: < 2 minutes

- Request Response Time: Instant updates
- Deployment: Hosted on Vercel / Netlify with CI/CD

## ✨ Key Features
1. Add Food

- Upload food details: quantity, location, expiry date, and images.

- Smooth form UI with validation and toast notifications.

- Food cards update in real-time.

2. Browse Available Food

- View all available food items in your area.

- Beautiful card layout with animations powered by Framer Motion.


3. Request Food

- Request food directly from the donator.

- Automated request tracking and status updates.

- SweetAlert2 popups for confirmation and success states.

4. Donator Actions

- Donators can view all incoming requests.

- Accept or reject requests instantly.

- When accepted, the food status updates to "Donated" automatically.

5. User Authentication

- Secure login & signup

- Only authenticated users can donate or request food

- Powered Firebase authentication (optional)

6. Modern Interactive UI

- Built using React + Tailwind + DesiUI

- Framer Motion animations

- React Icons, Toast & SweetAlert2 for interactivity

- Fully responsive for mobile, tablet, and desktop

## Tech Stack 🛠️
### Frontend

- React.js

- Tailwind CSS

- DesiUI

- Framer Motion

- React Icons

- SweetAlert2

- React Hot Toast

## Backend

- Node.js

- Express.js

## Database

- MongoDB

# Deployment

Vercel (server) firebase (client)

## Installation ⚙️

### Clone the project:
```bash
git clone https://github.com/yourusername/FoodBridge
cd foodbridge
npm install
```

Create a .env file and add environment variables:
```env
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret
```

Run the development server:
```bash
npm run dev
```
