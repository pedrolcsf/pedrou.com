import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import Layout from '../layouts/main';

// theme
import theme from '../lib/theme';

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer autoClose={3000} />
    </ChakraProvider>
  );
}

export default MyApp;
