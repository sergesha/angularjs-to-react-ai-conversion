# Data Binding Transformation Prompts

## Two-Way Data Binding Conversion

**Prompt:**
```
Convert this AngularJS two-way data binding to React's unidirectional data flow.
Focus on:
1. Transforming ng-model to controlled components
2. Converting form inputs and validations
3. Implementing proper state management

AngularJS code:
```
[PASTE ANGULARJS CODE WITH TWO-WAY DATA BINDING]
```
```

**Example - AngularJS Form with Two-Way Binding:**
```html
<div ng-controller="UserFormController">
  <form name="userForm" ng-submit="submitForm()" novalidate>
    <div class="form-group">
      <label for="name">Name:</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        class="form-control" 
        ng-model="user.name" 
        required
        ng-minlength="3"
      >
      <div ng-show="userForm.name.$invalid && userForm.name.$touched">
        <span ng-show="userForm.name.$error.required">Name is required.</span>
        <span ng-show="userForm.name.$error.minlength">Name must be at least 3 characters.</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        class="form-control" 
        ng-model="user.email" 
        required
      >
      <div ng-show="userForm.email.$invalid && userForm.email.$touched">
        <span ng-show="userForm.email.$error.required">Email is required.</span>
        <span ng-show="userForm.email.$error.email">Enter a valid email.</span>
      </div>
    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary" 
      ng-disabled="userForm.$invalid"
    >
      Submit
    </button>
  </form>
  
  <pre ng-show="user">{{ user | json }}</pre>
</div>
```

**Example - React Form with Unidirectional Flow:**
```jsx
import React, { useState } from 'react';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!user.name) {
      newErrors.name = 'Name is required.';
    } else if (user.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }
    
    // Email validation
    if (!user.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Enter a valid email.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
    validateForm();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(user).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    if (validateForm()) {
      console.log('Form submitted:', user);
      // Handle form submission
    }
  };
  
  const isFormValid = !errors.name && !errors.email && user.name && user.email;
  
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.name && errors.name && (
            <div className="error">{errors.name}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email && (
            <div className="error">{errors.email}</div>
          )}
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
      
      {(user.name || user.email) && (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserForm;
```

## NgModel with Select and Radio Buttons

**Prompt:**
```
Convert these AngularJS form elements with ng-model to React controlled components.
Pay attention to:
1. Select dropdown conversion
2. Radio button group conversion
3. Maintaining selection state

AngularJS code:
```
[PASTE ANGULARJS CODE WITH SELECT/RADIO BUTTONS]
```
```

**Example - AngularJS Select and Radio:**
```html
<div ng-controller="PreferencesController">
  <h3>User Preferences</h3>
  
  <div class="form-group">
    <label>Theme:</label>
    <select ng-model="preferences.theme" class="form-control">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System Default</option>
    </select>
  </div>
  
  <div class="form-group">
    <label>Notification Preference:</label>
    <div class="radio">
      <label>
        <input type="radio" ng-model="preferences.notifications" value="all">
        All Notifications
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" ng-model="preferences.notifications" value="important">
        Important Only
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" ng-model="preferences.notifications" value="none">
        None
      </label>
    </div>
  </div>
  
  <button ng-click="savePreferences()" class="btn btn-success">
    Save Preferences
  </button>
  
  <div class="current-settings">
    <p>Current Theme: <strong>{{preferences.theme}}</strong></p>
    <p>Notifications: <strong>{{preferences.notifications}}</strong></p>
  </div>
</div>
```

**Example - React Select and Radio:**
```jsx
import React, { useState } from 'react';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: 'all'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const savePreferences = () => {
    console.log('Saving preferences:', preferences);
    // API call to save preferences would go here
  };
  
  return (
    <div>
      <h3>User Preferences</h3>
      
      <div className="form-group">
        <label>Theme:</label>
        <select
          name="theme"
          value={preferences.theme}
          onChange={handleChange}
          className="form-control"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Notification Preference:</label>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="notifications"
              value="all"
              checked={preferences.notifications === 'all'}
              onChange={handleChange}
            />
            All Notifications
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="notifications"
              value="important"
              checked={preferences.notifications === 'important'}
              onChange={handleChange}
            />
            Important Only
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="notifications"
              value="none"
              checked={preferences.notifications === 'none'}
              onChange={handleChange}
            />
            None
          </label>
        </div>
      </div>
      
      <button 
        onClick={savePreferences} 
        className="btn btn-success"
      >
        Save Preferences
      </button>
      
      <div className="current-settings">
        <p>Current Theme: <strong>{preferences.theme}</strong></p>
        <p>Notifications: <strong>{preferences.notifications}</strong></p>
      </div>
    </div>
  );
};

export default UserPreferences;
```