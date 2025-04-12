# Project Structure Conversion: AngularJS to React

This guide provides prompts for converting an AngularJS project structure to a React project structure.

## Directory Structure Mapping

Use this prompt to map your AngularJS project structure to React:

```
Convert this AngularJS project structure to a React project structure:

[AngularJS Project Directory Listing]
```

### Example Directory Mapping

**AngularJS Project Structure:**

```
app/
├── core/
│   ├── checkmark/
│   │   ├── checkmark.filter.js
│   │   └── checkmark.filter.spec.js
│   ├── core.module.js
│   └── phone/
│       ├── phone.module.js
│       ├── phone.service.js
│       └── phone.service.spec.js
├── img/
│   └── phones/
├── phone-detail/
│   ├── phone-detail.component.js
│   ├── phone-detail.component.spec.js
│   ├── phone-detail.module.js
│   └── phone-detail.template.html
├── phone-list/
│   ├── phone-list.component.js
│   ├── phone-list.component.spec.js
│   ├── phone-list.module.js
│   └── phone-list.template.html
├── phones/
│   ├── phones.json
│   └── [individual phone JSON files]
├── app.animations.css
├── app.animations.js
├── app.config.js
├── app.css
├── app.module.js
└── index.html
```

**React Project Structure:**

```
public/
├── assets/
│   ├── img/
│   │   └── phones/
│   └── phones/
│       ├── phones.json
│       └── [individual phone JSON files]
├── index.html
├── favicon.ico
└── manifest.json

src/
├── components/
│   ├── PhoneDetail/
│   │   ├── PhoneDetail.js
│   │   ├── PhoneDetail.css
│   │   └── PhoneDetail.test.js
│   └── PhoneList/
│       ├── PhoneList.js
│       ├── PhoneList.css
│       └── PhoneList.test.js
├── services/
│   └── phone-service.js
├── utils/
│   └── checkmark.js
├── App.js
├── App.css
├── App.test.js
├── animations.css
├── index.js
└── index.css
```

## Files Conversion Guide

### 1. Convert Module Definitions

**AngularJS Module Definition:**

```javascript
// app.module.js
angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  'core',
  'phoneDetail',
  'phoneList'
]);
```

**React Equivalent (index.js):**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './animations.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Convert Component Structure

**AngularJS Component:**

```javascript
// phone-list/phone-list.component.js
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

**React Component:**

```jsx
// components/PhoneList/PhoneList.js
import React, { useState, useEffect } from 'react';
import { usePhoneService } from '../../services/phone-service';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [orderProp, setOrderProp] = useState('age');
  const phoneService = usePhoneService();

  useEffect(() => {
    const fetchPhones = async () => {
      const data = await phoneService.query();
      setPhones(data);
    };

    fetchPhones();
  }, [phoneService]);

  // Component logic...

  return (
    <div className="phone-list">
      {/* JSX template */}
    </div>
  );
};

export default PhoneList;
```

### 3. Convert Service Structure

**AngularJS Service:**

```javascript
// core/phone/phone.service.js
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

**React Service:**

```jsx
// services/phone-service.js
import { useState, useCallback } from 'react';
import axios from 'axios';

// Service implementation
const phoneServiceImplementation = {
  async query() {
    try {
      const response = await axios.get('/assets/phones/phones.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      return [];
    }
  },
  
  async getPhone(phoneId) {
    try {
      const response = await axios.get(`/assets/phones/${phoneId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone ${phoneId}:`, error);
      return null;
    }
  }
};

// Custom hook for components to consume the service
export const usePhoneService = () => {
  const [service] = useState(phoneServiceImplementation);
  return service;
};
```

## Assets Management

### Static Assets

In AngularJS, static assets are typically stored in the app directory and referenced directly. In React, move all static assets to the `public` folder:

- Images: `public/assets/img/`
- JSON data: `public/assets/phones/`
- Favicons: `public/`

### CSS Files

In AngularJS, CSS is often linked in the HTML or managed by the build system. In React:

1. Component-specific CSS: Place in the component directory with the same base name
2. Global CSS: Place in the src directory and import in index.js or App.js

## Testing Structure

Convert tests to the Jest/React Testing Library format and place them alongside the components they test:

```jsx
// components/PhoneDetail/PhoneDetail.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PhoneDetail from './PhoneDetail';
import { usePhoneService } from '../../services/phone-service';

// Mock the phone service
jest.mock('../../services/phone-service');

describe('PhoneDetail Component', () => {
  const mockPhone = {
    id: 'phone-1',
    name: 'Test Phone',
    description: 'A test phone',
    images: ['img1.png', 'img2.png']
  };

  beforeEach(() => {
    // Setup mock implementation
    usePhoneService.mockReturnValue({
      getPhone: jest.fn().mockResolvedValue(mockPhone)
    });
  });

  it('renders phone details', async () => {
    render(
      <MemoryRouter initialEntries={['/phones/phone-1']}>
        <Routes>
          <Route path="/phones/:phoneId" element={<PhoneDetail />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Test Phone')).toBeInTheDocument();
      expect(screen.getByText('A test phone')).toBeInTheDocument();
    });
  });
});
```

## Complete Project Setup

Use this prompt to create a comprehensive plan for converting from AngularJS to React:

```
Create a step-by-step plan for converting this AngularJS project to React:

[AngularJS Project Description]
```

### Example Conversion Plan

1. **Set up the React project structure**
   - Create a new React project using Create React App
   - Set up the directory structure (components, services, utils)
   - Configure routing with React Router

2. **Convert core services**
   - Convert the Phone service to React custom hooks
   - Set up data fetching with axios or fetch API
   - Create utility functions to replace AngularJS filters

3. **Convert components one by one**
   - Start with the PhoneList component
   - Move to the PhoneDetail component
   - Convert templates to JSX
   - Replace AngularJS directives with React patterns

4. **Set up routing**
   - Configure React Router to match AngularJS routes
   - Handle route parameters and navigation

5. **Add animations**
   - Use React Transition Group or React Spring
   - Match the original animation behavior

6. **Configure static assets**
   - Move images and JSON data to the public folder
   - Update file paths in components

7. **Set up testing**
   - Write tests for components and services
   - Ensure feature parity with original AngularJS app

8. **Final adjustments**
   - Review the app for any missed functionality
   - Optimize performance where needed
   - Add any missing features