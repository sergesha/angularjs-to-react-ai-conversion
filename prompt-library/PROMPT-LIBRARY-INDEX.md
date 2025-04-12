# AngularJS to React Conversion Prompt Library Index

This prompt library is designed to help you convert AngularJS applications to React systematically and efficiently. Each prompt provides specific instructions for different aspects of the conversion process.

## Core Conversion Prompts

| Prompt | Purpose | Key Patterns |
|--------|---------|-------------|
| [Components](COMPONENTS.md) | Convert AngularJS components to React components | Controllers → Hooks, Templates → JSX |
| [Services](SERVICES.md) | Convert AngularJS services to React hooks and context | Services → Custom hooks, DI → Context |
| [Templates](TEMPLATES.md) | Convert AngularJS HTML templates to React JSX | Directives → Components, Interpolation → JSX |
| [Data Binding](DATA-BINDING.md) | Convert AngularJS two-way binding to React's one-way flow | ng-model → controlled components |
| [Routing](ROUTING.md) | Convert ngRoute/UI-Router to React Router | Route config → Route components |
| [Animations](ANIMATIONS.md) | Convert ngAnimate to React animation approaches | CSS animations, React Transition Group |

## Structural Prompts

| Prompt | Purpose | Key Concepts |
|--------|---------|-------------|
| [Project Structure](PROJECT-STRUCTURE.md) | Convert AngularJS project structure to React | Module organization, File naming |
| [Testing](TESTING.md) | Convert AngularJS tests to React tests | Jasmine → Jest, E2E testing |

## How to Use This Library

1. **Identify the conversion task**: Determine what specific AngularJS feature or pattern you need to convert.

2. **Find the relevant prompt**: Select the prompt that addresses your specific conversion need.

3. **Use the prompt with AI**: Copy the entire prompt (including all sections) and provide it to your preferred AI tool along with your AngularJS code.

4. **Adapt the results**: Review the AI-generated React code and adapt it to your specific project requirements.

5. **Combine prompts for complex tasks**: For complex components that involve multiple patterns, you may need to use several prompts in sequence.

## Example Workflow

For a complete AngularJS to React conversion, follow this general workflow:

1. **Project setup**: Use [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) to set up the React project structure
2. **Service conversion**: Use [SERVICES.md](SERVICES.md) to convert core services first
3. **Component conversion**: Use [COMPONENTS.md](COMPONENTS.md) and [TEMPLATES.md](TEMPLATES.md) to convert components
4. **Data binding**: Use [DATA-BINDING.md](DATA-BINDING.md) to handle forms and user input
5. **Routing setup**: Use [ROUTING.md](ROUTING.md) to implement application routing
6. **Animations**: Use [ANIMATIONS.md](ANIMATIONS.md) to add animations
7. **Testing**: Use [TESTING.md](TESTING.md) to add tests

## Recommended Process

For each component or feature:

1. **Analyze the AngularJS code** to understand its purpose and behavior
2. **Identify the patterns** used (components, services, etc.)
3. **Select the appropriate prompts** for those patterns
4. **Convert incrementally**, testing after each conversion
5. **Validate visually and functionally** using comparison tests

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Testing Library Documentation](https://testing-library.com/docs/)