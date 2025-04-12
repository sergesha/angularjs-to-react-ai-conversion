# AngularJS to React: Component Conversion

## Core Concepts

| AngularJS | React | Key Differences |
|-----------|-------|-----------------|
| Components/Directives | Functional Components | React uses props and hooks instead of bindings and DI |
| Lifecycle Hooks | React Hooks | React hooks are function-based and more flexible |
| Dependency Injection | Imports/Context | React uses explicit imports or Context API |
| Templates (separate) | JSX (inline) | JSX combines markup with JavaScript |

## Converting Basic Components

1. **Convert controller logic to hooks:**
   - `$onInit` → `useEffect(() => {}, [])`
   - Controller properties → `useState` hooks
   - Service injections → custom hooks or imports

2. **Convert bindings to props:**
   - `<` (one-way) → regular props
   - `=` (two-way) → prop + onChange callback
   - `@` (string) → regular props (often as strings)
   - `&` (expression) → callback function props

3. **Template conversion guidelines:**
   - Move HTML from template file into JSX return statement
   - Replace Angular expressions `{{}}` with JSX `{}`
   - Convert directives to JSX conditionals and loops

## Example: Simple Component Conversion

**AngularJS:**
```javascript
// Cut down to essential pattern
angular.module('myApp').component('greeting', {
  bindings: {
    name: '<',
    onGreet: '&'
  },
  controller: function() {
    this.greet = function() {
      this.onGreet({message: 'Hello ' + this.name});
    };
  }
});
```

**React:**
```jsx
// Equivalent React component
const Greeting = ({ name, onGreet }) => {
  const greet = () => {
    onGreet(`Hello ${name}`);
  };
  
  return (
    <div>
      <button onClick={greet}>Greet</button>
    </div>
  );
};
```

## Directive to Component Conversion

1. **Identify directive type:**
   - Element directives (E) → standard components
   - Attribute directives (A) → components with behavior props
   - CSS directives (C) → styled components

2. **Map directive functions:**
   - `link` function → `useEffect` + refs
   - `compile` → usually not needed in React
   - DOM manipulation → useRef + useEffect

3. **Watch expressions:**
   - `$watch` → `useEffect` with dependencies
   - `$watchCollection` → `useEffect` with deep comparison
   - `$watchGroup` → multiple useEffects or combined

## Common Pitfalls

1. **Scope inheritance:** 
   - React doesn't have inheritance of props
   - Pass needed props explicitly or use Context API

2. **Two-way binding:**
   - Replace with state + callback patterns
   - Create controlled components for form elements

3. **DOM access:** 
   - Use `useRef` instead of direct DOM queries
   - Avoid direct manipulation; use state changes instead

4. **Services:**
   - Convert to custom hooks, Context, or imported utilities
   - Consider data fetching libraries (React Query, SWR)

## Checklist

- [ ] Convert component structure (modularity)
- [ ] Convert controller logic to hooks
- [ ] Convert template to JSX
- [ ] Convert bindings to props
- [ ] Convert lifecycle methods
- [ ] Replace scope with state/props
- [ ] Update service injections
- [ ] Test component rendering and behavior