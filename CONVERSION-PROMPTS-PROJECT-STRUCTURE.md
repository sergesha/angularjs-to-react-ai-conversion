# Project Structure Transformation Prompts

## AngularJS to React Project Structure

**Prompt:**
```
Convert this AngularJS project structure to a React application structure.
Focus on:
1. Organizing components, services, and utilities
2. Setting up a modular folder structure
3. Converting module dependencies to proper imports

AngularJS project structure:
```
[PASTE ANGULARJS PROJECT STRUCTURE HERE]
```
```

**Example - AngularJS Project Structure:**
```
app/
├── app.config.js
├── app.module.js
├── core/
│   ├── core.module.js
│   ├── phone/
│   │   ├── phone.module.js
│   │   └── phone.service.js
│   └── checkmark/
│       ├── checkmark.filter.js
│       └── checkmark.module.js
├── phone-detail/
│   ├── phone-detail.component.js
│   ├── phone-detail.module.js
│   └── phone-detail.template.html
├── phone-list/
│   ├── phone-list.component.js
│   ├── phone-list.module.js
│   └── phone-list.template.html
└── index.html
```

**Example - React Project Structure:**
```
src/
├── index.js              # Entry point
├── index.css             # Global styles
├── App.js                # Main App component with routing
├── App.css               # App-specific styles
├── components/           # Reusable components
│   ├── PhoneDetail/
│   │   ├── PhoneDetail.js
│   │   └── PhoneDetail.css
│   └── PhoneList/
│       ├── PhoneList.js
│       └── PhoneList.css
├── services/             # Services and API calls
│   └── PhoneService.js
├── utils/                # Utility functions
│   └── checkmark.js
├── context/              # React context (if needed)
│   └── PhoneContext.js
└── assets/               # Static assets
    └── images/
```

## Module to Component Transformation

**Prompt:**
```
Convert this AngularJS module system to React's component-based architecture.
Focus on:
1. Transforming module dependencies to import statements
2. Converting module registration to component exports
3. Handling shared dependencies

AngularJS module:
```
[PASTE ANGULARJS MODULE CODE HERE]
```
```

**Example - AngularJS Module System:**
```javascript
// app.module.js
'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  'core',
  'phoneDetail',
  'phoneList'
]);

// core.module.js
'use strict';

// Define the `core` module
angular.module('core', ['core.phone']);

// core.phone.module.js
'use strict';

// Define the `core.phone` module
angular.module('core.phone', ['ngResource']);

// phone-list.module.js
'use strict';

// Define the `phoneList` module
angular.module('phoneList', ['core.phone']);
```

**Example - React Component Organization:**
```jsx
// index.js - Main entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// App.js - Main component with routing
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/phones" replace />} />
        <Route path="/phones" element={<PhoneList />} />
        <Route path="/phones/:phoneId" element={<PhoneDetail />} />
      </Routes>
    </div>
  );
}

export default App;

// components/PhoneList/PhoneList.js - Component that depends on services
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneService from '../../services/PhoneService';
import './PhoneList.css';

const PhoneList = () => {
  // Component implementation
};

export default PhoneList;
```

## Config to Context Transformation

**Prompt:**
```
Convert this AngularJS configuration to React Context or global configuration.
Focus on:
1. Transforming AngularJS config blocks to React configuration
2. Setting up global state or context where needed
3. Handling environment-specific configuration

AngularJS config:
```
[PASTE ANGULARJS CONFIG CODE HERE]
```
```

**Example - AngularJS Configuration:**
```javascript
'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]).
  config(['$httpProvider',
    function($httpProvider) {
      // Add interceptor for API calls
      $httpProvider.interceptors.push('apiInterceptor');
      // Set default content type
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    }
  ]);

// Interceptor Service
angular.module('phonecatApp').factory('apiInterceptor', ['$q', 'API_URL', 
  function($q, API_URL) {
    return {
      request: function(config) {
        // Add API URL to all API requests
        if (config.url.indexOf('api/') === 0) {
          config.url = API_URL + config.url;
        }
        return config;
      },
      responseError: function(rejection) {
        // Handle global errors
        console.error('API error:', rejection);
        return $q.reject(rejection);
      }
    };
  }
]);

// Constants
angular.module('phonecatApp').constant('API_URL', 'https://api.example.com/v1/');
```

**Example - React Configuration with Context:**
```jsx
// config.js - Configuration constants
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com/v1/';

// context/ApiContext.js - API context provider
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

// Create API client with interceptors
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
apiClient.interceptors.request.use(
  config => {
    // You can modify the request here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle global errors
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

// Create context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic API call method with loading and error handling
  const apiCall = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient({
        method,
        url: endpoint,
        data
      });
      return response.data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    get: (endpoint) => apiCall('get', endpoint),
    post: (endpoint, data) => apiCall('post', endpoint, data),
    put: (endpoint, data) => apiCall('put', endpoint, data),
    delete: (endpoint) => apiCall('delete', endpoint),
    loading,
    error
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook for using the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

// App.js - Wrap application with providers
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <AppRoutes />
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;

// Using the API in components
import React, { useEffect, useState } from 'react';
import { useApi } from '../../context/ApiContext';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const api = useApi();
  
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const data = await api.get('phones');
        setPhones(data);
      } catch (error) {
        // Component-specific error handling
      }
    };
    
    fetchPhones();
  }, [api]);
  
  return (
    <div>
      {api.loading && <div>Loading...</div>}
      {api.error && <div>Error: {api.error}</div>}
      {/* Render phones */}
    </div>
  );
};

export default PhoneList;
```