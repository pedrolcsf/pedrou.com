import Head from 'next/head';

import { Box, Container } from '@chakra-ui/react';

import Footer from '../components/footer';

const siteUrl = 'https://pedrou.com';
const siteName = 'Pedro Ferreira';
const siteDescription = 'Senior Software Engineer especializado em Backend, Node.js, NestJS e desenvolvimento de APIs escaláveis. Portfólio de projetos e experiência profissional.';
const siteImage = `${siteUrl}/logo.png`;
const twitterHandle = '@pedrolcsf';

function Main({ children, router }) {
  const currentUrl = `${siteUrl}${router.asPath}`;
  const isHomePage = router.asPath === '/';

  return (
    <Box as="main">
      <Head>
        <title>{isHomePage ? siteName : `${siteName} - ${router.asPath.replace('/', '').charAt(0).toUpperCase() + router.asPath.slice(2)}`}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="Pedro Ferreira, Software Engineer, Backend Developer, Node.js, NestJS, React, Next.js, Full Stack Developer, API Development" />
        <meta name="author" content="Pedro Ferreira" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <link rel="canonical" href={currentUrl} />
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:creator" content={twitterHandle} />
        <meta name="twitter:site" content={twitterHandle} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Pedro Ferreira',
              jobTitle: 'Senior Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'NeuroVerse',
              },
              url: siteUrl,
              sameAs: [
                'https://github.com/pedrolcsf',
                'https://twitter.com/pedrolcsf',
                'https://www.instagram.com/pedrolcsf',
                'https://www.linkedin.com/in/pedrolcsf',
              ],
              email: 'pedrolcsferreira@gmail.com',
              image: siteImage,
              description: siteDescription,
            }),
          }}
        />
      </Head>
      <Container maxW="100vw" overflowX="hidden">
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Main;
