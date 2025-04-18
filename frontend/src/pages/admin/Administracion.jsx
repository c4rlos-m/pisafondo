import React from "react";
import { Link } from "react-router-dom";


export const Administracion = () => {
    return (
        <div className="p-3 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Administración</h1>

            <div className="text-2xl">
                <Link to={"/app/admin"}>Gestión de Contactos</Link>
            </div>
            <div className="text-2xl">
                <Link to={"/app/validacion_coches"}>Validación de vehículos</Link>
            </div>
        </div>
    )
}