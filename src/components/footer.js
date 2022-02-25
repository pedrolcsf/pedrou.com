import { Flex, Box, useColorModeValue, Button } from '@chakra-ui/react'
import { RiGithubLine, RiInstagramLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri'

const Footer = () => {
  return (
    <>
    <Box color={useColorModeValue('#282a36', '#f8f8f2')} align="center" opacity={0.5} fontFamily='Ubuntu Condensed; sans-serif' fontSize="sm">
      &copy; {new Date().getFullYear()} Pedro Ferreira - All rights reserved.
    </Box>
    <Flex justifyContent="center" mt="2" align="center" opacity={0.5} fontSize="sm">
      <Button
        as="a"
        cursor="pointer"
        href="https://github.com/pedrolcsf/"
        size="sm"
      >
        <RiGithubLine color={useColorModeValue('#282a36', '#f8f8f2')} />
      </Button>
      <Button
        as="a"
        cursor="pointer"
        href="https://twitter.com/pedrolcsf"
        size="sm"
        ml="2"
      >
        <RiTwitterLine color={useColorModeValue('#282a36', '#f8f8f2')} />
      </Button>
      <Button
        as="a"
        cursor="pointer"
        href="https://www.instagram.com/pedrolcsf/"
        size="sm"
        ml="2"
      >
        <RiInstagramLine color={useColorModeValue('#282a36', '#f8f8f2')} />
      </Button>
      <Button
        as="a"
        cursor="pointer"
        href="https://www.linkedin.com/in/pedrolcsf/"
        size="sm"
        ml="2"
      >
        <RiLinkedinLine color={useColorModeValue('#282a36', '#f8f8f2')} />
      </Button>
    </Flex>
    </>

  )
}

export default Footer
