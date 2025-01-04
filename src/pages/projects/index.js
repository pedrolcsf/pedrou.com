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

  useEffect(() => {
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
              <Text as="span" color="pink.300">Projects:</Text>
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

            <Flex flexWrap="wrap" justifyContent="center">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    margin: '16px',
                    width: '240px',
                    height: '240px',
                    background: useColorModeValue('white', '#44475a'),
                  }}
                  transition={{
                    type: 'spring',
                    duration: 0.55,
                  }}
                  whileHover={{
                    scale: 1.09,
                    cursor: 'pointer',
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
