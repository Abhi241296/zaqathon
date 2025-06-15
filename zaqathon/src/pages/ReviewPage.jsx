import React from 'react';
import { useOrder } from '../context/OrderContext';
import OrderEditor from '../components/OrderEditor';
import Navbar from '../components/Navbar';

export default function ReviewPage() {
  const { order, setOrder } = useOrder();

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'order.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!order) return <p>No order data found. Go back and upload a file first.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h2>Edit & Finalize Order</h2>
      <OrderEditor data={order} onChange={setOrder} />
      <button className="btn btn-primary mt-4" onClick={downloadJson}>Download Order Summary (.json)</button>
    </div>
  );
}