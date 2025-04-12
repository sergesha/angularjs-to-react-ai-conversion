# Template Conversion: AngularJS to React JSX

This prompt guide focuses on converting AngularJS templates and directives to React JSX.

## Basic Template Conversion

Use this prompt to convert standard AngularJS HTML templates to React JSX:

```
Convert this AngularJS template to React JSX:

[AngularJS Template HTML]
```

### Example Conversion

**AngularJS Template:**

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

**React JSX:**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PhoneList.css';

const PhoneList = ({ phones, query, setQuery, orderProp, setOrderProp }) => {
  // Filter and sort logic
  const filteredPhones = phones.filter(phone => 
    phone.name.toLowerCase().includes(query.toLowerCase()) ||
    phone.snippet.toLowerCase().includes(query.toLowerCase())
  );
  
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    if (orderProp === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.age - b.age;
    }
  });
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content */}
          <p>
            Search:
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              className="form-control" 
            />
          </p>

          <p>
            Sort by:
            <select 
              value={orderProp} 
              onChange={e => setOrderProp(e.target.value)} 
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
            {sortedPhones.map(phone => (
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
  );
};

export default PhoneList;
```

## Common Directives Conversion

Use this prompt to convert specific AngularJS directives to React:

```
Convert these AngularJS directives to React:

[AngularJS Template with Directives]
```

### Directive Mapping Table

| AngularJS Directive | React Equivalent | Notes |
|---------------------|------------------|-------|
| ng-repeat | map() function | Use array's map method with a key prop |
| ng-if | Conditional rendering | Use `{condition && <Element />}` |
| ng-show/ng-hide | Conditional style | Use style with `display` property |
| ng-class | className with condition | Use template literals or classnames library |
| ng-style | style prop | Use style object with camelCase properties |
| ng-click | onClick prop | Use callback function |
| ng-change | onChange prop | Use callback function |
| ng-model | value + onChange | Use controlled component pattern |
| ng-disabled | disabled prop | Use boolean expression |
| ng-src | src prop | Use direct value |
| ng-href | href prop | Use direct value |

### Examples of Common Directive Conversions

#### ng-repeat

**AngularJS:**
```html
<ul>
  <li ng-repeat="item in $ctrl.items track by item.id">
    {{item.name}}
  </li>
</ul>
```

**React:**
```jsx
<ul>
  {items.map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

#### ng-if and ng-show

**AngularJS:**
```html
<div ng-if="$ctrl.isReady">Content is ready!</div>
<div ng-show="$ctrl.isVisible">This can be shown or hidden.</div>
```

**React:**
```jsx
{isReady && <div>Content is ready!</div>}
<div style={{ display: isVisible ? 'block' : 'none' }}>
  This can be shown or hidden.
</div>
```

#### ng-class

**AngularJS:**
```html
<div ng-class="{'active': $ctrl.isActive, 'disabled': $ctrl.isDisabled}">
  Item
</div>
```

**React:**
```jsx
<div className={`${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}>
  Item
</div>
```

With classnames library:
```jsx
import classNames from 'classnames';

<div className={classNames({
  'active': isActive,
  'disabled': isDisabled
})}>
  Item
</div>
```

#### ng-model and ng-change

**AngularJS:**
```html
<input 
  type="text" 
  ng-model="$ctrl.username" 
  ng-change="$ctrl.updateUsername()" 
/>
```

**React:**
```jsx
<input
  type="text"
  value={username}
  onChange={(e) => {
    setUsername(e.target.value);
    updateUsername(e.target.value);
  }}
/>
```

## Filters Conversion

Use this prompt to convert AngularJS filters to JavaScript functions:

```
Convert these AngularJS filters to React/JavaScript functions:

[AngularJS Filters]
```

### Filter Examples

**AngularJS Filter:**
```javascript
angular.module('core').filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
```

**React Utility Function:**
```javascript
// In src/utils/filters.js
export const checkmark = (input) => {
  return input ? '\u2713' : '\u2718';
};

// Usage in component
import { checkmark } from '../utils/filters';

// In JSX
<span>{checkmark(value)}</span>
```

### Complex Example with Multiple Filters

**AngularJS Template with Filters:**
```html
<div>
  <p>Name: {{$ctrl.user.name | uppercase}}</p>
  <p>Joined: {{$ctrl.user.joinDate | date:'MMM d, yyyy'}}</p>
  <p>Status: {{$ctrl.user.isActive | checkmark}}</p>
  <p>Balance: {{$ctrl.user.balance | currency}}</p>
  <ul>
    <li ng-repeat="item in $ctrl.items | orderBy:'name' | filter:$ctrl.searchText">
      {{item.name}}
    </li>
  </ul>
</div>
```

**React JSX with Filter Functions:**
```jsx
import React from 'react';
import { format } from 'date-fns';
import { checkmark } from '../utils/filters';

const UserProfile = ({ user, items, searchText }) => {
  // Filter and sort items
  const filteredItems = items
    .filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Format functions (equivalent to filters)
  const formatDate = (date) => format(new Date(date), 'MMM d, yyyy');
  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  
  return (
    <div>
      <p>Name: {user.name.toUpperCase()}</p>
      <p>Joined: {formatDate(user.joinDate)}</p>
      <p>Status: {checkmark(user.isActive)}</p>
      <p>Balance: {formatCurrency(user.balance)}</p>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
```