// services/geocodingService.js
const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY
      }
    });
    
    const { results } = response.data;
    
    if (!results || results.length === 0) {
      throw new Error('No se encontraron resultados para la dirección proporcionada');
    }
    
    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error en geocodificación:", error);
    throw error;
  }
};