import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Flex, Text, useBreakpointValue, Box, Heading, VStack, HStack, SimpleGrid, Badge, Icon, Button,
} from '@chakra-ui/react';
import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { getYear } from 'date-fns';
import {
  RiCodeSSlashLine, RiRocketLine, RiLightbulbFlashLine, RiLinksLine, RiBriefcaseLine, RiCalendarLine, RiMailLine, RiCameraLine,
} from 'react-icons/ri';
import { colors } from '../utils/colors';
import Loader from '../components/threeDLoader';
import { fetchGitHubReposFav } from '../services/githubService';
import Typewriter from '../components/typewriter';
import CineTechBackground from '../components/cineTechBackground';

const ThreeD = dynamic(() => import('../components/threeD'), {
  ssr: false,
  loading: () => <Loader />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const technologies = [
  'JavaScript', 'TypeScript', 'Node.js', 'NestJS', 'React',
  'Next.js', 'Redis', 'RabbitMQ', 'MongoDB', 'PostgreSQL',
  'Prisma', 'Docker', 'AWS', 'Electron', 'C#',
  'Jest', 'Arduino', 'PHP',
];

const careerTimeline = [
  {
    year: '2025',
    title: 'Senior Software Engineer',
    company: 'NeuroVerse',
    description: 'Contribuindo para plataforma de assistente IA para escritórios de advocacia, desenvolvendo features core para plataforma de clones IA, e implementando soluções de geração de música com IA. Desenhando e otimizando APIs e pipelines assíncronos.',
    technologies: ['Node.js', 'NestJS', 'Redis', 'RabbitMQ', 'AWS'],
    type: 'current',
  },
  {
    year: '2024',
    title: 'Software Engineer',
    company: 'Roboteasy',
    description: 'Contribuí para o desenvolvimento do software de automação RPA Roboteasy e orquestração de workflows. Construí features desktop com C# e Electron.',
    technologies: ['C#', 'Electron', 'RPA'],
    type: 'past',
  },
  {
    year: '2024',
    title: 'Senior Software Engineer',
    company: 'One ID',
    description: 'Desenvolvi plataformas white-label de membros apoiadores, app mobile OneID para eventos com carteira digital NFC. Desenhei e integrei APIs para membros, tickets e operações de carteira.',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'NFC'],
    type: 'past',
  },
  {
    year: '2023',
    title: 'Software Engineer',
    company: 'One ID',
    description: 'Construí sistema de gestão de membros para um grande clube de futebol brasileiro, cobrindo compra de ingressos, gestão de marketing, planos de membros e benefícios.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'MongoDB'],
    type: 'past',
  },
  {
    year: '2020',
    title: 'Software Engineer',
    company: 'Selprom Tecnologia',
    description: 'Lidei com sistema de controle e monitoramento de semáforos, evoluindo de monitoramento para controle remoto. Construí ferramenta desktop de manutenção com Electron, desenvolvi ferramentas baseadas em Arduino e implementei sistema de gestão de inventário.',
    technologies: ['Node.js', 'Electron', 'Arduino', 'Docker', 'Linux'],
    type: 'past',
  },
  {
    year: '2019',
    title: 'Software Engineer Intern',
    company: 'Selprom Tecnologia',
    description: 'Construí sistema de monitoramento de semáforos usando PHP, JavaScript, HTML, Bootstrap e Google Maps API para visibilidade em tempo real. Implementei polling de status de dispositivos e marcadores de incidentes.',
    technologies: ['PHP', 'JavaScript', 'HTML', 'Bootstrap', 'Google Maps API'],
    type: 'past',
  },
];

function Home() {
  const router = useRouter();
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [yWork, setYWork] = useState();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  const projectCardBoxShadow = useBreakpointValue({
    base: '0 15px 40px rgba(255, 121, 198, 0.25)',
    md: '0 18px 50px rgba(255, 121, 198, 0.28)',
    lg: '0 20px 60px rgba(255, 121, 198, 0.3)',
  });

  const careerCardBoxShadow = useBreakpointValue({
    base: '0 5px 15px rgba(255, 121, 198, 0.2)',
    md: '0 8px 22px rgba(255, 121, 198, 0.2)',
    lg: '0 10px 30px rgba(255, 121, 198, 0.2)',
  });

  useEffect(() => {
    const { portfolio } = router.query;
    if (portfolio === 'programming' || portfolio === 'photography') {
      setSelectedPortfolio(portfolio);
    }
  }, [router.query]);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoadingRepos(true);
      const repositories = await fetchGitHubReposFav();
      setRepos(repositories || []);
    } catch (error) {
      setRepos([]);
    } finally {
      setLoadingRepos(false);
    }
  }, []);

  const setYearsWork = useCallback(() => {
    const dateNow = new Date();
    const year = getYear(dateNow);
    setYWork(year - 2019);
  }, []);

  useEffect(() => {
    setYearsWork();
    fetchRepositories();
  }, [setYearsWork, fetchRepositories]);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  return (
    <Box position="relative" minH="100vh" w="100%" bg="#0a0a0f" overflow="hidden">
      <CineTechBackground />
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(255, 121, 198, 0.06) 0%, transparent 40%, rgba(189, 147, 249, 0.06) 100%)"
        opacity={0.8}
      />
      <Flex
        flexDir="column"
        w="100%"
        position="relative"
        zIndex={1}
        pt={{
          base: '60px', sm: '70px', md: '75px', lg: '80px',
        }}
        pb={{
          base: '60px', sm: '80px', md: '90px', lg: '100px',
        }}
      >
        <Box
          maxW="1200px"
          mx="auto"
          px={{
            base: '16px', sm: '24px', md: '32px', lg: '40px',
          }}
          w="100%"
        >
          {!selectedPortfolio && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <VStack spacing={12} align="stretch" minH={{ base: '60vh', md: '70vh', lg: '80vh' }} justify="center">
                <Box textAlign="center" mb={{ base: 8, md: 9, lg: 10 }}>
                  <motion.div variants={itemVariants}>
                    <Heading
                      fontSize={{
                        base: '36px', sm: '48px', md: '56px', lg: '64px',
                      }}
                      fontWeight="bold"
                      bgGradient="linear(to-r, brand.500, dracula.purple)"
                      bgClip="text"
                      mb={4}
                      px={{ base: 2, md: 0 }}
                    >
                      Pedro Ferreira
                    </Heading>
                    <Text
                      fontSize={{
                        base: '15px', sm: '17px', md: '18px', lg: '20px',
                      }}
                      color={colors.comment}
                      maxW="600px"
                      mx="auto"
                      px={{ base: 4, md: 0 }}
                      lineHeight="1.6"
                    >
                      Escolha qual área do meu portfólio deseja explorar
                    </Text>
                  </motion.div>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }} mt={{ base: 8, md: 10, lg: 12 }}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box
                      as="button"
                      onClick={() => {
                        router.push('/?portfolio=programming', undefined, { shallow: true });
                        setSelectedPortfolio('programming');
                      }}
                      bg={colors.cardBg}
                      backdropFilter="blur(12px)"
                      borderRadius={{
                        base: '20px', sm: '24px', md: '28px', lg: '32px',
                      }}
                      p={{
                        base: '32px', sm: '40px', md: '50px', lg: '60px',
                      }}
                      border="2px solid"
                      borderColor={colors.cardBorder}
                      _hover={{
                        borderColor: 'brand.500',
                        boxShadow: '0 30px 80px rgba(255, 121, 198, 0.3)',
                      }}
                      transition="all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                      cursor="pointer"
                      position="relative"
                      overflow="hidden"
                      h="100%"
                      minH={{
                        base: '280px', sm: '300px', md: '350px', lg: '400px',
                      }}
                    >
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient="linear(to-br, brand.500, dracula.purple)"
                        opacity={0}
                        _hover={{ opacity: 0.05 }}
                        transition="opacity 0.3s ease"
                      />
                      <VStack
                        align="center"
                        spacing={6}
                        position="relative"
                        zIndex={1}
                        h="100%"
                        justify="center"
                      >
                        <Box
                          p={6}
                          borderRadius="20px"
                          bg="rgba(255, 121, 198, 0.1)"
                          border="2px solid"
                          borderColor="brand.500"
                        >
                          <Icon as={RiCodeSSlashLine} color="brand.500" fontSize={{ base: '48px', md: '56px', lg: '64px' }} />
                        </Box>
                        <Heading
                          fontSize={{
                            base: '24px', sm: '28px', md: '32px', lg: '36px',
                          }}
                          fontWeight="bold"
                          color={colors.foreground}
                        >
                          Programação
                        </Heading>
                        <Text
                          fontSize={{
                            base: '14px', sm: '16px', md: '17px', lg: '18px',
                          }}
                          color={colors.comment}
                          textAlign="center"
                          maxW="400px"
                          lineHeight="1.7"
                        >
                          Projetos de desenvolvimento, tecnologias que trabalho e minha experiência como Software Engineer.
                        </Text>
                        <HStack spacing={2} mt={4}>
                          <Text
                            fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                            color="brand.500"
                            fontWeight="600"
                          >
                            Explorar
                          </Text>
                          <Icon as={RiRocketLine} color="brand.500" fontSize={{ base: '18px', md: '19px', lg: '20px' }} />
                        </HStack>
                      </VStack>
                    </Box>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box
                      as="button"
                      onClick={() => {
                        router.push('/?portfolio=photography', undefined, { shallow: true });
                        setSelectedPortfolio('photography');
                      }}
                      bg={colors.cardBg}
                      backdropFilter="blur(12px)"
                      borderRadius={{
                        base: '20px', sm: '24px', md: '28px', lg: '32px',
                      }}
                      p={{
                        base: '32px', sm: '40px', md: '50px', lg: '60px',
                      }}
                      border="2px solid"
                      borderColor={colors.cardBorder}
                      _hover={{
                        borderColor: 'dracula.purple',
                        boxShadow: '0 30px 80px rgba(189, 147, 249, 0.3)',
                      }}
                      transition="all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                      cursor="pointer"
                      position="relative"
                      overflow="hidden"
                      h="100%"
                      minH={{
                        base: '280px', sm: '300px', md: '350px', lg: '400px',
                      }}
                    >
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient="linear(to-br, dracula.purple, brand.500)"
                        opacity={0}
                        _hover={{ opacity: 0.05 }}
                        transition="opacity 0.3s ease"
                      />
                      <VStack
                        align="center"
                        spacing={6}
                        position="relative"
                        zIndex={1}
                        h="100%"
                        justify="center"
                      >
                        <Box
                          p={6}
                          borderRadius="20px"
                          bg="rgba(189, 147, 249, 0.1)"
                          border="2px solid"
                          borderColor="dracula.purple"
                        >
                          <Icon as={RiCameraLine} color="dracula.purple" fontSize={{ base: '48px', md: '56px', lg: '64px' }} />
                        </Box>
                        <Heading
                          fontSize={{
                            base: '24px', sm: '28px', md: '32px', lg: '36px',
                          }}
                          fontWeight="bold"
                          color={colors.foreground}
                        >
                          Fotografia & Cinema
                        </Heading>
                        <Text
                          fontSize={{
                            base: '14px', sm: '16px', md: '17px', lg: '18px',
                          }}
                          color={colors.comment}
                          textAlign="center"
                          maxW="400px"
                          lineHeight="1.7"
                        >
                          Meus trabalhos visuais, projetos de fotografia e minha paixão por contar histórias através de imagens.
                        </Text>
                        <HStack spacing={2} mt={4}>
                          <Text
                            fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                            color="dracula.purple"
                            fontWeight="600"
                          >
                            Explorar
                          </Text>
                          <Icon as={RiRocketLine} color="dracula.purple" fontSize={{ base: '18px', md: '19px', lg: '20px' }} />
                        </HStack>
                      </VStack>
                    </Box>
                  </motion.div>
                </SimpleGrid>
              </VStack>
            </motion.div>
          )}

          {selectedPortfolio === 'programming' && (
            <>
              <motion.div
                ref={heroRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                mb={{
                  base: '80px', sm: '100px', md: '120px', lg: '160px',
                }}
              >
                <Flex
                  flexDir={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  justifyContent="space-between"
                  minH={{ base: 'auto', md: '350px', lg: '400px' }}
                  gap={{
                    base: '30px', sm: '40px', md: '50px', lg: '60px',
                  }}
                  position="relative"
                  zIndex={2}
                >
                  <VStack
                    mt={{
                      base: 12, sm: 16, md: 20, lg: 24,
                    }}
                    align={{ base: 'center', md: 'flex-start' }}
                    spacing={{ base: 5, md: 5.5, lg: 6 }}
                    flex={1}
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Box
                        position="relative"
                        mb={6}
                        _before={{
                          content: '""',
                          position: 'absolute',
                          left: '-20px',
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          bgGradient: 'linear(to-b, brand.500, dracula.purple)',
                          opacity: 0.4,
                          borderRadius: '2px',
                          display: isWideVersion ? 'block' : 'none',
                        }}
                      >
                        <Heading
                          fontSize={{
                            base: '32px', sm: '42px', md: '56px', lg: '72px', xl: '80px',
                          }}
                          fontWeight="bold"
                          bgGradient="linear(to-r, brand.500, dracula.purple)"
                          bgClip="text"
                          lineHeight="1.1"
                          mb={4}
                          minH={{
                            base: '40px', sm: '50px', md: '70px', lg: '90px', xl: '100px',
                          }}
                          position="relative"
                          _after={{
                            content: '""',
                            position: 'absolute',
                            bottom: '-10px',
                            left: 0,
                            width: '60%',
                            height: '2px',
                            bgGradient: 'linear(to-r, brand.500, transparent)',
                            opacity: 0.5,
                          }}
                        >
                          <Typewriter text="Pedro Ferreira" speed={100} delay={500} />
                        </Heading>
                      </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Box position="relative">
                        <VStack
                          align={{ base: 'center', md: 'flex-start' }}
                          spacing={0}
                          position="relative"
                          _before={{
                            content: '""',
                            position: 'absolute',
                            left: isWideVersion ? '-30px' : '-12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: isWideVersion ? '6px' : '3px',
                            height: '50%',
                            bg: 'brand.500',
                            opacity: 0.4,
                            borderRadius: '2px',
                            display: isWideVersion ? 'block' : 'none',
                          }}
                        >
                          <Heading
                            fontSize={{
                              base: '24px', sm: '32px', md: '40px', lg: '48px', xl: '56px',
                            }}
                            fontWeight="600"
                            color={colors.foreground}
                            lineHeight="1.1"
                            mb={0}
                            fontFamily="mono"
                            letterSpacing={{ base: '0px', md: '-0.3px', lg: '-0.5px' }}
                            position="relative"
                          >
                            <Typewriter text="Senior Software" speed={80} delay={2000} />
                          </Heading>
                          <Heading
                            fontSize={{
                              base: '24px', sm: '32px', md: '40px', lg: '48px', xl: '56px',
                            }}
                            fontWeight="600"
                            color={colors.foreground}
                            lineHeight="1.1"
                            mt={0}
                            fontFamily="mono"
                            letterSpacing={{ base: '0px', md: '-0.3px', lg: '-0.5px' }}
                            position="relative"
                          >
                            <Typewriter text="Engineer" speed={80} delay={3200} />
                          </Heading>
                        </VStack>
                        <Text
                          fontSize={{
                            base: '9px', sm: '10px', md: '11px', lg: '12px',
                          }}
                          color={colors.comment}
                          fontFamily="mono"
                          letterSpacing={{
                            base: '0.5px', sm: '1px', md: '1.5px', lg: '2px',
                          }}
                          textTransform="uppercase"
                          opacity={0.7}
                          mt={4}
                          overflowX="auto"
                          whiteSpace="nowrap"
                        >
                          Node.js | NestJS | React | Next.js | TypeScript | JavaScript
                        </Text>
                      </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Text
                        fontSize={{ base: '16px', md: '17px', lg: '18px' }}
                        color={colors.comment}
                        maxW={{ base: '100%', md: '500px', lg: '550px' }}
                        lineHeight={{ base: '1.7', md: '1.75', lg: '1.8' }}
                        mb={{ base: 4, md: 5, lg: 6 }}
                        px={{ base: 2, md: 0 }}
                      >
                        Software Engineer focado em Backend com 6 anos de experiência,
                        trabalhando com empresas de alto crescimento em tecnologias modernas.
                      </Text>
                    </motion.div>
                  </VStack>

                  {isWideVersion && (
                  <motion.div
                    variants={itemVariants}
                    style={{ flex: '0 0 auto' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Box
                      position="relative"
                      w={{ base: '100%', md: '400px', lg: '450px' }}
                      h={{ base: '300px', md: '400px', lg: '450px' }}
                      maxW={{ base: '100%', md: '400px', lg: '450px' }}
                    >
                      <ThreeD />
                    </Box>
                  </motion.div>
                  )}
                </Flex>
              </motion.div>

              <Box
                id="programming"
                mb={{
                  base: '80px', sm: '100px', md: '120px', lg: '160px',
                }}
                position="relative"
                zIndex={2}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <VStack spacing={12} align="stretch" mt={24}>
                    <Box textAlign="center">
                      <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                      >
                        <HStack spacing={2} justify="center" mb={3}>
                          <Icon as={RiCodeSSlashLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                          <Text
                            fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                            color="brand.500"
                            fontWeight="600"
                            letterSpacing={{ base: '2px', md: '2.5px', lg: '3px' }}
                            textTransform="uppercase"
                          >
                            Programação
                          </Text>
                        </HStack>
                        <Heading
                          fontSize={{
                            base: '28px', sm: '36px', md: '44px', lg: '56px',
                          }}
                          fontWeight="bold"
                          color={colors.foreground}
                          mb={4}
                          px={{ base: 4, md: 0 }}
                        >
                          Projetos de Desenvolvimento
                        </Heading>
                        <Text
                          fontSize={{
                            base: '14px', sm: '16px', md: '17px', lg: '19px',
                          }}
                          color={colors.comment}
                          maxW="650px"
                          mx="auto"
                          lineHeight="1.7"
                          mb={{ base: 4, md: 0 }}
                          px={{ base: 4, md: 0 }}
                        >
                          Principais projetos de desenvolvimento. Cada um representa uma experiência
                          única de criação técnica e aprendizado.
                        </Text>
                      </motion.div>
                    </Box>

                    {loadingRepos && (
                    <Flex justify="center" align="center" minH="300px">
                      <Text color={colors.comment}>
                        Carregando projetos...
                      </Text>
                    </Flex>
                    )}
                    {!loadingRepos && repos.length > 0 && (
                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 3 }}
                      spacing={{ base: 6, md: 6, lg: 8 }}
                      mt={{ base: 6, md: 6, lg: 8 }}
                      w="100%"
                    >
                      {repos.slice(0, 3).map((repo, index) => (
                        <motion.div
                          key={repo.id}
                          initial={{ opacity: 1, y: 0, scale: 1 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: false, margin: '0px' }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          style={{ width: '100%' }}
                        >
                          <motion.div
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            style={{ width: '100%' }}
                          >
                            <Box
                              as="button"
                              onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                              bg={colors.cardBg}
                              backdropFilter="blur(12px)"
                              borderRadius={{ base: '18px', md: '20px', lg: '24px' }}
                              p={{ base: 6, md: 7, lg: 8 }}
                              border="2px solid"
                              borderColor={colors.cardBorder}
                              boxShadow="0 10px 30px rgba(0, 0, 0, 0.1)"
                              _hover={{
                                borderColor: 'brand.500',
                                boxShadow: projectCardBoxShadow,
                                transform: 'translateY(-4px)',
                              }}
                              transition="all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                              minH={{
                                base: '220px', sm: '240px', md: '260px', lg: '280px',
                              }}
                              h="100%"
                              w="100%"
                              textAlign="left"
                              cursor="pointer"
                              position="relative"
                              zIndex={2}
                              overflow="hidden"
                              display="flex"
                              flexDir="column"
                              aria-label={`Abrir repositório ${repo.name} no GitHub`}
                            >
                              <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                bgGradient="linear(to-br, brand.500, dracula.purple)"
                                opacity={0}
                                _hover={{ opacity: 0.05 }}
                                transition="opacity 0.3s ease"
                              />
                              <VStack align="stretch" spacing={4} position="relative" zIndex={1} flex={1} justify="space-between">
                                <Box>
                                  <HStack justify="space-between" align="flex-start" mb={3}>
                                    <Icon as={RiCodeSSlashLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                                    {repo.stargazers_count > 0 && (
                                    <Badge
                                      bg="rgba(255, 121, 198, 0.15)"
                                      color="brand.500"
                                      border="1px solid"
                                      borderColor="rgba(255, 121, 198, 0.3)"
                                      px={3}
                                      py={1}
                                      borderRadius="8px"
                                      fontSize="12px"
                                      fontWeight="600"
                                    >
                                      ⭐
                                      {' '}
                                      {repo.stargazers_count}
                                    </Badge>
                                    )}
                                  </HStack>
                                  <Heading
                                    fontSize={{ base: '20px', md: '22px', lg: '24px' }}
                                    fontWeight="bold"
                                    color={colors.foreground}
                                    mb={3}
                                    lineHeight="1.2"
                                  >
                                    {repo.name}
                                  </Heading>
                                  <Text
                                    fontSize={{ base: '14px', md: '14.5px', lg: '15px' }}
                                    color={colors.comment}
                                    lineHeight="1.7"
                                    noOfLines={{ base: 4, md: 3, lg: 3 }}
                                    minH={{ base: '84px', md: '72px', lg: '72px' }}
                                  >
                                    {repo.description || 'Sem descrição disponível.'}
                                  </Text>
                                </Box>
                                {repo.language && (
                                <HStack spacing={2} mt="auto">
                                  <Box
                                    w="10px"
                                    h="10px"
                                    borderRadius="50%"
                                    bg="brand.500"
                                    boxShadow="0 0 8px rgba(255, 121, 198, 0.6)"
                                  />
                                  <Text
                                    fontSize="13px"
                                    color="brand.500"
                                    fontWeight="500"
                                  >
                                    {repo.language}
                                  </Text>
                                </HStack>
                                )}
                                {!repo.language && (
                                <Box h="26px" />
                                )}
                              </VStack>
                            </Box>
                          </motion.div>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                    )}
                    {!loadingRepos && repos.length === 0 && (
                    <Flex justify="center" align="center" minH="300px">
                      <Text color={colors.comment}>
                        Nenhum projeto encontrado.
                      </Text>
                    </Flex>
                    )}

                    <Flex justify="center" mt={10}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          colorScheme="brand"
                          onClick={() => router.push('/projects')}
                          size={{ base: 'md', md: 'lg' }}
                          fontSize={{ base: '15px', md: '16px', lg: '17px' }}
                          fontWeight="600"
                          px={{ base: 6, md: 8, lg: 10 }}
                          py={{ base: 5, md: 6, lg: 7 }}
                          rightIcon={<RiRocketLine />}
                        >
                          Ver Todos os Projetos
                        </Button>
                      </motion.div>
                    </Flex>
                  </VStack>
                </motion.div>
              </Box>
            </>
          )}

          {selectedPortfolio === 'photography' && (
            <Box
              id="photography"
              mb={{
                base: '80px', sm: '100px', md: '120px', lg: '160px',
              }}
              position="relative"
              zIndex={2}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <VStack spacing={12} align="stretch">
                  <Box textAlign="center">
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6 }}
                    >
                      <HStack spacing={2} justify="center" mb={3}>
                        <Icon as={RiCameraLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                        <Text
                          fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                          color="brand.500"
                          fontWeight="600"
                          letterSpacing={{ base: '2px', md: '2.5px', lg: '3px' }}
                          textTransform="uppercase"
                        >
                          Fotografia & Cinema
                        </Text>
                      </HStack>
                      <Heading
                        fontSize={{
                          base: '32px', sm: '40px', md: '48px', lg: '56px',
                        }}
                        fontWeight="bold"
                        color={colors.foreground}
                        mb={4}
                        px={{ base: 4, md: 0 }}
                      >
                        Trabalhos Visuais
                      </Heading>
                      <Text
                        fontSize={{
                          base: '15px', sm: '17px', md: '18px', lg: '19px',
                        }}
                        color={colors.comment}
                        maxW="650px"
                        mx="auto"
                        lineHeight="1.7"
                        px={{ base: 4, md: 0 }}
                      >
                        Além do código, também tenho paixão por fotografia e cinema.
                        Esta seção será atualizada em breve com alguns dos meus trabalhos visuais.
                      </Text>
                    </motion.div>
                  </Box>

                  <Box
                    bg={colors.cardBg}
                    backdropFilter="blur(12px)"
                    borderRadius={{ base: '20px', md: '24px', lg: '28px' }}
                    p={{ base: '40px', md: '60px', lg: '80px' }}
                    border="2px solid"
                    borderColor={colors.cardBorder}
                    boxShadow="0 20px 60px rgba(0, 0, 0, 0.1)"
                  >
                    <VStack spacing={6} align="center">
                      <Icon as={RiCameraLine} color="brand.500" fontSize={{ base: '48px', md: '56px', lg: '64px' }} opacity={0.5} />
                      <Text
                        fontSize={{ base: '18px', md: '19px', lg: '20px' }}
                        color={colors.comment}
                        textAlign="center"
                        maxW={{ base: '100%', md: '450px', lg: '500px' }}
                        px={{ base: 4, md: 0 }}
                      >
                        Em breve você encontrará aqui uma seleção dos meus trabalhos em fotografia e cinema.
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </motion.div>
            </Box>
          )}

          {selectedPortfolio && (
            <Box
              mb={{
                base: '60px', sm: '80px', md: '100px', lg: '120px',
              }}
              textAlign="center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => {
                    router.push('/', undefined, { shallow: true });
                    setSelectedPortfolio(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  size={{ base: 'sm', md: 'md' }}
                  fontSize={{ base: '14px', md: '14.5px', lg: '15px' }}
                  leftIcon={<RiLinksLine />}
                >
                  Voltar à escolha
                </Button>
              </motion.div>
            </Box>
          )}

          {selectedPortfolio !== 'photography' && (
            <Box
              id="about"
              ref={aboutRef}
              mb={{
                base: '80px', sm: '100px', md: '120px', lg: '160px',
              }}
              position="relative"
              zIndex={2}
            >
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <VStack spacing={12} align="stretch">
                  <Box textAlign="center">
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6 }}
                    >
                      <HStack spacing={2} justify="center" mb={3}>
                        <Icon as={RiLightbulbFlashLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                        <Text
                          fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                          color="brand.500"
                          fontWeight="600"
                          letterSpacing={{ base: '2px', md: '2.5px', lg: '3px' }}
                          textTransform="uppercase"
                        >
                          Sobre Mim
                        </Text>
                      </HStack>
                      <Heading
                        fontSize={{
                          base: '32px', sm: '40px', md: '48px', lg: '56px',
                        }}
                        fontWeight="bold"
                        color={colors.foreground}
                        mb={4}
                        px={{ base: 4, md: 0 }}
                      >
                        Conheça Minha Jornada
                      </Heading>
                    </motion.div>
                  </Box>

                  <Flex
                    flexDir={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    gap={{
                      base: '30px', sm: '40px', md: '60px', lg: '80px',
                    }}
                    bg={colors.cardBg}
                    backdropFilter="blur(12px)"
                    borderRadius={{ base: '20px', md: '24px', lg: '28px' }}
                    p={{
                      base: '32px', sm: '40px', md: '60px', lg: '80px',
                    }}
                    border="2px solid"
                    borderColor={colors.cardBorder}
                    position="relative"
                    zIndex={2}
                    boxShadow="0 20px 60px rgba(0, 0, 0, 0.1)"
                  >
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.7, type: 'spring' }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Box
                        flexShrink={0}
                        position="relative"
                        _before={{
                          content: '""',
                          position: 'absolute',
                          top: '-10px',
                          left: '-10px',
                          right: '-10px',
                          bottom: '-10px',
                          bgGradient: 'linear(to-r, brand.500, dracula.purple)',
                          borderRadius: '50%',
                          opacity: 0.3,
                          filter: 'blur(20px)',
                          zIndex: -1,
                        }}
                      >
                        <Box
                          as="img"
                          src="https://avatars.githubusercontent.com/u/60015167?v=4"
                          alt="Pedro Ferreira"
                          w={{
                            base: '160px', sm: '200px', md: '220px', lg: '240px',
                          }}
                          h={{
                            base: '160px', sm: '200px', md: '220px', lg: '240px',
                          }}
                          borderRadius="50%"
                          border={{ base: '4px solid', md: '4.5px solid', lg: '5px solid' }}
                          borderColor="brand.500"
                          boxShadow="0 20px 60px rgba(255, 121, 198, 0.4)"
                        />
                      </Box>
                    </motion.div>

                    <VStack align={{ base: 'center', md: 'flex-start' }} spacing={6} flex={1}>
                      <Box textAlign={{ base: 'center', md: 'left' }}>
                        <motion.div
                          initial={{ opacity: 1, x: 0 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6 }}
                        >
                          <Heading
                            fontSize={{
                              base: '28px', sm: '34px', md: '38px', lg: '42px',
                            }}
                            fontWeight="bold"
                            color={colors.foreground}
                            mb={3}
                          >
                            Pedro Ferreira
                          </Heading>
                          <Text
                            fontSize={{ base: '18px', md: '20px', lg: '22px' }}
                            color="brand.500"
                            fontWeight="600"
                          >
                            Senior Software Engineer @ NeuroVerse
                          </Text>
                          <Text
                            fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                            color={colors.comment}
                            mt={2}
                          >
                            Florianópolis, Santa Catarina, Brasil
                          </Text>
                        </motion.div>
                      </Box>

                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Text
                          fontSize={{
                            base: '14px', sm: '15px', md: '16px', lg: '17px',
                          }}
                          color={colors.comment}
                          lineHeight={{ base: '1.7', md: '1.8', lg: '1.9' }}
                          textAlign={{ base: 'center', md: 'left' }}
                          mb={{ base: 4, md: 5, lg: 6 }}
                          px={{ base: 2, md: 0 }}
                        >
                          Trabalho profissionalmente com programação há
                          {' '}
                          {yWork}
                          {' '}
                          anos, desenvolvendo soluções escaláveis e de alta performance. Ao longo da minha
                          carreira, tenho sido reconhecido por fortes habilidades organizacionais e
                          liderança técnica, definindo arquiteturas backend e padrões de design de sistemas
                          em Node.js/NestJS para melhorar confiabilidade, performance e experiência do desenvolvedor.
                        </Text>
                        <Text
                          fontSize={{
                            base: '14px', sm: '15px', md: '16px', lg: '17px',
                          }}
                          color={colors.comment}
                          lineHeight={{ base: '1.7', md: '1.8', lg: '1.9' }}
                          textAlign={{ base: 'center', md: 'left' }}
                          mb={{ base: 4, md: 5, lg: 6 }}
                          px={{ base: 2, md: 0 }}
                        >
                          Melhorei fluxos lentos otimizando design de APIs, usando Redis para cache e filas, introduzindo processamento assíncrono com RabbitMQ, e refinando acesso a banco de dados com Prisma (PostgreSQL) e MongoDB. Além das minhas habilidades técnicas, sou conhecido por comunicação clara e gentil, criando um ambiente de trabalho colaborativo.
                        </Text>
                      </motion.div>

                      <Box w="100%">
                        <Text
                          fontSize="16px"
                          fontWeight="600"
                          color={colors.foreground}
                          mb={4}
                          textAlign={{ base: 'center', md: 'left' }}
                        >
                          Tecnologias que trabalho:
                        </Text>
                        <Flex wrap="wrap" gap={3} justify={{ base: 'center', md: 'flex-start' }}>
                          {technologies.map((tech, index) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 1, scale: 1 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              whileHover={{ scale: 1.1, y: -3 }}
                            >
                              <Badge
                                colorScheme="brand"
                                variant="subtle"
                                px={4}
                                py={2}
                                fontSize="14px"
                                borderRadius="full"
                                border="1px solid"
                                borderColor="brand.500"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </Flex>
                      </Box>
                    </VStack>
                  </Flex>
                </VStack>
              </motion.div>
            </Box>
          )}

          {selectedPortfolio !== 'photography' && (
            <Box
              id="career"
              mb={{
                base: '80px', sm: '100px', md: '120px', lg: '160px',
              }}
              position="relative"
              zIndex={2}
            >
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <VStack spacing={12} align="stretch">
                  <Box textAlign="center">
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6 }}
                    >
                      <HStack spacing={2} justify="center" mb={3}>
                        <Icon as={RiBriefcaseLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                        <Text
                          fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                          color="brand.500"
                          fontWeight="600"
                          letterSpacing={{ base: '2px', md: '2.5px', lg: '3px' }}
                          textTransform="uppercase"
                        >
                          Carreira
                        </Text>
                      </HStack>
                      <Heading
                        fontSize={{
                          base: '28px', sm: '36px', md: '44px', lg: '56px',
                        }}
                        fontWeight="bold"
                        color={colors.foreground}
                        mb={4}
                        px={{ base: 4, md: 0 }}
                      >
                        Minha Jornada Profissional
                      </Heading>
                      <Text
                        fontSize={{
                          base: '14px', sm: '16px', md: '17px', lg: '19px',
                        }}
                        color={colors.comment}
                        maxW="650px"
                        mx="auto"
                        lineHeight="1.7"
                        px={{ base: 4, md: 0 }}
                      >
                        Uma linha do tempo mostrando minha evolução e crescimento na área de desenvolvimento.
                      </Text>
                    </motion.div>
                  </Box>

                  <Box
                    bg={colors.cardBg}
                    backdropFilter="blur(12px)"
                    borderRadius={{ base: '20px', md: '24px', lg: '28px' }}
                    p={{ base: '40px', md: '60px', lg: '80px' }}
                    border="2px solid"
                    borderColor={colors.cardBorder}
                    boxShadow="0 20px 60px rgba(0, 0, 0, 0.1)"
                  >
                    <VStack spacing={isWideVersion ? 8 : 6} align="stretch">
                      {careerTimeline.map((item, index) => (
                        <motion.div
                          key={`${item.year}-${item.company}-${item.title}`}
                          initial={{ opacity: 1, x: 0 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Flex
                            flexDir={{ base: 'column', md: 'row' }}
                            gap={{ base: '20px', md: '30px', lg: '40px' }}
                            alignItems={isWideVersion ? 'flex-start' : 'flex-start'}
                            position="relative"
                            pb={index !== careerTimeline.length - 1 ? { base: 6, md: 7, lg: 8 } : 0}
                          >
                            {isWideVersion && (
                            <>
                              <Box
                                flexShrink={0}
                                w="120px"
                                textAlign="right"
                                pt={1}
                              >
                                <HStack spacing={2} justify="flex-end" mb={1}>
                                  <Icon as={RiCalendarLine} color="brand.500" fontSize={{ base: '14px', md: '15px', lg: '16px' }} />
                                  <Text
                                    fontSize={{
                                      base: '14px', sm: '16px', md: '17px', lg: '18px',
                                    }}
                                    fontWeight="700"
                                    color="brand.500"
                                  >
                                    {item.year}
                                  </Text>
                                </HStack>
                                {item.type === 'current' && (
                                <Badge
                                  colorScheme="brand"
                                  variant="solid"
                                  px={2}
                                  py={1}
                                  borderRadius="full"
                                  fontSize={{ base: '10px', md: '10.5px', lg: '11px' }}
                                >
                                  Atual
                                </Badge>
                                )}
                              </Box>
                              <Box
                                position="absolute"
                                left="120px"
                                top="8px"
                                w="12px"
                                h="12px"
                                borderRadius="50%"
                                bg={item.type === 'current' ? 'brand.500' : 'dracula.comment'}
                                border="3px solid"
                                borderColor={colors.darker}
                                boxShadow="0 0 0 3px rgba(255, 121, 198, 0.2)"
                                zIndex={2}
                              />
                              {index !== careerTimeline.length - 1 && (
                              <Box
                                position="absolute"
                                left="125px"
                                top="20px"
                                w="2px"
                                h="calc(100% + 32px)"
                                bgGradient="linear(to-b, brand.500, dracula.purple)"
                                opacity={0.3}
                                zIndex={1}
                              />
                              )}
                            </>
                            )}

                            <Box flex={1} position="relative" ml={{ base: '0', md: '30px', lg: '40px' }}>
                              {!isWideVersion && (
                              <Box mb={4} position="relative" pl="25px">
                                <Box
                                  position="absolute"
                                  left="0"
                                  top="6px"
                                  w="12px"
                                  h="12px"
                                  borderRadius="50%"
                                  bg={item.type === 'current' ? 'brand.500' : 'dracula.comment'}
                                  border="3px solid"
                                  borderColor={colors.darker}
                                  boxShadow="0 0 0 3px rgba(255, 121, 198, 0.2)"
                                  zIndex={2}
                                />
                                {index !== careerTimeline.length - 1 && (
                                <Box
                                  position="absolute"
                                  left="5px"
                                  top="18px"
                                  w="2px"
                                  h="calc(100% + 32px)"
                                  bgGradient="linear(to-b, brand.500, dracula.purple)"
                                  opacity={0.3}
                                  zIndex={1}
                                />
                                )}
                                <HStack spacing={2} mb={2}>
                                  <Icon as={RiCalendarLine} color="brand.500" fontSize={{ base: '14px', md: '15px', lg: '16px' }} />
                                  <Text
                                    fontSize={{
                                      base: '14px', sm: '16px', md: '17px', lg: '18px',
                                    }}
                                    fontWeight="700"
                                    color="brand.500"
                                  >
                                    {item.year}
                                  </Text>
                                  {item.type === 'current' && (
                                  <Badge
                                    colorScheme="brand"
                                    variant="solid"
                                    px={2}
                                    py={1}
                                    borderRadius="full"
                                    fontSize={{ base: '10px', md: '10.5px', lg: '11px' }}
                                  >
                                    Atual
                                  </Badge>
                                  )}
                                </HStack>
                              </Box>
                              )}

                              <motion.div
                                whileHover={{ scale: 1.01, x: isWideVersion ? 5 : 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              >
                                <Box
                                  bg={colors.cardBgLight}
                                  backdropFilter="blur(8px)"
                                  borderRadius={{ base: '12px', md: '14px', lg: '16px' }}
                                  p={{ base: 4, md: 5, lg: 6 }}
                                  border="1px solid"
                                  borderColor={
                                    item.type === 'current'
                                      ? 'rgba(255, 121, 198, 0.3)'
                                      : colors.cardBorder
                                  }
                                  _hover={{
                                    borderColor: 'brand.500',
                                    boxShadow: careerCardBoxShadow,
                                  }}
                                  transition="all 0.3s ease"
                                  w="100%"
                                >
                                  <VStack align="stretch" spacing={{ base: 3, md: 3.5, lg: 4 }}>
                                    <Box>
                                      <Heading
                                        fontSize={{ base: '18px', md: '20px', lg: '22px' }}
                                        fontWeight="bold"
                                        color={colors.foreground}
                                        mb={1}
                                      >
                                        {item.title}
                                      </Heading>
                                      <Text
                                        fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                                        color="brand.500"
                                        fontWeight="600"
                                      >
                                        {item.company}
                                      </Text>
                                    </Box>

                                    <Text
                                      fontSize={{ base: '14px', md: '14.5px', lg: '15px' }}
                                      color={colors.comment}
                                      lineHeight={{ base: '1.6', md: '1.65', lg: '1.7' }}
                                    >
                                      {item.description}
                                    </Text>

                                    <Flex wrap="wrap" gap={{ base: 1.5, md: 2 }} mt={2}>
                                      {item.technologies.map((tech) => (
                                        <Badge
                                          key={tech}
                                          colorScheme="brand"
                                          variant="subtle"
                                          px={{ base: 2, md: 2.5, lg: 3 }}
                                          py={1}
                                          fontSize={{ base: '11px', md: '11.5px', lg: '12px' }}
                                          borderRadius="full"
                                        >
                                          {tech}
                                        </Badge>
                                      ))}
                                    </Flex>
                                  </VStack>
                                </Box>
                              </motion.div>
                            </Box>
                          </Flex>
                        </motion.div>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </motion.div>
            </Box>
          )}

          <Box
            id="contact"
            mb={{
              base: '80px', sm: '100px', md: '120px', lg: '160px',
            }}
            position="relative"
            zIndex={2}
          >
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <VStack spacing={12} align="stretch">
                <Box textAlign="center">
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                  >
                    <HStack spacing={2} justify="center" mb={3}>
                      <Icon as={RiLinksLine} color="brand.500" fontSize={{ base: '24px', md: '26px', lg: '28px' }} />
                      <Text
                        fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                        color="brand.500"
                        fontWeight="600"
                        letterSpacing={{ base: '2px', md: '2.5px', lg: '3px' }}
                        textTransform="uppercase"
                      >
                        Contato
                      </Text>
                    </HStack>
                    <Heading
                      fontSize={{
                        base: '28px', sm: '36px', md: '44px', lg: '56px',
                      }}
                      fontWeight="bold"
                      color={colors.foreground}
                      mb={4}
                      px={{ base: 4, md: 0 }}
                    >
                      Vamos Conversar?
                    </Heading>
                    <Text
                      fontSize={{
                        base: '14px', sm: '16px', md: '17px', lg: '19px',
                      }}
                      color={colors.comment}
                      maxW="650px"
                      mx="auto"
                      lineHeight="1.7"
                      px={{ base: 4, md: 0 }}
                      mb={{ base: 6, md: 7, lg: 8 }}
                    >
                      Entre em contato através do email abaixo.
                    </Text>
                  </motion.div>
                </Box>

                <Flex justify="center" align="center" mt={{ base: 6, md: 7, lg: 8 }} position="relative" zIndex={10} w="100%">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      as="a"
                      href="mailto:pedrolcsferreira@gmail.com?subject=Contato%20do%20Portfólio"
                      size={{ base: 'lg', md: 'xl' }}
                      bgGradient="linear(to-r, #ff79c6, #bd93f9)"
                      color="white"
                      fontWeight="700"
                      fontSize={{ base: '18px', md: '20px', lg: '22px' }}
                      px={{ base: 10, md: 11, lg: 12 }}
                      py={{ base: 7, md: 7.5, lg: 8 }}
                      borderRadius="16px"
                      boxShadow="0 15px 40px rgba(255, 121, 198, 0.4)"
                      _hover={{
                        bgGradient: 'linear(to-r, #e66aa8, #bd93f9)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 50px rgba(255, 121, 198, 0.5)',
                      }}
                      _active={{
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
                      leftIcon={<RiMailLine />}
                      position="relative"
                      zIndex={10}
                      opacity={1}
                      aria-label="Enviar email para pedrolcsferreira@gmail.com"
                    >
                      Enviar Email
                    </Button>
                  </motion.div>
                </Flex>
              </VStack>
            </motion.div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
