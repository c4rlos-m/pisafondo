import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ChevronLeft, Calendar, Activity, Phone, Mail, Check } from 'lucide-react';
import ImageSlider from './ImageSlider';
import ContactForm from '../landing/ContactForm';
import { User, CreditCard, Euro, Currency } from 'lucide-react';



export const BuyCarForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const inputTarjeta = useRef()
    const inputTelefono = useRef()
    const inputPrecio = useRef()


    const fetchCar = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://lpisafondo-production.up.railway.app/cars/${id}`);
            if (!response.ok) throw new Error('No se encontró el coche');
            const data = await response.json();
            setCar(data);
        } catch (error) {
            console.error('Error al cargar los datos del coche:', error);
            setError(error.message);
            toast.error(error.message, {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCar();
    }, [id]);

    const formatPrice = (price) => {
        return price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        });
    };


    const submitFormPago = (e) => {
        e.preventDefault()
        setLoading(true)
        //
        const precio = inputPrecio.current.value
        const tarjeta = inputTarjeta.current.value
        const telefono = inputTelefono.current.value
        const token = localStorage.getItem("token");
        // eslint-disable-next-line no-unused-vars
        const res = fetch("https://pisafondo-production.up.railway.app/admin/reserva", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ telefono, tarjeta, id, precio }),
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(e)
                if (res.ok) {
                    toast.success(data.mensaje, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    fetchCar();
                    inputTarjeta.current.value = ''
                    inputTelefono.current.value = ''

                } else {
                    console.log(res)
                    toast.error(data.error, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <svg
    //                 className="animate-spin h-10 w-10 text-indigo-600"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //             >
    //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    //                 <path
    //                     className="opacity-75"
    //                     fill="currentColor"
    //                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //                 />
    //             </svg>
    //         </div>
    //     );
    // }

    if (error || !car) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Coche no encontrado</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/app')}
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                    <ChevronLeft size={20} />
                    <span>Volver al catálogo</span>
                </motion.button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Barra de navegación superior */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-sm rounded-xl mb-6"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/app')}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft size={20} />
                        <span className="ml-1">Volver</span>
                    </motion.button>
                    <h1 className="text-xl font-bold text-gray-800 ml-4">
                        {car.marca} {car.modelo}
                    </h1>
                </div>
            </motion.div>

            <div className="grid grid-cols- lg:grid-cols-1 gap-8">
                {/* Columna de fotos e información principal */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Galería de imágenes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden h-96"
                    >
                        <ImageSlider images={car.imagen} marca={car.marca} modelo={car.modelo} />
                    </motion.div>

                    {/* Información principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {car.marca} {car.modelo}
                                </h2>
                                <p className="text-gray-600">
                                    {car.year} · {car.kilometros.toLocaleString('es-ES')} km · {car.combustible}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{formatPrice(car.precio)}</p>
                                <p className="text-3xl font-bold text-gray-900">{formatPrice(car.precio * 0.15)}</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${car.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {car.disponible ? 'En venta' : 'Reservado'}
                                </span>
                            </div>
                        </div>

                        {/* Características clave */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { label: 'Año', value: car.year },
                                { label: 'Kilómetros', value: `${car.kilometros.toLocaleString('es-ES')} km` },
                                { label: 'Combustible', value: car.combustible },
                                { label: 'Ubicación', value: car.ubicacion },
                                { label: 'Color', value: car.color },
                                { label: 'Transmisión', value: car.transmision },
                                { label: 'Puertas', value: car.puertas },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                    <p className="font-medium">{item.value || 'N/A'}</p>
                                </div>
                            ))}
                        </div>

                        {/* Descripción */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                            <p className="text-gray-600">{car.descripcion || 'No hay descripción disponible'}</p>
                        </div>

                        {/* Características */}
                        {Array.isArray(car.caracteristicas) && car.caracteristicas.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Características</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {car.caracteristicas.map((caracteristica, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span className="text-gray-600">{caracteristica}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </div>



            </div>


            <div className="buyCar-container">
                <h1>COMPRAR VEHÍCULO</h1>
                <p className='mb-4'>Para hacer la compra del vehículo tienes que aportar el 15% del precio de compra como paga y señal, procederemos a retirar el vehículo de la web y un agente se pondra en contacto en menos de 24h.
                    Al comprar el vehículo utilizaremos tus datos de contacto registrado en tu cuenta con la que procedes a efectuar la compra
                </p>

                <form onSubmit={submitFormPago}>

                    <label
                        htmlFor="name"
                        className="text-xs font-medium text-gray-700 mb-1 block">
                        Precio paga y señal:
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                            <Euro className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            ref={inputPrecio}
                            value={Math.round(car.precio * 0.15)}
                            disabled
                            placeholder="Tu nombre"
                            className="w-80 pl-8 p-2 -col-start-4  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>


                    <label
                        htmlFor="name"
                        className="text-xs font-medium text-gray-700 mb-1 block">
                        Número de tarjeta
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            ref={inputTarjeta}
                            type="number"
                            placeholder="Número de tarjeta"
                            className="w-80 pl-8 p-2 -col-start-4  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            disabled={car.disponible ? false : true}
                        />
                    </div>
                    <label
                        htmlFor="name"
                        className="text-xs font-medium text-gray-700 mb-1 block">
                        Teléfono de contaco:
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            ref={inputTelefono}
                            type="text"
                            name="name"
                            placeholder="Teléfono"
                            className="w-80 pl-8 p-2 -col-start-4  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            disabled={car.disponible ? false : true}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-80 py-2 mt-4 rounded-lg text-base font-medium transition-colors duration-200 ${car.disponible
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!car.disponible}
                    >
                        {car.disponible ? 'Pagar ahora' : 'No disponible'}

                    </button>

                </form>

            </div>

        </div>

    );



}