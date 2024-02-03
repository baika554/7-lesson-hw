import React, { useState, useMemo, useCallback } from 'react';

const OrderDetails = ({ products }) => {
  const [quantities, setQuantities] = useState({});

  const totalCost = useMemo(() => {
    console.log('Вычисление общей стоимости заказа');

    return Object.keys(quantities).reduce((total, productId) => {
      const product = products.find(p => p.id === parseInt(productId));
      const quantity = quantities[productId];

      if (product) {
        return total + product.price * quantity;
      }
      return total;
    }, 0);

  }, [quantities, products]);

  const handleQuantityChange = useCallback((productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  }, []);

    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto', background: '#283142', color: '#fff', padding: '20px' }}>
      <h2>Детали заказа</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <span>{product.name}:</span>
            <input
              type="number"
              value={quantities[product.id] || 0}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              style={{ marginLeft: '10px', width: '50px' }}
            />
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '20px', fontSize: '18px' }}>Общая стоимость заказа: ${totalCost}</p>
    </div>
  );
};

const App = () => {
  const initialProducts = [
    { id: 1, name: 'Картошка (10$)', price: 10 },
    { id: 2, name: 'Помидоры (20$)', price: 20 },
    { id: 3, name: 'Огурцы (30$)', price: 30 },
  ];

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px', background: '#1a1f26', minHeight: '100vh' }}>
      <OrderDetails products={initialProducts} />
    </div>
  );
};

export default App;
