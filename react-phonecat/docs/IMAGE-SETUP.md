# Image Setup Guide

To ensure images display correctly in the React Phone Catalog app, follow these steps to copy the image files from the original AngularJS application.

## Option 1: Using the Automated Script (Recommended)

We've provided a script that will automatically copy all the necessary files from the original AngularJS repository that we've cloned.

1. First, make sure you have the required dependencies:
   ```bash
   cd react-phonecat
   npm install fs-extra
   ```

2. Run the copy script:
   ```bash
   cd react-phonecat
   node src/copyImagesScript.js
   ```

This script will:
- Create all required directories
- Copy all phone images from the original app
- Copy all phone data JSON files
- Create a placeholder image for error handling

## Option 2: Manual Setup

If you prefer to manually set up the images and data files, follow these steps:

### Step 1: Create the necessary directories

Create the following directory structure in the `public` folder:

```
public/
└── assets/
    ├── img/
    │   └── phones/
    └── phones/
```

### Step 2: Copy the images

Copy all image files from the original AngularJS application's `app/img/phones/` directory to the React app's `public/assets/img/phones/` directory.

With our cloned repository, you can use:

```bash
mkdir -p react-phonecat/public/assets/img/phones
cp -r angular-phonecat/app/img/phones/* react-phonecat/public/assets/img/phones/
```

### Step 3: Create a placeholder image

Create a simple SVG placeholder image at `public/assets/img/phones/placeholder.svg` for handling missing images:

```svg
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#eee"/>
  <text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#999">Image Not Found</text>
</svg>
```

### Step 4: Copy the phone data JSON files

Copy all phone data JSON files to the assets directory:

```bash
mkdir -p react-phonecat/public/assets/phones
cp -r angular-phonecat/app/phones/* react-phonecat/public/assets/phones/
```

## Verifying the Setup

After completing these steps, your directory structure should include:

```
public/
└── assets/
    ├── img/
    │   └── phones/
    │       ├── dell-streak-7.0.jpg
    │       ├── dell-streak-7.1.jpg
    │       └── ... (all other phone images)
    └── phones/
        ├── phones.json
        ├── dell-streak-7.json
        └── ... (all other phone JSON files)
```

The application is configured to look for images and data in these locations.

## Troubleshooting

If images aren't displaying correctly:

1. Check that the file paths are correct
2. Verify that the files were copied to the right locations
3. Check the browser console for any errors
4. Make sure the PhoneService.getImageUrl() function is being used to generate image URLs
