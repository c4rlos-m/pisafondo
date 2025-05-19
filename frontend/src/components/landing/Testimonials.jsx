// components/landing/Testimonials.js
/*import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-apple-light">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-apple-dark mb-12">Voces de Conductores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"Una experiencia simple y elegante. Encontré mi coche ideal en minutos."</p>
            <h4 className="text-lg font-semibold text-gray-600">— Ana M.</h4>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"El diseño y la calidad del servicio son incomparables."</p>
            <h4 className="text-lg font-semibold text-gray-600">— Luis P.</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;*/


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