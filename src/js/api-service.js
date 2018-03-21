const axios = require('axios');

const client = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 1000,
});

const message = document.getElementById('message');

module.exports = {
  getPOIs: async () => {
    try {
      const response = await client.get('/pois');
      return response.data;
    } catch (error) {
      if (message) {
        message.innerHTML = `An error occurred: ${error}`;
      }
    }
    return [];
  },
  getPOI: async (id) => {
    try {
      const response = await client.get(`/pois/${id}`);
      return response.data;
    } catch (error) {
      if (message) {
        message.innerHTML = `An error occurred: ${error}`;
      }
    }
    return {};
  },
};
