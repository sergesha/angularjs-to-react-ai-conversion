# React PhoneCat Restructuring Plan

## Directory Structure Changes

1. Rename component directories to match Angular naming:
   - `src/components/PhoneList` → `src/phone-list`
   - `src/components/PhoneDetail` → `src/phone-detail`

2. Move utility files:
   - `src/utils/checkmark.js` → `src/core/checkmark/checkmark.js`

3. Move service files:
   - `src/services/PhoneService.js` → `src/core/phone/PhoneService.js`

4. Update import paths in all affected files

5. Create core module file:
   - Create `src/core/index.js` to export all core utilities

## File Content Updates

1. Update App.js import paths:
```javascript
// Old
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';

// New
import PhoneList from './phone-list/PhoneList';
import PhoneDetail from './phone-detail/PhoneDetail';
```

2. Update PhoneList.js service import:
```javascript
// Old
import PhoneService from '../../services/PhoneService';

// New
import PhoneService from '../core/phone/PhoneService';
```

3. Update PhoneDetail.js service import:
```javascript
// Old
import PhoneService from '../../services/PhoneService';

// New
import PhoneService from '../core/phone/PhoneService';
```