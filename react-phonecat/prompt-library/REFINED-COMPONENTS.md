# Component Conversion: AngularJS to React

This prompt guide focuses on converting AngularJS components and directives to React components.

## Basic Component Conversion

Use this prompt to convert standard AngularJS components to React functional components:

```
Convert this AngularJS component to a React functional component using hooks:

[AngularJS Component Code]
```

### Example Conversion

**AngularJS Component:**

```javascript
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
        this.phones = Phone.query();
        this.orderProp = 'age';
      }
    ]
  });
```

**React Component:**

```jsx
import React, { useState, useEffect } from 'react';
import { usePhoneService } from '../services/PhoneService';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [orderProp, setOrderProp] = useState('age');
  const [query, setQuery] = useState('');
  const phoneService = usePhoneService();

  useEffect(() => {
    const fetchPhones = async () => {
      const data = await phoneService.query();
      setPhones(data);
    };
    fetchPhones();
  }, [phoneService]);

  return (
    <div className="phone-list">
      {/* JSX template converted from phone-list.template.html */}
    </div>
  );
};

export default PhoneList;
```

## Component Lifecycle Methods

Use this prompt to handle AngularJS component lifecycle hooks:

```
Convert this AngularJS component with lifecycle hooks ($onInit, $onChanges, $onDestroy) to a React functional component with equivalent hooks:

[AngularJS Component Code]
```

### Lifecycle Method Mapping

| AngularJS Lifecycle | React Hook Equivalent |
|---------------------|------------------------|
| $onInit | useEffect(() => {}, []) |
| $onChanges | useEffect(() => {}, [dependencies]) |
| $postLink | useEffect(() => {}) |
| $onDestroy | useEffect(() => { return () => {} }, []) |

### Example Conversion

**AngularJS Component with Lifecycle:**

```javascript
angular.module('myApp').component('dataLoader', {
  bindings: {
    resourceId: '<',
    onDataLoaded: '&'
  },
  controller: ['DataService', 
    function(DataService) {
      var ctrl = this;
      
      this.$onInit = function() {
        console.log('Component initialized');
      };
      
      this.$onChanges = function(changesObj) {
        if (changesObj.resourceId) {
          this.loadData();
        }
      };
      
      this.loadData = function() {
        DataService.getData(this.resourceId).then(function(data) {
          ctrl.data = data;
          ctrl.onDataLoaded({data: data});
        });
      };
      
      this.$onDestroy = function() {
        console.log('Component destroyed');
      };
    }
  ]
});
```

**React Component with Hooks:**

```jsx
import React, { useState, useEffect } from 'react';
import { useDataService } from '../services/DataService';

const DataLoader = ({ resourceId, onDataLoaded }) => {
  const [data, setData] = useState(null);
  const dataService = useDataService();
  
  // Equivalent to $onInit
  useEffect(() => {
    console.log('Component initialized');
  }, []);
  
  // Equivalent to $onChanges watching resourceId
  useEffect(() => {
    loadData();
  }, [resourceId]);
  
  const loadData = async () => {
    const result = await dataService.getData(resourceId);
    setData(result);
    if (onDataLoaded) {
      onDataLoaded(result);
    }
  };
  
  // Equivalent to $onDestroy
  useEffect(() => {
    return () => {
      console.log('Component destroyed');
    };
  }, []);
  
  return (
    <div className="data-loader">
      {data ? (
        <div className="data-content">{/* Render data */}</div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default DataLoader;
```

## Directive Conversion

Use this prompt to convert AngularJS directives to React components:

```
Convert this AngularJS directive to a React component:

[AngularJS Directive Code]
```

### Directive Type Mapping

| AngularJS Directive Type | React Approach |
|--------------------------|----------------|
| Element Directive (E) | Standard React Component |
| Attribute Directive (A) | Component with specific props or HOC |
| CSS Class Directive (C) | Component with CSS classes or styled-components |
| Comment Directive (M) | Not typically used in React - convert to component |

### Example Conversion

**AngularJS Directive:**

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

**React Component:**

```jsx
import React, { useState, useEffect } from 'react';
import './StarRating.css';

const StarRating = ({ rating, maxStars = 5, onRatingChange }) => {
  const [stars, setStars] = useState([]);
  
  const updateStars = (currentRating) => {
    const newStars = [];
    for (let i = 0; i < maxStars; i++) {
      newStars.push({
        filled: i < currentRating
      });
    }
    setStars(newStars);
  };
  
  useEffect(() => {
    updateStars(rating);
  }, [rating, maxStars]);
  
  const handleSetRating = (newRating) => {
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
          onClick={() => handleSetRating(index + 1)}
        >
          <i className="fa fa-star"></i>
        </span>
      ))}
    </div>
  );
};

export default StarRating;
```

## Component Bindings Conversion

Use this prompt to convert AngularJS component bindings to React props:

```
Convert these AngularJS component bindings to React props:

[AngularJS Component with Bindings]
```

### Bindings Mapping

| AngularJS Binding | React Equivalent |
|-------------------|------------------|
| < (one-way) | Props |
| = (two-way) | Props + onChange callbacks |
| @ (string) | Props |
| & (expression) | Function props |

### Example Conversion

**AngularJS Component with Bindings:**

```javascript
angular.module('myApp').component('userProfile', {
  bindings: {
    user: '<',
    isEditable: '@',
    onUpdate: '&',
    userStatus: '='
  },
  controller: function() {
    this.updateStatus = function(newStatus) {
      this.userStatus = newStatus;
      this.onUpdate({user: this.user, status: newStatus});
    };
  },
  template: `
    <div class="user-profile">
      <h2>{{$ctrl.user.name}}</h2>
      <p>Status: {{$ctrl.userStatus}}</p>
      <button ng-if="$ctrl.isEditable === 'true'" 
        ng-click="$ctrl.updateStatus('active')">Set Active</button>
    </div>
  `
});
```

**React Component with Props:**

```jsx
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ 
  user, 
  isEditable, 
  onUpdate, 
  userStatus, 
  onUserStatusChange 
}) => {
  const updateStatus = (newStatus) => {
    onUserStatusChange(newStatus);
    onUpdate(user, newStatus);
  };
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Status: {userStatus}</p>
      {isEditable === 'true' && (
        <button onClick={() => updateStatus('active')}>
          Set Active
        </button>
      )}
    </div>
  );
};

export default UserProfile;
```

## Usage Example in Parent Component

**AngularJS Parent:**

```javascript
<user-profile 
  user="$ctrl.currentUser" 
  is-editable="{{$ctrl.canEdit}}" 
  on-update="$ctrl.handleUserUpdate(user, status)" 
  user-status="$ctrl.status">
</user-profile>
```

**React Parent:**

```jsx
<UserProfile
  user={currentUser}
  isEditable={canEdit.toString()}
  onUpdate={(user, status) => handleUserUpdate(user, status)}
  userStatus={status}
  onUserStatusChange={setStatus}
/>
```