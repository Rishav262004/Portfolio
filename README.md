# Rishav Mishra — Personal Portfolio

A modern, responsive, and minimalist developer portfolio website for **Rishav Mishra**, modeled after the editorial aesthetic of [Vishal Kumar Ojha's portfolio](https://vishalojha628.vercel.app/).

---

## Features

- **Editorial Minimalist Aesthetic:** Modern typography (Plus Jakarta Sans & JetBrains Mono), subtle borders, soft shadows, and clean whitespace.
- **Sticky Top Navigation:** Quick smooth-scrolling anchors to all portfolio sections with active-tab indicators.
- **Floating Desktop Sidebar:** Fixed profile widget on wide displays with online availability status, quick metrics (9.04 CGPA, IEEE Author), and instant copy-email trigger.
- **Filterable Tools & Stack:** Tabbed filtering by category (Languages, Web & Frontend, App Dev, Backend & Cloud, Product & Ops, Design & Tools) with official badge iconography.
- **Featured Projects:** Deep-dive cards for **Arnocodes** (25 modules, +25% completion rate), **ArnoX** (multimodal accessibility app), and **Health O Hack Platform** with Problem, Solution, and Impact metrics.
- **Research & Publications:** Formal IEEE publication showcase with conference details, abstract, and direct IEEE Xplore link.
- **Career Journey Timeline:** Chronological timeline covering 8 professional roles across Notion, Growth Square, Levo, Vedantu, Smavy Academy, Metvy, Physics Wallah SOS, and PixStory.
- **Honors & Leadership:** Cards celebrating leadership at Johns Hopkins Health O Hack and Top 20 National recognition at INEA SERB Youth Conclave.
- **Interactive Contact Modal & Toast Alerts:** Instant email & phone clipboard copying with animated feedback.

---

## Project Structure

```
rishav-portfolio/
├── index.html              # Main semantic HTML structure
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styling, animations, and typography
│   └── js/
│       ├── data.js         # Centralized profile, projects, and career data
│       └── main.js         # Dynamic DOM rendering and interactive logic
└── README.md               # Project documentation
```

---

## Local Development & Preview

### Option 1: Python Local Server (Recommended)
From the `rishav-portfolio` directory, run:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option 2: Direct File Open
Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

### Option 3: VS Code Live Server
Open the folder in VS Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## How to Update Your Information

All your personal information, skills, projects, and work history are organized cleanly inside:
`assets/js/data.js`

To update your details:
1. Open `assets/js/data.js` in any text editor.
2. Modify the fields in `portfolioData.profile`, `portfolioData.skills`, `portfolioData.projects`, or `portfolioData.experience`.
3. Save the file and refresh your browser. No build steps required!

---

## Deployment Guide

### Deploy to Vercel (Recommended)
1. Push this folder to a GitHub repository, or install Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Or go to [vercel.com/new](https://vercel.com/new), import your repository, and click **Deploy**. (Framework preset: `Other`).

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository.
2. In your repository on GitHub, go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.
