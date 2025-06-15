import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext'
import './index.css'
import AppRoutes from './routes/appRoutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
      <Router>
        <AppRoutes />
      </Router>
    </OrderProvider>
  </StrictMode>,
)
