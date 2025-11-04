import Link from 'next/link';
import Image from 'next/image';
import { Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colors } from '../utils/colors';

const ContainerLogo = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: scale(0.98);
    opacity: 0.8;
  }
`;

function Logo({ active }) {
  const pathImg = '/logos/logo-white.svg';
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Link href="/" passHref>
      <motion.div
        whileHover={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        <ContainerLogo>
          <Image src={pathImg} width={isWideVersion ? 50 : 40} height={isWideVersion ? 50 : 40} alt="Pedro Ferreira Logo" />
          <Text
            ml={isWideVersion ? '12px' : '8px'}
            fontSize={isWideVersion ? '22px' : '18px'}
            color={colors.foreground}
            fontFamily="heading"
            fontWeight="700"
            letterSpacing="0.5px"
          >
            Pedro Ferreira
          </Text>
        </ContainerLogo>
      </motion.div>
    </Link>
  );
}

export default Logo;
