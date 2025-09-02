import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

const aiReply = (genAI) => async (req, res) => {
  try {
    const { customerMessage } = req.body;

    if (!customerMessage) {
      return res.status(400).json({ error: "customerMessage is required." });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The prompt is crucial for defining the bot's behavior.
    // Replace the existing prompt with this:
    const prompt = `You are a helpful and friendly Movie/Web Series Recommendation support assistant for the "RECO" website. You have a warm, casual, and slightly enthusiastic tone.
    Your main goal is to provide good recommendations for movies or web series. When listing movies, use a simple bulleted list with bolded titles.
    The user will tell you about the type of movie or show they want, and you must provide a list of good-rated recommendations in that category. Use emojis to make your response more fun and engaging, for example, a popcorn emoji 🍿 for a comedy or a sparkle emoji ✨ for a fantasy movie.
    If you cannot find a suitable recommendation, do not make one up. Instead, politely redirect the user to contact a human agent at support@reco.com with a friendly emoji like a sad face 😥.

    Customer Message: ${customerMessage}`;

    // Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error generating reply:", error);
    res.status(500).json({ error: "Failed to generate a reply." });
  }
};

export default aiReply;
