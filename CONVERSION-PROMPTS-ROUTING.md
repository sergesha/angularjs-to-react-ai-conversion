# Routing Transformation Prompts

## Basic Routing Conversion

**Prompt:**
```
Convert this AngularJS routing configuration to React Router.
Focus on:
1. Transforming ngRoute/ui-router paths to React Router routes
2. Converting route parameters
3. Handling nested routes if present

AngularJS routing:
```
[PASTE ANGULARJS ROUTING CONFIG HERE]
```
```

**Example - AngularJS Routing (ngRoute):**
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

**Example - React Router:**
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

## Advanced Routing with Params and Guards

**Prompt:**
```
Convert this advanced AngularJS routing configuration to React Router,
including route parameters, guards, and resolvers.

AngularJS routing:
```
[PASTE ANGULARJS ROUTING CONFIG HERE]
```
```

**Example - AngularJS Routing with Guards and Resolvers:**
```javascript
angular.module('app').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard.html',
      controller: 'DashboardCtrl',
      resolve: {
        user: ['AuthService', function(AuthService) {
          return AuthService.getCurrentUser();
        }]
      }
    })
    .state('userDetails', {
      url: '/users/:userId',
      templateUrl: 'user-details.html',
      controller: 'UserDetailsCtrl',
      resolve: {
        userDetails: ['$stateParams', 'UserService', function($stateParams, UserService) {
          return UserService.getUser($stateParams.userId);
        }]
      },
      data: {
        requiresAuth: true,
        roles: ['admin']
      }
    });
}])
.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.data && toState.data.requiresAuth) {
      if (!AuthService.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      } else if (toState.data.roles && !AuthService.hasRole(toState.data.roles)) {
        event.preventDefault();
        $state.go('forbidden');
      }
    }
  });
}]);
```

**Example - React Router with Private Routes and Data Fetching:**
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import UserService from './services/UserService';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const isAuthenticated = () => !!user;
  
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.some(role => user.roles.includes(role));
  };
  
  const value = {
    user,
    isAuthenticated,
    hasRole,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Private Route component
const PrivateRoute = ({ element, requiredRoles }) => {
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/forbidden" replace />;
  }
  
  return element;
};

// UserDetails component with data loading
const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userData = await UserService.getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserDetails();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      {/* User details rendering */}
    </div>
  );
};

// Main Router
const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
            path="/users/:userId" 
            element={
              <PrivateRoute 
                element={<UserDetails />} 
                requiredRoles={['admin']} 
              />
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