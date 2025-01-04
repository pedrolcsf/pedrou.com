import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import {
  Flex, Input, Text, Textarea, useBreakpointValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { format, getYear } from 'date-fns';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';

import nookies, { setCookie } from 'nookies';
import Loader from '../../components/threeDLoader';
import { api } from '../../services/api';
import { fetchGitHubRepos } from '../../services/githubService';
const ThreeD = dynamic(() => import('../../components/threeD'), {
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

  const [repos, setRepos] = useState([]);

  const [age, setAge] = useState();
  const [yWork, setYWork] = useState();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(sendEmailFormSchema),
  });

  // Função para buscar repositórios do GitHub
  const fetchRepositories = useCallback(async () => {
    const loadRepos = async () => {
      const repositories = await fetchGitHubRepos();
      setRepos(repositories);
    };

    loadRepos();
  }, []);

  const setMyAge = useCallback(() => {
    const dateOfBirth = new Date('2002-05-01');
    const dateNow = new Date();
    const age = dateNow.getFullYear() - dateOfBirth.getFullYear();
    setAge(age - 1);
  }, []);

  const setYearsWork = useCallback(() => {
    const dateNow = new Date();
    const year = getYear(dateNow);
    setYWork(year - 2019);
  }, []);

  useEffect(() => {
    setMyAge();
    setYearsWork();
    fetchRepositories();
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
        await setCookie(undefined, 'mailSended', format(new Date(), 'dd/MM/yyyy'), {
          maxAge: 60 * 60 * 24 * 5, // 5 days
        });
        await api.post('/api/mail', data);
        toast.success('Email successfully sent');
      }
    } catch (err) {
      toast.error('Error sending email');
    }
  }

  return (
    <Flex mb="6" flexDir="column" w="100%" justifyContent="center" alignItems="center">
      <Flex flexDir="column" align="center" w="100%" maxW="1000px">
        <Flex
          mb="4"
          p="6"
          w="100%"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={6}
        >
          <Flex flexDir="column" w="100%">
            <Text
              fontSize="36"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Hi, Im Pedro Ferreira,
            </Text>
            <Text
              fontSize="36"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              This is My Personal Website.
            </Text>
            {isWideVersion ? (
              <Text
                fontSize="16"
                opacity="0.5"
                w="400px"
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
                years. I currently live in Brazil, working with (JavaScript, React, React Native, Next.js, Node.js, C# , GoLang, and others).
              </Text>
            ) : (
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
            )}

          </Flex>
          {isWideVersion && (
          <Flex>
            <ThreeD />
          </Flex>
          )}

        </Flex>

        <Flex
          mb="6"
          mt="4"
          p="6"
          w="100%"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={6}
          id="#about"
        >
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
          >
            <img width="120px" style={{ borderRadius: '50%' }} src="https://avatars.githubusercontent.com/u/60015167?v=4" />
            <Text
              mt="4"
              textAlign="center"
              fontSize="24"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              Pedro Ferreira
            </Text>

            <Text
              textAlign="center"
              fontSize="22"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
              textDecor="underline"
              color="pink"
            >
              ( Software Developer )
            </Text>

            {isWideVersion ? (
              <Text
                textAlign="center"
                mt="4"
                fontSize="14"
                fontFamily="Ubuntu Condensed; sans-serif"
                opacity="0.7"
                w="380px"
                fontWeight="300"
              >

                I have been working professionally in the field of programming for over six years, honing my skills and building a diverse range of expertise. Currently based in Brazil, I have had the opportunity to work on a variety of projects, utilizing some of the most in-demand and cutting-edge technologies in the industry.
                <br />
                <br />
                My technical expertise includes a strong command of JavaScript, React, React Native, Node.js, Next.js, Arduino, GoLang, and many other tools and frameworks. These technologies have allowed me to craft robust, scalable, and high-performance applications across multiple domains.
                {' '}
                <br />
              </Text>
            ) : (
              <Text
                fontSize="16"
                opacity="0.5"
                w="100%"
                mt="4"
                fontFamily="Ubuntu Condensed; sans-serif"
              >

                I have been working professionally in the field of programming for over six years, honing my skills and building a diverse range of expertise. Currently based in Brazil, I have had the opportunity to work on a variety of projects, utilizing some of the most in-demand and cutting-edge technologies in the industry.
                <br />
                <br />
                My technical expertise includes a strong command of JavaScript, React, React Native, Node.js, Next.js, Arduino, GoLang, and many other tools and frameworks. These technologies have allowed me to craft robust, scalable, and high-performance applications across multiple domains.
                {' '}
                <br />
              </Text>
            )}

          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            w="100%"
          >

            {isWideVersion ? (
              <Text
                textAlign="center"
                mt="4"
                fontSize="14"
                fontFamily="Ubuntu Condensed; sans-serif"
                opacity="0.7"
                w="380px"
                fontWeight="300"
              >

                In my most recent endeavors, I have focused heavily on Next.js, Node.js, and GoLang as the backbone of my main projects. These technologies enable me to deliver fast, reliable, and efficient solutions tailored to meet complex business needs.
                <br />
                <br />
                Additionally, my experience with React and React Native has given me a strong foundation in building dynamic web and mobile applications, ensuring seamless user experiences. My work with Arduino has further broadened my skill set, incorporating hardware integration and IoT solutions into my repertoire.
                <br />
                <br />
                I’m always eager to connect with like-minded professionals, collaborate on exciting new projects, or simply exchange ideas about technology and innovation.
                <br />
                <br />
                If you'd like to get in touch, feel free to send me a message on any of the social networks below. I’m always open to discussing new opportunities, sharing knowledge, or helping solve challenging problems.
              </Text>
            ) : (
              <Text
                fontSize="16"
                opacity="0.5"
                w="100%"
                mt="4"
                fontFamily="Ubuntu Condensed; sans-serif"
              >

                In my most recent endeavors, I have focused heavily on Next.js, Node.js, and GoLang as the backbone of my main projects. These technologies enable me to deliver fast, reliable, and efficient solutions tailored to meet complex business needs.
                <br />
                <br />
                Additionally, my experience with React and React Native has given me a strong foundation in building dynamic web and mobile applications, ensuring seamless user experiences. My work with Arduino has further broadened my skill set, incorporating hardware integration and IoT solutions into my repertoire.
                <br />
                <br />
                I’m always eager to connect with like-minded professionals, collaborate on exciting new projects, or simply exchange ideas about technology and innovation.
                <br />
                <br />
                If you'd like to get in touch, feel free to send me a message on any of the social networks below. I’m always open to discussing new opportunities, sharing knowledge, or helping solve challenging problems.
              </Text>
            )}

          </Flex>

        </Flex>

        <Flex
          bg={useColorModeValue('rgba(0, 0, 0, 0.10)', 'rgba(0, 0, 0, 0.20)')}
          border="1px solid rgba(0, 0, 0, 0.09)"
          mb="4"
          p="6"
          w="100%"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={6}
        >
          <Flex flexDir="column" w="100%">
            <Text
              fontSize="26"
              color="pink.500"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
              mb="2"
            >
              Contact:
            </Text>
            <Text
              fontSize="16"
              color={useColorModeValue('pink.300', 'pink.100')}
              fontFamily="Ubuntu Condensed; sans-serif"

            >
              <Text as="span" fontWeight="bold">E-mail: </Text>
              pedrolcsferreira@gmail.com
            </Text>

            <Text
              fontSize="16"
              color={useColorModeValue('pink.300', 'pink.100')}
              fontFamily="Ubuntu Condensed; sans-serif"

            >
              <Text as="span" fontWeight="bold">Instagram: </Text>
              @pedrolcsf
            </Text>

            <Text
              fontSize="16"
              color={useColorModeValue('pink.300', 'pink.100')}
              mb="4"
              fontFamily="Ubuntu Condensed; sans-serif"

            >
              <Text as="span" fontWeight="bold">Twitter: </Text>
              @pedrolcsf
            </Text>

            <Flex flexDir="column" as="form" onSubmit={handleSubmit(handleSendMail)}>
              <Input
                {...register('name')}
                name="name"
                bg={useColorModeValue('white', '#282a36')}
                fontFamily="Ubuntu; sans-serif"
                mb="2"
                placeholder="Nome:"
              />
              <Input
                {...register('email')}
                type="email"
                bg={useColorModeValue('white', '#282a36')}
                name="email"
                fontFamily="Ubuntu; sans-serif"
                mb="2"
                placeholder="E-mail:"
              />
              <Textarea bg={useColorModeValue('white', '#282a36')} {...register('message')} name="message" fontFamily="Ubuntu; sans-serif" mb="4" placeholder="Mensagem:" />

              {isWideVersion ? (
                <Button
                  mt="2"
                  size="md"
                  type="submit"
                  colorScheme="pink"
                  fontWeight="bold"
                  fontFamily="Ubuntu Condensed; sans-serif"
                  width="160px"
                >
                  Send
                </Button>
              ) : (
                <Button
                  mt="2"
                  size="md"
                  type="submit"
                  w="100%"
                  colorScheme="pink"
                  fontWeight="bold"
                  fontFamily="Ubuntu Condensed; sans-serif"
                >
                  Send
                </Button>
              )}
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
