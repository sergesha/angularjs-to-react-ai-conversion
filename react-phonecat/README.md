# React PhoneCat

A React implementation of the original [Angular PhoneCat](https://github.com/angular/angular-phonecat) tutorial application.

## Overview

This project is a conversion of the Angular PhoneCat application from AngularJS to React. The application displays a list of phones, allows users to search and filter them, and provides detailed information about each phone.

## Features

- Browse a catalog of phones
- Search and filter phones by name
- Sort phones by name or age
- View detailed specifications for each phone
- Interactive image gallery

## Technologies Used

- React 18
- React Router 6
- Axios for API requests
- CSS for styling
- Bootstrap 5 (for basic grid and utilities)

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── PhoneDetail/  # Phone details component
│   └── PhoneList/    # Phone list component
├── services/         # API services
├── utils/            # Utility functions
├── App.js            # Main app with routing
└── index.js          # Entry point
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## How the Project Was Created

This project was converted from AngularJS to React using a comprehensive prompt library specifically designed for this purpose. The library contains prompts for converting various AngularJS constructs (components, services, templates, etc.) to their React equivalents.

The conversion approach focused on:

1. Converting AngularJS components to React functional components with hooks
2. Replacing AngularJS services with custom hooks and context
3. Converting AngularJS templates to JSX
4. Implementing React Router for navigation
5. Maintaining the same styling and UX

## Comparison with AngularJS Version

### Key Differences

- **State Management**: Uses React hooks instead of AngularJS's two-way binding
- **Templating**: Uses JSX instead of AngularJS templates
- **Routing**: Uses React Router instead of ngRoute
- **Services**: Uses custom services with Axios instead of $resource

### Performance Improvements

- More efficient rendering with React's virtual DOM
- Improved bundle size and loading performance
- Better code organization with component-based architecture

## Acknowledgments

- The original [AngularJS PhoneCat tutorial](https://github.com/angular/angular-phonecat)
- Create React App for project bootstrapping
