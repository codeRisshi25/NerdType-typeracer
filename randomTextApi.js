// In randomTextApi.js
const axios = require('axios');
const uri = 'https://random-text-api.azurewebsites.net/random';

async function getData() {
  const response = await axios.get(uri);
  return response.data.paragraph.split(" ");
}

module.exports = { getData }; // Correct way to export if you're using this syntax in app.js