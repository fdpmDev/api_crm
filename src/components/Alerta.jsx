
export const Alerta = ({errors}) => {
    return (
        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase '>
            {errors}
        </div>
    )
}
