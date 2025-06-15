import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-md" style={{
      backgroundColor: '#f3f4f6',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
      fontFamily: 'Arial, sans-serif',
      fontWeight: '500',
      fontSize: '18px'
    }}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Smart Order Intake</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <Link to="/review" className="btn btn-ghost">Review</Link>
      </div>
    </div>
  );
}