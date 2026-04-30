import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { SellerAuthProvider } from "./seller/SellerAuthContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SellerAuthProvider>
      <CustomerAuthProvider>
        <App />
      </CustomerAuthProvider>
    </SellerAuthProvider>
  </React.StrictMode>,
)
