import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { AppTheme } from '@services/AppTheme.ts'
import { BrowserRouter } from 'react-router'
import { AppQueryClientProvider } from '@services/QueryClient'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppQueryClientProvider>
      <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={AppTheme}>
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </AppQueryClientProvider>
  </StrictMode>,
)
