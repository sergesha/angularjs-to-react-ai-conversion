# AngularJS to React: Data Binding Conversion

## Core Concepts

| AngularJS | React | Key Differences |
|-----------|-------|-----------------|
| Two-way binding (`ng-model`) | Controlled components | React requires explicit handlers to update state |
| Automatic dirty checking | Explicit state updates | React updates must be triggered by events |
| Forms with built-in validation | Manual validation logic | React needs custom validation implementation |
| ngModel modifiers | Custom handlers | Transform input in onChange handlers |

## Converting Form Elements

### 1. Input Text
```jsx
// AngularJS: <input type="text" ng-model="user.name">
// React:
<input 
  type="text"
  value={user.name}
  onChange={(e) => setUser({...user, name: e.target.value})}
/>
```

### 2. Checkbox
```jsx
// AngularJS: <input type="checkbox" ng-model="user.active">
// React:
<input
  type="checkbox"
  checked={user.active}
  onChange={(e) => setUser({...user, active: e.target.checked})}
/>
```

### 3. Radio
```jsx
// AngularJS: <input type="radio" ng-model="user.type" value="admin">
// React:
<input
  type="radio"
  name="userType"
  value="admin"
  checked={user.type === 'admin'}
  onChange={(e) => setUser({...user, type: e.target.value})}
/>
```

### 4. Select
```jsx
// AngularJS: <select ng-model="user.country">...</select>
// React:
<select
  value={user.country}
  onChange={(e) => setUser({...user, country: e.target.value})}
>
  {/* options */}
</select>
```

## Form Validation Patterns

1. **State-based validation:**
   - Track validation state separately with useState
   - Validate on change, blur, or submit
   - Display errors conditionally based on state

2. **Schema-based validation:**
   - Use libraries like Yup or Zod for schema validation
   - Integrate with form libraries like Formik or React Hook Form

3. **Key validation transformations:**

| AngularJS | React Implementation |
|-----------|----------------------|
| `required` | Check if value exists |
| `ng-minlength/ng-maxlength` | Check string length |
| `ng-pattern` | Test with RegExp |
| `$error` object | Custom error state object |
| `ng-messages` | Conditional rendering of errors |

## Managing Complex Forms

1. **Form state organization:**
   - Use nested objects for related fields 
   - Consider using useReducer for complex forms
   - Split large forms into smaller components

2. **Field arrays (lists of inputs):**
   - Maintain array in state with unique keys
   - Add/remove functions to manipulate the array
   - Map over the array to render inputs

3. **Dynamic forms:**
   - Use objects to define field schemas
   - Render different components based on field type
   - Derive validation rules from schema

## Common Pitfalls

1. **Controlled vs Uncontrolled:**
   - Always use controlled components with value + onChange
   - Avoid mixing controlled and uncontrolled inputs

2. **Input Synchronization:**
   - In React, the source of truth is your state
   - Input value must always reflect state (no async issues)

3. **Performance:**
   - Consider debouncing for expensive validation
   - Use memoization for complex computations
   - Optimize rerenders with proper key usage

## Checklist

- [ ] Replace ng-model with value + onChange
- [ ] Implement controlled components for all inputs
- [ ] Create validation system to replace Angular validation
- [ ] Handle form submission with preventDefault
- [ ] Ensure proper error handling and display
- [ ] Test form behavior and validation