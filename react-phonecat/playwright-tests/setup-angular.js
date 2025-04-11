// Script to set up the AngularJS app for testing
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the Angular application (assuming it's in the parent directory)
const angularAppPath = path.join(__dirname, '../../angular-phonecat');

// Check if the Angular app directory exists
if (!fs.existsSync(angularAppPath)) {
  console.error(`Angular app directory not found at ${angularAppPath}`);
  process.exit(1);
}

console.log('Setting up the AngularJS application...');

try {
  // Change to the Angular app directory
  process.chdir(angularAppPath);
  
  // Install dependencies (if not already installed)
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Start the Angular app
  console.log('Starting the AngularJS app...');
  execSync('npm start', { stdio: 'inherit' });
  
  console.log('AngularJS app is now running on http://localhost:8000/app/');
} catch (error) {
  console.error('Error setting up the AngularJS app:', error);
  process.exit(1);
}