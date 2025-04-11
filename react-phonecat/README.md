# React PhoneCat

A React implementation of the AngularJS PhoneCat application, demonstrating how to convert AngularJS applications to React.

## Project Structure

This project is organized into the following directories:

```
react-phonecat/
├── src/                      # Application source code
│   ├── core/                 # Core utilities and services
│   ├── phone-list/           # Phone list page components
│   ├── phone-detail/         # Phone detail page components
│   └── ...                   # Other application code
├── public/                   # Static assets
├── docs/                     # Project documentation
├── prompt-library/           # AngularJS to React conversion prompts
├── tests/                    # Test files
│   ├── scripts/              # Test scripts
│   ├── results/              # Test results (screenshots, etc.)
│   └── playwright.config.js  # Playwright configuration
└── package.json              # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/react-phonecat.git
   cd react-phonecat
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Running Tests

### Unit Tests

```bash
npm test
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm run test:e2e

# Run comparison tests only
npm run test:comparison

# Run in UI mode
npm run test:ui

# View test report
npm run test:report
```

## Documentation

For more detailed information, please see:

- [Conversion Report](docs/CONVERSION-REPORT.md) - Details on the conversion process
- [Testing Guide](docs/TESTING-GUIDE.md) - Guide for running and analyzing tests
- [Prompt Library](prompt-library/PROMPT-LIBRARY-INDEX.md) - Index of conversion prompts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The original [AngularJS PhoneCat Tutorial](https://github.com/angular/angular-phonecat)
- All contributors who helped with the conversion process