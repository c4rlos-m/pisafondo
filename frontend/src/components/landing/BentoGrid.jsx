import { useState } from 'react';
import { Car, Gauge, Wallet, Award, Star, Users, MapPin, Calendar, Phone, ChevronRight } from 'lucide-react';

export default function CarDealershipBento() {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cards = [
    {
      id: 1,
      title: "Vehículos Destacados",
      description: "Descubre nuestra selección de autos premium con las mejores ofertas del mercado",
      icon: <Car className="text-blue-600" />,
      image: "/images/bmw.avif",
      size: "col-span-2 row-span-2",
      color: "bg-slate-50"
    },
    {
      id: 2,
      title: "Servicio Premium",
      description: "Mantenimiento y reparación por expertos certificados",
      icon: <Gauge className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-blue-50"
    },
    {
      id: 3,
      title: "Financiamiento",
      description: "Opciones personalizadas para adquirir tu auto soñado",
      icon: <Wallet className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-blue-50"
    },
    {
      id: 4,
      title: "Vehículos Certificados",
      description: "Autos usados con garantía y respaldo total",
      icon: <Award className="text-blue-600" />,
      image: "/images/toyota.webp",
      size: "col-span-1 row-span-2",
      color: "bg-slate-50"
    },
    {
      id: 5,
      title: "Testimonios",
      description: "Lo que dicen nuestros clientes satisfechos",
      icon: <Star className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-yellow-50"
    },
    {
      id: 6,
      title: "Nuestro Equipo",
      description: "Asesores profesionales a tu servicio",
      icon: <Users className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-green-50"
    },
    {
      id: 7,
      title: "Ubicaciones",
      description: "Encuentra tu concesionario más cercano",
      icon: <MapPin className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-red-50"
    },
    {
      id: 8,
      title: "Agenda una Prueba",
      description: "Reserva una cita para probar el auto de tus sueños",
      icon: <Calendar className="text-blue-600" />,
      size: "col-span-1 row-span-1",
      color: "bg-purple-50"
    },
    
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div 
            key={card.id}
            className={`${card.size} ${card.color} rounded-xl p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md relative overflow-hidden`}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {card.icon}
              </div>
              <ChevronRight className={`text-blue-600 transition-all duration-300 ${hoveredCard === card.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{card.title}</h3>
            <p className="text-slate-600">{card.description}</p>
            
            {card.image && (
              <div className="mt-4">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
            )}
            
            {card.id === 1 && (
              <div className="mt-4 flex space-x-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Nuevos</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Usados</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">SUVs</span>
              </div>
            )}
            
            {card.id === 4 && (
              <div className="mt-4">
                <ul className="text-sm text-slate-600">
                  <li className="flex items-center mb-1">
                    <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                    Revisión de 120 puntos
                  </li>
                  <li className="flex items-center mb-1">
                    <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                    Garantía extendida
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                    Historial verificado
                  </li>
                </ul>
              </div>
            )}
            
            {card.id === 9 && (
              <div className="mt-4 flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all">
                  Llamar ahora
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-all">
                  Enviar mensaje
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}