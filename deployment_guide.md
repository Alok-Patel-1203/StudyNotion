# Guide to Deploying StudyNotion (MERN Stack)

You asked to deploy this "whole website" to **Vercel**. 

Because StudyNotion is a **MERN Stack** (MongoDB, Express, React, Node) application, there is an industry-standard rule you need to know before deploying:
> [!WARNING]
> While **Vercel** is the absolutely best place to host your React Frontend, it is **not** designed for heavy Node.js/Express backends (like yours). Vercel uses "Serverless Functions" which disconnect after just 10 seconds, meaning heavy tasks like uploading course videos to Cloudinary or generating AI Chatbot text will time out and crash.

**The Professional Architecture:**
1. Host your **Frontend (React)** on **Vercel** (Lightning fast global caching).
2. Host your **Backend (Node/Express)** on **Render** (Designed for 24/7 background servers).

I have already updated your codebase today so it is mathematically ready for exactly this setup! Here is how to do it:

---

## 🛠️ Phase 1: Deploy the Backend to Render

1. Create a free account at [Render.com](https://render.com/).
2. Push your entire `StudyNotion` project to a **GitHub Repository**.
3. On Render, click **New +** and select **Web Service**.
4. Connect your GitHub account and select your `StudyNotion` repository.
5. In the settings, configure the following:
   * **Name**: `studynotion-backend`
   * **Root Directory**: `server` *(Extremely important! Tell Render the backend is in the `server` folder).*
   * **Environment**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm run start` or `node index.js`
6. Click **Advanced --> Add Environment Variables** and paste EVERYTHING from your `server/.env` file exactly as it is (MongoDB URLs, Cloudinary, Razorpay, OpenRouter, etc.).
7. Click **Create Web Service**.
   > *Once it finishes building, Render will give you a live URL (e.g., `https://studynotion-backend.onrender.com`). Copy this! You need it for Vercel.*

---

## 🚀 Phase 2: Deploy the Frontend to Vercel

1. Create a free account at [Vercel.com](https://vercel.com/).
2. Click **Add New Project** and connect your GitHub account. 
3. Select your `StudyNotion` repository.
4. Leave the "Framework Preset" as **Create React App**. 
5. Under **Environment Variables**, you must link the frontend to the backend you just created! Add this variable:
   * **Name**: `REACT_APP_BASE_URL`
   * **Value**: `https://studynotion-backend.onrender.com/api/v1` *(Replace the first part with your actual Render URL, but make sure it ends in `/api/v1`!)*
6. Click **Deploy**.

---

### 🎉 All Done!
Because I updated `src/services/apis.js` for you a few moments ago, your Vercel frontend will automatically detect the `REACT_APP_BASE_URL` variable you plugged into the Vercel dashboard and seamlessly route all logins, payments, and AI Chatbot requests directly to your live Render server instead of crashing.
