import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const About = () => {
  const router = useRouter()
  return (
    <>
    <Head>
      <title>Posts - Pedro Ferreira</title>
    </Head>

    <Flex alignItems="center" h="55vh" flexDir="column" justifyContent="center">
      <Text color="#ff79c6"  size="62">-</Text>

      <Text
        mt="24px"
        fontSize="32"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="300"
        transition="0.2s"
        onClick={() => router.push('/')}
        _hover={{textDecoration: 'underline #ff79c6', cursor: 'pointer', opacity: 0.89}}
      >No posts found
      </Text>

    </Flex>
    </>
  )
}

export default About
