// server.js
import express from "express";
import dotenv from "dotenv";
// Correct import statement:
import { GoogleGenerativeAI } from "@google/generative-ai";
import aiReply from "./controller/geminiController.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const port = process.env.PORT || 3000;

// Initialize the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define a POST route for auto-reply
app.post("/api/reply", aiReply(genAI));

// Start the servers
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Send POST requests to http://localhost:${port}/api/reply`);
});
