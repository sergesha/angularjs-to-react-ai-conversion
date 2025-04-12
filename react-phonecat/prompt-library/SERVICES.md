# AngularJS Service to React Hook/Context Conversion

## Initial Instructions

You are a specialized conversion assistant tasked with transforming AngularJS services into React hooks and context. I will provide you with AngularJS service code, and you will convert it to equivalent React implementations.

Your task:
1. Analyze the provided AngularJS service code
2. Convert it to appropriate React patterns (custom hooks and/or Context API)
3. Preserve all functionality and behavior
4. Follow React best practices for state management and side effects
5. Explain any significant changes or design decisions

When converting, focus on:
- Transforming dependency injection to imports and composition
- Converting services to hooks for local state or Context for shared state
- Replacing $http with fetch or axios
- Converting promise chains to async/await
- Ensuring proper error handling and loading states

Provide the converted React hook/context code and explain your conversion process.

## Core Concepts

| AngularJS | React | Key Differences |
|-----------|-------|-----------------|
| Services | Custom Hooks / Context | React has no built-in DI system |
| Providers | Context Providers | React Context provides values to component tree |
| Factories | Factory Functions | Plain JS functions that create objects/state |
| $http | fetch / axios | React apps typically use fetch or libraries |
| $q promises | async/await | Modern JS uses native Promises and async/await |

## Service to Hook Conversion

1. **Basic service conversion:**
   - Convert service methods to exported functions
   - Or create custom hooks that return methods
   - Replace dependency injection with imports

2. **API service conversion:**
   - Replace $http with fetch/axios
   - Convert promise chains (.then) to async/await
   - Handle errors explicitly with try/catch

3. **State management services:**
   - Convert to Context + useReducer
   - Or use third-party state management (Redux, Zustand)
   - Provide state and dispatch through Context

## Example: Data Service Conversion

**AngularJS Service:**
```javascript
// Simplified example
angular.module('myApp').service('DataService', ['$http', 
  function($http) {
    this.getData = function() {
      return $http.get('/api/data').then(function(response) {
        return response.data;
      });
    };
    
    this.saveData = function(data) {
      return $http.post('/api/data', data);
    };
  }
]);
```

**React Custom Hook:**
```javascript
// Equivalent React hook
import { useState } from 'react';

export const useDataService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const saveData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { 
    getData, 
    saveData, 
    loading, 
    error 
  };
};
```

## Context API for Shared Services

1. **Create context:**
   - Define context with default values
   - Create provider component with state
   - Export context and provider

2. **Provide service:**
   - Wrap components with provider
   - Implement state logic in provider
   - Pass service methods/data via value prop

3. **Consume service:**
   - Use useContext in components
   - Or create custom hooks that use context

## Example: Service to Context Conversion

```javascript
// Create context for a service
import React, { createContext, useState, useContext } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      // API call logic here
      const userData = await fetchUserData(credentials);
      setUser(userData);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook for consuming
export const useAuth = () => useContext(AuthContext);
```

## Common Pitfalls

1. **Service Initialization:**
   - React hooks can't be called conditionally
   - Initialize services in providers or component top level
   - Consider lazy initialization for expensive operations

2. **Cross-cutting concerns:**
   - Authentication can use Context + useReducer
   - Logging can use a higher-order component
   - API interceptors need to be set up at root level

3. **Service dependencies:**
   - Compose hooks/contexts instead of injecting
   - Use function composition for utility services
   - Consider a dependency container for complex apps

## Checklist

- [ ] Identify all services used in the application
- [ ] Convert API services to custom hooks or functions
- [ ] Implement shared services as Context providers
- [ ] Update components to use hooks instead of DI
- [ ] Test service functionality in isolation
- [ ] Check for proper error handling
- [ ] Ensure services are properly memoized if needed
