import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import {
  Box, Flex, Input, Text, Textarea, useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { format, getYear } from 'date-fns';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';

import nookies, { setCookie, parseCookies } from 'nookies';
import Loader from '../components/threeDLoader';
import { api } from '../services/api';
const ThreeD = dynamic(() => import('../components/threeD'), {
  ssr: false,
  loading: () => <Loader />,
});

const sendEmailFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('Email é obrigatório'),
  message: yup.string().required('Mensagem é obrigatória'),
});

function Home() {
  const router = useRouter();

  const [age, setAge] = useState();
  const [yWork, setYWork] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(sendEmailFormSchema),
  });

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

  async function handleSendMail(data) {
    try {
      const { mailSended } = nookies.get();
      if (mailSended === String(format(new Date(), 'dd/MM/yyyy'))) {
        toast.error('You already sent email today, you can send another email tomorrow.');
      } else {
        await api.post('/api/mail', data);
        await setCookie(undefined, 'mailSended', format(new Date(), 'dd/MM/yyyy'), {
          maxAge: 60 * 60 * 24 * 5, // 5 days
        });
        toast.success('Email successfully sent');
      }
    } catch (err) {
      toast.error('Error sending email');
    }
  }

  return (
    <Box>
      <Flex justifyContent="space-between" h="300px">
        <Box w="100%">
          <Box pl="2" pr="2" lineHeight="52px">
            <Text
              fontSize="42"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Hi, Im Pedro Ferreira,
            </Text>
            <Text
              fontSize="42"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              This is My Personal Website.
            </Text>
          </Box>
          {isWideVersion ? (
            <Box pl="2" pr="2">
              <Text
                fontSize="16"
                opacity="0.5"
                w="480px"
                mt="4"
                fontFamily="Ubuntu Condensed; sans-serif"
              >
                My name is Pedro Ferreira, I'm
                {' '}
                {age}
                {' '}
                years old, I've been working with programming for
                {' '}
                {yWork}
                {' '}
                years. I currently live in Brazil, working with (Java Script, React, Next.js, Node.js, React Native, GoLang, and others).
              </Text>
              <Button
                mt="2"
                size="md"
                colorScheme="pink"
                onClick={() => router.push('/about')}
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="500"
              >
                Read More
              </Button>
            </Box>
          ) : (
            <Box pl="2" pr="2">
              <Text
                fontSize="16"
                opacity="0.5"
                w="100%"
                mt="4"
                fontFamily="Ubuntu Condensed; sans-serif"
              >
                My name is Pedro Ferreira, I'm
                {' '}
                {age}
                {' '}
                years old, I've been working with programming for
                {' '}
                {yWork}
                {' '}
                years. I currently live in Brazil, working with (Java Script, React, Next.js, Node.js, React Native, GoLang, and others).
              </Text>
              <Button
                mt="2"
                size="md"
                colorScheme="pink"
                onClick={() => router.push('/about')}
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="500"
              >
                Read More
              </Button>
            </Box>
          )}

        </Box>
        {isWideVersion && (
        <Box w="480px">
          <ThreeD />
        </Box>
        )}
      </Flex>

      {/* Projects */}
      <Flex pl="4" pr="4" pb="6" mt="10" pt="6" bg="rgba(0, 0, 0, 0.08)" borderRadius={6} flexDirection="column" alignItems="center" justifyContent="center">
        <Text
          fontSize="42"
          fontFamily="Ubuntu Condensed; sans-serif"
          fontWeight="bold"
          color="pink"
        >
          {'</>'}
        </Text>
        <Text
          mt="-5px"
          fontSize="42"
          fontFamily="Ubuntu Condensed; sans-serif"
          fontWeight="bold"
          transition="0.2s"
          // onClick={() => router.push('/projects')}
          _hover={{ textDecoration: 'underline #ff79c6', cursor: 'pointer', opacity: 0.89 }}
        >
          Projects:
        </Text>

        {isWideVersion ? (
          <Text
            fontSize="14"
            w="400px"
            align="center"
            fontFamily="Ubuntu Condensed; sans-serif"
            fontWeight="300"
            opacity="0.5"
          >
            Some of my projects, which are in development, to find out more about it, click on the desired project card.
          </Text>
        ) : (
          <Text
            fontSize="14"
            w="100%"
            align="center"
            fontFamily="Ubuntu Condensed; sans-serif"
            fontWeight="300"
            opacity="0.5"
          >
            Some of my projects, which are in development, to find out more about it, click on the desired project card.
          </Text>
        )}

        {isWideVersion ? (
          <Flex pt="8" justifyContent="center" h="300px">
            <Box w="240px" mr="32px">
              <motion.div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', marginRight: '32px', width: '240px', height: '240px', background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.09, cursor: 'pointer', opacity: 0.8, borderRadius: '16px', border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1.2,
                }}
              >
                <img style={{ width: '160px', marginTop: '6px' }} src="/company.svg" />
                <Text ml="2" mt="4" opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  <Text fontWeight="bold" as="span">Company,</Text>
                  {' '}
                  is a future company, waiting for more details...
                </Text>
              </motion.div>

            </Box>
            {/* 2 */}
            <Box w="240px" mr="32px">
              <motion.div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', marginRight: '32px', width: '240px', height: '240px', background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.09, cursor: 'pointer', opacity: 0.8, borderRadius: '16px', border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1.2,
                }}
              >
                <img style={{ width: '160px' }} />
                <Text opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  ...
                </Text>
              </motion.div>

            </Box>

            {/* 3 */}
            <Box w="240px" mr="32px">
              <motion.div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', marginRight: '32px', width: '240px', height: '240px', background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.09, cursor: 'pointer', opacity: 0.8, borderRadius: '16px', border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1.2,
                }}
              >
                <img style={{ width: '160px' }} />
                <Text opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  ...
                </Text>
              </motion.div>

            </Box>
          </Flex>
        ) : (
          <>
            <Box w="100%" mt="4">
              {/* 1 */}
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  width: '100%',
                  height: '240px',
                  background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.02,
                  cursor: 'pointer',
                  opacity: 0.8,
                  borderRadius: '16px',
                  border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1,
                }}
              >
                <img style={{ width: '200px' }} src="/convertetudo.svg" />
                <Text mt="2" mb="2" opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  <Text fontWeight="bold" as="span">Converte Tudo,</Text>
                  {' '}
                  is a website that has the main functionality to perform conversions...
                </Text>
              </motion.div>
            </Box>

            <Box w="100%" mt="4">
              {/* 1 */}
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  width: '100%',
                  height: '240px',
                  background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.02,
                  cursor: 'pointer',
                  opacity: 0.8,
                  borderRadius: '16px',
                  border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1,
                }}
              >
                <img style={{ width: '180px', marginTop: '12px' }} src="/company.svg" />
                <Text mt="4" mb="2" opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  {/* <Text fontWeight="bold" as="span">Company</Text> */}
                  {' '}
                  is a future company, waiting for more details...
                </Text>
              </motion.div>
            </Box>

            <Box w="100%" mt="4">
              {/* 1 */}
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  width: '100%',
                  height: '240px',
                  background: useColorModeValue('white', '#44475a'),
                }}
                transition={{
                  type: 'spring',
                  duration: 0.55,
                }}
                whileHover={{
                  scale: 1.02,
                  cursor: 'pointer',
                  opacity: 0.8,
                  borderRadius: '16px',
                  border: '2px solid #ff79c6',
                }}
                whileTap={{
                  border: '4px solid #ff79c6',
                  scale: 1,
                }}
              >
                <img style={{ width: '180px', marginTop: '12px' }} />
                <Text mt="4" mb="2" opacity="0.6" fontFamily="Ubuntu Condensed; sans-serif" fontWeight="300" fontSize="14">
                  ...
                </Text>
              </motion.div>
            </Box>
          </>
        )}

      </Flex>

      <Flex
        bg="rgba(0, 0, 0, 0.08)"
        p="8"
        borderRadius="20"
        mt="12"
        mb="12"
        w="100%"
        as="form"
        onSubmit={handleSubmit(handleSendMail)}
        flexDir="column"
      >
        <Text
          id="#contato"
          fontFamily="Ubuntu; sans-serif"
          fontWeight={500}
          fontSize={18}
          color="pink.500"
          mb="2"
        >
          Contato:
        </Text>
        <Text
          fontFamily="Ubuntu; sans-serif"
          fontWeight={500}
          fontSize={14}
          mb="2"
        >
          Instagram:
          {' '}
          <Text as="span" fontWeight="400">
            <a href="https://instagram.com/pedrolcsf">@pedrolcsf</a>
            {' '}
          </Text>
        </Text>

        <Text
          fontFamily="Ubuntu; sans-serif"
          fontWeight={500}
          fontSize={14}
          ml="0.5"
          mb="4"
        >
          E-mail:
          {' '}
          <Text as="span" fontFamily="Ubuntu; sans-serif" fontWeight="400"> pedrolcsferreira@gmail.com</Text>
        </Text>
        <Input {...register('name')} name="name" fontFamily="Ubuntu; sans-serif" mb="4" placeholder="Nome:" />
        <Input {...register('email')} type="email" name="email" fontFamily="Ubuntu; sans-serif" mb="4" placeholder="E-mail:" />
        <Textarea {...register('message')} name="message" fontFamily="Ubuntu; sans-serif" mb="4" placeholder="Mensagem:" />

        <Flex justifyContent="space-between">
          <Box />
          <Button type="submit" fontFamily="Ubuntu; sans-serif" colorScheme="pink" w="200px">Send</Button>
        </Flex>
      </Flex>

    </Box>
  );
}

export default Home;
