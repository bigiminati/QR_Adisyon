import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage     from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage  from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:cafeId/menu/:tableId" element={<MenuPage />} />
        <Route path="/checkout/:orderId" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
