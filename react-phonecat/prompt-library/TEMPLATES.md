# AngularJS Template to React JSX Conversion

## Initial Instructions

You are a specialized conversion assistant tasked with transforming AngularJS templates to React JSX. I will provide you with AngularJS template HTML, and you will convert it to equivalent React JSX code.

Your task:
1. Analyze the provided AngularJS template
2. Convert it to React JSX syntax
3. Replace all AngularJS directives with React equivalents
4. Convert Angular expressions to JSX expressions
5. Explain any significant changes or design decisions

When converting, focus on:
- Replacing ng-directives with React patterns (ng-if → conditional rendering)
- Converting Angular interpolation to JSX expressions
- Transforming ng-repeat to map() functions with keys
- Replacing Angular filters with JavaScript functions
- Converting DOM event directives to React event handlers

Provide the converted React JSX code and explain your conversion process.

## Core Concepts

| AngularJS | React | Key Differences |
|-----------|-------|-----------------|
| Templates (HTML) | JSX (JavaScript) | JSX is JavaScript with HTML-like syntax |
| Directives | Components & built-ins | React uses props and hooks instead of directives |
| Angular expressions {{ }} | JSX expressions { } | JSX uses single curly braces |
| String interpolation | Template literals | React uses native JS template literals |

## Directive Conversions

| AngularJS Directive | React Equivalent | Implementation |
|---------------------|------------------|----------------|
| ng-if | Conditional rendering | `{condition && <Element />}` |
| ng-show/ng-hide | Style or CSS class | `<div style={{ display: show ? 'block' : 'none' }}>` |
| ng-repeat | Array.map() | `{items.map(item => <Item key={item.id} />)}` |
| ng-class | className with logic | `className={isActive ? 'active' : ''}` |
| ng-style | style object | `style={{ color: textColor }}` |
| ng-click | onClick | `onClick={handleClick}` |
| ng-submit | onSubmit | `onSubmit={handleSubmit}` |
| ng-model | value + onChange | `value={value} onChange={handleChange}` |
| ng-disabled | disabled prop | `disabled={isDisabled}` |
| ng-href | href | `href={url}` |
| ng-src | src | `src={imageUrl}` |
| ng-include | Component import | Import and render component |
| ng-transclude | children prop | Use children or render props pattern |

## Converting Control Flow

### Conditional Rendering

**AngularJS:**
```html
<div ng-if="isLoggedIn">Welcome, {{username}}!</div>
<div ng-if="!isLoggedIn">Please log in</div>
```

**React:**
```jsx
{isLoggedIn ? (
  <div>Welcome, {username}!</div>
) : (
  <div>Please log in</div>
)}
```

### List Rendering

**AngularJS:**
```html
<ul>
  <li ng-repeat="item in items track by item.id">
    {{item.name}}
  </li>
</ul>
```

**React:**
```jsx
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

## Converting Filters

| AngularJS Filter | React Approach |
|------------------|----------------|
| currency | Format in render or use library |
| date | Format with Date methods or library |
| filter | Filter array with JS filter() |
| json | JSON.stringify() |
| limitTo | slice() on arrays |
| lowercase | String.toLowerCase() |
| number | Format with toLocaleString() |
| orderBy | Sort array before rendering |
| uppercase | String.toUpperCase() |

### Example: Filter Conversion

**AngularJS:**
```html
<div>{{price | currency}}</div>
<div>{{date | date:'short'}}</div>
<ul>
  <li ng-repeat="item in items | filter:searchText | orderBy:'name'">
    {{item.name}}
  </li>
</ul>
```

**React:**
```jsx
// Formatting in render
<div>{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
<div>{new Date(date).toLocaleString()}</div>

// Filtering and sorting in JS
const filteredItems = items
  .filter(item => item.name.includes(searchText))
  .sort((a, b) => a.name.localeCompare(b.name));

return (
  <ul>
    {filteredItems.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

## Converting Events

| AngularJS Event | React Event |
|-----------------|-------------|
| ng-click | onClick |
| ng-dblclick | onDoubleClick |
| ng-mousedown | onMouseDown |
| ng-mouseup | onMouseUp |
| ng-mouseenter | onMouseEnter |
| ng-mouseleave | onMouseLeave |
| ng-change | onChange |
| ng-submit | onSubmit |
| ng-blur | onBlur |
| ng-focus | onFocus |
| ng-keyup | onKeyUp |
| ng-keydown | onKeyDown |

### Event Handler Changes

**AngularJS:**
```html
<button ng-click="ctrl.handleClick($event)">Click me</button>
```

**React:**
```jsx
<button onClick={(e) => handleClick(e)}>Click me</button>
```

## Common Pitfalls

1. **HTML Attributes:**
   - React uses camelCase for properties (className, not class)
   - Some attributes have different names (htmlFor instead of for)
   - Boolean attributes need explicit values (disabled={true})

2. **Component Composition:**
   - Use component composition instead of ng-transclude
   - Pass JSX as children or via specific props

3. **Dynamic Content:**
   - Use dangerouslySetInnerHTML sparingly (security risk!)
   - Prefer component composition for dynamic content

4. **Class vs ClassName:**
   - Always use className in React, not class
   - Combine classes with template literals or libraries like classnames

## Checklist

- [ ] Convert all Angular expressions {{ }} to JSX { }
- [ ] Replace all directives with React equivalents
- [ ] Convert ng-repeat to map() with keys
- [ ] Replace filters with JavaScript functions
- [ ] Update event handlers to React naming
- [ ] Fix HTML attributes to use React conventions
- [ ] Ensure all conditional rendering works correctly
- [ ] Test all interactive elements
