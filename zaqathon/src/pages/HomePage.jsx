import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import JsonPreview from '../components/JsonPreview';
import { parseEmail } from '../utils/parser';
import { validateOrder } from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const { setOrder } = useOrder();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleDataLoaded = (text) => {
    const parsed = parseEmail(text);
    const validated = validateOrder(parsed);
    setPreview(validated);
    setOrder(validated);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h2>Smart Order Intake</h2>
      <p>Upload a customer email in .txt format to extract order data:</p>
      <FileUploader onDataLoaded={handleDataLoaded} />
      {preview && (
        <>
          <h3>Parsed Order Preview (JSON)</h3>
          <JsonPreview data={preview} />
          <button onClick={() => navigate('/review')} style={{ marginTop: '10px' }}>
            Edit & Finalize Order
          </button>
        </>
      )}
    </div>
  );
}