// PhoneService.js - This service replaces the $http functionality from AngularJS
const PhoneService = {
  // Get all phones
  getPhones: async () => {
    try {
      console.log('Fetching phones from API...');
      // Direct path to the JSON file in the public folder
      const response = await fetch('/assets/phones/phones.json');
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Get the text content first
      const textContent = await response.text();
      
      // Clean the text content to fix any invalid control characters
      const cleanedText = textContent
        .replace(/[\r\n]+/g, ' ') // Replace carriage returns and newlines with space
        .replace(/\t/g, ' ')      // Replace tabs with space
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control chars
      
      // Parse the cleaned JSON
      try {
        const data = JSON.parse(cleanedText);
        console.log('Phone data received:', data);
        
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error('Received data is not an array:', data);
          return [];
        }
      } catch (parseError) {
        console.error('Error parsing phones JSON:', parseError);
        console.log('Using hardcoded phone data as fallback');
        
        // Fallback to hardcoded data if JSON parsing fails
        return [
          {
            "age": 0,
            "id": "motorola-xoom-with-wi-fi",
            "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
            "name": "Motorola XOOM™ with Wi-Fi",
            "snippet": "The Next, Next Generation\n\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
          },
          {
            "age": 1,
            "id": "motorola-xoom",
            "imageUrl": "img/phones/motorola-xoom.0.jpg",
            "name": "MOTOROLA XOOM™",
            "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
          }
        ];
      }
    } catch (error) {
      console.error('Error fetching phones:', error);
      console.log('Using hardcoded fallback data');
      
      // Fallback to hardcoded data if fetch fails
      return [
        {
          "age": 0,
          "id": "motorola-xoom-with-wi-fi",
          "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
          "name": "Motorola XOOM™ with Wi-Fi",
          "snippet": "The Next, Next Generation\n\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
        },
        {
          "age": 1,
          "id": "motorola-xoom",
          "imageUrl": "img/phones/motorola-xoom.0.jpg",
          "name": "MOTOROLA XOOM™",
          "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
        }
      ];
    }
  },

  // Get a specific phone by ID
  getPhone: async (phoneId) => {
    try {
      console.log(`Fetching phone with ID: ${phoneId}`);
      const response = await fetch(`/assets/phones/${phoneId}.json`);
      
      console.log(`Phone ${phoneId} response status:`, response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Get the text content first
      const textContent = await response.text();
      
      // Clean the text content to fix any invalid control characters
      const cleanedText = textContent
        .replace(/[\r\n]+/g, ' ') // Replace carriage returns and newlines with space
        .replace(/\t/g, ' ')      // Replace tabs with space
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control chars
      
      // Parse the cleaned JSON
      try {
        const data = JSON.parse(cleanedText);
        console.log(`Phone ${phoneId} data received:`, data);
        return data;
      } catch (parseError) {
        console.error(`Error parsing phone ${phoneId} JSON:`, parseError);
        
        // Create a fallback phone object with minimal data
        return {
          id: phoneId,
          name: "Phone Details Unavailable",
          description: "Sorry, we couldn't load the details for this phone.",
          images: []
        };
      }
    } catch (error) {
      console.error(`Error fetching phone ${phoneId}:`, error);
      
      // Create a fallback phone object with minimal data
      return {
        id: phoneId,
        name: "Phone Details Unavailable",
        description: "Sorry, we couldn't load the details for this phone.",
        images: []
      };
    }
  },

  // Helper function to get correct image URL path
  getImageUrl: (imageUrl) => {
    if (!imageUrl) return '/assets/img/phones/placeholder.svg';

    // Handle different image path formats
    if (imageUrl.startsWith('/')) {
      // Absolute path from root
      return imageUrl;
    } else if (imageUrl.startsWith('img/phones/')) {
      // Path from original Angular app format - common in phone list
      return `/assets/${imageUrl}`;
    } else if (imageUrl.startsWith('img/')) {
      // Path relative to assets folder - might be used in some contexts
      return `/assets/${imageUrl}`;
    } else if (/^phones\/.*\.jpg$/.test(imageUrl)) {
      // Format like "phones/motorola-xoom-with-wi-fi.0.jpg" from the original app
      return `/assets/img/${imageUrl}`;
    } else {
      // Other paths, assume relative to assets/img/phones
      // This handles cases like "motorola-xoom-with-wi-fi.0.jpg" in phone details
      return `/assets/img/phones/${imageUrl}`;
    }
  }
};

export default PhoneService;