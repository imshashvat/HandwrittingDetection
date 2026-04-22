# InkMind — AI Handwriting Recognition

A full-stack AI-powered handwriting recognition web app. Draw on canvas or upload images — powered by Google Gemini Vision AI.

## Features
- ✏️ Canvas drawing with pen, eraser, colors, undo/redo
- 📤 Image upload (drag-and-drop, file picker, paste)
- 🤖 AI recognition via Google Gemini Vision
- 🔄 Multiple API key rotation support
- 📋 Recognition history

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (copy from `.env.example`):
   ```
   GEMINI_API_KEY=your_key_here
   PORT=3000
   ```
4. Get a free Gemini API key: https://aistudio.google.com/app/apikey

5. Start the server:
   ```bash
   npm start
   ```

6. Open http://localhost:3000

## Deploy to Railway
See deployment guide in the project.
