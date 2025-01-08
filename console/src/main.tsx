import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { AppTheme } from '@services/AppTheme.ts'
import { BrowserRouter } from 'react-router'
import { RootRoute } from '@routes/root'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={AppTheme}>
        <RootRoute />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
