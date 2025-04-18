import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";


export const ValidacionVehiculos = () => {
    const [coches, setCoches] = useState([])

    const fetchData = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/admin/vehiculos_por_validar/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((resultFetch) => {
                const { data } = resultFetch.data
                setCoches(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleValidate = (coche) => {
        const confirmado = confirm('Estas seguro de denegar el coche:' + coche.marca + ' ' + coche.modelo)
        if (!confirmado) {
            return;
        }


        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/admin/vehiculo_aceptado/', {
            id: coche.id
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((resultFetch) => {
                const { succes } = resultFetch.data
                if (succes) {
                    fetchData()
                }
            })
    }

    const handleDenny = (coche) => {
        const confirmado = confirm('Estas seguro de denegar el coche:' + coche.marca + ' ' + coche.modelo)
        if (!confirmado) {
            return;
        }

        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/admin/vehiculo_denegado/', {
            id: coche.id
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resultFetch) => {
            const { succes } = resultFetch.data
            if (succes) {
                fetchData()
            }
        })
    }

    return (
        <div className="flex flex-col mt-6 mx-10">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Año</th>
                        <th>KM</th>
                        <th>Combustible</th>
                        <th>Descripcion</th>
                        <th>Ubicacion</th>
                        <th>Img.</th>
                    </tr>
                </thead>
                <tbody>
                    {coches.map((c) => (
                        <tr key={c.id} className="border">
                            <td className="border p-2">
                                {c.id} -- usuario
                            </td>
                            <td className="border p-2">
                                {c.marca}
                            </td>
                            <td className="border p-2">
                                {c.modelo}
                            </td>
                            <td className="border p-2">
                                {c.precio}
                            </td>
                            <td className="border p-2">
                                {c.year}
                            </td>
                            <td className="border p-2">
                                {c.kilometros}
                            </td>
                            <td className="border p-2">
                                {c.combustible}
                            </td>
                            <td className="border p-2">
                                {c.descripcion}
                            </td>
                            <td className="border p-2">
                                {c.ubicacion}
                            </td>
                            <td className="border p-2">
                                <div className="flex gap-2">
                                    {c.imagen.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt="Imagen del coche" className="w-24 h-12 object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <div className="flex gap-1.5 p-2">
                                    <Button color='green' onClick={() => handleValidate(c)} >Validar</Button>
                                    <Button color='red' onClick={() => handleDenny(c)}>Denegar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}