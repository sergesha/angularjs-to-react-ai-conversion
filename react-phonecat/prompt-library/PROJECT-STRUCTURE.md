# AngularJS to React: Project Structure Conversion

## Core Concepts

| AngularJS Structure | React Structure | Key Differences |
|---------------------|-----------------|-----------------|
| Module-based | Component-based | React uses component tree rather than modules |
| Services as singletons | Hooks and context | React uses hooks for stateful logic |
| Controllers + Templates | Functional components | React combines logic and UI in components |
| Dependency registration | Import statements | React uses ES modules instead of registration |
| Config blocks | Root setup | Configuration happens at app initialization |

## Project Organization

### AngularJS Typical Structure
```
app/
├── app.module.js
├── app.config.js
├── components/
│   ├── user-list/
│   │   ├── user-list.module.js
│   │   ├── user-list.component.js
│   │   └── user-list.template.html
│   └── user-detail/
│       ├── user-detail.module.js
│       ├── user-detail.component.js
│       └── user-detail.template.html
├── services/
│   ├── user.service.js
│   └── auth.service.js
└── shared/
    ├── directives/
    └── filters/
```

### React Recommended Structure
```
src/
├── App.js
├── index.js
├── components/
│   ├── UserList/
│   │   ├── UserList.js
│   │   ├── UserList.css
│   │   └── UserListItem.js
│   └── UserDetail/
│       ├── UserDetail.js
│       └── UserDetail.css
├── hooks/
│   ├── useUserService.js
│   └── useAuth.js
├── context/
│   ├── AuthContext.js
│   └── ThemeContext.js
└── utils/
    ├── api.js
    └── helpers.js
```

## Conversion Strategy

1. **Project Setup:**
   - Create new React project with create-react-app or Vite
   - Set up equivalent folder structure
   - Configure routing with react-router-dom

2. **Component Migration Order:**
   - Start with shared/utility components
   - Move to service/data layer (hooks & context)
   - Then convert page-level components
   - Finally, integrate into a complete app

3. **Module to Component Conversion:**
   - Convert each Angular module to a folder of components
   - Split complex components into smaller ones
   - Ensure proper import/export structure

## Key Structures to Convert

### 1. App Bootstrap 

**AngularJS:**
```javascript
angular
  .module('myApp', [
    'ngRoute',
    'userModule',
    'authModule'
  ])
  .config(['$routeProvider', function($routeProvider) {
    // Route configuration
  }]);
```

**React:**
```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Module Structure

**AngularJS:**
```javascript
// user.module.js
angular.module('userModule', [])
  .component('userList', {
    templateUrl: 'user-list.template.html',
    controller: UserListController
  })
  .service('UserService', UserService);
```

**React:**
```jsx
// components/UserList/index.js
export { default } from './UserList';

// components/UserList/UserList.js
import React from 'react';
import { useUserService } from '../../hooks/useUserService';
import './UserList.css';

const UserList = () => {
  // Component implementation
};

export default UserList;
```

### 3. Service Organization

**AngularJS:**
```javascript
// services/user.service.js
angular.module('userModule')
  .service('UserService', ['$http', function($http) {
    this.getUsers = function() {
      return $http.get('/api/users');
    };
  }]);
```

**React:**
```javascript
// hooks/useUserService.js
import { useState } from 'react';

export const useUserService = () => {
  const [loading, setLoading] = useState(false);
  
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      return await response.json();
    } finally {
      setLoading(false);
    }
  };
  
  return { getUsers, loading };
};
```

## Asset Organization

1. **Static Assets:**
   - Move from `/app/assets` to `/public` or `/src/assets`
   - Update references in components

2. **Styles:**
   - Convert global CSS to component-specific CSS
   - Consider CSS modules or styled-components

3. **Configuration:**
   - Move constants to environment variables
   - Create config.js for app-wide settings

## Common Pitfalls

1. **Circular Dependencies:**
   - Watch for circular imports between components
   - Use proper component composition

2. **Global State:**
   - Use React Context API for global state
   - Don't rely on global variables

3. **Component Size:**
   - Break down large components into smaller ones
   - Group related components in folders

4. **File Naming:**
   - Be consistent with naming conventions
   - Use PascalCase for component files

## Checklist

- [ ] Set up new React project structure
- [ ] Determine component organization strategy
- [ ] Create folder structure for components, hooks, and contexts
- [ ] Migrate global configuration and settings
- [ ] Set up routing infrastructure
- [ ] Convert service layer to hooks and context
- [ ] Move assets and update references
- [ ] Ensure consistent naming conventions
- [ ] Check for circular dependencies