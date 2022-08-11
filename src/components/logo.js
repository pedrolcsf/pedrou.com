import Link from 'next/link';
import Image from 'next/image';
import { Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ContainerLogo = styled.span`
  display: inline-flex;
  align-items: center;
  height: 100px;
  padding: 10px;
  transition: 200ms ease;

  &:hover {
    transform: scale(0.98);
    opacity: 50%
  }

`;

function Logo({ active }) {
  const pathImg = `/logos/logo${useColorModeValue('-dark', '-white')}.svg`;

  return (
    <Link href="/">
      <a>
        <ContainerLogo>
          <Image src={pathImg} width={60} height={60} alt="Pedro Ferreira" />
          <Text
            ml="4"
            fontSize={24}
            color={useColorModeValue('#282a36', '#f8f8f2')}
            fontFamily="Ubuntu Condensed; sans-serif"
            fontWeight="bold"
          >
            Pedro Ferreira
          </Text>

        </ContainerLogo>
      </a>
    </Link>
  );
}

export default Logo;
