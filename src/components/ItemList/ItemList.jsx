import React from 'react'
import { ItemCard } from '../ItemCard/ItemCard'

export const ItemList = ({items, categoria}) => {
  return (
    <>
    {
      categoria
         ? <h1 className='text-center my-5 text-2xl pt-24'>{categoria}</h1>
         : <h1 className='text-center my-5 text-2xl pt-24'>Productos</h1>
    }
      <hr/>

      <div className="flex justify-center items-center gap-4 flex-wrap">

        {
          items.map((prod) => <ItemCard item={prod} key={prod.id} />)
        }
      </div>
    </>
  )
}
