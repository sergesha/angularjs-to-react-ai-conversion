# AngularJS Routing to React Router Conversion

## Initial Instructions

You are a specialized conversion assistant tasked with transforming AngularJS routing configurations to React Router. I will provide you with AngularJS routing code, and you will convert it to equivalent React Router configuration.

Your task:
1. Analyze the provided AngularJS routing setup (ngRoute or UI-Router)
2. Convert it to React Router v6 configuration
3. Preserve all routing functionality including parameters, guards, and nested routes
4. Follow React Router best practices
5. Explain any significant changes or design decisions

When converting, focus on:
- Transforming route configuration to component-based routes
- Converting route parameters and query string handling
- Replacing route resolves with data loading approaches
- Implementing authentication guards
- Preserving navigation behavior

Provide the converted React Router configuration and explain your conversion process.

## Core Concepts

| AngularJS (ngRoute/UI-Router) | React Router | Key Differences |
|-------------------------------|--------------|-----------------|
| $routeProvider | BrowserRouter + Routes | React Router uses component-based configuration |
| route templates | Route elements | React Router uses JSX elements for configuration |
| $stateProvider (UI-Router) | Nested routes | React Router v6 supports nested routes natively |
| resolve | Data loaders | React Router v6 uses loader functions for data fetching |
| templateUrl | Component | React uses components directly, not templates |
| $location | useNavigate, useLocation | React Router provides hooks for navigation |

## Basic Route Configuration

### AngularJS (ngRoute):
```javascript
angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/users/:id', {
        templateUrl: 'user-detail.html',
        controller: 'UserDetailController'
      })
      .otherwise({ redirectTo: '/' });
  }]);
```

### React Router (v6):
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Route Parameters

1. **Accessing route parameters:**

   **AngularJS:**
   ```javascript
   function UserController($routeParams) {
     this.userId = $routeParams.id;
   }
   ```

   **React Router:**
   ```javascript
   import { useParams } from 'react-router-dom';
   
   function UserDetail() {
     const { id } = useParams();
     // Use id parameter
   }
   ```

2. **Query parameters:**

   **AngularJS:**
   ```javascript
   function SearchController($location) {
     this.query = $location.search().q;
   }
   ```

   **React Router:**
   ```javascript
   import { useSearchParams } from 'react-router-dom';
   
   function Search() {
     const [searchParams] = useSearchParams();
     const query = searchParams.get('q');
     // Use query parameter
   }
   ```

## Navigation

1. **Programmatic navigation:**

   **AngularJS:**
   ```javascript
   function NavigationController($location) {
     this.goToUser = function(id) {
       $location.path('/users/' + id);
     };
   }
   ```

   **React Router:**
   ```javascript
   import { useNavigate } from 'react-router-dom';
   
   function Navigation() {
     const navigate = useNavigate();
     
     const goToUser = (id) => {
       navigate(`/users/${id}`);
     };
   }
   ```

2. **Link components:**

   **AngularJS:**
   ```html
   <a ng-href="/users/{{user.id}}">View {{user.name}}</a>
   ```

   **React Router:**
   ```jsx
   import { Link } from 'react-router-dom';
   
   <Link to={`/users/${user.id}`}>View {user.name}</Link>
   ```

## Data Loading and Resolving

1. **Route resolves:**

   **AngularJS:**
   ```javascript
   $routeProvider.when('/users/:id', {
     templateUrl: 'user-detail.html',
     controller: 'UserDetailController',
     resolve: {
       user: function($route, UserService) {
         return UserService.getUser($route.current.params.id);
       }
     }
   });
   ```

   **React Router v6:**
   ```jsx
   import { createBrowserRouter } from 'react-router-dom';
   
   const router = createBrowserRouter([
     {
       path: '/users/:id',
       element: <UserDetail />,
       loader: async ({ params }) => {
         return fetchUser(params.id);
       }
     }
   ]);
   
   // In component:
   import { useLoaderData } from 'react-router-dom';
   
   function UserDetail() {
     const user = useLoaderData();
     // user data is available
   }
   ```

## Nested Routes

1. **UI-Router nested states:**

   **AngularJS (UI-Router):**
   ```javascript
   $stateProvider
     .state('dashboard', {
       url: '/dashboard',
       templateUrl: 'dashboard.html'
     })
     .state('dashboard.overview', {
       url: '/overview',
       templateUrl: 'overview.html'
     });
   ```

   **React Router v6:**
   ```jsx
   <Routes>
     <Route path="/dashboard" element={<Dashboard />}>
       <Route path="overview" element={<Overview />} />
     </Route>
   </Routes>
   
   // In Dashboard.jsx:
   import { Outlet } from 'react-router-dom';
   
   function Dashboard() {
     return (
       <div>
         <h1>Dashboard</h1>
         <Outlet /> {/* Child routes render here */}
       </div>
     );
   }
   ```

## Route Guards

1. **Route protection:**

   **AngularJS:**
   ```javascript
   function authCheck($q, AuthService) {
     if (AuthService.isLoggedIn()) {
       return true;
     }
     return $q.reject('AUTH_REQUIRED');
   }
   
   $routeProvider.when('/admin', {
     templateUrl: 'admin.html',
     controller: 'AdminController',
     resolve: {
       auth: authCheck
     }
   });
   ```

   **React Router:**
   ```jsx
   function RequireAuth({ children }) {
     const { isAuthenticated } = useAuth();
     const location = useLocation();
     
     if (!isAuthenticated) {
       return <Navigate to="/login" state={{ from: location }} replace />;
     }
     
     return children;
   }
   
   <Routes>
     <Route path="/admin" element={
       <RequireAuth>
         <Admin />
       </RequireAuth>
     } />
   </Routes>
   ```

## Common Pitfalls

1. **Route matching:**
   - React Router matches routes differently than AngularJS
   - Exact matches are default in v6
   - Order of routes still matters

2. **Hash vs. Browser routing:**
   - Use HashRouter for hash-based navigation (#/route)
   - Use BrowserRouter for clean URLs (/route)
   - BrowserRouter requires server configuration

3. **Data loading:**
   - React Router doesn't block rendering during data loading
   - Use loaders or implement loading states manually

## Checklist

- [ ] Set up the React Router provider in your app
- [ ] Convert all route definitions to Route components
- [ ] Update route parameters access using useParams
- [ ] Convert programmatic navigation to useNavigate
- [ ] Replace a elements with Link components
- [ ] Implement authentication/guards if needed
- [ ] Add loading states for data-dependent routes
- [ ] Test all routes for correct navigation
