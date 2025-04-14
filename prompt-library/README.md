# AngularJS to React Conversion Prompt Library

This library contains a collection of prompts designed to assist in the conversion of AngularJS applications to React, leveraging AI assistance where possible.

## Purpose

The goal of these prompts is to:

1.  **Standardize:** Provide a consistent approach to common conversion tasks.
2.  **Automate:** Guide AI tools to perform specific, repeatable transformations.
3.  **Accelerate:** Speed up the migration process by breaking down complex tasks into manageable, promptable steps.

## Available Prompts

*   **[Project Setup](./PROJECT-SETUP.md):** Guides the creation of the React project repository, cloning the source AngularJS app as a submodule, and initializing the basic React structure.
*   **[Testing Setup with Playwright](./TESTING-SETUP-PLAYWRIGHT.md):** Details how to set up Playwright for visual regression testing, comparing the running AngularJS and React applications side-by-side.
*   **[Component Conversion](./COMPONENT-CONVERSION.md):** Provides detailed steps for converting AngularJS components to React functional components, including handling of state and props.
*   **[Service Conversion](./SERVICE-CONVERSION.md):** Guides the transformation of AngularJS services into React context providers or custom hooks.
*   **[Routing Setup](./ROUTING-SETUP.md):** Offers instructions on setting up React Router to replace AngularJS routing.
*   _(More prompts will be added here as the conversion progresses, covering additional components, services, routing, etc.)_

## How to Use

1.  Identify the conversion task you need to perform (e.g., setting up the project, converting a specific component).
2.  Find the relevant prompt in this library.
3.  Copy the prompt content.
4.  Paste it into your AI assistant (like Gemini, ChatGPT, etc.).
5.  Provide any necessary context specific to your application (e.g., code snippets from your AngularJS app).
6.  Review and adapt the AI-generated output for your React application.

---

## Conversion Process

For a systematic conversion of an entire application, follow this suggested order:

1. Set up project structure ([Project Setup](PROJECT-SETUP.md))
2. Set up testing infrastructure ([Testing Setup with Playwright](TESTING-SETUP-PLAYWRIGHT.md))
3. Convert core services to hooks/context
4. Convert shared components and utilities
5. Convert page components
6. Implement routing
7. Add animations
8. Set up testing

## Conversion Principles

- **Component-first:** React is component-centric, so structure your code around components
- **Unidirectional data flow:** Replace two-way binding with props down, events up
- **Hooks for lifecycle:** Use React hooks to replace AngularJS lifecycle methods
- **Composition over inheritance:** Use component composition instead of directive inheritance
- **Explicit over implicit:** Make dependencies and data flow explicit

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Lessons Learned](./LESSONS_LEARNED.md)

*This library is part of the AngularJS-to-React AI Conversion Test Task.*
