# Project Structure Transformation Prompts

These prompts help convert an AngularJS application structure to React while maintaining a similar organization.

## Directory Structure Transformation

### Angular Structure to React Structure

```
AngularJS (angular-phonecat/app)                   React Equivalent
---------------------------------------------------------------------
app/                                               src/
├── core/                                          ├── core/
│   ├── checkmark/                                 │   ├── checkmark/
│   │   ├── checkmark.filter.js                    │   │   └── checkmark.js
│   │   └── checkmark.filter.spec.js               │   
│   ├── core.module.js                             │   └── index.js
│   └── phone/                                     │   └── phone/
│       ├── phone.module.js                        │       └── PhoneService.js
│       ├── phone.service.js                       
│       └── phone.service.spec.js                  
├── img/                                           ├── public/assets/img/
│   └── phones/                                    │   └── phones/
├── phone-detail/                                  ├── phone-detail/
│   ├── phone-detail.component.js                  │   ├── PhoneDetail.js
│   ├── phone-detail.component.spec.js             │   └── PhoneDetail.css
│   ├── phone-detail.module.js                     
│   └── phone-detail.template.html                 
├── phone-list/                                    ├── phone-list/
│   ├── phone-list.component.js                    │   ├── PhoneList.js
│   ├── phone-list.component.spec.js               │   └── PhoneList.css
│   ├── phone-list.module.js                       
│   └── phone-list.template.html                   
├── phones/                                        ├── public/assets/phones/
│   ├── phones.json                                │   ├── phones.json
│   └── [individual phone JSON files]              │   └── [individual phone JSON files]
├── app.animations.css                             ├── app.animations.css
├── app.animations.js                              ├── app.animations.js
├── app.config.js                                  ├── App.js (contains routing config)
├── app.css                                        ├── App.css
├── app.module.js                                  ├── index.js (setup)
└── index.html                                     └── public/index.html
```

## Prompt: Convert AngularJS Project Structure to React

When converting from AngularJS to React, maintain a similar directory structure to aid in the mental mapping between the two applications. Here's how to transform your directory structure:

1. Create a similar folder hierarchy in the `src` directory, keeping major component folders like 'phone-list' and 'phone-detail'
2. Create a 'core' folder for shared services and utilities
3. Convert AngularJS module files to appropriate React equivalents:
   - Component modules → React component files
   - Service modules → React service/hook files 
   - Filter modules → React utility functions
4. Move static assets (JSON data, images) to the public folder in React
5. Update import paths in all files to reflect the new structure

## Prompt: Converting Angular Module Declaration to React

In AngularJS:
```javascript
angular.module('phonecatApp', [
  'ngAnimate', 
  'ngRoute',
  'core',
  'phoneDetail',
  'phoneList'
]);
```

In React:
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './app.animations.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
```

## Prompt: Converting Angular Config to React Router

In AngularJS:
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

In React:
```javascript
// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import PhoneList from './phone-list/PhoneList';
import PhoneDetail from './phone-detail/PhoneDetail';

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
```
