import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'

import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
import Loader from '../components/threeDLoader'
import { motion } from 'framer-motion'

const ThreeD = dynamic(() => import('../components/threeD'), {
  ssr: false,
  loading: () => <Loader />
})

import { Box, Flex, Text } from '@chakra-ui/react'

const Home = () => {
  const router = useRouter()

  return (
    <Box>
    <Flex justifyContent="space-between" h="300px">
    <Box w="100%">
    <Box lineHeight="56px">
      <Text
        fontSize="48"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="bold"
      >Hi, Im Pedro Ferreira,
      </Text>
      <Text
        fontSize="48"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="bold"
      >This is My Personal Porfolio.
      </Text>
    </Box>
    <Box>
    <Text
      fontSize="16"
      opacity="0.5"
      w="480px"
      mt="4"
      fontFamily='Ubuntu Condensed; sans-serif'
    >
      My name is Pedro Ferreira, I'm 19 years old, I've been working with programming for 2 years. I currently live in Brazil, working with (Java Script, React, Next.js, Node.js, React Native, GoLang, and others).
    </Text>
    <Button
      mt="2"
      size="md"
      bg="#ff79c6"
      color="#282a36"
      onClick={() => router.push('/about')}
      fontFamily='Ubuntu Condensed; sans-serif'
      fontWeight="300"
    >
      Read More
    </Button>
    </Box>
    </Box>
    <Box w="480px">
      <ThreeD />
    </Box>
    </Flex>

    {/* Projects */}
    <Flex mt="12" flexDirection="column" alignItems="center" justifyContent="center">
      <Text
        fontSize="42"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="bold"
        color="#ff79c6"
      > {'</>'}
      </Text>
      <Text
        mt="-5px"
        fontSize="42"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="bold"
        transition="0.2s"
        onClick={() => router.push('/projects')}
        _hover={{textDecoration: 'underline #ff79c6', cursor: 'pointer', opacity: 0.89}}
      >Projects:
      </Text>

      <Text
        fontSize="14"
        w="400px"
        align="center"
        fontFamily='Ubuntu Condensed; sans-serif'
        fontWeight="300"
        opacity="0.5"
      >
        Some of my projects, which are in development, to find out more about it, click on the desired project card.
      </Text>
    </Flex>

    <Flex mt="8" justifyContent="center" h="300px">
      <Box w="240px" mr="32px">
      {/* 1 */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius:"6px", width: "240px", height: "240px", background: useColorModeValue('#ededde', '#44475a')}}
        transition={{
          type: "spring",
          duration: 0.55,
        }}
        whileHover={{ scale: 1.09, cursor: "pointer", opacity: 0.8, borderRadius: "16px", border: '2px solid #ff79c6' }}
        whileTap={{
          border: '4px solid #ff79c6',
          scale: 1.2,
        }}
      >
        <img style={{ width: '200px'}}  src="/convertetudo.svg" />
      </motion.div>
      <Text mt="2" opacity="0.6" fontFamily='Ubuntu Condensed; sans-serif' fontWeight="300" fontSize="14">
        <Text fontWeight="bold" as="span">Converte Tudo,</Text> is a website that has the main functionality to perform conversions...
      </Text>
      </Box>
      {/* 2 */}
      <Box w="240px" mr="32px">
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius:"6px", marginRight: "32px", width: "240px", height: "240px", background: useColorModeValue('#ededde', '#44475a')}}
        transition={{
          type: "spring",
          duration: 0.55,
        }}
        whileHover={{ scale: 1.09, cursor: "pointer", opacity: 0.8, borderRadius: "16px", border: '2px solid #ff79c6' }}
        whileTap={{
          border: '4px solid #ff79c6',
          scale: 1.2,
        }}
        >
        <img style={{ width: '150px'}}  src="/company.svg" />
      </motion.div>
      <Text mt="2" opacity="0.6" fontFamily='Ubuntu Condensed; sans-serif' fontWeight="300" fontSize="14">
        <Text fontWeight="bold" as="span">Company,</Text> is a future company, waiting for more details...
      </Text>
      </Box>

      {/* 3 */}
      <Box
        opacity="0.5"
        style={{ borderRadius:"6px", marginRight: "32px", width: "240px", height: "240px", background: useColorModeValue('#ededde', '#44475a')}}
      >
        <img width="400" height="400" style={{opacity: 0}}/>
        <Text mt="2" opacity="0.6" fontFamily='Ubuntu Condensed; sans-serif' fontWeight="300" fontSize="14">
          <Text fontWeight="bold" as="span">...</Text>
        </Text>
      </Box>

    </Flex>


    </Box>
  )
}

export default Home
