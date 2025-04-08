// controllers/carsControllers.js
const supabase = require('../config/database');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


// Controlador para obtener coches destacados (sin cambios)
const getFeaturedCars = async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('coches')
      .select('*')
      .eq('disponible', true)
      .limit(3)
      .order('creado_en', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching featured cars:', error.message);
    res.status(500).json({ error: 'Error al obtener los coches destacados' });
  }
};
const getAllCars = async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('coches')
    .select('*')
    .eq('disponible', true) // Solo coches disponibles
    .order('creado_en', { ascending: false }); // Ordenar por fecha de creación
    
    if (error) throw error;
    
    console.log("Coches devueltos:", data); // Para depurar
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching all cars:', error.message);
    res.status(500).json({ error: 'Error al obtener los coches' });
  }
};
const createCar = async (req, res) => {
  try {
    console.log("Datos recibidos en req.body:", req.body);
    console.log("Archivos recibidos:", req.files);

    const {
      marca,
      modelo,
      precio,
      year,
      kilometros,
      combustible,
      descripcion,
      disponible,
      ubicacion, // Asegúrate de que esté aquí
    } = req.body;
    const files = req.files;
    const user = req.user;

    // Validación de datos obligatorios
    if (!marca || !modelo || !precio || !year || !kilometros || !combustible || !ubicacion) {
      console.log("Campos recibidos:", { marca, modelo, precio, year, kilometros, combustible, ubicacion });
      return res.status(400).json({ 
        error: "Todos los campos obligatorios (marca, modelo, precio, year, kilometros, combustible, ubicacion) deben estar completos" 
      });
    }
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Debes subir al menos una imagen" });
    }

    const precioNum = parseFloat(precio);
    const yearNum = parseInt(year, 10);
    const kmNum = parseInt(kilometros, 10);
    if (isNaN(precioNum) || precioNum <= 0) {
      return res.status(400).json({ error: "El precio debe ser un número positivo" });
    }
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      return res.status(400).json({ error: "El año debe ser válido (1900 - actual)" });
    }
    if (isNaN(kmNum) || kmNum < 0) {
      return res.status(400).json({ error: "Los kilómetros deben ser un número positivo" });
    }

    const imageUrls = await Promise.all(
      files.map(async (file, index) => {
        const fileName = `${user.id}-${Date.now()}-${index}-${file.originalname}`;
        const { data, error } = await supabase.storage
          .from("car-images")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) throw error;

        const { data: publicData } = supabase.storage
          .from("car-images")
          .getPublicUrl(fileName);

        return publicData.publicUrl;
      })
    );

    const { data, error } = await supabase
      .from("coches")
      .insert([
        {
          marca,
          modelo,
          precio: precioNum,
          year: yearNum,
          kilometros: kmNum,
          combustible,
          descripcion,
          imagen: imageUrls,
          disponible: disponible !== undefined ? disponible : true,
          ubicacion, // Asegúrate de que esté aquí
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating car:", error.message);
    res.status(500).json({ error: "Error al crear el coche" });
  }
};
const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('coches')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Coche no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching car by ID:', error.message);
    res.status(500).json({ error: 'Error al obtener el coche' });
  }
};
module.exports = {
  getFeaturedCars,
  getAllCars,
  getCarById,
  createCar: [upload.array("images", 5), createCar],
};