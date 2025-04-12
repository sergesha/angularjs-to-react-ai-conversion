# AngularJS to React Conversion Prompt Library

This library contains a set of prompts designed to help engineers convert AngularJS applications to React. Each prompt provides specific guidance for converting different aspects of an AngularJS application to their React equivalents.

## Prompt Library Contents

| Prompt | Description |
|--------|-------------|
| [Components](./COMPONENTS.md) | Convert AngularJS components and directives to React components |
| [Services](./SERVICES.md) | Convert AngularJS services to React hooks and context |
| [Templates](./TEMPLATES.md) | Convert AngularJS templates and directives to JSX |
| [Data Binding](./DATA-BINDING.md) | Convert two-way data binding to React's unidirectional flow |
| [Routing](./ROUTING.md) | Convert ngRoute/UI-Router to React Router |
| [Animations](./ANIMATIONS.md) | Convert ngAnimate to React animation approaches |
| [Project Structure](./PROJECT-STRUCTURE.md) | Convert AngularJS project organization to React |
| [Testing](./TESTING.md) | Convert AngularJS tests to React testing approaches |

## How to Use This Library

1. **Identify the component to convert:**
   - Determine what type of AngularJS code you're converting (component, service, etc.)
   - Select the appropriate prompt from the library

2. **Use specific prompts for specific tasks:**
   - Each prompt focuses on a particular conversion challenge
   - Combine multiple prompts for complex components

3. **Understand the key differences:**
   - Each prompt highlights the fundamental differences between AngularJS and React
   - Focus on the mental model shifts, not just syntax changes

4. **Apply the principles:**
   - Use the examples as guidance, not as copy-paste solutions
   - Adapt the patterns to your specific codebase and requirements

## Conversion Process

For a systematic conversion of an entire application, follow this suggested order:

1. Set up project structure
2. Convert core services to hooks/context
3. Convert shared components and utilities
4. Convert page components
5. Implement routing
6. Add animations
7. Set up testing

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
