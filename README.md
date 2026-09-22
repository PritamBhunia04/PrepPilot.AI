# PrepPilot.AI 🚀

**PrepPilot.AI** is an AI-powered interview preparation platform designed to help students and job seekers practice realistic interviews, improve communication, and understand their interview performance.

🌐 **Live Website:** https://preppilot-ai-617d.onrender.com

---

## ✨ Features

### 🤖 AI-Powered Interviews
Practice interview sessions with AI-generated questions and follow-up interactions.
<img width="1899" height="1074" alt="image" src="https://github.com/user-attachments/assets/efd12b7e-22be-48f5-a0c6-a8fdbfdf4f44" />


### 👤 Role & Experience Selection
Choose your target role and experience level to practice interview scenarios suited to your profile.

### 🗣️ Smart Voice Interview
Practice answering interview questions using your voice for a more realistic interview experience.

### 💼 HR & Technical Interview Modes
- **HR Interview** – Focuses on behavioral, communication, and general interview questions.
- **Technical Interview** – Focuses on technical questions related to the selected role.

### 📄 Resume-Based Interview
Upload a resume and use the extracted information to generate project- and skill-related interview questions.

### 📊 AI Answer Evaluation
Get performance feedback based on areas such as communication, technical accuracy, and confidence.

### ⏱️ Timed Interview Simulation
Experience interview pressure with a countdown timer and limited time for each question.

### 📈 Interview History & Analytics
Review previous interview sessions, scores, and performance information.

### 📥 PDF Performance Report
Generate a downloadable report containing interview performance, strengths, weaknesses, and improvement insights.

### 💳 Credits & Plans
PrepPilot.AI includes a credit-based system with different plans:
- Free
- Starter Pack
- Pro Pack

Payments are integrated using Razorpay.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### AI / Services
- AI-based interview question generation and evaluation
- Resume analysis
- Text-to-Speech / voice-related functionality

### Deployment
- Render
- GitHub

---

## 📂 Project Structure

```text
AI-INTERVIEW-AGENT/
│
├── client/              # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/              # Backend / API
│   ├── ...
│   └── package.json
│
└── README.md
```

> The exact files inside `client` and `server` may vary depending on the current version of the project.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PritamBhunia04/PrepPilot.AI.git
cd PrepPilot.AI
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal and run:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create the required `.env` files for the frontend and backend.

**Do not commit `.env` files or API keys to GitHub.**

Example:

```env
# Example only — use the variable names required by your project
YOUR_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

### 5. Start the backend

From the `server` directory:

```bash
npm start
```

If your backend uses a development script, you can use:

```bash
npm run dev
```

### 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

The frontend will then be available at the local URL shown by your development server.

---

## 🌐 Live Demo

**PrepPilot.AI:**  
https://preppilot-ai-617d.onrender.com

The deployed application provides:

- AI interview practice
- HR interviews
- Technical interviews
- Resume-based interview preparation
- Voice interview functionality
- Interview scoring
- Interview history
- Performance analytics
- Credit-based plans

---

## 🔐 Security

Sensitive credentials should be stored in environment variables.

Never upload the following to a public GitHub repository:

- API keys
- Database passwords
- JWT secrets
- Razorpay secret keys
- `.env` files
- Other private credentials

If the GitHub repository is private, Render can still deploy it when Render has access to the repository through the connected Git provider.

---

## 📌 Deployment

This project is deployed using **Render**.

For a GitHub-connected Render service, pushes to the linked branch can trigger automatic deployments when auto-deploy is enabled.

If the repository is changed from public to private, make sure the Render GitHub integration still has access to the repository.

---

## 🎯 Purpose

PrepPilot.AI was created as a practical project to explore:

- AI-powered applications
- Full-stack web development
- Resume processing
- Voice-based interaction
- Interview evaluation
- Database-backed applications
- Payment integration
- Cloud deployment

---

## 👨‍💻 Author

**Pritam Bhunia**

B.Tech Computer Science & Engineering Student

- GitHub: https://github.com/PritamBhunia04

---

## 📄 License

This project is intended for educational and portfolio purposes.
