# Routing Conversion: AngularJS to React Router

This prompt guide focuses on converting AngularJS routing configurations to React Router.

## Basic Routing Conversion

Use this prompt to convert basic AngularJS routing to React Router:

```
Convert this AngularJS routing configuration to React Router:

[AngularJS Routing Code]
```

### Example Conversion

**AngularJS ngRoute:**

```javascript
angular.
  module('phonecatApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);
```

**React Router:**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/phones" element={<PhoneList />} />
        <Route path="/phones/:phoneId" element={<PhoneDetail />} />
        <Route path="/" element={<Navigate to="/phones" replace />} />
        <Route path="*" element={<Navigate to="/phones" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
```

## Route Parameters Conversion

Use this prompt to handle route parameters in React Router:

```
Convert this AngularJS route with parameters to React Router:

[AngularJS Route Code]
```

### Example Conversion

**AngularJS Controller with Route Params:**

```javascript
angular.module('phoneDetail').component('phoneDetail', {
  templateUrl: 'phone-detail/phone-detail.template.html',
  controller: ['$routeParams', 'Phone',
    function PhoneDetailController($routeParams, Phone) {
      var self = this;
      self.phoneId = $routeParams.phoneId;
      
      Phone.get({phoneId: self.phoneId}, function(phone) {
        self.phone = phone;
        self.setImage(phone.images[0]);
      });
      
      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };
    }
  ]
});
```

**React Component with useParams:**

```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePhoneService } from '../services/PhoneService';
import './PhoneDetail.css';

const PhoneDetail = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const phoneService = usePhoneService();
  
  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const data = await phoneService.getPhone(phoneId);
        setPhone(data);
        if (data.images && data.images.length > 0) {
          setMainImageUrl(data.images[0]);
        }
      } catch (error) {
        console.error('Error fetching phone:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhone();
  }, [phoneId, phoneService]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!phone) {
    return <div>Phone not found</div>;
  }
  
  return (
    <div className="phone-detail">
      <div className="phone-images">
        <img src={mainImageUrl} alt={phone.name} className="main-image" />
        <ul className="phone-thumbs">
          {phone.images.map((img, index) => (
            <li key={index}>
              <img 
                src={img} 
                alt={`${phone.name} thumbnail ${index}`} 
                onClick={() => setMainImageUrl(img)}
              />
            </li>
          ))}
        </ul>
      </div>
      
      <h1>{phone.name}</h1>
      <p>{phone.description}</p>
      
      {/* Additional phone details rendering */}
    </div>
  );
};

export default PhoneDetail;
```

## Nested Routes Conversion

Use this prompt to convert AngularJS nested routes to React Router:

```
Convert these nested AngularJS routes to React Router:

[AngularJS Nested Routes Code]
```

### Example Conversion

**AngularJS Nested Routes (ui-router):**

```javascript
angular.module('app').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: 'admin/admin.html',
      controller: 'AdminCtrl'
    })
    .state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: 'admin/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .state('admin.users', {
      url: '/users',
      templateUrl: 'admin/users.html',
      controller: 'UsersCtrl'
    })
    .state('admin.users.detail', {
      url: '/:userId',
      templateUrl: 'admin/user-detail.html',
      controller: 'UserDetailCtrl'
    });
}]);
```

**React Router Nested Routes:**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';
import UserDetail from './components/Admin/UserDetail';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

// AdminLayout.jsx serves as the parent component
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header>
        <h1>Admin Panel</h1>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </header>
      
      <main>
        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  );
};
```

## Route Guards / Auth Protection

Use this prompt to convert AngularJS route guards to React Router:

```
Convert this AngularJS route with authentication/guards to React Router:

[AngularJS Route Guard Code]
```

### Example Conversion

**AngularJS with Route Guards:**

```javascript
angular.module('app')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          auth: ['AuthService', function(AuthService) {
            return AuthService.isAuthenticated();
          }]
        }
      });
  }])
  .run(['$rootScope', '$state', 'AuthService', 
    function($rootScope, $state, AuthService) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.resolve && toState.resolve.auth && !AuthService.isAuthenticated()) {
          event.preventDefault();
          $state.go('login');
        }
      });
    }
  ]);
```

**React Router with Protected Routes:**

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  useLocation 
} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated (e.g., check token in localStorage)
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  
  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Main Router
const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
```