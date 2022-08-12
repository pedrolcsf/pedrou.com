import Head from 'next/head';

// Header
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/header';

import Footer from '../components/footer';

function Main({ children, router }) {
  return (
    <Box as="main">
      <Head>
        <title>Pedro Ferreira</title>
        <link rel="icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Megrim&family=Ubuntu+Condensed&display=swap" rel="stylesheet" />
      </Head>
      <Header path={router.asPath} />
      <Container maxW="100vw">
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Main;
