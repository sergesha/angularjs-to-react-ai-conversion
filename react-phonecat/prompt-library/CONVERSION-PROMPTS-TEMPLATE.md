# Template and Directive Transformation Prompts

## Basic Template Conversion

**Prompt:**
```
Convert this AngularJS template to React JSX. 
Make sure to:
1. Convert AngularJS directives to React JSX syntax
2. Transform expressions from {{ }} to { }
3. Handle AngularJS event bindings to React event handlers

AngularJS template:
```
[PASTE ANGULARJS TEMPLATE HERE]
```
```

**Example - AngularJS Template:**
```html
<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <!-- Sidebar content -->
      <p>
        Search:
        <input ng-model="$ctrl.query" class="form-control" />
      </p>

      <p>
        Sort by:
        <select ng-model="$ctrl.orderProp" class="form-control">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    </div>

    <div class="col-md-10">
      <!-- Body content -->
      <ul class="phones">
        <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp"
            class="thumbnail phone-list-item">
          <a href="#!/phones/{{phone.id}}" class="thumb">
            <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />
          </a>
          <a href="#!/phones/{{phone.id}}">{{phone.name}}</a>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
```

**Example - React JSX:**
```jsx
<div className="container-fluid">
  <div className="row">
    <div className="col-md-2">
      {/* Sidebar content */}
      <p>
        Search:
        <input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="form-control" 
        />
      </p>

      <p>
        Sort by:
        <select 
          value={orderProp} 
          onChange={(e) => setOrderProp(e.target.value)} 
          className="form-control"
        >
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    </div>

    <div className="col-md-10">
      {/* Body content */}
      <ul className="phones">
        {filteredAndSortedPhones.map(phone => (
          <li key={phone.id} className="thumbnail phone-list-item">
            <Link to={`/phones/${phone.id}`} className="thumb">
              <img src={phone.imageUrl} alt={phone.name} />
            </Link>
            <Link to={`/phones/${phone.id}`}>
              {phone.name}
            </Link>
            <p>{phone.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
```

## Directive Conversion

**Prompt:**
```
Convert the following AngularJS directive to a React component.
Consider:
1. Whether the directive should be a functional or class component
2. How to handle directive's scope bindings
3. How to transform the link function's DOM manipulations

AngularJS directive:
```
[PASTE ANGULARJS DIRECTIVE HERE]
```
```

**Example - AngularJS Directive:**
```javascript
angular.module('myApp').directive('starRating', function() {
  return {
    restrict: 'E',
    scope: {
      rating: '=',
      maxStars: '@',
      onRatingChange: '&'
    },
    template: 
      '<div class="star-rating">' +
      '  <span ng-repeat="star in stars track by $index" ' +
      '        ng-class="star.filled ? \'star-filled\' : \'star-empty\'" ' +
      '        ng-click="setRating($index + 1)">' +
      '    <i class="fa fa-star"></i>' +
      '  </span>' +
      '</div>',
    link: function(scope, element, attrs) {
      scope.stars = [];
      
      scope.setRating = function(rating) {
        scope.rating = rating;
        updateStars();
        scope.onRatingChange({rating: rating});
      };
      
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.maxStars; i++) {
          scope.stars.push({
            filled: i < scope.rating
          });
        }
      }
      
      scope.$watch('rating', function(newVal) {
        updateStars();
      });
      
      updateStars();
    }
  };
});
```

**Example - React Component:**
```jsx
import React, { useState, useEffect } from 'react';
import './StarRating.css';

const StarRating = ({ rating, maxStars = 5, onRatingChange }) => {
  const [stars, setStars] = useState([]);
  
  // Update stars when rating changes
  useEffect(() => {
    updateStars(rating);
  }, [rating]);
  
  const updateStars = (currentRating) => {
    const newStars = [];
    for (let i = 0; i < maxStars; i++) {
      newStars.push({
        filled: i < currentRating
      });
    }
    setStars(newStars);
  };
  
  const setRating = (newRating) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };
  
  return (
    <div className="star-rating">
      {stars.map((star, index) => (
        <span 
          key={index}
          className={star.filled ? 'star-filled' : 'star-empty'}
          onClick={() => setRating(index + 1)}
        >
          <i className="fa fa-star"></i>
        </span>
      ))}
    </div>
  );
};

export default StarRating;
```

## NgIf and NgRepeat Conversion

**Prompt:**
```
Convert these AngularJS ngIf and ngRepeat directives to React JSX.

AngularJS template:
```
[PASTE ANGULARJS TEMPLATE WITH NG-IF AND NG-REPEAT]
```
```

**Example - AngularJS Template:**
```html
<div class="user-list">
  <div ng-if="$ctrl.loading" class="loading">Loading...</div>
  <div ng-if="$ctrl.error" class="error">Error: {{$ctrl.error}}</div>
  
  <div ng-if="$ctrl.users.length === 0 && !$ctrl.loading" class="empty">
    No users found.
  </div>
  
  <ul ng-if="$ctrl.users.length > 0">
    <li ng-repeat="user in $ctrl.users | orderBy:'lastName'" class="user-item">
      <div class="user-name">{{user.firstName}} {{user.lastName}}</div>
      <div ng-if="user.isAdmin" class="admin-badge">Admin</div>
      <div class="user-email">{{user.email}}</div>
      <button ng-click="$ctrl.deleteUser(user.id)" class="delete-btn">
        Delete
      </button>
    </li>
  </ul>
</div>
```

**Example - React JSX:**
```jsx
<div className="user-list">
  {loading && <div className="loading">Loading...</div>}
  {error && <div className="error">Error: {error}</div>}
  
  {users.length === 0 && !loading && (
    <div className="empty">No users found.</div>
  )}
  
  {users.length > 0 && (
    <ul>
      {users
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
        .map(user => (
          <li key={user.id} className="user-item">
            <div className="user-name">
              {user.firstName} {user.lastName}
            </div>
            {user.isAdmin && <div className="admin-badge">Admin</div>}
            <div className="user-email">{user.email}</div>
            <button 
              onClick={() => deleteUser(user.id)} 
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))
      }
    </ul>
  )}
</div>
```