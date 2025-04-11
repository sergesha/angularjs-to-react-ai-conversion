import phonesData from '../../phones/phones.json';

export const PhoneService = {
  getAll: async () => {
    // Simulating an API call with a Promise
    return Promise.resolve(phonesData);
  },
  
  get: async (phoneId) => {
    // Simulating an API call with a Promise
    return fetch(`${process.env.PUBLIC_URL}/phones/${phoneId}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  }
};

export default PhoneService;