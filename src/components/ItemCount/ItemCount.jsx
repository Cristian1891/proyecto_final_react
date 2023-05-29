import React from 'react'

export const ItemCount = ({cantidad, setCantidad, stock, agregar}) => {

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < stock && setCantidad(cantidad + 1)
    }

  return (
    <>
        <div>
            <button 
                onClick={handleRestar} 
                className={`btn mx-1 py-2 px-4 rounded bg-yellow-500 ${cantidad === 1 ? "boton" : ''} ${cantidad === 1 ? "btn-outline-danger" : "btn-outline-primary"}`}
                disabled={cantidad === 1}
            >
                -
            </button>

            <span className="mx-2">{cantidad}</span>

            <button 
                onClick={handleSumar} 
                className={cantidad === stock ? "mx-1 bg-red-500 py-2 px-4 rounded" : "mx-1 bg-blue-500 py-2 px-4 rounded"}
                disabled={cantidad === stock}
            >
                +
            </button>
            <br/>
            <button onClick={agregar} className="bg-green-500 text-white font-bold py-2 px-4 rounded my-2">Agregar al carrito</button>
        </div>
    </>
  )
}
