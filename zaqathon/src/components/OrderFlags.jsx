import React from 'react';

export default function OrderFlags({ flags }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div className="alert alert-warning mt-6">
      <div>
        <span className="font-semibold">⚠️ Issues Detected:</span>
        <ul className="list-disc ml-6 mt-2">
          {flags.map((f, idx) => (
            <li key={idx}>
              <strong>{f.sku || 'Unknown SKU'}:</strong> {f.flag} – {f.suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}