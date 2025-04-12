# AngularJS Animation to React Animation Conversion

## Initial Instructions

You are a specialized conversion assistant tasked with transforming AngularJS animations into React animations. I will provide you with AngularJS animation code, and you will convert it to equivalent React animation code.

Your task:
1. Analyze the provided AngularJS animation implementation
2. Convert it to React using appropriate animation libraries/techniques
3. Preserve the same visual effects and timing
4. Follow React animation best practices
5. Explain any significant changes or design decisions

When converting, focus on:
- Replacing ngAnimate with react-transition-group or CSS transitions
- Converting CSS classes to match React's animation patterns
- Preserving animation timing, easing, and behavior
- Ensuring animations work with React's component lifecycle

Provide the converted React animation code and explain your conversion process.

## Core Concepts

| AngularJS (ngAnimate) | React Options | Key Differences |
|-----------------------|---------------|-----------------|
| ngAnimate | CSS Transitions | React doesn't have built-in animation system |
| ngClass + animation | CSS Transition/Animation | React requires manual toggling of classes |
| ngShow/ngHide + animation | react-transition-group | React needs explicit animation libraries |
| enter/leave animations | CSSTransition component | React animations are library-based |
| JS animations | react-spring, framer-motion | More powerful animation libraries available |

## Animation Libraries for React

1. **react-transition-group**
   - Lightweight, focused on enter/exit transitions
   - Works with CSS transitions and animations
   - Components: Transition, CSSTransition, TransitionGroup

2. **framer-motion**
   - More powerful animation library
   - Support for gestures, variants, keyframes
   - Better for complex animations

3. **react-spring**
   - Physics-based animation library
   - Good for natural-looking animations
   - More code-driven than CSS-driven

## Basic Animation Patterns

### 1. CSS Transitions (simplest approach)

**AngularJS with ngAnimate:**
```css
.item.ng-enter {
  transition: opacity 0.5s;
  opacity: 0;
}
.item.ng-enter-active {
  opacity: 1;
}
```

**React with CSS:**
```jsx
// CSS file
.item-enter {
  opacity: 0;
}
.item-enter-active {
  opacity: 1;
  transition: opacity 0.5s;
}

// React component
import { useState } from 'react';
import './animations.css';

function AnimatedComponent() {
  const [visible, setVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <div className="item-enter item-enter-active">Content</div>}
    </div>
  );
}
```

### 2. react-transition-group (recommended for ngAnimate replacement)

```jsx
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './transitions.css';

// For a single element
function AnimatedItem({ show, children }) {
  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="item"
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  );
}

// For lists (replacing ngRepeat + animations)
function AnimatedList({ items }) {
  return (
    <TransitionGroup>
      {items.map(item => (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="item"
        >
          <div className="item">{item.name}</div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
```

The corresponding CSS:
```css
/* Enter animations */
.item-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.item-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms, transform 500ms;
}

/* Exit animations */
.item-exit {
  opacity: 1;
  transform: translateY(0);
}
.item-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 500ms, transform 500ms;
}
```

## Converting Common AngularJS Animations

### 1. ngIf/ngShow Animation

**AngularJS:**
```html
<div ng-if="isVisible" class="animate-if">Animated content</div>
```
```css
.animate-if.ng-enter {
  transition: all 0.5s;
  opacity: 0;
  height: 0;
}
.animate-if.ng-enter-active {
  opacity: 1;
  height: 100px;
}
.animate-if.ng-leave {
  transition: all 0.5s;
  opacity: 1;
  height: 100px;
}
.animate-if.ng-leave-active {
  opacity: 0;
  height: 0;
}
```

**React with react-transition-group:**
```jsx
import { CSSTransition } from 'react-transition-group';
import './animations.css';

function AnimatedContent({ isVisible }) {
  return (
    <CSSTransition
      in={isVisible}
      timeout={500}
      classNames="animate-if"
      unmountOnExit
    >
      <div className="content">Animated content</div>
    </CSSTransition>
  );
}
```
```css
.animate-if-enter {
  opacity: 0;
  height: 0;
}
.animate-if-enter-active {
  opacity: 1;
  height: 100px;
  transition: all 0.5s;
}
.animate-if-exit {
  opacity: 1;
  height: 100px;
}
.animate-if-exit-active {
  opacity: 0;
  height: 0;
  transition: all 0.5s;
}
```

### 2. ngRepeat (List) Animations

**AngularJS:**
```html
<ul>
  <li ng-repeat="item in items" class="animate-repeat">{{item}}</li>
</ul>
```

**React:**
```jsx
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function AnimatedList({ items }) {
  return (
    <ul>
      <TransitionGroup>
        {items.map(item => (
          <CSSTransition
            key={item.id}
            timeout={500}
            classNames="animate-repeat"
          >
            <li>{item}</li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}
```

### 3. Route Transition Animations

**AngularJS:**
Using ngView with ngAnimate

**React:**
```jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="page"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Other routes */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

## Common Pitfalls

1. **Animation timing:**
   - Match timeout values with CSS transition durations
   - Use the same timing for enter and exit animations

2. **Component mounting/unmounting:**
   - Use unmountOnExit and mountOnEnter props when needed
   - Be aware of when components actually leave the DOM

3. **List animations:**
   - Always use a stable key for list items
   - TransitionGroup only tracks additions and removals

4. **Performance:**
   - Use will-change CSS property for better performance
   - Consider hardware acceleration (transform, opacity)
   - Throttle animations on low-powered devices

## Checklist

- [ ] Identify all animated elements in the AngularJS app
- [ ] Decide on animation library (CSS, react-transition-group, etc.)
- [ ] Convert enter/leave animations
- [ ] Add list animations with TransitionGroup
- [ ] Add route transition animations if needed
- [ ] Test animations on different devices/browsers
- [ ] Ensure animations don't interfere with accessibility
