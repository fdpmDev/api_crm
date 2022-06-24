import { useState, useEffect } from "react"
import { Cliente } from "../components/Cliente"

export const Inicio = () => {
  const [clientes, setClientes] = useState([])
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setClientes(resultado)
      } catch (error) {
        console.error(error)
      }
    }

    obtenerClientesAPI()
  }, [])

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Deseas Eliminar este cliente')
    if(confirmar) {
      try {
        // Para eliminar basta solo la id de la ruta
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        // puede aplicarse location.reload(), pero baja la performance al realizar más peticiones a la API
        // creamos un nuevo array donde contenga todos los clientes que no coincidan con la id eliminada y actualizamos el state
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error)
      }

    }
  } 

  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Id</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}

        </tbody>
      </table>
    </div >
  )
}
