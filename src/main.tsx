import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: Error | null}> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App render error:', error, info);
  }
  render() {
    if (this.state.error) {
      return React.createElement('div', {
        style: { padding: 24, fontFamily: 'monospace', color: '#b00020', whiteSpace: 'pre-wrap' }
      }, 'App crashed: ' + (this.state.error.message || String(this.state.error)) +
         '\n\n' + (this.state.error.stack || ''));
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary><App /></ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)