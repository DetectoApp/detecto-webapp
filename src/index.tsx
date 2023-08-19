import { ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider as SupabaseProvider } from 'react-supabase';
import App from './App';
import supabase from './supabase';
import { theme } from './chakra_components/theme';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container!);

root.render(
  <StrictMode>
    <SupabaseProvider value={supabase}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SupabaseProvider>
  </StrictMode>
);
