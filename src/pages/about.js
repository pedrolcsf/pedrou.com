import { Box, Flex, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
import { getYear } from 'date-fns';
import { useEffect, useState } from 'react';

function About() {
  const [age, setAge] = useState();
  const [yWork, setYWork] = useState();

  useEffect(() => {
    const year = getYear(new Date());
    const a = year - 2002;
    setAge(a);
    setYWork(a - 17);
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex h="55vh" flexDir="column" justifyContent="center">
      {isWideVersion ? (
        <Flex alignItems="center" justifyContent="center">
          <Box>
            <Box w="160px" borderRadius="50%" border="4px solid #ff79c6">
              <img width="160px" style={{ borderRadius: '50%' }} src="https://avatars.githubusercontent.com/u/60015167?v=4" />
            </Box>
          </Box>

          <Box>
            <Text
              fontSize="36"
              ml="8"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Pedro Ferreira.
            </Text>

            <Text
              fontSize="28"
              ml="8"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="300"
              opacity="0.8"
            >
              ( Software Developer )
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex alignItems="center" flexDir="column" justifyContent="center">
          <Flex alignItems="center" justifyContent="center">
            <Flex alignItems="center" justifyContent="center" w="100%" borderRadius="50%" border="4px solid #ff79c6">
              <img width="160px" style={{ borderRadius: '50%' }} src="https://avatars.githubusercontent.com/u/60015167?v=4" />
            </Flex>
          </Flex>

          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Text
              fontSize="36"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Pedro Ferreira
            </Text>

            <Text
              fontSize="24"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="300"
              opacity="0.8"
            >
              ( Software Developer )
            </Text>
          </Flex>
        </Flex>
      )}

      {isWideVersion ? (
        <Flex alignItems="center" mt="12" justifyContent="center">
          <Box>
            <Text
              fontSize="36"
              ml="8"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Hi, Im Pedro Ferreira, I'm
              {' '}
              {age}
              {' '}
              years old.
            </Text>

            <Text
              fontSize="16"
              ml="8"
              fontFamily="Ubuntu Condensed; sans-serif"
              opacity="0.7"
              w="600px"
              fontWeight="300"
            >
              I've been working with programming for
              {' '}
              {yWork}
              {' '}
              years. I currently live in Brazil, working with (Java Script, React, React Native, Node.js, Next.js, Arduino, GoLang, and others).
            </Text>
            <Text
              fontSize="16"
              mt="4"
              ml="8"
              fontFamily="Ubuntu Condensed; sans-serif"
              opacity="0.7"
              w="600px"
              fontWeight="300"
            >

              I currently use nextjs, nodejs and golang in my main projects.
              To contact me, send a message on any of the social networks below.
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex alignItems="center" mt="12" justifyContent="center">
          <Flex flexDir="column" w="100%" alignItems="center" justifyContent="center">
            <Text
              fontSize="34"
              lineHeight="40px"
              mb="4"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Hi, Im Pedro Ferreira, I'm
              {' '}
              {age}
              {' '}
              years old.
            </Text>

            <Text
              fontSize="16"
              fontFamily="Ubuntu Condensed; sans-serif"
              opacity="0.7"
              w="100%"
              fontWeight="300"
            >
              I've been working with programming for
              {' '}
              {yWork}
              {' '}
              years. I currently live in Brazil, working with (Java Script, React, React Native, Node.js, Next.js, Arduino, GoLang, and others).
            </Text>

            <Text
              fontSize="16"
              mt="4"
              fontFamily="Ubuntu Condensed; sans-serif"
              opacity="0.7"
              w="100%"
              fontWeight="300"
            >
              I currently use nextjs, nodejs and golang in my main projects.
              To contact me, send a message on any of the social networks below.
            </Text>

          </Flex>
        </Flex>
      )}

    </Flex>
  );
}

export default About;
