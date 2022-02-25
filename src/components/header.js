import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Link,
  useBreakpointValue
} from '@chakra-ui/react'

import NextLink  from 'next/link'

import Logo from './logo'
import ToggleThemeButton from './toggleThemeButton'

const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={undefined}
        color={active ? '#ff79c6' : ''}
        mr="6"
        fontFamily="Ubuntu Condensed; sans-serif"
        fontSize="16"
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Header = (props) => {
  const { path } = props

  const active = path === '/' ? '/' : ''

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box
      w="100vw"
    >
      <Flex
        as="header"
        w="100%"
        maxW="1280px"
        h="20"
        mx="auto"
        pt="12"
        px="24"
        align="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Heading>
            <Logo active={active} />
          </Heading>
          <Box ml="16">
            <LinkItem href="/projects" path={path}>Projects</LinkItem>
            <LinkItem href="/posts" path={path}>Posts</LinkItem>
            <LinkItem href="/about" path={path}>About</LinkItem>
            <LinkItem href="/contact" path={path}>Contact</LinkItem>
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Heading alignItems="center">
            <ToggleThemeButton />
          </Heading>
        </Flex>
      </Flex>
    </Box>
    )
}

export default Header
