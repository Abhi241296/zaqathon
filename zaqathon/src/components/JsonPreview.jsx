// src/components/JsonPreview.js
import React from 'react';

export default function JsonPreview({ data }) {
  return (
    <div className="mockup-code whitespace-pre-wrap max-w-4xl overflow-auto mt-4 bg-base-100 border">
      <code>{JSON.stringify(data, null, 2)}</code>
    </div>
  );
}