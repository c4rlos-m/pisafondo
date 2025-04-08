/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SobreNosotros = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <Card className="bg-white shadow-lg rounded-2xl p-6">
          <CardContent>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sobre Nosotros</h1>
            <p className="text-gray-600 text-lg mb-4">
              En <span className="font-semibold">PisaFondo</span>, nos dedicamos a proporcionar soluciones innovadoras
              para la gestión eficiente de recursos y proyectos. Nuestro equipo de profesionales
              trabaja con pasión y compromiso para ofrecer herramientas tecnológicas
              que optimicen los procesos de nuestros clientes.
            </p>
            <p className="text-gray-600 text-lg">
              Creemos en la innovación, la calidad y la colaboración como pilares
              fundamentales para alcanzar el éxito. Únete a nosotros en este viaje
              y descubre cómo podemos ayudarte a lograr tus objetivos.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SobreNosotros;
