/**
 * This script copies all necessary image and data files from the original AngularJS app
 * to the React app's public directory.
 * 
 * To use this script:
 * 1. Install fs-extra: npm install fs-extra
 * 2. Run with: node src/copyImagesScript.js
 */

const fs = require('fs-extra');
const path = require('path');

// Configure these paths as needed - the absolute path from the project root
const SOURCE_DIR = path.resolve(__dirname, '../../../angular-phonecat/app'); 
const TARGET_DIR = path.resolve(__dirname, '../public/assets');

console.log('Starting copy process...');
console.log('Source directory:', SOURCE_DIR);
console.log('Target directory:', TARGET_DIR);

// Check if source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`ERROR: Source directory does not exist: ${SOURCE_DIR}`);
  console.log('Please check the path to the angular-phonecat repository');
  process.exit(1);
}

// Check if specific source paths exist
const phonesImgPath = path.join(SOURCE_DIR, 'img/phones');
const phonesDataPath = path.join(SOURCE_DIR, 'phones');

if (!fs.existsSync(phonesImgPath)) {
  console.error(`ERROR: Phone images directory does not exist: ${phonesImgPath}`);
  process.exit(1);
}

if (!fs.existsSync(phonesDataPath)) {
  console.error(`ERROR: Phone data directory does not exist: ${phonesDataPath}`);
  process.exit(1);
}

// Ensure target directories exist
console.log('Creating target directories...');
fs.ensureDirSync(path.join(TARGET_DIR, 'img/phones'));
fs.ensureDirSync(path.join(TARGET_DIR, 'phones'));

// Copy phone images
console.log('Copying phone images...');
try {
  fs.copySync(
    phonesImgPath,
    path.join(TARGET_DIR, 'img/phones')
  );
  console.log('Phone images copied successfully.');
  
  // List some of the copied files for verification
  const copiedFiles = fs.readdirSync(path.join(TARGET_DIR, 'img/phones')).slice(0, 5);
  console.log('Sample of copied images:', copiedFiles);
} catch (err) {
  console.error('Error copying phone images:', err);
}

// Copy phone data files
console.log('Copying phone data files...');
try {
  fs.copySync(
    phonesDataPath,
    path.join(TARGET_DIR, 'phones')
  );
  console.log('Phone data files copied successfully.');
  
  // List some of the copied data files for verification
  const copiedDataFiles = fs.readdirSync(path.join(TARGET_DIR, 'phones')).slice(0, 5);
  console.log('Sample of copied data files:', copiedDataFiles);
} catch (err) {
  console.error('Error copying phone data files:', err);
}

// Create a placeholder image if it doesn't exist
const placeholderPath = path.join(TARGET_DIR, 'img/phones/placeholder.svg');
if (!fs.existsSync(placeholderPath)) {
  console.log('Creating placeholder image...');
  const placeholderSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#eee"/>
  <text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#999">Image Not Found</text>
</svg>`;
  
  try {
    fs.writeFileSync(placeholderPath, placeholderSvg);
    console.log('Placeholder image created successfully.');
  } catch (err) {
    console.error('Error creating placeholder image:', err);
  }
}

console.log('Setup complete! Your React app is now ready to use the original AngularJS app\'s images and data.');
