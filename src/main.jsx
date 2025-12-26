import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreContainer from './Components/Context/StoreContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <StoreContainer> 
     <App />
     </StoreContainer>
  </StrictMode>,
)
