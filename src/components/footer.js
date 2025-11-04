import {
  Flex, Box, Button,
} from '@chakra-ui/react';
import {
  RiGithubLine, RiInstagramLine, RiLinkedinLine, RiTwitterLine,
} from 'react-icons/ri';

const iconColor = '#f8f8f2';

function Footer() {
  return (
    <>
      <Box
        color={iconColor}
        align="center"
        opacity={0.7}
        fontFamily="Ubuntu Condensed; sans-serif"
        fontSize={{ base: 'xs', md: 'sm' }}
        mt={{ base: 6, md: 8 }}
        mb={{ base: 2, md: 4 }}
        px={{ base: 4, md: 0 }}
        position="relative"
        zIndex={1}
      >
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Pedro Ferreira - Todos os direitos reservados.
      </Box>
      <Flex
        justifyContent="center"
        mb={{ base: '20px', md: '40px' }}
        align="center"
        opacity={0.7}
        fontSize="sm"
        position="relative"
        zIndex={1}
        gap={2}
      >
        <Button
          as="a"
          href="https://github.com/pedrolcsf/"
          size="sm"
          aria-label="GitHub Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiGithubLine color={iconColor} />
        </Button>
        <Button
          as="a"
          href="https://twitter.com/pedrolcsf"
          size="sm"
          aria-label="Twitter Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTwitterLine color={iconColor} />
        </Button>
        <Button
          as="a"
          href="https://www.instagram.com/pedrolcsf/"
          size="sm"
          aria-label="Instagram Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiInstagramLine color={iconColor} />
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/in/pedrolcsf/"
          size="sm"
          aria-label="LinkedIn Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiLinkedinLine color={iconColor} />
        </Button>
      </Flex>
    </>

  );
}

export default Footer;
