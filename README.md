# Salam Shaik - Personal Portfolio Website

A modern, highly responsive, and interactive personal portfolio website built for **Salam Shaik**, a Computer Science Engineering student and aspiring AI/Backend Developer.

Features a premium **dark theme with glassmorphism**, an interactive **3D Three.js particle background**, scroll animations, theme persistence, and is deployment-ready for GitHub Pages.

---

## 🚀 Features

- **Interactive 3D Particles**: Powered by **Three.js** to render a floating constellation field that reacts dynamically to mouse cursor motion and page scrolling.
- **Glassmorphic Layout**: Premium UI components with frosted glass styles (`backdrop-filter`), subtle borders, and harmonious shadow drops.
- **Responsive Navigation**: Smooth scroll anchors, a dynamic scroll progress bar, and a mobile-friendly slide-out navigation menu.
- **Theme Switcher**: Switch between a sleek, deep space Dark Theme and a clean, high-contrast Light Theme. Preferences are persisted using local storage.
- **Dynamic Typing effect**: Animated typing effect on the hero section cycling through developer tags.
- **Responsive Grid Cards**: Showcase core skill categories with animated proficiency bars, projects featuring premium hover visual screens, work experiences, and academic achievements.
- **Education Timeline**: Vertical timeline component highlighting CSE coursework modules.
- **Interactive Contact Form**: Client-side field validations with a mock success/sending indicator.
- **SEO & Accessibility Optimized**: Built using semantic HTML5 landmarks, descriptive alt tags, and appropriate ARIA attributes.

---

## 📂 Project Directory Structure

```text
salam-portfolio/
├── index.html          # Semantic HTML markup, SEO tags, and CDNs
├── style.css           # Custom CSS variables, responsive grids, transitions, and themes
├── script.js           # Three.js canvas setup, typing animations, reveals, and forms
├── assets/
│   ├── images/         # High-resolution generated project graphics
│   │   ├── advance_rag_assistant.png
│   │   ├── genai_chatbot.png
│   │   ├── data_science_internship.png
│   │   ├── ml_projects.png
│   │   └── tomato_disease_prediction.png
│   └── docs/           # Contains download documents
│       └── resume.pdf  # Professional CV sheet
└── README.md           # Documentation guide
```

---

## 💻 Tech Stack

- **HTML5** (Structure)
- **CSS3** (Styling & CSS Grid/Flexbox)
- **JavaScript ES6+** (Logic & Form control)
- **Three.js** (WebGL 3D background)
- **Lucide Icons** (Vector icons)
- **Google Fonts** (Space Grotesk & Inter)

---

## 🛠️ Local Development & Preview

To run and preview the website locally:

1. Clone or navigate to the directory:
   ```bash
   cd salam-portfolio
   ```
2. Serve the directory using any local web server.
   For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
   Or using Node.js `live-server` or VS Code's Live Server extension.
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 📦 Deployment to GitHub Pages

To deploy this portfolio to your free GitHub Pages URL:

1. Create a new repository on GitHub named `salam-portfolio`.
2. Initialize git in your local directory and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Salam Shaik Portfolio"
   ```
3. Link the repository and push to the main branch:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/salam-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to your repository **Settings** -> **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, and choose `main` `/ (root)` as the source.
6. Save the settings. Within a couple of minutes, your portfolio will be live at:
   `https://YOUR_GITHUB_USERNAME.github.io/salam-portfolio/`
