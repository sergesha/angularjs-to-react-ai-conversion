# AngularJS to React Conversion - Project Structure Prompt

## Context
AngularJS applications typically follow a specific file and folder structure. When converting to React, it's beneficial to maintain a similar structure to make the transition clearer and help developers familiar with the original application navigate the new codebase.

## Prompt

Analyze the following AngularJS project structure and create a corresponding React project structure that maintains the same organizational principles while adapting to React conventions.

```
app/
├── app.animations.css
├── app.animations.js
├── app.config.js
├── app.css
├── app.module.js
├── core/
│   ├── checkmark/
│   │   └── checkmark.filter.js
│   ├── core.module.js
│   ├── phone/
│   │   ├── phone.module.js
│   │   └── phone.service.js
├── img/
│   └── phones/
│       └── [phone images]
├── index.html
├── phone-detail/
│   ├── phone-detail.component.js
│   ├── phone-detail.module.js
│   └── phone-detail.template.html
├── phone-list/
│   ├── phone-list.component.js
│   ├── phone-list.module.js
│   └── phone-list.template.html
└── phones/
    ├── phones.json
    └── [individual phone JSON files]
```

Create a React project structure that:
1. Respects React's component-based approach
2. Maintains similar directory organization
3. Follows React best practices
4. Preserves the logical grouping of related files

## Response Template

```
src/
├── core/
│   ├── checkmark/
│   │   └── [React equivalent files]
│   ├── phone/
│   │   └── [React equivalent files]
│   └── [Other core utilities]
├── phone-detail/
│   └── [React equivalent files]
├── phone-list/
│   └── [React equivalent files]
├── phones/
│   └── [Data files]
├── App.js
├── App.css
├── app.animations.css
└── index.js

public/
├── img/
│   └── phones/
│       └── [phone images]
└── phones/
    └── [individual phone JSON files]
```

## Additional Instructions

1. Organize React components into corresponding folders that match the AngularJS structure
2. Place shared utilities and services in the core folder
3. Use appropriate file extensions (.js, .jsx, .css)
4. Implement proper imports between files
5. Handle static assets appropriately in the public directory
6. Keep data files in a location that makes them accessible to components
7. Create index.js files in directories to simplify imports

## Mapping Approach

| AngularJS Concept | React Equivalent |
|-------------------|------------------|
| Module JS files | Index.js exports |
| Component JS | Function components |
| Templates | JSX within components |
| Filters | Utility functions |
| Services | Custom hooks |
| Config | App configuration |
| CSS | CSS/SCSS modules or styled-components |

## Example Mapping

### AngularJS Component and Template:
```javascript
// phone-list.component.js
angular.module('phoneList').component('phoneList', {
  templateUrl: 'phone-list/phone-list.template.html',
  controller: ['Phone', function(Phone) {
    this.phones = Phone.query();
    this.orderProp = 'age';
  }]
});

// phone-list.template.html
<div class="container-fluid">
  <div class="row">
    <!-- template content -->
  </div>
</div>
```

### React Equivalent:
```javascript
// phone-list/PhoneList.js
import React, { useState, useEffect } from 'react';
import { usePhoneService } from '../core/phone/usePhoneService';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [orderProp, setOrderProp] = useState('age');
  const phoneService = usePhoneService();
  
  useEffect(() => {
    phoneService.getAll().then(data => setPhones(data));
  }, [phoneService]);
  
  return (
    <div className="container-fluid">
      <div className="row">
        {/* JSX content */}
      </div>
    </div>
  );
};

export default PhoneList;
```