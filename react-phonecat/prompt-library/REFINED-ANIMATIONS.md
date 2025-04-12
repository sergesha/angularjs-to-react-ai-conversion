# Animation Conversion: AngularJS to React

This prompt guide focuses on converting AngularJS animations to React animations using CSS transitions, React Transition Group, or React Spring.

## Basic Animation Conversion

Use this prompt to convert basic AngularJS animations to React:

```
Convert this AngularJS animation to React:

[AngularJS Animation Code]
```

### Example Conversion

**AngularJS Animation:**

```javascript
angular.module('phonecat', ['ngAnimate'])
.animation('.phone-listing', function() {
  return {
    addClass: function(element, className, done) {
      if (className === 'ng-hide') {
        element.css({
          opacity: 1,
          transform: 'scale(1)'
        });
        element.animate({
          opacity: 0,
          transform: 'scale(0.8)'
        }, 300, done);
      } else {
        done();
      }
    },
    removeClass: function(element, className, done) {
      if (className === 'ng-hide') {
        element.css({
          opacity: 0,
          transform: 'scale(0.8)'
        });
        element.animate({
          opacity: 1,
          transform: 'scale(1)'
        }, 300, done);
      } else {
        done();
      }
    }
  };
});
```

**React with CSS Transitions:**

```jsx
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './PhoneListing.css';

/*
CSS file (PhoneListing.css):
.phone-listing-enter {
  opacity: 0;
  transform: scale(0.8);
}
.phone-listing-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}
.phone-listing-exit {
  opacity: 1;
  transform: scale(1);
}
.phone-listing-exit-active {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 300ms, transform 300ms;
}
*/

const PhoneListItem = ({ phone, show }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="phone-listing"
      unmountOnExit
    >
      <div className="phone-listing">
        <h2>{phone.name}</h2>
        <p>{phone.description}</p>
      </div>
    </CSSTransition>
  );
};

export default PhoneListItem;
```

## Page Transition Animation

Use this prompt to convert page transition animations:

```
Convert this AngularJS page transition animation to React Router:

[AngularJS Page Transition Code]
```

### Example Conversion

**AngularJS View Transition:**

```javascript
angular.module('app', ['ngAnimate']).config(function($routeProvider) {
  // Route configuration...
});

// CSS
/*
.view-container {
  position: relative;
}
.view-frame.ng-enter, 
.view-frame.ng-leave {
  position: absolute;
  left: 0;
  right: 0;
  transition: all 0.5s ease-in-out;
}
.view-frame.ng-enter {
  opacity: 0;
  transform: translateX(100%);
}
.view-frame.ng-enter-active {
  opacity: 1;
  transform: translateX(0);
}
.view-frame.ng-leave {
  opacity: 1;
  transform: translateX(0);
}
.view-frame.ng-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
*/

// HTML
// <div class="view-container">
//   <div ng-view class="view-frame"></div>
// </div>
```

**React with React Transition Group:**

```jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhoneList from './components/PhoneList';
import PhoneDetail from './components/PhoneDetail';
import './transitions.css';

/*
CSS file (transitions.css):
.page-transition-enter {
  opacity: 0;
  transform: translateX(100%);
}
.page-transition-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 500ms, transform 500ms;
}
.page-transition-exit {
  opacity: 1;
  transform: translateX(0);
}
.page-transition-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 500ms, transform 500ms;
}
*/

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="view-container">
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="page-transition"
          timeout={500}
        >
          <div className="view-frame">
            <Routes location={location}>
              <Route path="/phones" element={<PhoneList />} />
              <Route path="/phones/:phoneId" element={<PhoneDetail />} />
              <Route path="*" element={<Navigate to="/phones" replace />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default AnimatedRoutes;
```

## List Animation Conversion

Use this prompt to convert list animations:

```
Convert this AngularJS list animation to React:

[AngularJS List Animation Code]
```

### Example Conversion

**AngularJS List Animation:**

```javascript
// CSS
/*
.phone-list-item.ng-enter,
.phone-list-item.ng-leave,
.phone-list-item.ng-move {
  transition: 0.5s linear all;
}

.phone-list-item.ng-enter {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.phone-list-item.ng-enter.ng-enter-active {
  opacity: 1;
  height: 100px;
}

.phone-list-item.ng-leave {
  opacity: 1;
  height: 100px;
  overflow: hidden;
}

.phone-list-item.ng-leave.ng-leave-active {
  opacity: 0;
  height: 0;
}

.phone-list-item.ng-move {
  opacity: 0.5;
}

.phone-list-item.ng-move.ng-move-active {
  opacity: 1;
}
*/

// HTML
// <ul>
//   <li class="phone-list-item" ng-repeat="phone in phones | filter:query">
//     {{phone.name}}
//   </li>
// </ul>
```

**React with TransitionGroup:**

```jsx
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './PhoneList.css';

/*
CSS file (PhoneList.css):
.phone-list-item-enter {
  opacity: 0;
  height: 0;
  overflow: hidden;
}
.phone-list-item-enter-active {
  opacity: 1;
  height: 100px;
  transition: opacity 500ms linear, height 500ms linear;
}
.phone-list-item-exit {
  opacity: 1;
  height: 100px;
  overflow: hidden;
}
.phone-list-item-exit-active {
  opacity: 0;
  height: 0;
  transition: opacity 500ms linear, height 500ms linear;
}
*/

const PhoneList = ({ phones, query }) => {
  const filteredPhones = phones.filter(phone => 
    phone.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <ul>
      <TransitionGroup component={null}>
        {filteredPhones.map(phone => (
          <CSSTransition
            key={phone.id}
            timeout={500}
            classNames="phone-list-item"
          >
            <li className="phone-list-item">
              {phone.name}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default PhoneList;
```

## Advanced Animation with React Spring

Use this prompt for more complex physics-based animations:

```
Convert this AngularJS animation to use React Spring for more advanced animations:

[AngularJS Animation Code]
```

### Example Conversion

**AngularJS Complex Animation:**

```javascript
angular.module('app').animation('.flip-card', function() {
  return {
    addClass: function(element, className, done) {
      if (className === 'flipped') {
        element.css({
          transform: 'rotateY(0deg)',
          transition: 'none'
        });
        
        // Force reflow
        element[0].offsetWidth;
        
        element.css({
          transform: 'rotateY(180deg)',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        element.on('transitionend', function() {
          done();
        });
      } else {
        done();
      }
    },
    removeClass: function(element, className, done) {
      if (className === 'flipped') {
        element.css({
          transform: 'rotateY(180deg)',
          transition: 'none'
        });
        
        // Force reflow
        element[0].offsetWidth;
        
        element.css({
          transform: 'rotateY(0deg)',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        element.on('transitionend', function() {
          done();
        });
      } else {
        done();
      }
    }
  };
});
```

**React with React Spring:**

```jsx
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './FlipCard.css';

const FlipCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);
  
  // Define the spring animation
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1200px) rotateY(${flipped ? 180 : 0}deg)`,
    config: {
      mass: 5,
      tension: 500,
      friction: 80,
      duration: 800,
      easing: t => t<.5 ? 2*t*t : -1+(4-2*t)*t  // Custom bezier-like easing
    }
  });
  
  return (
    <div className="flip-card-container" onClick={() => setFlipped(state => !state)}>
      <animated.div
        className="flip-card"
        style={{
          transform
        }}
      >
        <animated.div
          className="flip-card-front"
          style={{
            opacity: opacity.to(o => 1 - o),
            transform: transform.to(t => `${t} rotateY(0deg)`)
          }}
        >
          {frontContent}
        </animated.div>
        
        <animated.div
          className="flip-card-back"
          style={{
            opacity,
            transform: transform.to(t => `${t} rotateY(180deg)`)
          }}
        >
          {backContent}
        </animated.div>
      </animated.div>
    </div>
  );
};

export default FlipCard;
```