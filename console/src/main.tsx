import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { AppTheme } from '@services/AppTheme.ts'
import { BrowserRouter } from 'react-router'
import { AppQueryClientProvider } from '@services/QueryClient'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppQueryClientProvider>
      <BrowserRouter>
        <ThemeProvider theme={AppTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AppQueryClientProvider>
  </StrictMode>,
)
