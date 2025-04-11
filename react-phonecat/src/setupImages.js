// This script is used to set up the structure for phone images
// It's only for development purposes and should be run once

const fs = require('fs');
const path = require('path');

// Create the directory structure
const imgDir = path.join(__dirname, '../public/assets/img/phones');

// Create directories if they don't exist
if (!fs.existsSync(path.join(__dirname, '../public/assets'))) {
  fs.mkdirSync(path.join(__dirname, '../public/assets'));
}

if (!fs.existsSync(path.join(__dirname, '../public/assets/img'))) {
  fs.mkdirSync(path.join(__dirname, '../public/assets/img'));
}

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir);
}

console.log('Directory structure created.');
console.log('Please copy phone images to:', imgDir);
console.log('Images should follow the pattern: [phone-id].0.jpg, [phone-id].1.jpg, etc.');