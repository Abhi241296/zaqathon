// src/components/OrderEditor.js
import React from 'react';

export default function OrderEditor({ data, onChange }) {
  // Render each item with editable fields
  const handleItemChange = (idx, field, value) => {
    const newItems = data.items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: newItems });
  };

  const handleAddressChange = (e) => {
    onChange({ ...data, deliveryAddress: e.target.value });
  };
  const handleDeadlineChange = (e) => {
    onChange({ ...data, deliveryDeadline: e.target.value });
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px' }}>
      <h3>Edit Order Items</h3>
      {data.items.map((item, idx) => (
        <div key={idx} style={{ marginBottom: '8px' }}>
          <input
            type="text"
            value={item.sku || item.name}
            disabled
            style={{ width: '150px' }}
          />{' '}
          <input
            type="text"
            value={item.name}
            onChange={e => handleItemChange(idx, 'name', e.target.value)}
            style={{ width: '200px' }}
          />{' '}
          Quantity: <input
            type="number"
            value={item.quantity}
            onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
            style={{ width: '60px' }}
          />{' '}
          {item.flag && <span style={{ color: 'red' }} title={item.suggestion}>
            ⚠️ {item.flag}
          </span>}
        </div>
      ))}
      <h3>Delivery Details</h3>
      <div>
        Address: <input
          type="text"
          value={data.deliveryAddress}
          onChange={handleAddressChange}
          style={{ width: '400px' }}
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        Deadline: <input
          type="text"
          value={data.deliveryDeadline}
          onChange={handleDeadlineChange}
          style={{ width: '200px' }}
        />
      </div>
    </div>
  );
}