// src/services/api.js
const API_BASE_URL = 'http://pisafondo-production.up.railway.app'; // Cambia esto según tu URL de backend

export const searchDealersByLocation = async (query) => {
  try {
    let url = `${API_BASE_URL}/dealers/search`;

    // Si query es una coordenada (lat,lng)
    if (query.includes(',')) {
      const [lat, lng] = query.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        url += `?lat=${lat}&lng=${lng}&distance=50`;
      } else {
        throw new Error('Coordenadas inválidas');
      }
    } else {
      // Si query es un término de búsqueda (como código postal o ciudad)
      url += `?search=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al buscar concesionarios');
    }
    
    const data = await response.json();
    return {
      dealers: data,
      // eslint-disable-next-line no-undef
      location: query.includes(',') ? { lat, lng } : null, // Solo devolvemos ubicación si es por coordenadas
    };
  } catch (error) {
    console.error('Error en searchDealersByLocation:', error);
    throw error;
  }
};