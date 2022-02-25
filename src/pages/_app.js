import '../styles/globals.css'

import Layout from '../layouts/main'

// Chakra
import { ChakraProvider } from '@chakra-ui/react'

// theme
import theme from '../lib/theme'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
