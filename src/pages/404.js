import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RiErrorWarningLine } from 'react-icons/ri'

const Error = () => {
  const router = useRouter()
  return (
    <>
    <Head>
      <title>404 - Page Not Found</title>
    </Head>

    <Flex alignItems="center" h="55vh" flexDir="column" justifyContent="center">
      <RiErrorWarningLine color="#f1fa8c"  size="62" />

      <Text
        mt="24px"
        fontSize="36"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="bold"
        transition="0.2s"
        onClick={() => router.push('/')}
        _hover={{textDecoration: 'underline #ff79c6', cursor: 'pointer', opacity: 0.89}}
      >Page Not Found
      </Text>

    </Flex>
    </>
  )
}

export default Error
