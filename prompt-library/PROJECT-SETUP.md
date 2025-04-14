# AngularJS to React Project Setup

## Initial Instructions

You are a specialized conversion assistant tasked with setting up a new project for converting an AngularJS application to React. I need your guidance to create the initial project structure and environment that will facilitate a smooth conversion process.

Your task:
1. Help me set up a new repository for the conversion project
2. Create essential project files and configuration
3. Clone the original AngularJS repository as a git submodule
4. Create a React application skeleton that will eventually replace the AngularJS app

Focus on establishing a solid foundation that will support the conversion process, including:
- Proper project structure
- Essential configuration files
- Development environment setup
- Testing infrastructure

## Project Setup Steps

### 1. Create New Repository

```bash
# Create a new directory for your conversion project
mkdir angularjs-to-react-conversion
cd angularjs-to-react-conversion

# Initialize a new git repository
git init

# Create a .gitignore file for Node.js projects
echo "node_modules/
build/
dist/
coverage/
.env
.DS_Store
*.log" > .gitignore
```

### 2. Set Up Essential Files

#### README.md

```markdown
# AngularJS to React Conversion Project

This project contains the conversion of [AngularJS App Name] from AngularJS to React.

## Project Structure
- `/original-app` - Git submodule containing the original AngularJS application
- `/react-app` - The new React implementation
- `/docs` - Documentation about the conversion process
- `/prompt-library` - Collection of prompts for automating the conversion process

## Getting Started
1. Clone this repository with submodules: `git clone --recurse-submodules [repo-url]`
2. Install dependencies: `npm install`
3. Start the React development server: `npm start`
4. Start the AngularJS server: `cd original-app && npm start`

## Conversion Progress
[Outline the current status of the conversion]
```

#### package.json

```json
{
  "name": "angularjs-to-react-conversion",
  "version": "0.1.0",
  "description": "Conversion of AngularJS application to React",
  "scripts": {
    "start:react": "cd react-app && npm start",
    "start:angular": "cd original-app && npm start",
    "start:both": "concurrently \"npm run start:react\" \"npm run start:angular\"",
    "test": "cd react-app && npm test",
    "build": "cd react-app && npm run build"
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
}
```

### 3. Clone Original Repository as Git Submodule

```bash
# Add the original AngularJS app as a submodule
git submodule add https://github.com/username/original-angularjs-app.git original-app

# Initialize and update the submodule
git submodule update --init --recursive

# Install dependencies for the original app
cd original-app
npm install
cd ..
```

### 4. Create React Application Skeleton

```bash
# Create a new React application using Create React App
npx create-react-app react-app

# Navigate to the React app directory
cd react-app

# Install essential dependencies for the conversion
npm install react-router-dom axios bootstrap
```

#### Update React App Structure

Create the following directory structure inside react-app/src:

```
src/
├── components/      # React components (will mirror AngularJS components)
├── services/        # API services (will replace AngularJS services)
├── hooks/           # Custom React hooks for business logic
├── context/         # React context for state management
├── utils/           # Utility functions
├── assets/          # Static assets
└── styles/          # CSS styles
```

#### Create Placeholder Components

Create basic component skeletons that mirror the structure of your AngularJS app:

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>React Version</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div>Home Page Placeholder</div>} />
            {/* Add routes that mirror your AngularJS routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

## Setting Up Testing Infrastructure

### Visual Comparison Testing

For comparing Angular and React versions, set up a testing environment:

```bash
# Install Playwright for visual testing
cd react-app
npm install --save-dev @playwright/test
npx playwright install

# Create tests directory
mkdir -p tests/comparison
```

Create a basic comparison test:

```javascript
// tests/comparison/visual.spec.js
const { test, expect } = require('@playwright/test');

test('compare home pages', async ({ page }) => {
  // React app
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/screenshots/react-home.png' });
  
  // AngularJS app
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/screenshots/angular-home.png' });
  
  // Visual comparison can be done manually for now
  // Later we can add automated comparison with Playwright's image comparison
});
```

## Additional Configuration Files

### Create Documentation Structure

```bash
# Create documentation directories
mkdir -p docs/conversion-process
mkdir prompt-library

# Create initial documentation files
echo "# Conversion Process" > docs/conversion-process/README.md
echo "# Prompt Library for AngularJS to React Conversion" > prompt-library/README.md
```

### Create Conversion Tracking File

```bash
# Create a file to track conversion progress
echo "# Conversion Progress

## Components
- [ ] Component 1
- [ ] Component 2

## Services
- [ ] Service 1
- [ ] Service 2

## Routes
- [ ] Route 1
- [ ] Route 2

## Filters/Pipes
- [ ] Filter 1
- [ ] Filter 2
" > docs/CONVERSION-PROGRESS.md
```

## Best Practices for Project Setup

1. **Maintain Parallel Development**
   - Keep both Angular and React apps runnable throughout the conversion
   - Use identical port mapping for APIs to simplify the transition

2. **Version Control Discipline**
   - Create feature branches for each major component conversion
   - Use descriptive commit messages documenting conversion decisions

3. **Shared Assets Strategy**
   - Symlink or copy static assets from the original app to maintain consistency
   - Consider a build step to sync assets if necessary

4. **Incremental Conversion**
   - Focus on one component or feature at a time
   - Start with simpler components to build confidence and establish patterns

5. **Documentation First**
   - Document architectural decisions before implementing
   - Create mapping documents that show how each AngularJS construct maps to React