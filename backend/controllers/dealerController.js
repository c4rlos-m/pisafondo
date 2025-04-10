// controllers/dealerController.js
const supabase = require('../config/database');

// Obtener todos los concesionarios
const getAllDealers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dealers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching all dealers:', error.message);
    res.status(500).json({ error: 'Error al obtener los concesionarios' });
  }
};

// Obtener un concesionario por ID
const getDealerById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('dealers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Concesionario no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching dealer by ID:', error.message);
    res.status(500).json({ error: 'Error al obtener el concesionario' });
  }
};

// Buscar concesionarios cercanos o por texto
const searchDealers = async (req, res) => {
  try {
    const { lat, lng, distance = 50, search } = req.query; // latitud, longitud, distancia en km, término de búsqueda opcional

    let query = supabase.from('dealers').select('*');

    // Si se proporcionan coordenadas, usar la función dealers_within_distance
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const distNum = parseFloat(distance);

      if (isNaN(latNum) || isNaN(lngNum) || isNaN(distNum)) {
        return res.status(400).json({ error: 'Coordenadas o distancia inválidas' });
      }

      const { data, error } = await supabase.rpc('dealers_within_distance', {
        lat: latNum,
        lng: lngNum,
        distance_km: distNum,
      });

      if (error) throw error;

      return res.status(200).json(data);
    }

    // Si se proporciona un término de búsqueda (por nombre, ciudad o provincia)
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,city.ilike.%${search}%,province.ilike.%${search}%`
      );
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error searching dealers:', error.message);
    res.status(500).json({ error: 'Error al buscar concesionarios' });
  }
};

module.exports = {
  getAllDealers,
  getDealerById,
  searchDealers,
};