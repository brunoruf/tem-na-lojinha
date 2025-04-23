import React from 'react'
import './style.css'

export const ProductCard = ({name, price, barcode, quantity}) => {
  return (
    <div className="product-card">
        <h3>{name}</h3>
        <p>Preço: R$ {price.toFixed(2)}</p>
        <p>Quantidade: {quantity}</p>
    </div>
  )
}
