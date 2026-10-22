# Student Management System

A server-rendered student management web app built with **Node.js + Express + EJS + MySQL**. It implements the full authentication and record-management flow from scratch: registration and login with bcrypt-hashed passwords, session-based authentication, role-based access control (user / admin), and student record CRUD with keyword search.

## Features

- **Authentication** — register, login, logout; passwords hashed with bcrypt (cost 10); duplicate-username and validation checks with inline error messages
- **Sessions** — `express-session` with configuration isolated in `config/session.js`
- **Role-based access control** — two Express middlewares (`middleware/auth.js`, `middleware/role.js`): browsing requires login; adding and deleting records requires the `admin` role
- **Student records** — list with keyword search, add, delete; every record tracks its creator (`owner_id`)
- **Security practices** — all SQL uses parameterized queries (no string concatenation); database credentials and the session secret are loaded from environment variables, not hard-coded

## Tech stack

Node.js · Express 4 · EJS · MySQL (mysql2/promise connection pool) · bcrypt · express-session · dotenv

## Project structure

```
├── app.js            # entry point: middleware wiring, view engine, routes
├── config/
│   ├── db.js         # MySQL connection pool (env-based config)
│   └── session.js    # session options
├── middleware/
│   ├── auth.js       # requires a logged-in session
│   └── role.js       # requires the admin role
├── routes/
│   ├── auth.js       # /register /login /logout
│   └── student.js    # /students list, add, delete
├── views/            # EJS templates (login, register, index, students/)
├── public/css/       # static assets
├── schema.sql        # database schema (users, students)
└── .env.example      # environment variable template
```

## Getting started

1. Create the database and tables:
   ```bash
   mysql -u root -p < schema.sql
   ```
2. Configure the environment:
   ```bash
   cp .env.example .env   # then fill in your MySQL password and a session secret
   ```
3. Install and run:
   ```bash
   npm install
   npm start              # http://localhost:3000
   ```
4. Register an account, then promote it to admin if you want to add/delete records:
   ```sql
   UPDATE users SET role = 'admin' WHERE username = 'your_name';
   ```

## Database schema

- **users** — `id`, `username` (unique), `password` (bcrypt hash), `email`, `role` (`user` | `admin`), `created_at`
- **students** — `id`, `name`, `age`, `major`, `owner_id` (FK → users.id), `created_at`

## Author

Bowen Duan — B.Eng. Software Engineering, Shanxi Agricultural University. Coursework project practising full-stack web development with Node.js and relational databases.

## License

MIT
