import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/color-mode"
import { BrowserRouter } from "react-router-dom"
import ChatProvider from './Context/ChatProvider';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChatProvider>
        <App />
      </ChatProvider>
    </ChakraProvider>

  </BrowserRouter>

);