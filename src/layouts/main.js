import Head from 'next/head'

// Header
import Header from '../components/header'

import { Box, Container } from '@chakra-ui/react'
import Footer from '../components/footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb="8">
    <Head>
      <title>Pedro Ferreira</title>
      <link rel="icon" href="/icon.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Megrim&family=Ubuntu+Condensed&display=swap" rel="stylesheet" />
    </Head>
    <Header path={router.asPath} />
    {/* maxW certo é = container.md */}
      <Container maxW="980" pt={16} pb={16}>
        {children}
      </Container>
    <Footer />
    </Box>
  )
}

export default Main
