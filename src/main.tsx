import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-54W75JHXDJ')

ReactGA.send({ hitType: 'pageview', page: window.location.pathname })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)