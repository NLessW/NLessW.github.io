# Portfolio Migration to React

This project has been successfully migrated from a static HTML/JS site to a modern React application using Vite and Tailwind CSS.

## Getting Started

1.  **Install Dependencies**
    Open a terminal in `c:\Users\user\Documents\my_site` and run:

    ```bash
    npm install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    ```

    This will start the local server (usually at http://localhost:5173).

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

-   **src/App.jsx**: Main application logic, including GitHub data fetching.
-   **src/components/**: All UI sections (`Hero`, `About`, `Skills`, `Projects`, `Terminal`, etc.).
-   **src/index.css**: Global styles and Tailwind directives.
-   **tailwind.config.js**: Custom colors (neon) and font settings.

## Features Maintained

-   **Terminal**: Use `Ctrl+K` (or Cmd+K) or click the nav icon to open. Type `help` for commands.
-   **Projects**: Automatically fetches from your GitHub.
    -   **Filter**: Merges JS and TS into "JS/TS".
    -   **Cards**: Displays individual language breakdown (JS and TS separated).
-   **Animations**: Typing effects and smooth transitions are preserved.

## Notes

-   **GitHub Token**: The API calls in `App.jsx` are currently unauthenticated (60 req/hour). If you need higher limits, create a `.env` file with `VITE_GITHUB_TOKEN=your_token` and update `App.jsx` to use `import.meta.env.VITE_GITHUB_TOKEN`.
