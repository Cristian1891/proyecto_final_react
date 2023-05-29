import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"

export const Cart = () => {

  const { cart, emptyCart, totalCompra, removeItem } = useContext(CartContext)

    if (cart.length === 0) {
        return (
            <div className="container my-5 py-24">
                <h2>Tu carrito está vacío</h2>
                <hr/>
                <p>Andá a comprar algo</p>
                <Link to="/">
                  <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Ver productos</button>
                </Link>
            </div>
        )
    }

  return (
    <>
      <div className="container py-24">
            <h2 className="text-center my-5">Tu compra</h2>
            <hr/>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {
                  cart.map((item) => (
                      <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-7">
                          <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.nombre}</h3>
                          <img className="p-8 rounded-t-lg" src={item.img}/>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">Cantidad: {item.cantidad}</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">Subotal: {item.cantidad * item.precio}</p>
                          <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded my-2"><FaTrashAlt/></button>
                          <hr/>
                      </div>
                  ))
              }
            </div>
            <div className="flex items-center justify-center">
                <hr/>
                <h3 className="my-8 mr-5">TOTAL: ${totalCompra()}</h3>
                <button onClick={emptyCart} className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Vaciar carrito</button>
                <Link to="/checkout">
                  <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Terminar mi compra</button>
                </Link>
            </div>
            
      </div>
    </>
  )
}
