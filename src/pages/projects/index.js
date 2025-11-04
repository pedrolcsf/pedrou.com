import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Flex, Text, useBreakpointValue, Box, Heading, VStack, SimpleGrid, HStack, Icon, Badge, Button,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { RiCodeSSlashLine, RiRocketLine } from 'react-icons/ri';
import { fetchGitHubRepos } from '../../services/githubService';
import dynamic from 'next/dynamic';
import { colors } from '../../utils/colors';
import CineTechBackground from '../../components/cineTechBackground';

function Projects() {
  const router = useRouter();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepositories = useCallback(async () => {
    setLoading(true);
    const repositories = await fetchGitHubRepos();
    setRepos(repositories);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

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
        pt={{ base: '60px', sm: '70px', md: '75px', lg: '80px' }}
        pb={{ base: '60px', sm: '80px', md: '90px', lg: '100px' }}
      >
        <Box maxW="1200px" mx="auto" px={{ base: '16px', sm: '24px', md: '32px', lg: '40px' }} w="100%">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <VStack spacing={12} align="stretch">
              <Box textAlign="center">
                <motion.div variants={itemVariants}>
                  <HStack spacing={2} justify="center" mb={3}>
                    <Icon as={RiCodeSSlashLine} color="brand.500" fontSize="28px" />
                    <Text
                      fontSize="14px"
                      color="brand.500"
                      fontWeight="600"
                      letterSpacing="3px"
                      textTransform="uppercase"
                    >
                      Programação
                    </Text>
                  </HStack>
                  <Heading
                    fontSize={{ base: '28px', sm: '36px', md: '44px', lg: '56px' }}
                    fontWeight="bold"
                    color={colors.foreground}
                    mb={4}
                    px={{ base: 4, md: 0 }}
                  >
                    Todos os Projetos
                  </Heading>
                  <Text
                    fontSize={{ base: '14px', sm: '16px', md: '17px', lg: '19px' }}
                    color={colors.comment}
                    maxW="650px"
                    mx="auto"
                    lineHeight="1.7"
                    px={{ base: 4, md: 0 }}
                  >
                    Explore todos os meus projetos e trabalhos. Cada projeto representa
                    uma experiência única de desenvolvimento.
                  </Text>
                </motion.div>
              </Box>

              {loading ? (
                <Flex justify="center" align="center" minH="400px">
                  <Text color={colors.comment}>
                    Carregando projetos...
                  </Text>
                </Flex>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={{ base: 6, md: 6, lg: 8 }}
                  mt={{ base: 6, md: 6, lg: 8 }}
                  w="100%"
                >
                  {repos.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
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
                          borderRadius={{ base: '16px', sm: '18px', md: '20px', lg: '24px' }}
                          p={{ base: 5, sm: 6, md: 7, lg: 8 }}
                          border="2px solid"
                          borderColor={colors.cardBorder}
                          boxShadow="0 10px 30px rgba(0, 0, 0, 0.1)"
                          _hover={{
                            borderColor: 'brand.500',
                            boxShadow: isWideVersion ? '0 20px 60px rgba(255, 121, 198, 0.3)' : '0 15px 40px rgba(255, 121, 198, 0.25)',
                            transform: 'translateY(-4px)',
                          }}
                          transition="all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                          minH={{ base: '220px', sm: '240px', md: '260px', lg: '280px' }}
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
                                <Icon as={RiCodeSSlashLine} color="brand.500" fontSize={{ base: '22px', sm: '24px', md: '26px', lg: '28px' }} />
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
                                fontSize={{ base: '18px', sm: '20px', md: '22px', lg: '24px' }}
                                fontWeight="bold"
                                color={colors.foreground}
                                mb={3}
                                lineHeight="1.2"
                              >
                                {repo.name}
                              </Heading>
                              <Text
                                fontSize={{ base: '13px', sm: '14px', md: '14.5px', lg: '15px' }}
                                color={colors.comment}
                                lineHeight="1.7"
                                noOfLines={{ base: 4, md: 3, lg: 3 }}
                                minH={{ base: '84px', md: '68px', lg: '72px' }}
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

              <Flex justify="center" mt={10}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    colorScheme="brand"
                    onClick={() => router.push('/')}
                    size={isWideVersion ? 'lg' : 'md'}
                    fontSize={isWideVersion ? '17px' : '15px'}
                    fontWeight="600"
                    px={isWideVersion ? 10 : 6}
                    py={isWideVersion ? 7 : 5}
                    leftIcon={<RiRocketLine />}
                  >
                    Voltar ao Início
                  </Button>
                </motion.div>
              </Flex>
            </VStack>
          </motion.div>
        </Box>
      </Flex>
    </Box>
  );
}

export default Projects;