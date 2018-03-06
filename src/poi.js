const axios = require('axios');

const client = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 1000,
});

const message = document.getElementById('message');

module.exports = {
  getPOIs: async () => {
    try {
      const pois = await client.get('/pois');
      return pois;
    } catch (error) {
      message.innerHTML = `An error occurred: ${error}`;
    }
    return [];
  },
};
