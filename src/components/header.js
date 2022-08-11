import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';

import NextLink from 'next/link';

import Logo from './logo';
import ToggleThemeButton from './toggleThemeButton';

function LinkItem({
  href, path, _target, children, ...props
}) {
  const active = path === href;
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={undefined}
        color={active ? 'blue.500' : ''}
        mr="6"
        fontFamily="Ubuntu Condensed; sans-serif"
        fontSize="16"
        fontWeight={active ? '700' : '300'}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
}

function Header(props) {
  const { path } = props;

  const active = path === '/' ? '/' : '';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box
      w="100vw"
    >
      <Flex
        as="header"
        w="100%"
        maxW="1080px"
        pl="4"
        pr="4"
        h="20"
        mx="auto"
        mt="8"
        align="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Heading>
            <Logo active={active} />
          </Heading>
          {isWideVersion && (
          <Box ml="16">
            {/* <LinkItem href="/projects" path={path}>Projects</LinkItem> */}
            {/* <LinkItem href="/posts" path={path}>Posts</LinkItem> */}
            {/* <LinkItem href="/about" path={path}>About</LinkItem> */}
            {/* <LinkItem href="/contact" path={path}>Contact</LinkItem> */}
          </Box>
          )}

        </Flex>

        <Flex alignItems="center">
          <Heading alignItems="center">
            <ToggleThemeButton />
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
