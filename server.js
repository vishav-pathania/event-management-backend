import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error('Missing required environment variables.');
    process.exit(1);
  }

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(morgan("dev")); 

// Test Route
app.get("/", (req, res) => {
    res.send("Event Management Backend is running");
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));