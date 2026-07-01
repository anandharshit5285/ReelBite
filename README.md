# ReelBite

ReelBite is a full-stack MERN application for discovering food through short-form videos. Users can browse food reels, while food partners can register, upload food items, and manage their listings through a dedicated dashboard.

The application is built using React.js, Node.js, Express.js, and MongoDB Atlas. It implements JWT authentication with HTTP-only cookies, ImageKit for image uploads, and is deployed on Vercel and Render.

## Live Demo

Frontend: https://reel-bite-one.vercel.app/

Backend API: https://reelbite-r9zo.onrender.com/

## Features

### User

- User registration
- User login
- JWT authentication
- HTTP-only cookie-based authentication
- Persistent login after page refresh
- Browse food reels

### Food Partner

- Food partner registration
- Food partner login
- Upload food items
- Upload food images using ImageKit
- Manage food listings

## Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### Authentication

- JWT
- bcryptjs
- HTTP-only Cookies

### Media Storage

- ImageKit

### Deployment

- Vercel
- Render

## Project Structure

```text
ReelBite
│
├── Backend
│   ├── src
│   │   ├── controllers
│   │   ├── db
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── README.md
├── LICENSE
└── .gitignore
```

## API Endpoints

### User

```http
POST /api/auth/user/register
POST /api/auth/user/login
GET  /api/auth/user/logout
GET  /api/auth/user/me
```

### Food Partner

```http
POST /api/auth/food-partner/register
POST /api/auth/food-partner/login
GET  /api/auth/food-partner/logout
```

### Food

```http
POST   /api/food
GET    /api/food
PUT    /api/food/:id
DELETE /api/food/:id
```

## Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
PORT=

MONGODB_URI=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=
```

## Installation

Clone the repository.

```bash
git clone https://github.com/anandharshit5285/ReelBite.git
```

Install backend dependencies.

```bash
cd Backend
npm install
npm start
```

Install frontend dependencies.

```bash
cd Frontend
npm install
npm run dev


## Key Learnings

Building ReelBite helped me gain practical experience with:

- Building REST APIs using Express.js
- Implementing JWT authentication with HTTP-only cookies
- Managing data using MongoDB Atlas
- Uploading images using ImageKit
- Deploying a full-stack application using Vercel and Render
- Debugging production issues related to CORS, routing, and environment variables

## Future Improvements

- Search and filters
- Likes and comments
- Saved food items
- User profiles
- Email verification
- Password reset
- Admin dashboard

## Author

**Harshit Anand**

LinkedIn: https://www.linkedin.com/in/harshit-anand-703435204/

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```
