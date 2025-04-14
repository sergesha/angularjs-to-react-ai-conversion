# Prompt: Initial React Project Setup for AngularJS Conversion

**Goal:** Set up the basic structure for a new React project intended as a conversion of an existing AngularJS application.

**Context:** You are starting the conversion of an AngularJS application (source) to React (target). This prompt guides the initial setup of the target React project repository.

**Steps:**

1.  **Create Target Repository:**
    *   Create a new empty Git repository (e.g., on GitHub, GitLab). Name it appropriately (e.g., `[original-app-name]-react`).

2.  **Clone Target Repository Locally:**
    *   Clone the newly created empty repository to your local machine.
    ```bash
    git clone <your-new-repository-url>
    cd <your-new-repository-name>
    ```

3.  **Add Initial Files:**
    *   Create a basic `README.md` file describing the project's purpose (React conversion of the source app).
    *   Create a `.gitignore` file suitable for a Node.js/React project (you can find templates online or use `npx gitignore node`).

4.  **Add Source App as Submodule:**
    *   Add the original AngularJS application's repository as a Git submodule. This keeps the original code easily accessible for reference within the same project structure.
    ```bash
    git submodule add <original-angularjs-app-repo-url> source-angularjs-app
    git add .gitmodules source-angularjs-app
    git commit -m "Add original AngularJS app as submodule"
    ```
    *   *(Note: Place the submodule in a directory like `source-angularjs-app` or similar. Commit this step separately)*

5.  **Initialize React Project:**
    *   Use `create-react-app` (or Vite, or another preferred tool) to initialize the React application skeleton within the target repository.
    ```bash
    # Using Create React App
    npx create-react-app . --template typescript # Or --template default for JavaScript

    # OR Using Vite
    # npm create vite@latest . -- --template react-ts # Or react
    # npm install
    ```
    *   *(Make sure to run this in the root of your target repository)*
    *   Add the generated files (`src`, `public`, `package.json`, etc.) and the updated `.gitignore` if necessary.

6.  **Initial Commit:**
    *   Stage all the newly created React project files.
    *   Commit the initial React project setup.
    ```bash
    git add .
    git commit -m "feat: Initial React project setup using create-react-app"
    ```

**Expected Outcome:** A local Git repository containing:
*   A `.git` directory.
*   A `README.md` file.
*   A `.gitignore` file.
*   A `.gitmodules` file.
*   A `source-angularjs-app` directory containing the original AngularJS application code (as a submodule).
*   Standard React project files and directories (`src`, `public`, `package.json`, etc.).
*   Two commits: one for the submodule, one for the initial React setup.
