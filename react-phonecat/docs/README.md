# React PhoneCat Documentation

This directory contains comprehensive documentation for the React PhoneCat project, which demonstrates how to convert an AngularJS application to React.

## Key Documentation

| Document | Description |
|----------|-------------|
| [Conversion Report](CONVERSION-REPORT.md) | Detailed report on the conversion process, including methodology, challenges, and outcomes |
| [Testing Guide](TESTING-GUIDE.md) | Comprehensive guide to running and analyzing tests between Angular and React versions |
| [Lessons Learned](LESSONS_LEARNED.md) | Key insights and recommendations from the conversion experience |

## Project Overview

The React PhoneCat project is a conversion of the original [AngularJS PhoneCat Tutorial](https://github.com/angular/angular-phonecat) application to React. The goal was to demonstrate a methodology for converting AngularJS applications to React while maintaining visual and functional parity.

## Conversion Approach

Our conversion approach followed these key principles:

1. **Component-Based Architecture**: Mapping AngularJS components and directives to React components
2. **Unidirectional Data Flow**: Converting Angular's two-way binding to React's one-way flow
3. **Hooks for State and Lifecycle**: Using React hooks instead of Angular controllers
4. **Feature Parity**: Ensuring all original features work identically
5. **Visual Consistency**: Matching the exact visual appearance of the original app

## Prompt Library

We've created a comprehensive [prompt library](../../prompt-library/README.md) to assist with converting AngularJS code to React. These prompts cover:

- Component conversion
- Service to hook/context conversion
- Template to JSX conversion
- Data binding transformation
- Routing implementation
- Animation implementation
- Project structure
- Testing approaches

## Testing Strategy

The project includes comprehensive tests to ensure the React version matches the AngularJS version:

1. **Visual Comparison Tests**: Compare screenshots of both applications
2. **Functional Tests**: Verify that both applications behave identically
3. **Unit Tests**: Test individual components and utilities

See the [Testing Guide](TESTING-GUIDE.md) for details on running and analyzing these tests.

## Running the Application

The React PhoneCat application can be run locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Access the application
open http://localhost:3000
```

The original AngularJS application can be run for comparison:

```bash
# From the angular-phonecat directory
npm install
npm start

# Access the application
open http://localhost:8000/app/
```

## Project Structure

```
react-phonecat/
├── src/                      # Application source code
│   ├── components/           # React components
│   ├── services/             # Data and utility services
│   ├── hooks/                # Custom React hooks
│   └── ...                   # Other application code
├── public/                   # Static assets and data
├── docs/                     # Project documentation
├── tests/                    # Test scripts and assets
│   ├── scripts/              # Test scripts
│   ├── results/              # Test results (screenshots)
│   └── playwright.config.js  # Playwright configuration
└── package.json              # Project dependencies and scripts
```

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Original AngularJS PhoneCat Tutorial](https://docs.angularjs.org/tutorial)