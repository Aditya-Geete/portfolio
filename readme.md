# Interactive Multi-Page Portfolio Website (React)

An interactive, responsive, multi-page personal portfolio application built with **React** and **Vite** for **CS1303: Full Stack Development** (Assignment 2 - NIT Warangal).

---

## 🚀 Setup & Run Instructions

Follow these steps to set up and run the project locally on your machine:

### Prerequisites
Make sure you have **Node.js** (v18+) installed. You can verify your installation by running:
```bash
node -v
npm -v

Installation
1. Clone the repository or extract the project folder:
cd portfolio-react-app

1. Install the required dependencies:
npm install

Execution
⚬ Development Mode: Run the live preview server with hot-reloading:
npm run dev

Open the local URL displayed in the terminal (typically http://localhost:5173).
⚬ Production Build: Verify that the project builds cleanly without errors:
npm run build

📂 Project Structure & Component Tree
The project follows a clean modular layout organized under src/:
src/
├── assets/            # Static assets (images, logos)
├── components/        # Reusable UI components
│   ├── Navbar.jsx     # Navigation bar with Link/NavLink & theme toggle
│   ├── Footer.jsx     # Shared page footer
│   ├── ProjectCard.jsx# Reusable card component (receives props & manages local details state)
│   ├── ProjectDetailCard.jsx # Grandchild component demonstrating prop drilling
│   ├── Skills.jsx     # Skills showcase component
│   └── ContactForm.jsx# Controlled form with validation logic
├── data/              # Mock datasets
│   └── projects.js    # Array of project objects
├── pages/             # Page components for routing
│   ├── Home.jsx       # Landing page (simulates loading delay)
│   ├── About.jsx      # About page
│   ├── Projects.jsx   # Projects listing page
│   ├── ProjectDetail.jsx # Dynamic route page (/projects/:projectId)
│   └── NotFound.jsx   # 404 Catch-all page
├── App.jsx            # Top-level component holding Theme state & Router configuration
└── main.jsx           # Application entry point

Component Tree & State-Lifting Decisions
1. Theme State (App.jsx): ⚬ State Lifted: The theme state ('light' or 'dark') is held in the top-level App component. ⚬ Why: The theme preference affects the entire application layout, including global body styling, the Navbar, and individual child components across all routes. Lifting state to App allows passing the current theme and toggle handler down to the Navbar via props seamlessly.
2. Prop Drilling Demonstration (2 Levels Deep): ⚬ Projects page (Parent) passes a project data object down to ProjectCard (Child). ⚬ ProjectCard (Child) passes specific fields (e.g., techStack or expanded details) down to ProjectDetailCard (Grandchild).
3. Isolated Component State: ⚬ ProjectCard.jsx: Holds local state (isExpanded) for its "View Details" toggle button. This ensures expanding details on one card does not affect other cards. ⚬ ContactForm.jsx: Holds local state for controlled input fields (formData) and validation errors (errors).
⚡ useEffect Hooks Summary
#	File	Purpose & Explanation	Cleanup Function
1	App.jsx	Theme Persistence (localStorage): Runs whenever the theme state changes. It synchronizes the theme with localStorage and updates the document.documentElement class so CSS themes apply globally across reloads.	N/A (Synchronous DOM/Storage operation)
2	Home.jsx	Simulated Mount Loading: Runs once when Home mounts (empty dependency array []). Sets a setTimeout for ~1 second to simulate data fetching before revealing the home page content.	Yes: Clears the timeout (clearTimeout) on component unmount to prevent memory leaks.
3	Navbar.jsx	Responsive Window Resize Listener: Listens for screen size changes (window.addEventListener('resize', ...)) to automatically adjust/close mobile navigation menus on larger screens.	Yes: Removes the event listener (window.removeEventListener('resize', ...)) on unmount to prevent memory leaks.
📄 Route Configuration
⚬ / or /home – Home page featuring a simulated loading state.
⚬ /about – About section and developer background.
⚬ /projects – Project gallery rendered from src/data/projects.js.
⚬ /projects/:projectId – Dynamic project details page using useParams().
⚬ /contact – Interactive, controlled contact form with live validation.
⚬ * – 404 Catch-All route directing back to Home.