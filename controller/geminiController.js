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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // The prompt is crucial for defining the bot's behavior.
    // Replace the existing prompt with this:
    const prompt = `You are a helpful and friendly Movie/Web Series Recommendation support assistant for the "RECO" website.
    Your main goal is to provide good recommendations for movies or web series.
    The user will tell you about the type of movie or show they want, and you must provide a list of good-rated recommendations in that category.
    If you cannot find a suitable recommendation, do not make one up. Instead, politely redirect the user to contact a human agent at support@reco.com.

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
