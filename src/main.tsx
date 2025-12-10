import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Basket from './Basket.tsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme.ts'
import MyProfile from './MyProfile.tsx'
import ProductDetailWrapper from './ProductDetailWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route path="/products" element={<App />} />
          <Route path="/basket" element = {<Basket/>}/>
          <Route path="/products/:id" element={<ProductDetailWrapper />} /> 

          <Route path="/account" element = {<MyProfile/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
