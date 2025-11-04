import {
  Box,
  Heading,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { colors } from '../utils/colors';
import Logo from './logo';

function Header(props) {
  const { path } = props;

  const active = path === '/' ? '/' : '';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box
      w="100vw"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg="rgba(10, 10, 15, 0.8)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor={colors.cardBorder}
    >
      <Flex
        as="header"
        w="100%"
        maxW="1280px"
        mx="auto"
        py={isWideVersion ? '20px' : '16px'}
        px={isWideVersion ? '40px' : '16px'}
        align="center"
        justifyContent="space-between"
        position="relative"
      >
        <Flex alignItems="center">
          <Heading w="100%">
            <Logo active={active} />
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
