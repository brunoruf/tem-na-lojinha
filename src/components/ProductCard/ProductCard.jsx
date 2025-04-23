import React from 'react'
import './style.css'

export const ProductCard = ({name, price, barcode, quantity}) => {
  return (
    <div className="product-card">
        <h3 className='product-title'>{name}</h3>
        <div className='product-info'>
          <p>Quantidade na loja: <strong>{quantity}</strong></p>
          <p>Preço: <strong>R$ {price.toFixed(2)}</strong></p>
        </div>
    </div>
  )
}
