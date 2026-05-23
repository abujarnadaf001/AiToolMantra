<div align="center">
  <h1>⚡ AURA AI (AiToolMantra)</h1>
  <p><strong>The Ultimate Directory for Discovering AI Tools</strong></p>
  <p>A cinematic, high-performance web application designed to help users search, filter, and discover the best AI solutions across multiple categories—powered by autonomous AI agents.</p>
</div>

<br />

## 🚀 Overview

**AiToolMantra** is a state-of-the-art AI directory platform built to solve the overwhelming number of AI tools launching every day. It features a stunning, cinematic UI with a 4K dynamic video background, lightning-fast search, and category filtering.

But the real magic happens in the backend. The platform includes a **fully autonomous AI Scraper Agent** system. Instead of manually writing descriptions for new AI tools, administrators simply provide a URL. The system's AI automatically scrapes the target website, analyzes the tool using an LLM (Large Language Model), formats the data perfectly, and securely injects it into the platform's database.

## ✨ Key Features

- **Cinematic UI/UX:** A stunning dark-mode interface featuring a majestic 4K dragon video background ("Dracarys" effect), smooth Framer Motion animations, and glowing neon visual elements.
- **Autonomous AI Agents:**
  - **Scraper Agent:** Automatically fetches raw HTML from any provided AI tool URL.
  - **Integrator Agent:** Uses OpenRouter/OpenAI to extract features, pros, cons, pricing, and use cases, generating a perfectly formatted JSON schema. It automatically prevents duplicate entries to keep the database clean.
- **Secure Admin Dashboard:** A protected administration area built with Supabase Authentication. Only authorized users can access the Agent Control Panel to submit new tools.
- **Lightning Fast Search:** Real-time, instant filtering of AI tools by category, name, or use case.
- **Responsive Design:** Completely mobile-first and optimized for all screen sizes, from mobile phones to ultrawide desktop monitors.

## 🛠️ Technology Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (for complex UI animations), Lucide Icons
- **Authentication:** [Supabase Auth](https://supabase.com/) (JWT & Session Management)
- **AI Integration:** [OpenAI SDK](https://platform.openai.com/) via [OpenRouter](https://openrouter.ai/) API
- **Data Parsing:** `cheerio` (for HTML web scraping), `zod` (for strict schema validation)

## 💻 Local Setup & Installation

Follow these steps to run the project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/abujarnadaf001/AiToolMantra.git
cd AiToolMantra
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory. You will need to add your specific keys for Supabase and OpenRouter:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Agent Configuration (OpenRouter)
OPENAI_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
```
*(Note: `.env.local` is included in `.gitignore` to ensure your keys are never pushed to the public repository).*

### 4. Add the Cinematic Video (Optional)
If you want the full 4K background experience locally:
1. Obtain your 4K `.webm` or `.mp4` video.
2. Name it `dragon.webm` (or update `VideoBackground.tsx` to match your extension).
3. Place the file inside the `public/` directory.

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform!

## 🔐 Security Information

This repository is safe for public exploration. 
- All API keys, database URLs, and session secrets are managed via environment variables and are strictly excluded from version control.
- Backend API routes (`/api/agents/insert`) are architected to reject duplicate URLs and validate all incoming data using Zod to prevent injection attacks and database corruption.
- The Admin Dashboard route is protected client-side via Supabase session states.

## 📬 Contact & Developer Information

**AURA - YZ Service Limited**

- **Developer:** Abujar Nadaf
- **Location:** KBPCOES, Satara, Maharashtra, India
- **Website:** [www.aura-ai.in](https://www.aura-ai.in)
- **Support:** support@yzservicelimited.com

---
*© 2025 AURA - YZ Service Limited. All rights reserved.*
