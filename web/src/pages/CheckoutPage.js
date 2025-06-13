import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { orderId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: Number(orderId) })
    })
      .then(() => nav('/success'))
      .catch(console.error);
  }, [orderId, nav]);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Ödemeniz işleniyor…</h1>
      <p>Lütfen bekleyin.</p>
    </div>
  );
}
