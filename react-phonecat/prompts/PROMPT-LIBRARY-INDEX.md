# AngularJS to React Conversion Prompt Library

This prompt library provides ready-to-use prompts for converting different aspects of an AngularJS application to React.

## Core Concepts

When converting from AngularJS to React, there are several key paradigm shifts to consider:

1. **Component Architecture**: 
   - AngularJS: Uses directives, controllers, and templates
   - React: Uses components with JSX

2. **State Management**:
   - AngularJS: Two-way data binding
   - React: One-way data flow with state and props

3. **Dependency Injection**:
   - AngularJS: Built-in DI system
   - React: Uses imports and hooks

4. **Templating**:
   - AngularJS: HTML templates with directives
   - React: JSX

## Prompt Categories

### 1. Component Conversion

- [Component Structure Conversion](./CONVERSION-PROMPTS-COMPONENTS.md) - Convert AngularJS components to React
- [Controller to Hooks Conversion](./CONVERSION-PROMPTS-CONTROLLERS.md) - Convert AngularJS controllers to React hooks

### 2. Service Conversion

- [Service to Hook Conversion](./CONVERSION-PROMPTS-SERVICES.md) - Convert AngularJS services to React hooks
- [Resource to Fetch Conversion](./CONVERSION-PROMPTS-RESOURCES.md) - Convert $resource to fetch API

### 3. Template Conversion

- [Template to JSX Conversion](./CONVERSION-PROMPTS-TEMPLATES.md) - Convert AngularJS templates to JSX
- [Directive to Component Conversion](./CONVERSION-PROMPTS-DIRECTIVES.md) - Convert AngularJS directives to React components

### 4. Routing Conversion

- [ngRoute to React Router Conversion](./CONVERSION-PROMPTS-ROUTING.md) - Convert ngRoute to React Router

### 5. Filter Conversion

- [Filter to Utility Function Conversion](./CONVERSION-PROMPTS-FILTERS.md) - Convert AngularJS filters to JavaScript utility functions

### 6. Form Handling

- [Form Handling Conversion](./CONVERSION-PROMPTS-FORMS.md) - Convert AngularJS forms to React-controlled components

### 7. Animation Conversion

- [Animation Conversion](./CONVERSION-PROMPTS-ANIMATIONS.md) - Convert AngularJS animations to CSS transitions or React libraries

### 8. Testing

- [Testing Conversion](./CONVERSION-PROMPTS-TESTING.md) - Convert AngularJS tests to React testing libraries

### 9. Project Structure

- [Project Structure Conversion](./CONVERSION-PROMPTS-PROJECT-STRUCTURE.md) - Organize React project to match AngularJS structure

## Using the Prompts

Each prompt follows this structure:

1. **Context** - Background information about the AngularJS feature
2. **Prompt** - Instructions for the AI to convert specific code
3. **Response Template** - Expected format for the AI's response
4. **Additional Instructions** - Specific guidelines for the conversion
5. **Examples** - Sample conversions for reference

To use a prompt:

1. Choose the appropriate prompt for the feature you want to convert
2. Copy the AngularJS code that needs conversion
3. Use the prompt with an AI assistant, replacing example code with your code
4. Adjust the AI's response as needed for your specific application

## Customizing Prompts

These prompts are designed to be customizable for specific project needs. When adapting them:

1. Update examples to include patterns specific to your codebase
2. Modify response templates to match your preferred coding style
3. Add project-specific instructions for consistency
4. Combine prompts for complex components

## Contribution

To add new prompts or improve existing ones:

1. Follow the established format for consistency
2. Include clear examples with before/after code
3. Focus on one specific conversion concern per prompt
4. Test prompts with actual code from the project