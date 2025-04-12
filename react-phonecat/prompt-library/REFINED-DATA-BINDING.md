# Data Binding Conversion: AngularJS to React

This prompt guide focuses on converting AngularJS two-way data binding to React's unidirectional data flow.

## Basic Two-Way Data Binding Conversion

Use this prompt to convert basic AngularJS data binding to React's controlled component pattern:

```
Convert this AngularJS two-way data binding to React's unidirectional data flow:

[AngularJS Code with Two-Way Binding]
```

### Example Conversion

**AngularJS with Two-Way Binding:**

```html
<div ng-controller="UserFormController">
  <form name="userForm" ng-submit="submitForm()">
    <div class="form-group">
      <label>Name:</label>
      <input type="text" ng-model="user.name" class="form-control" required />
    </div>
    
    <div class="form-group">
      <label>Email:</label>
      <input type="email" ng-model="user.email" class="form-control" required />
    </div>
    
    <button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">
      Submit
    </button>
  </form>
</div>
```

**React with Controlled Components:**

```jsx
import React, { useState } from 'react';

const UserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'Name is required';
    if (!user.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log('Form submitted:', user);
    }
  };
  
  const isFormValid = user.name && user.email;
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
```

## Form Controls Conversion

### 1. Input Text Fields

**AngularJS:**
```html
<input type="text" ng-model="user.name" />
```

**React:**
```jsx
<input
  type="text"
  value={user.name}
  onChange={(e) => setUser({...user, name: e.target.value})}
/>
```

### 2. Checkboxes

**AngularJS:**
```html
<input type="checkbox" ng-model="user.isActive" />
```

**React:**
```jsx
<input
  type="checkbox"
  checked={user.isActive}
  onChange={(e) => setUser({...user, isActive: e.target.checked})}
/>
```

### 3. Radio Buttons

**AngularJS:**
```html
<input type="radio" ng-model="user.gender" value="male" /> Male
<input type="radio" ng-model="user.gender" value="female" /> Female
```

**React:**
```jsx
<input
  type="radio"
  name="gender"
  value="male"
  checked={user.gender === 'male'}
  onChange={(e) => setUser({...user, gender: e.target.value})}
/> Male
<input
  type="radio"
  name="gender"
  value="female"
  checked={user.gender === 'female'}
  onChange={(e) => setUser({...user, gender: e.target.value})}
/> Female
```

### 4. Select Dropdown

**AngularJS:**
```html
<select ng-model="user.country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</select>
```

**React:**
```jsx
<select 
  value={user.country} 
  onChange={(e) => setUser({...user, country: e.target.value})}
>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</select>
```

### 5. Textarea

**AngularJS:**
```html
<textarea ng-model="user.bio"></textarea>
```

**React:**
```jsx
<textarea
  value={user.bio}
  onChange={(e) => setUser({...user, bio: e.target.value})}
/>
```

## Form Validation Conversion

Use this prompt for converting AngularJS form validation:

```
Convert this AngularJS form with validation to React:

[AngularJS Form Code]
```

### Example Conversion

**AngularJS Form with Validation:**

```html
<form name="signupForm" ng-submit="signup()" novalidate>
  <div class="form-group">
    <label>Email:</label>
    <input 
      type="email" 
      name="email" 
      ng-model="user.email" 
      required 
      ng-pattern="/^.+@.+\..+$/"
    />
    <div ng-messages="signupForm.email.$error" ng-if="signupForm.email.$dirty">
      <div ng-message="required">Email is required</div>
      <div ng-message="pattern">Enter a valid email</div>
    </div>
  </div>
  
  <div class="form-group">
    <label>Password:</label>
    <input 
      type="password" 
      name="password" 
      ng-model="user.password" 
      required 
      ng-minlength="8"
    />
    <div ng-messages="signupForm.password.$error" ng-if="signupForm.password.$dirty">
      <div ng-message="required">Password is required</div>
      <div ng-message="minlength">Password must be at least 8 characters</div>
    </div>
  </div>
  
  <button type="submit" ng-disabled="signupForm.$invalid">Sign Up</button>
</form>
```

**React Form with Validation:**

```jsx
import React, { useState } from 'react';

const SignupForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [errors, setErrors] = useState({});
  
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    // Email validation
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/^.+@.+\..+$/.test(value)) {
        newErrors.email = 'Enter a valid email';
      } else {
        delete newErrors.email;
      }
    }
    
    // Password validation
    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else {
        delete newErrors.password;
      }
    }
    
    setErrors(newErrors);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, user[name]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(user).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    Object.entries(user).forEach(([name, value]) => {
      validateField(name, value);
    });
    
    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', user);
      // Handle form submission
    }
  };
  
  const isFormValid = !errors.email && !errors.password && user.email && user.password;
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
          required
        />
        {touched.email && errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>
      
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
          required
        />
        {touched.password && errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
```