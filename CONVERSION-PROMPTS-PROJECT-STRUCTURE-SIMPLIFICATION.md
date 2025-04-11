# Project Structure Simplification Prompts

These prompts help refine the project structure after initial conversion from AngularJS to React.

## Prompt: Simplify Project Structure to React Standards

When initially converting from AngularJS to React, you might have created a structure that closely mirrors the AngularJS application. However, it's often beneficial to adjust toward React conventions for better maintainability.

Consider these adjustments:

1. Keep all source code in the `/src` directory rather than creating an `/app` directory
2. Maintain the component organization from AngularJS (e.g., keep `/phone-list`, `/phone-detail`, `/core`)
3. Update import paths throughout the application to reflect the new structure
4. Keep static assets in the `/public` directory following React conventions

## Prompt: Updating Import Paths After Restructuring

After simplifying your project structure, you'll need to update import paths. Here's a systematic approach:

1. Identify all files that need updating (components, services, utilities)
2. Update import statements to reflect the new paths
3. Check for and fix any broken references

Example change:

```javascript
// Before
import PhoneService from '../../app/core/phone/PhoneService';

// After
import PhoneService from '../../core/phone/PhoneService';
// or
import { PhoneService } from '../../core';
```

## Prompt: Creating Barrel Files for Clean Imports

Consider creating barrel files (index.js) in key directories to simplify imports:

```javascript
// src/core/index.js
export { default as checkmark } from './checkmark/checkmark';
export { default as PhoneService } from './phone/PhoneService';
```

This allows for cleaner imports elsewhere:

```javascript
// Before
import PhoneService from '../../core/phone/PhoneService';
import checkmark from '../../core/checkmark/checkmark';

// After
import { PhoneService, checkmark } from '../../core';
```

## Prompt: Verifying Structure After Refactoring

After restructuring, verify that:

1. All components render correctly
2. All data fetching works properly
3. Navigation and routing function as expected
4. Static assets (images, JSON files) are correctly referenced
5. Build process completes successfully

Run through the application's key user flows to ensure everything is working properly after the structure changes.