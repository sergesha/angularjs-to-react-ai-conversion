# Service Conversion: AngularJS to React

This prompt guide focuses on converting AngularJS services, factories, and providers to React hooks and context.

## Basic Service Conversion

Use this prompt to convert standard AngularJS services to React custom hooks:

```
Convert this AngularJS service to a React custom hook:

[AngularJS Service Code]
```

### Example Conversion

**AngularJS Service:**

```javascript
angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('phones/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);
```

**React Hook:**

```jsx
import { useState, useCallback } from 'react';
import axios from 'axios';

export const usePhoneService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('phones/phones.json');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  }, []);

  const getPhone = useCallback(async (phoneId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`phones/${phoneId}.json`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  return {
    query,
    getPhone,
    loading,
    error
  };
};
```

## Stateful Service Conversion (Service with State)

Use this prompt to convert AngularJS services that maintain state to React Context:

```
Convert this stateful AngularJS service to a React Context Provider:

[AngularJS Service Code]
```

### Example Conversion

**AngularJS Stateful Service:**

```javascript
angular.module('app').service('CartService', [function() {
  var service = this;
  this.items = [];
  this.totalPrice = 0;
  
  this.addItem = function(item) {
    service.items.push(item);
    service.updateTotalPrice();
  };
  
  this.removeItem = function(index) {
    service.items.splice(index, 1);
    service.updateTotalPrice();
  };
  
  this.updateTotalPrice = function() {
    service.totalPrice = service.items.reduce(function(total, item) {
      return total + item.price;
    }, 0);
  };
  
  this.clearCart = function() {
    service.items = [];
    service.totalPrice = 0;
  };
}]);
```

**React Context and Hook:**

```jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Update total price whenever items change
  useEffect(() => {
    const newTotal = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(newTotal);
  }, [items]);
  
  // Add item to cart
  const addItem = useCallback((item) => {
    setItems(prevItems => [...prevItems, item]);
  }, []);
  
  // Remove item from cart
  const removeItem = useCallback((index) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  }, []);
  
  // Clear the cart
  const clearCart = useCallback(() => {
    setItems([]);
    setTotalPrice(0);
  }, []);
  
  // Value to provide
  const value = {
    items,
    totalPrice,
    addItem,
    removeItem,
    clearCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for consuming the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Usage Example:
// In your app entry point:
// <CartProvider>
//   <App />
// </CartProvider>

// In any component:
// const { items, addItem, removeItem } = useCart();
```

## Service with Dependencies

Use this prompt to convert AngularJS services with dependencies to React:

```
Convert this AngularJS service with dependencies to React:

[AngularJS Service Code]
```

### Example Conversion

**AngularJS Service with Dependencies:**

```javascript
angular.module('app').factory('UserService', ['$http', 'AuthService', 'CONFIG',
  function($http, AuthService, CONFIG) {
    var service = {};
    
    service.getUsers = function() {
      return $http.get(CONFIG.apiUrl + '/users', {
        headers: {
          'Authorization': 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
        return response.data;
      });
    };
    
    service.getUserById = function(userId) {
      return $http.get(CONFIG.apiUrl + '/users/' + userId, {
        headers: {
          'Authorization': 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
        return response.data;
      });
    };
    
    return service;
  }
]);
```

**React Service with Hooks:**

```jsx
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { CONFIG } from '../config';

export const useUserService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  
  const getAuthHeaders = useCallback(() => {
    return {
      'Authorization': `Bearer ${getToken()}`
    };
  }, [getToken]);
  
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${CONFIG.apiUrl}/users`, {
        headers: getAuthHeaders()
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  }, [getAuthHeaders]);
  
  const getUserById = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${CONFIG.apiUrl}/users/${userId}`, {
        headers: getAuthHeaders()
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, [getAuthHeaders]);
  
  return {
    getUsers,
    getUserById,
    loading,
    error
  };
};
```

## Service with Observables/Pub-Sub

Use this prompt to convert AngularJS services that use event broadcasting to React:

```
Convert this AngularJS service with event broadcasting/listening to React:

[AngularJS Service Code]
```

### Example Conversion

**AngularJS Service with Events:**

```javascript
angular.module('app').factory('NotificationService', ['$rootScope', function($rootScope) {
  var service = {};
  var notifications = [];
  
  service.addNotification = function(notification) {
    notifications.push(notification);
    $rootScope.$broadcast('notification:added', notification);
  };
  
  service.removeNotification = function(index) {
    var removed = notifications.splice(index, 1)[0];
    $rootScope.$broadcast('notification:removed', removed);
  };
  
  service.getNotifications = function() {
    return notifications;
  };
  
  return service;
}]);

// Usage in controller
angular.module('app').controller('SomeController', ['$scope', 'NotificationService', 
  function($scope, NotificationService) {
    $scope.$on('notification:added', function(event, notification) {
      console.log('New notification:', notification);
      // Update UI
    });
  }
]);
```

**React Context with Event Handlers:**

```jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [listeners, setListeners] = useState({
    'notification:added': [],
    'notification:removed': []
  });
  
  // Register event listener
  const addEventListener = useCallback((eventName, callback) => {
    setListeners(prev => ({
      ...prev,
      [eventName]: [...(prev[eventName] || []), callback]
    }));
    
    // Return function to remove listener
    return () => {
      setListeners(prev => ({
        ...prev,
        [eventName]: prev[eventName].filter(cb => cb !== callback)
      }));
    };
  }, []);
  
  // Trigger event
  const triggerEvent = useCallback((eventName, data) => {
    if (listeners[eventName]) {
      listeners[eventName].forEach(callback => callback(data));
    }
  }, [listeners]);
  
  // Add notification
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, notification]);
    triggerEvent('notification:added', notification);
  }, [triggerEvent]);
  
  // Remove notification
  const removeNotification = useCallback((index) => {
    setNotifications(prev => {
      const newNotifications = [...prev];
      const removed = newNotifications.splice(index, 1)[0];
      triggerEvent('notification:removed', removed);
      return newNotifications;
    });
  }, [triggerEvent]);
  
  // Context value
  const value = {
    notifications,
    addNotification,
    removeNotification,
    addEventListener
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for consuming the context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Usage in a component
const NotificationListener = () => {
  const { notifications, addEventListener } = useNotifications();
  
  useEffect(() => {
    // Register event listener
    const removeListener = addEventListener('notification:added', (notification) => {
      console.log('New notification:', notification);
      // Update UI or state as needed
    });
    
    // Clean up on unmount
    return removeListener;
  }, [addEventListener]);
  
  return (
    <div>
      <h3>Notifications ({notifications.length})</h3>
      {/* Rest of the component */}
    </div>
  );
};
```