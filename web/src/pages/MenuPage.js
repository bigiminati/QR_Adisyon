// web/src/pages/MenuPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Fallback URL: önce .env’den oku, olmazsa localhost’a yönlendir
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function MenuPage() {
  const { cafeId, tableId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts]     = useState([]);
  const [cart, setCart]             = useState([]);

  useEffect(() => {
    console.log('🎯 MenuPage mounted, cafeId=', cafeId, 'tableId=', tableId);
    const url = `${BASE_URL}/${cafeId}/categories`;
    console.log('🔗 About to fetch categories from:', url);

    fetch(url)
      .then(response => {
        console.log('📶 categories response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('📋 categories data:', data);
        setCategories(data);
      })
      .catch(err => {
        console.error('❌ Fetch categories error:', err);
      });
  }, [cafeId, tableId]);

  const loadProducts = (categoryId) => {
    console.log('🛎  loadProducts called for categoryId=', categoryId);
    const url = `${BASE_URL}/${cafeId}/products?category_id=${categoryId}`;
    console.log('🔗 About to fetch products from:', url);

    fetch(url)
      .then(response => {
        console.log('📶 products response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('📋 products data:', data);
        setProducts(data);
      })
      .catch(err => {
        console.error('❌ Fetch products error:', err);
      });
  };

  const addToCart = (product) => {
    console.log('➕ addToCart:', product);
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
  };

  const placeOrder = async () => {
    console.log('📝 placeOrder, cart:', cart);
    try {
      const url = `${BASE_URL}/${cafeId}/orders`;
      const body = { table_id: Number(tableId), items: cart };
      console.log('🔗 POST to:', url, 'body:', body);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      console.log('📶 order response status:', res.status);
      const order = await res.json();
      console.log('📋 created order:', order);
      navigate(`/checkout/${order.id}`);
    } catch (err) {
      console.error('❌ placeOrder error:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Menü — Masa {tableId}</h1>

      <div style={{ marginBottom: 20 }}>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => loadProducts(c.id)}
            style={{ margin: 5, padding: '8px 12px' }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(p => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              margin: 5,
              padding: 10,
              width: 200
            }}
          >
            <h3>{p.name}</h3>
            <p>{p.price}₺</p>
            <button onClick={() => addToCart(p)}>Sepete Ekle</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={placeOrder}
          disabled={cart.length === 0}
          style={{ padding: '10px 20px', fontSize: 16 }}
        >
          Siparişi Gönder ({cart.length} kalem)
        </button>
      </div>
    </div>
  );
}
