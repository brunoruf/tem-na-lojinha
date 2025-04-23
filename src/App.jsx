import { useState, useEffect } from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://brunoruf.com.br/openmarket-api/tmp/lista.json');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="app">
      <h1>Lista de Itens</h1>
      <ul className="items-list">
      {items
        .filter(item => item["Current Quantity"] > 0)
        .sort((a, b) => a.Name.localeCompare(b.Name)) // Ordem alfabética
        .map((item, index) => (
          <ProductCard
            key={item.Barcode}
            name={item.Name}
            price={item["Current Price"]}
            quantity={item["Current Quantity"]}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;