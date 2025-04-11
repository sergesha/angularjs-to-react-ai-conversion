# Service Transformation Prompts

## Basic Service Conversion

**Prompt:**
```
Convert the following AngularJS service to a React service using modern JavaScript patterns.
Ensure that you:
1. Transform AngularJS dependency injection to appropriate React/JavaScript mechanisms
2. Create appropriate hooks for consuming the service in React components
3. Handle any HTTP requests using fetch or axios

AngularJS service:
```
[PASTE ANGULARJS SERVICE CODE HERE]
```
```

**Example - AngularJS Service:**
```javascript
'use strict';

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

**Example - React Service with Custom Hook:**
```jsx
import axios from 'axios';

// Service implementation
const PhoneService = {
  getPhones: async () => {
    try {
      const response = await axios.get('phones/phones.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      return [];
    }
  },
  
  getPhone: async (phoneId) => {
    try {
      const response = await axios.get(`phones/${phoneId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone ${phoneId}:`, error);
      return null;
    }
  }
};

// Custom hook for components to consume the service
export const usePhoneService = () => {
  return PhoneService;
};

export default PhoneService;
```

## Stateful Service Conversion

**Prompt:**
```
Convert this stateful AngularJS service to a React Context Provider.
Focus on:
1. Converting service state to React Context
2. Providing methods to update the state
3. Creating a custom hook to access the context

AngularJS service:
```
[PASTE ANGULARJS SERVICE CODE HERE]
```
```

**Example - AngularJS Service:**
```javascript
angular.module('app').service('CartService', ['$rootScope', function($rootScope) {
  var service = this;
  this.items = [];
  this.totalPrice = 0;
  
  this.addItem = function(item) {
    service.items.push(item);
    service.updateTotalPrice();
    $rootScope.$broadcast('cart:updated', service.items);
  };
  
  this.removeItem = function(index) {
    service.items.splice(index, 1);
    service.updateTotalPrice();
    $rootScope.$broadcast('cart:updated', service.items);
  };
  
  this.updateTotalPrice = function() {
    service.totalPrice = service.items.reduce(function(total, item) {
      return total + item.price;
    }, 0);
  };
  
  this.clearCart = function() {
    service.items = [];
    service.totalPrice = 0;
    $rootScope.$broadcast('cart:updated', service.items);
  };
}]);
```

**Example - React Context and Hook:**
```jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Update total price whenever items change
  const updateTotalPrice = useCallback(() => {
    const newTotal = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(newTotal);
  }, [items]);
  
  // Add item to cart
  const addItem = useCallback((item) => {
    setItems((prevItems) => [...prevItems, item]);
    // We don't need to call updateTotalPrice here because items dependency will trigger it
  }, []);
  
  // Remove item from cart
  const removeItem = useCallback((index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
    // We don't need to call updateTotalPrice here because items dependency will trigger it
  }, []);
  
  // Clear the cart
  const clearCart = useCallback(() => {
    setItems([]);
    setTotalPrice(0);
  }, []);
  
  // Effect to update total price when items change
  React.useEffect(() => {
    updateTotalPrice();
  }, [items, updateTotalPrice]);
  
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
```