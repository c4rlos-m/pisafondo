// controller/adminController.js
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


const vehiculosReservados = async (req, res) => {
  const { data, error } = await supabase
    .from('transacciones')
    .select('*, coches(*), usuarios:users(*)') // puedes renombrar si quieres
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ error: "Error al obtener reservas" });
  }

  return res.status(200).json({
    succes: true,
    data,
  });
};

const reserva = async (req, res) => {

  const { telefono, tarjeta, id, precio } = req.body;
  const { id: id_user, username } = req.user
  console.log(req.user)

  const { data: data_consulta, error: error_consulta } = await supabase
    .from('coches')
    .select('disponible')
    .eq('id', id)
    .single()

  if (data_consulta.disponible == false) {
    return res.status(400).json({ error: "El coche ya no está disponible" });
  }

  const { data, error } = await supabase
    .from('transacciones')
    .insert({
      nombre: username,
      id_usuario: id_user,
      telefono: telefono,
      numero_tarjeta: tarjeta,
      id_vehiculo: id,
      reserva_pagada: precio
    })
  if (error) {

    return res.status(400).json({ error: "Error al crear la reserva" });
  }
  const { data: update_state, error: error_update } = await supabase
    .from('coches')
    .update({ disponible: false })
    .eq('id', id)
  if (error_update) {
    console.log(error_update)
  }


// enviar mail

  res.status(201).json({
    succes: true,
    mensaje: 'Gracias por tu compra! Pronto nos pondremos en contacto contigo.'

  });
};


module.exports = { vehiculosPorValidar, vehiculoAceptado, vehiculoDenegado, reserva,vehiculosReservados };
