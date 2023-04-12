import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"

const users = new QueryClient
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={users}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </QueryClientProvider>
  
)
