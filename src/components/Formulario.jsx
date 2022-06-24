// Validacion mediante libreria Formik
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Alerta } from './Alerta'
import { Spinner } from './Spinner'

export const Formulario = ({ cliente, cargando }) => {
    // redireccion a alguna url
    const navigate = useNavigate()
    // Usando Yup para validaciones - //Tiene una forma mas simple de utilizar
    const nuevoClienteSchema = Yup.object().shape({
        // Asi puedo configurar el mensaje de error, y ademas, darle un minimo y max de letras
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es Obligatorio'),
        empresa: Yup.string()
            .required('El nombre de empresa es Obligatorio'),
        email: Yup.string()
            .email('Email no valido')
            .required('El email es Obligatorio'),
        // TypeError es para ingresar errores en caso de no ser requiered o algun otro parametro
        telefono: Yup.number()
            .positive('Número no Válido')
            .integer('Número no Válido')
            .typeError('El teléfono debe ser solo números')

    })

    const handelSubmit = async (valores) => {
        // console.log(valores)
        try {
            let respuesta

            if(cliente.id) {
                // ---- Editando un Registro ---- //
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                // En base a la configuracion que requiere json-server por cada peticion
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else {
                // ---- Nuevo Registro ---- //
                const url = import.meta.env.VITE_API_URL
                // En base a la configuracion que requiere json-server por cada peticion
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    // json-server solicita cabeceras de content-type para ciertos tipos de peticiones
                    headers: {
                        'Content-Type': 'application/json'
                        // En algunos casos se requieren las autenticaciones del servidor
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>

                <Formik
                    // aqui se inician los valores iniciales por "name" a cada field y como se manejan
                    initialValues={{
                        // (Nullish coalescing operator(??)) cliente?nombre = si es que existe cliente, revisamos la propiedad y si esta undefined, rellena vacia la propiedad
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? "",

                    }}
                    // enableReinitialize resetea el form si es que tiene valores
                    enableReinitialize={true}
                    onSubmit={async (valores, { resetForm }) => {
                        await handelSubmit(valores)

                        // funcion reset de formik
                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {/* "data" trae toda la informacion del formulario, por destructuring es mejor abarcar errores */}
                    {({ errors, touched }) => {
                        return (
                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >
                                        Nombre:
                                    </label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Nombre del cliente"
                                        name='nombre'
                                    />
                                    {/* Importando el componente, mediante el nombre muestra los errores de la data por yup y formik */}
                                    {/* <ErrorMessage name="nombre"/> */  /* Es mejor hacer errores personalizados porque no se pueden añadir clases */}
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta errors={errors.nombre} />
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >
                                        Empresa:
                                    </label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Empresa del cliente"
                                        name='empresa'
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta errors={errors.empresa} />
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >
                                        E-mail:
                                    </label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Email del cliente"
                                        name='email'
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta errors={errors.email} />
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >
                                        Teléfono:
                                    </label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Telefono del cliente"
                                        name='telefono'
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta errors={errors.telefono} />
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >
                                        Notas:
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200 h-40"
                                        placeholder="Notas del cliente"
                                        name='notas'
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
