import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider 
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
      supportedWallets={["metamask", "rabby", "core"]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
)