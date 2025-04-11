# AngularJS to React Conversion Prompts

This document contains a library of prompts designed to assist in converting AngularJS applications to React. These prompts are specifically tailored for transforming common AngularJS patterns, directives, and features into their React equivalents.

## Table of Contents

1. [Component Transformation Prompts](#component-transformation-prompts)
2. [Service Transformation Prompts](#service-transformation-prompts)
3. [Template and Directive Transformation Prompts](#template-and-directive-transformation-prompts)
4. [Data Binding Transformation Prompts](#data-binding-transformation-prompts)
5. [Routing Transformation Prompts](#routing-transformation-prompts)
6. [Animation Transformation Prompts](#animation-transformation-prompts)
7. [Project Structure Transformation Prompts](#project-structure-transformation-prompts)

## Component Transformation Prompts

### Basic Component Conversion

**Prompt:**
```
Convert the following AngularJS component to a React functional component with hooks. 
Ensure that you:
1. Transform the controller logic to React hooks
2. Convert the component's dependencies to appropriate React mechanisms
3. Handle any lifecycle methods properly

AngularJS component:
```
[PASTE ANGULARJS COMPONENT CODE HERE]
```
```

**Example - AngularJS Component:**
```javascript
'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
        this.phones = Phone.query();
        this.orderProp = 'age';
      }
    ]
  });
```

**Example - React Component:**
```jsx
import React, { useState, useEffect } from 'react';
import { usePhoneService } from '../services/PhoneService';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [orderProp, setOrderProp] = useState('age');
  const [query, setQuery] = useState('');
  const phoneService = usePhoneService();

  useEffect(() => {
    const fetchPhones = async () => {
      const data = await phoneService.query();
      setPhones(data);
    };
    fetchPhones();
  }, [phoneService]);

  // The rest of the component logic goes here
  
  return (
    <div className="container-fluid">
      {/* JSX template goes here */}
    </div>
  );
};

export default PhoneList;
```

### Component with Lifecycle Methods

**Prompt:**
```
Convert this AngularJS component with lifecycle hooks to a React functional component.
Pay special attention to:
1. Converting $onInit, $onChanges, $onDestroy to appropriate React hooks
2. Properly handling component inputs/bindings
3. Managing external resources and subscriptions

AngularJS component:
```
[PASTE ANGULARJS COMPONENT CODE HERE]
```
```

**Example - AngularJS Component:**
```javascript
angular.module('myApp').component('dataLoader', {
  bindings: {
    resourceId: '<',
    onDataLoaded: '&'
  },
  controller: ['DataService', '$timeout', 
    function(DataService, $timeout) {
      var ctrl = this;
      var timeoutPromise;
      
      this.$onInit = function() {
        console.log('Component initialized');
        this.loadData();
      };
      
      this.$onChanges = function(changesObj) {
        if (changesObj.resourceId) {
          this.loadData();
        }
      };
      
      this.loadData = function() {
        DataService.getData(this.resourceId).then(function(data) {
          ctrl.data = data;
          ctrl.onDataLoaded({data: data});
        });
      };
      
      this.$onDestroy = function() {
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }
        console.log('Component destroyed');
      };
    }
  ]
});
```

**Example - React Component:**
```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDataService } from '../services/DataService';

const DataLoader = ({ resourceId, onDataLoaded }) => {
  const [data, setData] = useState(null);
  const dataService = useDataService();
  const timeoutRef = useRef(null);
  
  // Equivalent to $onInit and $onChanges
  useEffect(() => {
    console.log('Component initialized or resourceId changed');
    
    const loadData = async () => {
      const result = await dataService.getData(resourceId);
      setData(result);
      if (onDataLoaded) {
        onDataLoaded(result);
      }
    };
    
    loadData();
    
    // Equivalent to $onDestroy
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      console.log('Component destroyed');
    };
  }, [resourceId, dataService, onDataLoaded]);
  
  return (
    <div className="data-loader">
      {data ? (
        <div className="data-content">{/* Render data */}</div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default DataLoader;
```
