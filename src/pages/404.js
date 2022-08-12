import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RiErrorWarningLine } from 'react-icons/ri';

function Error() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <Flex mb="6" flexDir="column" w="100%" h="calc(100vh - 240px)" justifyContent="center" alignItems="center">
        <Flex flexDir="column" alignItems="center" w="100%" maxW="1000px">
          <RiErrorWarningLine color="orange" size="62" />

          <Text
            mt="24px"
            fontSize="36"
            fontFamily="Ubuntu Condensed; sans-serif"
            fontWeight="bold"
            transition="0.2s"
            onClick={() => router.push('/')}
            _hover={{ textDecoration: 'underline #ff79c6', cursor: 'pointer', opacity: 0.89 }}
          >
            Page Not Found
          </Text>
        </Flex>

      </Flex>

    </>
  );
}

export default Error;
