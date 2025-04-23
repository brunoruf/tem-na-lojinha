import React from 'react';
import './style.css';

export const ProductCard = ({ name, price, quantity }) => {
  const availability = quantity > 0 ? 'tem' : 'nao-tem'; // Condicional para classes CSS

  return (
    <div className="product-card">
      <h3 className="product-title">{name}</h3>
      <div className="product-info">
        <div className={`availability ${availability}`}> {/* Aplica a classe conforme a disponibilidade */}
          {quantity > 0 ? 'TEM NA LOJA' : 'NÃO TEM'}
        </div>
        <p>Preço: <strong>R$ {price.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};
