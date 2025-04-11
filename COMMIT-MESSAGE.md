# Reorganize Project Files for Better Structure

This commit reorganizes the project files to improve structure, maintainability, and clarity.

## Changes Made

### 1. Test-Related Files
- Moved all test specs to `tests/scripts/` directory
- Moved test results to `tests/results/` directory
- Updated Playwright configuration to match the new structure
- Combined test documentation into a single `TESTING-GUIDE.md` file

### 2. Prompt Library
- Consolidated all prompt files in the `prompt-library/` directory
- Created a combined testing prompts file
- Updated the prompt library index
- Removed duplicate prompts and empty directories

### 3. Documentation
- Moved all documentation files to the `docs/` directory
- Created a comprehensive conversion report
- Created a clear file organization document
- Updated the README to reflect the new structure

### 4. Configuration
- Updated package.json scripts to point to the new file locations
- Updated playwright.config.js to use the new test directory structure
- Added proper .gitignore to exclude node_modules

This reorganization improves project navigation, reduces duplication, and makes the repository more maintainable for future development.