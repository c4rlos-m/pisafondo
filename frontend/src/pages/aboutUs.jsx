import React from 'react';
import { Users, Car, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 font-medium text-sm uppercase tracking-wider mb-3">
            Conócenos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sobre Pisafondo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Somos una plataforma apasionada por los vehículos, dedicada a conectar compradores y vendedores de manera sencilla y confiable.
          </p>
        </div>

        {/* Misión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Nuestra misión
            </h2>
            <p className="text-gray-600">
              Facilitar la compraventa de vehículos ofreciendo una experiencia intuitiva, segura y transparente. Queremos que encuentres el coche de tus sueños o vendas el tuyo sin complicaciones.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Coche en carretera"
              className="rounded-xl shadow-lg object-cover w-full h-80 md:h-full"
            />
          </div>
        </div>

        {/* Equipo */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Nuestro equipo</h2>
            <p className="text-gray-600 mt-2">
              Un grupo de entusiastas del motor trabajando juntos para hacer realidad tus sueños automovilísticos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Miembro 1 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Miembro del equipo"
                  className="rounded-full w-full h-full object-cover border-2 border-blue-200"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Carlos Pérez</h3>
              <p className="text-gray-500">Fundador & CEO</p>
            </div>
            {/* Miembro 2 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Miembro del equipo"
                  className="rounded-full w-full h-full object-cover border-2 border-blue-200"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Lucía Gómez</h3>
              <p className="text-gray-500">Directora de Ventas</p>
            </div>
            {/* Miembro 3 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Miembro del equipo"
                  className="rounded-full w-full h-full object-cover border-2 border-blue-200"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Javier Ruiz</h3>
              <p className="text-gray-500">Líder Técnico</p>
            </div>
          </div>
        </div>

        {/* Datos adicionales */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <Car className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">+5,000</h3>
              <p className="text-gray-600">Vehículos vendidos</p>
            </div>
          </div>
          <div className="flex items-center mb-6 md:mb-0">
            <Users className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">+10,000</h3>
              <p className="text-gray-600">Usuarios felices</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">100%</h3>
              <p className="text-gray-600">Compromiso contigo</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ¿Listo para unirte a la comunidad Pisafondo?
          </h3>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Regístrate ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;