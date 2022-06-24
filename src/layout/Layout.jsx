// Outlet permite renderizar el componente hijo que se hace referencia por Route
import { Outlet, Link, useLocation } from 'react-router-dom'
// Al utilizar react-router-dom redireccionar logra un mejor performance utilizando el 
// componente "Link" o "Navlink", en vez de la etiqueta <a></a>

export const Layout = () => {
  // useLocation permite recibir parametros de la ruta como hash(#), pathname(/url/), key, search(?adsfazxc) y state
  const location = useLocation()
  // asi puedo acondicionar en caso de estar en ciertas rutas
  const urlActual = location.pathname

  return (
    <div className='md:flex md:min-h-screen' >
      <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-4xl font-black text-center text-white'>
          CRM - Clientes
        </h2>
        <nav className='mt-10'>
          <Link
            className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white' } 
            text-2xl block mt-2 hover:text-blue-300`}
            to="/"
          >
            Clientes
          </Link>
          <Link
            className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white' } 
            text-2xl block mt-2 hover:text-blue-300`}
            to="/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </div>
    </div>
  )
}
