import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import JsonPreview from './components/JsonPreview';
import OrderEditor from './components/OrderEditor';
import { parseEmail } from './utils/parser';
import { validateOrder } from './utils/validator';
import './App.css'

export default function App() {
  const [parsedOrder, setParsedOrder] = useState(null);
  const [validatedOrder, setValidatedOrder] = useState(null);
  const [mode, setMode] = useState('preview'); // 'preview' or 'edit'

  // Called when file text is loaded
  const handleDataLoaded = (text) => {
    const parsed = parseEmail(text);
    const validated = validateOrder(parsed);
    setParsedOrder(parsed);
    setValidatedOrder(validated);
  };

  // Handle edits from OrderEditor
  const handleUpdate = (newData) => {
    // In a full implementation, re-validate here if needed.
    setValidatedOrder({ ...validatedOrder, ...newData });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Smart Order Intake</h1>
      <p>Upload an email (.txt) with the order request.</p>
      <FileUploader onDataLoaded={handleDataLoaded} />
      {validatedOrder && (
        <>
          <div style={{ margin: '10px 0' }}>
            <button onClick={() => setMode('preview')}>View JSON Preview</button>
            <button onClick={() => setMode('edit')} style={{ marginLeft: '10px' }}>Edit Order</button>
          </div>
          {mode === 'preview' && (
            <>
              <h2>Order JSON Preview</h2>
              <JsonPreview data={validatedOrder} />
            </>
          )}
          {mode === 'edit' && (
            <>
              <h2>Edit Parsed Order</h2>
              <OrderEditor data={validatedOrder} onChange={handleUpdate} />
              <div style={{ marginTop: '10px' }}>
                <strong>Final JSON:</strong>
                <pre style={{ background: '#f9f9f9', padding: '10px' }}>
                  {JSON.stringify(validatedOrder, null, 2)}
                </pre>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
