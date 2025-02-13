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
import Loader from '../components/threeDLoader';
import { api } from '../services/api';
import { fetchGitHubReposFav } from '../services/githubService';
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

  const [repos, setRepos] = useState([]);

  const [age, setAge] = useState();
  const [yWork, setYWork] = useState();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(sendEmailFormSchema),
  });

  // Função para buscar repositórios do GitHub
  const fetchRepositories = useCallback(async () => {
    const loadRepos = async () => {
      const repositories = await fetchGitHubReposFav();
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

            {isWideVersion ? (
              <Button
                mt="2"
                size="md"
                w="150px"
                colorScheme="pink"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/about');
                }}
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="500"
              >
                Read More
              </Button>
            ) : (
              <Button
                mt="2"
                size="md"
                w="100%"
                colorScheme="pink"
                onClick={() => router.push('/about')}
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="500"
              >
                Read More
              </Button>
            )}

          </Flex>
          {isWideVersion && (
          <Flex>
            <ThreeD />
          </Flex>
          )}

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
          <Flex alignItems="center" flexDir="column" w="100%">
            <Text
              fontSize="26"
              color="pink.400"
              textDecoration="underline"
              mb="2"
              fontFamily="Ubuntu Condensed; sans-serif"
              fontWeight="bold"
            >
              {'</> '}
              <Text onClick={() => router.push('/projects')} as="span" color="pink.300" cursor="pointer">Projects:</Text>
            </Text>

            {isWideVersion ? (
              <Text
                fontSize="14"
                mb="4"
                textAlign="center"
                opacity="0.5"
                w="470px"
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="bold"
              >

                These are my main projects, to see them all, click on the button below, and to know more about each one, just click on the project.
              </Text>
            ) : (
              <Text
                fontSize="14"
                mb="4"
                textAlign="center"
                w="100%"
                opacity="0.5"
                fontFamily="Ubuntu Condensed; sans-serif"
                fontWeight="bold"
              >

                These are my main projects, to see them all, click on the button below, and to know more about each one, just click on the project.
              </Text>
            )}

            <Flex flexDir={isWideVersion ? 'row' : 'column'}>
              {repos.slice(0, 3).map((repo) => (
                <motion.div
                  key={repo.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    marginRight: isWideVersion ? '32px' : '0',
                    marginBottom: isWideVersion ? '0' : '16px',
                    width: isWideVersion ? '240px' : '100%',
                    height: '240px',
                    background: useColorModeValue('white', '#44475a'),
                    cursor: 'pointer',
                  }}
                  transition={{
                    type: 'spring',
                    duration: 0.55,
                  }}
                  whileHover={{
                    scale: 1.09,
                    opacity: 0.8,
                    borderRadius: '16px',
                    border: '2px solid #ff79c6',
                  }}
                  whileTap={{
                    border: '4px solid #ff79c6',
                    scale: 1.2,
                  }}
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <Text
                    fontSize="18"
                    fontFamily="Ubuntu Condensed; sans-serif"
                    fontWeight="bold"
                    mt="2"
                  >
                    {repo.name}
                  </Text>
                  <Text
                    textAlign="center"
                    opacity="0.6"
                    mt="4"
                    fontFamily="Ubuntu Condensed; sans-serif"
                    fontWeight="300"
                    fontSize="14"
                  >
                    {repo.description || 'No description available.'}
                  </Text>
                </motion.div>
              ))}
            </Flex>

          </Flex>
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
              <>
                <Text
                  textAlign="center"
                  mt="4"
                  fontSize="14"
                  fontFamily="Ubuntu Condensed; sans-serif"
                  opacity="0.7"
                  w="380px"
                  fontWeight="300"
                >
                  I've been working with programming for
                  {' '}
                  {yWork}
                  {' '}
                  years. I currently live in Brazil, working with (Java Script, React, React Native, Node.js, Next.js, Arduino, GoLang, and others).
                </Text>
                <Text
                  fontSize="14"
                  textAlign="center"
                  mt="4"
                  fontFamily="Ubuntu Condensed; sans-serif"
                  opacity="0.7"
                  w="380px"
                  fontWeight="300"
                >

                  I currently use nextjs, nodejs and golang in my main projects.
                  To contact me, send a message on any of the social networks below.
                </Text>
              </>
            ) : (
              <Text
                fontSize="16"
                opacity="0.5"
                w="100%"
                mt="4"
                fontFamily="Ubuntu Condensed; sans-serif"
              >
                I've been working with programming for 3 years. I currently live in Brazil, working with (Java Script, React, React Native, Node.js, Next.js, Arduino, GoLang, and others).

                I currently use nextjs, nodejs and golang in my main projects. To contact me, send a message on any of the social networks below.
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
