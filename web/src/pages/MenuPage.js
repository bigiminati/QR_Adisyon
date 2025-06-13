import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MenuPage() {
  const { cafeId, tableId } = useParams();
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts]     = useState([]);
  const [cart, setCart]             = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${cafeId}/categories`)
      .then(r => r.json())
      .then(setCategories)
      .catch(console.error);
  }, [cafeId]);

  const loadProducts = (catId) => {
    fetch(`${process.env.REACT_APP_API_URL}/${cafeId}/products?category_id=${catId}`)
      .then(r => r.json())
      .then(setProducts)
      .catch(console.error);
  };

  const addToCart = (p) => setCart(c => [...c, { ...p, quantity: 1 }]);

  const placeOrder = () => {
    fetch(`${process.env.REACT_APP_API_URL}/${cafeId}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table_id: Number(tableId), items: cart })
    })
      .then(r => r.json())
      .then(order => nav(`/checkout/${order.id}`))
      .catch(console.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Menü — Masa {tableId}</h1>
      <div>
        {categories.map(c => (
          <button key={c.id} onClick={() => loadProducts(c.id)} style={{ margin: 5 }}>
            {c.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', margin: 5, padding: 10 }}>
            <h3>{p.name}</h3>
            <p>{p.price}₺</p>
            <button onClick={() => addToCart(p)}>Sepete Ekle</button>
          </div>
        ))}
      </div>
      <button
        onClick={placeOrder}
        disabled={cart.length === 0}
        style={{ marginTop: 20, padding: '10px 20px' }}
      >
        Siparişi Gönder ({cart.length})
      </button>
    </div>
  );
}
