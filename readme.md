# 📅 Event Management Backend System

A robust backend system for managing events, built with **Node.js**, **Express**, and **MongoDB Atlas**. This system supports authentication, event CRUD, file uploads, cron jobs, and clean error handling.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **File Uploads**: Multer
- **Cron Jobs**: node-cron
- **Logger Middleware**: Custom

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-backend.git
cd event-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```bash
npm run dev
```

### 5. Uploads Directory

Uploaded files will be saved in the `uploads/` folder and served via `/uploads/<filename>`.

---

## 🔐 Authentication Routes

### ✅ Register

`POST /auth/register`

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123"
}
```

### ✅ Login

`POST /auth/login`

```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

Returns a JWT token to use in `Authorization` headers.

---

## 📅 Event Routes

> 🔒 All event routes (except GET) require JWT Auth: `Authorization: Bearer <your_token>`

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/events`            | Create a new event          |
| GET    | `/events`            | Get all events              |
| GET    | `/events/:id`        | Get event by ID             |
| PUT    | `/events/:id`        | Update event (creator only) |
| DELETE | `/events/:id`        | Delete event (creator only) |
| POST   | `/events/:id/upload` | Upload event banner image   |

---

## 🖼 File Upload (Banner)

- Only `JPEG`/`PNG` formats supported.
- Max file size: `2MB`
- Field name: `banner`

Example (in Postman):

- Method: `POST`
- URL: `/events/<event_id>/upload`
- Headers: `Authorization: Bearer <token>`
- Body: `form-data` with `banner` field as file

---

## ⏰ Cron Jobs

- `Reminder Job`: Every minute

  - Logs events starting in the next 5 minutes

- `Status Updater Job`: Every 1 minute

  - Updates status:
    - `upcoming` → `ongoing`
    - `ongoing` → `completed`

---

## 🧪 Postman Collection

The collection is exported as `event-management.postman_collection.json` and includes all endpoints for quick testing.

### Instructions:

1. Open Postman
2. Import → Choose `event-management.postman_collection.json`
3. Go to Environments tab (gear icon in top right)
4. Create a new environment named event-management
5. Add a variable:

- Variable: `local`

- Initial Value: `http://localhost:5000`

- Current Value: `http://localhost:5000`

6. Save the environment
7. In your requests, use {{local}} as a placeholder for the URL
8. Import → Choose `event-management.postman_collection.json`



---

## 🧼 Error Handling

Handled gracefully for:

- Auth errors (invalid/missing token)
- Validation failures
- MongoDB connection issues
- File type/size errors

---

## 📂 Folder Structure

```
├── config/               # MongoDB connection
├── controllers/          # Auth & event logic
├── middlewares/          # Auth, logger, error handling, uploads
├── models/               # Mongoose models
├── routes/               # Route definitions
├── uploads/              # Uploaded banner images
├── utils/                # Cron job logic
├── .env
├── server.js             # Entry point
├── README.md
```

---


