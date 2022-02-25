import { Box, Flex, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { RiShareLine } from 'react-icons/ri'
import Header from '../components/header'

const About = () => {
  return (
    <Flex h="55vh" flexDir="column" justifyContent="center">
    <Flex alignItems="center" justifyContent="center">
      <Box>
        <Box w="160px" borderRadius="50%" border="4px solid #ff79c6">
          <img width="160px" style={{borderRadius: "50%"}} src="/me.jpeg"/>
        </Box>
      </Box>

      <Box>
        <Text
          fontSize="36"
          ml="8"
          fontFamily='Ubuntu Condensed; sans-serif'
          fontWeight="bold"
        >Pedro Ferreira.
        </Text>

        <Text
          fontSize="28"
          ml="8"
          fontFamily='Ubuntu Condensed; sans-serif'
          fontWeight="300"
          opacity="0.8"
        >( Developer )
        </Text>
      </Box>
    </Flex>

    <Flex alignItems="center" mt="12" justifyContent="center">
      <Box>
        <Text
          fontSize="36"
          ml="8"
          fontFamily='Ubuntu Condensed; sans-serif'
          fontWeight="bold"
        >Hi, Im Pedro Ferreira, I'm 19 years old.
        </Text>

        <Text
          fontSize="16"
          ml="8"
          fontFamily='Ubuntu Condensed; sans-serif'
          opacity="0.7"
          w="600px"
          fontWeight="300"
        >I've been working with programming for 2 years. I currently live in Brazil, working with (Java Script, React, React Native, Node.js, Next.js, Arduino, GoLang, and others).
        </Text>
      </Box>
    </Flex>
    </Flex>
  )
}

export default About
