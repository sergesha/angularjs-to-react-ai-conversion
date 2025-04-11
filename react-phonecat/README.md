# React PhoneCat

This project is a React implementation of the [AngularJS PhoneCat Tutorial App](https://github.com/angular/angular-phonecat).

## Overview

The application displays a list of Android phones and allows users to:
- Browse through a catalog of phones
- Filter and sort the phone list
- View detailed specifications for each phone
- Browse through phone images

## Project Structure

The project follows a similar structure to the original AngularJS application:

```
src/
├── core/              # Core modules and services
│   ├── checkmark/     # Checkmark utility (similar to AngularJS filter)
│   └── phone/         # Phone service
├── phone-list/        # Phone list component
├── phone-detail/      # Phone detail component
├── phones/            # Phone data
├── App.js             # Main application component
└── index.js           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd react-phonecat

# Install dependencies
npm install
```

### Running the Application

```bash
# Start the development server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
# Build the application
npm run build
```

## Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e

# Run comparison tests between Angular and React versions
npm run test:comparison

# Run visual comparison tests
npm run test:visual
```

## Comparison with AngularJS Version

This React implementation aims to maintain feature parity with the original AngularJS application:

1. **Components** - Converted AngularJS components to React components
2. **Services** - Replaced AngularJS services with React hooks and context
3. **Routing** - Implemented React Router instead of ngRoute
4. **Filters** - Converted AngularJS filters to JavaScript utility functions
5. **Templates** - Replaced AngularJS templates with JSX
6. **Styling** - Maintained the same visual appearance

## Documentation

Additional documentation can be found in the following files:

- [Conversion Log](./CONVERSION-LOG.md) - Details about the conversion process
- [Playwright Testing](./PLAYWRIGHT-TESTING.md) - Information about the testing approach

## Technologies Used

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Playwright](https://playwright.dev/) (for testing)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
