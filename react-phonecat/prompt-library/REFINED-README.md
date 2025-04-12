# AngularJS to React Conversion Prompt Library

This prompt library provides a comprehensive set of instructions designed to assist developers in converting AngularJS applications to React. The prompts are intentionally general and can be applied to any AngularJS to React conversion project.

## Purpose

The library aims to:

1. **Accelerate the conversion process** by providing reusable, precise prompts
2. **Standardize the approach** to converting various AngularJS constructs to React
3. **Ensure consistency** across the converted codebase
4. **Capture best practices** for modern React development

## How to Use This Library

1. **Identify what you need to convert**: Component, service, routing, etc.
2. **Find the appropriate prompt**: Use the corresponding prompt file for your conversion task
3. **Customize the prompt**: Add your specific AngularJS code to convert
4. **Apply the generated solution**: Adapt it to your specific project needs
5. **Test the converted code**: Ensure functionality matches the original

## Available Prompts

| AngularJS Concept | React Equivalent | Prompt File |
|-------------------|------------------|-------------|
| Components & Directives | React Components | [COMPONENTS.md](REFINED-COMPONENTS.md) |
| Services & Factories | Hooks, Context | [SERVICES.md](REFINED-SERVICES.md) |
| Templates & Views | JSX | [TEMPLATES.md](REFINED-TEMPLATES.md) |
| Two-way Data Binding | Controlled Components | [DATA-BINDING.md](REFINED-DATA-BINDING.md) |
| ngRoute/ui-router | React Router | [ROUTING.md](REFINED-ROUTING.md) |
| Animations | React Transitions | [ANIMATIONS.md](REFINED-ANIMATIONS.md) |
| Project Structure | React Architecture | [PROJECT-STRUCTURE.md](REFINED-PROJECT-STRUCTURE.md) |
| Testing | React Testing | [TESTING.md](REFINED-TESTING.md) |

## Conversion Strategy

For the most effective conversion process, we recommend following this order:

1. Set up initial **Project Structure**
2. Convert **Services** to provide data to components
3. Transform core **Components**
4. Implement **Routing** between components
5. Add **Data Binding** for forms and inputs
6. Apply **Animations** to match the original experience
7. Write **Tests** to verify the conversion

## Best Practices

1. **Don't convert everything at once**: Focus on one component or feature at a time
2. **Maintain feature parity**: Ensure each converted component functions the same as the original
3. **Modernize when appropriate**: Take advantage of newer React patterns
4. **Test extensively**: Verify that the converted code maintains the same behavior