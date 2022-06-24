import { useNavigate } from "react-router-dom"

export const Cliente = ({ cliente, handleEliminar }) => {
    const { id, nombre, email, empresa, telefono, notas } = cliente
    const navigate = useNavigate()

    return (
        <tr className="border-b hover:bg-gray-200">
            <td className="p-3">{id}</td>
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span> {email} </p>
                <p><span className="text-gray-800 uppercase font-bold">Tel: </span> {telefono} </p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <button 
                    type="button" 
                    className="p-2 block w-full bg-yellow-500 hover:bg-yellow-600 text-white uppercase font-bold text-xs"
                    onClick={() => navigate(`/${id}`)}
                >
                    Ver
                </button>
                <button 
                    type="button" 
                    className="p-2 block w-full bg-blue-600 hover:bg-blue-700 text-white uppercase font-bold text-xs mt-3"
                    onClick={() => navigate(`/editar/${id}`)}
                >
                    Editar
                </button>
                <button 
                    type="button" 
                    className="p-2 block w-full  bg-red-600 hover:bg-red-700 text-white uppercase font-bold text-xs mt-3 mb-3"
                    onClick={() => handleEliminar(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
