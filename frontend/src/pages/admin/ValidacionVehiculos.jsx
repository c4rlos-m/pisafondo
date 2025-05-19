import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { APP_URL } from "../../config";

export const ValidacionVehiculos = () => {
    const [coches, setCoches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchData = () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        axios.get(`https://pisafondo-production.up.railway.app/admin/vehiculos_por_validar/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((resultFetch) => {
                const { data } = resultFetch.data;
                setCoches(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error al cargar los vehículos", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleValidate = (coche) => {
        const confirmado = confirm(`¿Estás seguro de aceptar el vehículo: ${coche.marca} ${coche.modelo}?`);
        if (!confirmado) return;

        const token = localStorage.getItem('token');
        axios.post(`${APP_URL}/admin/vehiculo_aceptado/`, {
            id: coche.id
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((resultFetch) => {
                const { succes } = resultFetch.data;
                if (succes) {
                    fetchData();
                }
            });
    };

    const handleDenny = (coche) => {
        const confirmado = confirm(`¿Estás seguro de denegar el vehículo: ${coche.marca} ${coche.modelo}?`);
        if (!confirmado) return;

        const token = localStorage.getItem('token');
        axios.post(`${APP_URL}/admin/vehiculo_denegado/`, {
            id: coche.id
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((resultFetch) => {
                const { succes } = resultFetch.data;
                if (succes) {
                    fetchData();
                }
            });
    };

    // Modal to display enlarged image
    const ImageModal = ({ url, onClose }) => {
        if (!url) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
                <div className="relative max-w-4xl max-h-full p-2">
                    <button
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <img
                        src={url}
                        alt="Imagen ampliada"
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Cargando vehículos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-4 md:mx-8 lg:mx-12 my-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white rounded-xl shadow-md p-6">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-blue-600">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                        Validación de Vehículos
                    </h1>
                    <p className="text-gray-500 mt-1">Gestión de vehículos pendientes de aprobación</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                        <span className="text-blue-700 font-medium mr-2">{coches.length}</span>
                        <span className="text-blue-600 text-sm">Vehículos pendientes</span>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2v6h-6"></path>
                            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                            <path d="M3 12a9 9 0 0 0 6.7 15L13 21"></path>
                            <path d="M13 21h6v-6"></path>
                        </svg>
                        Actualizar
                    </button>
                </div>
            </div>

            {coches.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No hay vehículos pendientes de validación
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Usuario</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Marca</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Modelo</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Precio</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Año</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">KM</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Combustible</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Descripción</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Ubicación</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Imágenes</th>
                                <th className="py-3 px-4 font-semibold text-sm uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {coches.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{c.users?.name || 'N/A'}</td>
                                    <td className="py-3 px-4 font-medium">{c.marca}</td>
                                    <td className="py-3 px-4">{c.modelo}</td>
                                    <td className="py-3 px-4">{c.precio} €</td>
                                    <td className="py-3 px-4">{c.year}</td>
                                    <td className="py-3 px-4">{c.kilometros} km</td>
                                    <td className="py-3 px-4">{c.combustible}</td>
                                    <td className="py-3 px-4 max-w-xs truncate" title={c.descripcion}>
                                        {c.descripcion}
                                    </td>
                                    <td className="py-3 px-4">{c.ubicacion}</td>
                                    <td className="py-3 px-4">
                                        {Array.isArray(c.imagen) && c.imagen.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {c.imagen.map((img, index) => (
                                                    <div
                                                        key={index}
                                                        className="cursor-pointer border border-gray-200 rounded overflow-hidden hover:border-blue-500 transition-colors"
                                                        onClick={() => setSelectedImage(img)}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`${c.marca} ${c.modelo} - ${index + 1}`}
                                                            className="w-20 h-16 object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://via.placeholder.com/80x64?text=Error";
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm italic">Sin imágenes</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Button
                                                color="green"
                                                onClick={() => handleValidate(c)}
                                                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                            >
                                                Aprobar
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => handleDenny(c)}
                                                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                            >
                                                Rechazar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}



            {/* Image modal */}
            <ImageModal url={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};