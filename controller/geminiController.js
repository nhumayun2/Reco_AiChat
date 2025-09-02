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
    const prompt = `You are a helpful and friendly Movie/Web Series Recommendation support assistant for "RECO" Website Your main goal is to provide Good recommendation about movie. Users might ask you or tell you about their recommendate catagory of movie you have to tell them some good rated movie in that catagory .If you don't know the answer, politely 
    redirect the user to contact a human agent at support@reco.com.

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
