import React from 'react'
import carrito from '../../assets/carrito.png'
import { Link } from 'react-router-dom'
import './CartWidget.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

export const CartWidget = () => {

  const { cart, totalCantidad } = useContext(CartContext)

  return (
    <>
        <Link to='/cart'>
          <img src={carrito} className="mr-3 h-6 sm:h-9 cursor-pointer"/>
        </Link>
        <span className={`cart-widget ${cart.length > 0 ? 'cart-widget-active' : ''}`}>{totalCantidad()}</span>
        
    </>
  )
}
