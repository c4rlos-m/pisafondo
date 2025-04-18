const supabase = require('../config/database');

const vehiculosPorValidar = async (req, res) => {
  const { data: coches, error } = await supabase
    .from('coches')
    .select('*, users(*)')
    .eq('anuncio_validado', false)
    .eq('is_deleted', false)

  if (error) {
    return res.status(400).json({
      error: "Error al obtener datos"
    });
  }

  res.status(201).json({
    succes: true,
    data: coches,
  });
};

const vehiculoAceptado = async (req, res) => {
  const { id } = req.body;
  console.log(id)

  const { data, error } = await supabase
    .from('coches')
    .update({
      anuncio_validado: true
    })
    .eq('id', id)

  res.status(201).json({
    succes: true,
  });
};

const vehiculoDenegado = async (req, res) => {
  const { id } = req.body;
  console.log(id)

  const { data, error } = await supabase
    .from('coches')
    .update({
      is_deleted: true
    })
    .eq('id', id)

  res.status(201).json({
    succes: true,
  });
};


module.exports = { vehiculosPorValidar, vehiculoAceptado, vehiculoDenegado };
