import axios from 'axios';

// We'll use axios instead of $resource from AngularJS
const api = axios.create({
  baseURL: './assets/', // We'll move the json files to public/assets
  headers: {
    'Content-Type': 'application/json',
  },
});

const PhoneService = {
  // Get all phones
  getPhones: async () => {
    try {
      const response = await api.get('phones/phones.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      return [];
    }
  },

  // Get a specific phone by ID
  getPhone: async (phoneId) => {
    try {
      const response = await api.get(`/phones/${phoneId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone ${phoneId}:`, error);
      return null;
    }
  },
};

export default PhoneService;
