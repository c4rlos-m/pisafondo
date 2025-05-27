import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const VehiculosReservados = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        // /*"https://pisafondo-production.up.railway.app/admin/vehiculos_reservados"*/
        "https://pisafondo-production.up.railway.app/admin/vehiculos_reservados",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservas(res.data.data);
    } catch (err) {
      setError("Error al cargar las reservas", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Cargando reservas...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Vehículos Reservados</h1>
      {reservas.length === 0 ? (
        <p className="text-gray-500">No hay reservas activas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Vehículo</th>
                <th className="px-4 py-2 text-left">Reserva</th>
                <th className="px-4 py-2 text-left">Fecha de reserva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td className="px-4 py-2">
                    {reserva.usuarios?.name || reserva.nombre || "N/A"}
                  </td>
                  <td className="px-4 py-2">{reserva.telefono}</td>
                  <td className="px-4 py-2">
                    {reserva.coches?.marca} {reserva.coches?.modelo}
                  </td>
                  <td className="px-4 py-2">{reserva.reserva_pagada} €</td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(reserva.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
