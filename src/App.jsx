import { useState, useEffect } from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // ← novo estado

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

  const normalize = (str) =>
    str
      .normalize("NFD") // separa acento da letra
      .replace(/[\u0300-\u036f]/g, "") // remove os acentos
      .toLowerCase(); // ignora maiúsculas

  const filteredItems = items
    .filter(item => item["Current Quantity"] > 0)
    .filter(item => normalize(item.Name).includes(normalize(search)))
    .sort((a, b) => a.Name.localeCompare(b.Name));

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="app">
      <div className='header'>
        <img src='./images/open-market-logo.png' alt='Open Market Logo' className='logo' />
        <h1 className='title'>Tem na Lojinha?</h1>
      </div>
      <input
        type="text"
        placeholder="Digite o produto para buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="items-list">
        {filteredItems.length === 0 ? (
          <div className="no-results">Poxa, não temos nenhum item em estoque com esse nome na lojinha. :(</div>
        ) : (
          filteredItems.map((item) => (
            <ProductCard
              key={item.Barcode}
              name={item.Name}
              price={item["Current Price"]}
              quantity={item["Current Quantity"]}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
