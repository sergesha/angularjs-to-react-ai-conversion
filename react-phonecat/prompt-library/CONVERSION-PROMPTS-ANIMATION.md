# Animation Transformation Prompts

## Basic Animation Conversion

**Prompt:**
```
Convert these AngularJS animations to React animations.
You can use CSS transitions, React Transition Group, or React Spring.
Focus on:
1. Converting ngAnimate classes to CSS or React animations
2. Handling enter/leave transitions
3. Maintaining the same visual effect

AngularJS animation:
```
[PASTE ANGULARJS ANIMATION CODE HERE]
```
```

**Example - AngularJS Animation:**
```javascript
angular.module('myApp', ['ngAnimate'])
  .animation('.fade', [function() {
    return {
      enter: function(element, doneFn) {
        element.css('opacity', 0);
        element.css('transition', 'opacity 0.5s');
        
        // Force reflow
        element[0].offsetWidth;
        
        element.css('opacity', 1);
        
        element.on('transitionend', function() {
          doneFn();
        });
      },
      leave: function(element, doneFn) {
        element.css('opacity', 1);
        element.css('transition', 'opacity 0.5s');
        
        // Force reflow
        element[0].offsetWidth;
        
        element.css('opacity', 0);
        
        element.on('transitionend', function() {
          doneFn();
        });
      }
    };
  }]);

// HTML
// <div ng-if="showContent" class="fade">Content to animate</div>
```

**Example - React Animation with CSS:**
```jsx
import React, { useState } from 'react';
import './Fade.css';

// CSS file (Fade.css)
/*
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 500ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 500ms;
}
*/

import { CSSTransition } from 'react-transition-group';

const FadeAnimation = ({ show, children }) => {
  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

// Usage
const AnimatedContent = () => {
  const [showContent, setShowContent] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowContent(!showContent)}>
        {showContent ? 'Hide' : 'Show'} Content
      </button>
      
      <FadeAnimation show={showContent}>
        <div className="content">
          Content to animate
        </div>
      </FadeAnimation>
    </div>
  );
};

export default AnimatedContent;
```

## List Animation Conversion

**Prompt:**
```
Convert this AngularJS list animation to React.
Focus on:
1. Animating items in a list when they are added/removed
2. Maintaining smooth transitions
3. Preserving the animation timing and feel

AngularJS list animation:
```
[PASTE ANGULARJS LIST ANIMATION CODE HERE]
```
```

**Example - AngularJS List Animation:**
```javascript
angular.module('listApp', ['ngAnimate'])
  .controller('ListController', ['$scope', function($scope) {
    $scope.items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];
    
    $scope.addItem = function() {
      var newId = $scope.items.length + 1;
      $scope.items.push({ id: newId, name: 'Item ' + newId });
    };
    
    $scope.removeItem = function(index) {
      $scope.items.splice(index, 1);
    };
  }]);

// CSS
/*
.list-item.ng-enter {
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-100%);
}
.list-item.ng-enter-active {
  opacity: 1;
  transform: translateX(0);
}
.list-item.ng-leave {
  transition: all 0.3s;
  opacity: 1;
  transform: translateX(0);
}
.list-item.ng-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
*/

// HTML
/*
<div ng-controller="ListController">
  <button ng-click="addItem()">Add Item</button>
  <ul>
    <li class="list-item" ng-repeat="item in items">
      {{item.name}}
      <button ng-click="removeItem($index)">Remove</button>
    </li>
  </ul>
</div>
*/
```

**Example - React List Animation:**
```jsx
import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ListAnimation.css';

// CSS file (ListAnimation.css)
/*
.list-item-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.list-item-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms;
}
.list-item-exit {
  opacity: 1;
  transform: translateX(0);
}
.list-item-exit-active {
  opacity: 0;
  transform: translateX(100%);
  transition: all 300ms;
}
*/

const AnimatedList = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
  
  const addItem = () => {
    const newId = items.length + 1;
    setItems([...items, { id: newId, name: `Item ${newId}` }]);
  };
  
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      
      <TransitionGroup component="ul">
        {items.map((item, index) => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames="list-item"
          >
            <li className="list-item">
              {item.name}
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default AnimatedList;
```

## React Spring Animation

**Prompt:**
```
Convert this AngularJS animation to use React Spring for more advanced animations.
Focus on:
1. Converting AngularJS animations to React Spring's physics-based animations
2. Implementing smooth transitions
3. Adding interactive animations if applicable

AngularJS animation:
```
[PASTE ANGULARJS ANIMATION CODE HERE]
```
```

**Example - AngularJS Animation with Complex Effects:**
```javascript
angular.module('animationApp', ['ngAnimate'])
  .controller('CardController', ['$scope', function($scope) {
    $scope.isFlipped = false;
    
    $scope.flipCard = function() {
      $scope.isFlipped = !$scope.isFlipped;
    };
  }]);

// CSS
/*
.card-container {
  perspective: 1000px;
  height: 300px;
  width: 200px;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.card.flipped {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
*/

// HTML
/*
<div ng-controller="CardController" class="card-container">
  <div class="card" ng-class="{'flipped': isFlipped}" ng-click="flipCard()">
    <div class="card-front">
      <h2>Front</h2>
      <p>Click to flip</p>
    </div>
    <div class="card-back">
      <h2>Back</h2>
      <p>Click to flip back</p>
    </div>
  </div>
</div>
*/
```

**Example - React Spring Animation:**
```jsx
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Card.css';

// CSS file (Card.css)
/*
.card-container {
  perspective: 1000px;
  height: 300px;
  width: 200px;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.card-front {
  background-color: #f5f5f5;
}
.card-back {
  background-color: #e0e0e0;
}
*/

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  
  // Define the spring animation
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  
  return (
    <div className="card-container" onClick={() => setFlipped(state => !state)}>
      <animated.div
        className="card"
        style={{
          transform
        }}
      >
        <animated.div
          className="card-front"
          style={{
            opacity: opacity.to(o => 1 - o),
            transform: transform.to(t => `${t} rotateY(0deg)`)
          }}
        >
          <h2>Front</h2>
          <p>Click to flip</p>
        </animated.div>
        
        <animated.div
          className="card-back"
          style={{
            opacity,
            transform: transform.to(t => `${t} rotateY(180deg)`)
          }}
        >
          <h2>Back</h2>
          <p>Click to flip back</p>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default FlipCard;
```