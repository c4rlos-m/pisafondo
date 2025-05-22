// components/landing/Testimonials.js
import React from 'react';
import '../../styles/Testimonials.css';

const testimonials = [
  {
    name: 'Alex Ribas',
    city: 'Barcelona, España',
    comment: 'Encontrar un coche fiable aqui es mas facil que encontrar novia en la vida.',
    description: 'Usó nuestra app para buscar coches eléctricos familiares.',
    image: '/aribas.png',
  },
  {
    name: 'Pol',
    city: 'Paris, Francia',
    comment: 'El diseño es impecable y la experiencia fue súper intuitiva.',
    description: 'Estaba comparando SUVs antes de decidirse por un modelo híbrido.',
    image: '/POL.png',
  },
  {
    name: 'Alex G 🏳️‍⚧️',
    city: 'Viladecans, España',
    comment: 'Me sentí acompañade en tode el proceso de compre online.',
    description: 'Valore especialmente la asistencia personalizade del equipe.',
    image: '/gilarte.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Comentarios de Clientes</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img src={t.image} alt={t.name} className="testimonial-image" />
                <div>
                  <h4 className="testimonial-name">{t.name}</h4>
                  <p className="testimonial-city">{t.city}</p>
                </div>
              </div>
              <p className="testimonial-comment">"{t.comment}"</p>
              <p className="testimonial-description">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;