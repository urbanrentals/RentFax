const axios = require('axios');

// Function to fetch rental history data
async function fetchRentalHistory(userId) {
  try {
    const response = await axios.get(`https://api.rentalhistory.com/get-history/${userId}`);
    return response.data; // Assuming the API returns an array of rental history data
  } catch (err) {
    console.error('Error fetching rental history:', err);
    throw new Error('Failed to fetch rental history');
  }
}

module.exports = { fetchRentalHistory };
