import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteSwitch from './RouteSwitch';
import './styles/_main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouteSwitch />
    </QueryClientProvider>
  </React.StrictMode>
)
