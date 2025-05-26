# Blog API with Authentication

A simple backend API built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
Users can register, log in, and create, update, delete, and view blog posts.  
JWT is used for authentication, and bcrypt is used for secure password hashing.

---

##  Features

###  Authentication
- `POST /api/register` – Register a new user and return a token
- `POST /api/login` – Log in with email and password, return a token
- `GET /api/profile` – Protected route to get user details

###  Blog Post CRUD
- `POST /api/posts` – Create a new post (token required)
- `GET /api/posts` – Get all posts (public)
- `GET /api/posts/:id` – Get a post by ID (public)
- `PUT /api/posts/:id` – Update your own post
- `DELETE /api/posts/:id` – Delete your own post

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL** (`pg` package)
- **JWT** for token-based auth
- **bcrypt** for password hashing
- **dotenv** for environment config

---
