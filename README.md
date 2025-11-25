# 🚀 Professional Agile Task Board (Kanban)

## Overview

This project is a modern, responsive, and persistent task management application built as a Kanban-style board. It allows users to create, track, and manage tasks across three distinct stages: **To Do**, **In Progress**, and **Done**. The architecture prioritizes performance, maintainability, and enterprise readiness, utilizing a best-in-class modern frontend stack.

The application explicitly demonstrates mastery of advanced React patterns, robust TypeScript typing, and complex tooling configuration (Vite, PostCSS, Tailwind CSS), directly addressing the technical requirements of modern front-end engineering roles.

## ✨ Key Features

* **TypeScript-First:** Comprehensive type definitions (`Task`, `TaskStatus`, `TaskBoardState`) ensuring code quality and predictability across all components and hooks.
* **Modular Architecture:** State management is fully encapsulated in a custom `useTaskBoard` hook, separating data logic from the UI.
* **Local Persistence:** Tasks are saved to and loaded from the browser's `localStorage` API on component mount, ensuring persistence across sessions.
* **Responsive Design:** Styled using **Tailwind CSS** to ensure a clean, modern aesthetic and seamless usability on all screen sizes (mobile, tablet, and desktop).
* **Real-time Updates:** Utilizes React's `useCallback` and memoization patterns to prevent unnecessary re-renders and ensure a fast, fluid user experience.

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React (with Functional Components & Hooks) | Core UI library for building dynamic user interfaces. |
| **Language** | TypeScript | Ensures type safety, improves maintainability, and provides robust developer tooling. |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid, responsive, and custom styling. |
| **Tooling** | Vite | Next-generation build tool for a fast development experience. |
| **Persistence** | Browser \`localStorage\` | Used for basic persistence of the task state across browser sessions. |

## ⚙️ Setup and Installation

### Prerequisites

You must have Node.js (v18+) and npm installed on your machine.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [Your-GitHub-URL-Here]
    cd agile-task-board
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Access:** Open your browser to \`http://localhost:5173/\` (or the address shown in the console).

## 🪚 Tooling and Configuration Deep Dive

A major demonstration of contribution in this project was successfully diagnosing and resolving several deep-seated configuration conflicts between the modern ES Module environment (Vite/Node) and CommonJS-dependent packages (PostCSS/Tailwind).

This section highlights the critical problems solved, showcasing experience with the Node ecosystem and JavaScript tooling:

### 1. The ES Module / CommonJS Conflict

* **Problem:** The project's \`package.json\` was set to \`"type": "module"\`, treating all \`.js\` files as ES Modules. This caused the configuration files to fail with a \`ReferenceError: module is not defined in ES module scope\` when trying to use \`module.exports\` and \`require()\`.
* **Solution:** The configuration file was strictly renamed from \`postcss.config.js\` to **\`postcss.config.cjs\`**. This non-negotiable step forced Node/Vite to parse the file using the older, necessary CommonJS syntax, resolving the conflict.

### 2. The Plugin Structure Mismatch

* **Problem:** After fixing the loading error, the server failed with the error: \`[postcss] plugins.forEach is not a function\`. This was due to a mix-up where the list of **PostCSS plugins** (which expects an Array \`[]\`) was incorrectly placed inside the **Tailwind configuration file (\`tailwind.config.js\`**) where the compiler expected a different data structure.
* **Solution:** This required a surgical fix, ensuring that **two separate configuration files** existed, each with the correct top-level data structure:
    * **\`postcss.config.cjs\`**: Defines the tools, using the required \`plugins: [require('tailwindcss'), ...]\` **Array** structure.
    * **\`tailwind.config.js\`**: Defines Tailwind's features (content paths, theme), using the required \`plugins: []\` **Array** structure, which satisfied the compiler's \`forEach\` requirement.

## 💡 Future Enhancements (Roadmap)

1.  **Cloud Integration (Firestore):** Replace \`localStorage\` with Google Firestore to enable real-time, shared, and persistent task data for multi-user collaboration.
2.  **Drag-and-Drop:** Implement smooth drag-and-drop functionality using a modern library like \`react-beautiful-dnd\` to enhance the user experience.
3.  **Unit and Integration Testing:** Implement unit tests (e.g., using Vitest) for the state management logic within \`useTaskBoard.ts\` to ensure stability and maintainability.
4.  **Authentication:** Add user authentication to protect individual boards and manage permissions.