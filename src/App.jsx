import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Inicio } from './paginas/Inicio'
import {NuevoCliente} from './paginas/NuevoCliente'
import {EditarCliente} from './paginas/EditarCliente'
import {VerCliente} from './paginas/VerCliente'

function App() {

  return (
    // Crear un nuevo router o endpoints de componentes
    <BrowserRouter>
      <Routes>
        {/* Utilizando nested routes se pueden anidar una serie de rutas a una ruta*/}
        <Route path="/" element={<Layout />}>
          {/* Mediante index determino la ruta principal y con path determino los anidados */}
          <Route index element={<Inicio />} />
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
