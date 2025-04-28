//controller/contactController.js
const supabase = require('../config/database');
const nodemailer = require('nodemailer');
require('dotenv').config();

const createContact = async (req, res) => {
  console.log('Solicitud recibida en /contact:', req.body);
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos (name, email, subject, message) son obligatorios' });
  }

  try {
    // Guardar el mensaje en Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, subject, message }])
      .select();

    if (error) {
      console.error('Error al guardar el mensaje:', error);
      return res.status(500).json({ error: error.message });
    }

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // pisafondo.contacto@gmail.com
        pass: process.env.EMAIL_PASS, // gmtd trqy luqs vcqk
      },
    });

    // Definir el contenido del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Correo del usuario que envió el formulario
      subject: 'Gracias por contactarnos',
      text: `Hola ${name},\n\nHemos recibido tu mensaje con el asunto "${subject}".\n\nTu mensaje:\n"${message}"\n\nTe responderemos lo antes posible.\n\nSaludos,\nEl equipo de PisaFondo`,
      html: `
        <h2>Hola ${name},</h2>
        <p>Hemos recibido tu mensaje con el asunto "<strong>${subject}</strong>".</p>
        <p><strong>Tu mensaje:</strong><br>"${message}"</p>
        <p>Te responderemos lo antes posible.</p>
        <p>Saludos,<br>El equipo de PisaFondo</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado a:', email);

    // Responder al cliente
    res.status(201).json({ message: 'Mensaje enviado exitosamente', contact: data[0] });
  } catch (error) {
    console.error('Error al procesar el formulario o enviar el correo:', error);
    res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
};
const getContacts = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error al obtener los mensajes:', error);
        return res.status(500).json({ error: error.message });
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al listar mensajes:', error);
      res.status(500).json({ error: 'Error interno al obtener los mensajes' });
    }
  };
  const replyContact = async (req, res) => {
    const { contactId, replyMessage } = req.body;
  
    try {
      // Asegúrate de que contactId es un número entero
      const contactIdInt = parseInt(contactId, 10);
  
      if (isNaN(contactIdInt)) {
        return res.status(400).json({ error: 'El ID de contacto debe ser un número válido' });
      }
  
      // Obtener el contacto desde Supabase
      const { data: contact, error: fetchError } = await supabase
        .from('contacts')
        .select('name, email, subject')
        .eq('id', contactIdInt)
        .single();
  
      if (fetchError || !contact) {
        console.error('Error al obtener el contacto:', fetchError);
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
  
      // Actualizar el estado de replied
      const { error: updateError } = await supabase
        .from('contacts')
        .update({ replied: true })
        .eq('id', contactIdInt);
  
      if (updateError) {
        console.error('❌ Error al actualizar replied:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el contacto' });
      } else {
        console.log(`✅ Contacto ${contactIdInt} marcado como respondido`);
      }
  
      // Configurar el transporte de Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Correo de respuesta
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: contact.email,
        subject: `Respuesta a tu mensaje: ${contact.subject}`,
        text: `Hola ${contact.name},\n\nGracias por tu mensaje. Aquí está nuestra respuesta:\n\n"${replyMessage}"\n\nSaludos,\nEl equipo de PisaFondo`,
        html: `
          <h2>Hola ${contact.name},</h2>
          <p>Gracias por tu mensaje con el asunto "<strong>${contact.subject}</strong>".</p>
          <p><strong>Nuestra respuesta:</strong><br>"${replyMessage}"</p>
          <p>Saludos,<br>El equipo de PisaFondo</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Respuesta enviada a:', contact.email);
  
      res.status(200).json({ message: 'Respuesta enviada exitosamente' });
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      res.status(500).json({ error: 'Error interno al enviar la respuesta' });
    }
  };
  
  
  module.exports = { createContact, getContacts, replyContact };