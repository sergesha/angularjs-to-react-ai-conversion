# AngularJS to React Conversion Prompt Library

This is a comprehensive library of prompts designed to assist in converting AngularJS applications to React. 

## Prompt Library Components

The complete library is divided into several specialized sections to make it more manageable:

1. [Component Transformation Prompts](CONVERSION-PROMPTS.md) - Conversion of AngularJS components to React components
2. [Service Transformation Prompts](CONVERSION-PROMPTS-SERVICE.md) - Conversion of AngularJS services to React services/hooks
3. [Template and Directive Transformation Prompts](CONVERSION-PROMPTS-TEMPLATE.md) - Conversion of AngularJS templates and directives to JSX
4. [Data Binding Transformation Prompts](CONVERSION-PROMPTS-DATA-BINDING.md) - Conversion of AngularJS two-way binding to React's unidirectional flow
5. [Routing Transformation Prompts](CONVERSION-PROMPTS-ROUTING.md) - Conversion of AngularJS routing to React Router
6. [Animation Transformation Prompts](CONVERSION-PROMPTS-ANIMATION.md) - Conversion of AngularJS animations to React animations
7. [Project Structure Transformation Prompts](CONVERSION-PROMPTS-PROJECT-STRUCTURE.md) - Conversion of AngularJS project structure to React
8. [Testing Prompts](CONVERSION-PROMPTS-TESTING.md) - Prompts for setting up automated testing for both AngularJS and React versions, including end-to-end testing with Playwright

## How to Use This Library

1. Identify the type of AngularJS code you need to convert (component, service, template, etc.)
2. Open the relevant prompt file from the list above
3. Find the specific prompt that matches your conversion need
4. Paste your AngularJS code into the prompt where indicated
5. The prompt will guide you through the conversion process with examples

## Best Practices for Using This Library

1. **Start with Structure**: Begin with the Project Structure prompts to set up your React project correctly
2. **Convert Core Components First**: Focus on converting the main components before moving to utilities
3. **Test Incrementally**: Test each converted component individually before moving to the next
4. **Adapt the Prompts**: Feel free to modify the prompts to better fit your specific codebase
5. **Document Patterns**: Keep track of recurring patterns in your conversion for future reference

## Common Conversion Patterns

This library addresses several common conversion patterns:

- AngularJS components → React functional components with hooks
- AngularJS services → React custom hooks or context providers
- AngularJS templates → JSX syntax
- AngularJS dependency injection → React imports and props
- AngularJS filters → JavaScript utility functions
- AngularJS directives → React components or custom hooks
- AngularJS $scope → React useState and useContext
- AngularJS lifecycle hooks → React useEffect with dependencies

## Example Conversion Workflow

1. Set up a new React project using Project Structure prompts
2. Convert core services using Service Transformation prompts
3. Convert main components using Component Transformation prompts
4. Implement routing using Routing Transformation prompts
5. Convert templates using Template Transformation prompts
6. Handle data binding using Data Binding Transformation prompts
7. Implement animations using Animation Transformation prompts
8. Test and refine the converted application

## Conversion Report

For a detailed analysis of how this prompt library was used to convert the angular-phonecat application to React, see the [Conversion Report](CONVERSION-REPORT.md).

## Project Status

For information about the current status of the conversion project, see the [Project Status](PROJECT-STATUS.md) document.

## Future Library Enhancements

1. Adding more specialized prompts for complex AngularJS patterns
2. Including prompts for converting to TypeScript in addition to JavaScript
3. Adding prompts for converting AngularJS tests to React Testing Library
4. Creating prompts for advanced state management with Redux or MobX
5. Adding prompts for handling internationalization conversion