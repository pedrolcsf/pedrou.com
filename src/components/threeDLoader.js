import { forwardRef } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export function ThreeDSpinner() {
  return (
    <Spinner
      size="md"
      position="absolute"
      left="50%"
      top="50%"
      ml="calc(0px - var(--spinner-size) / 2)"
      mt="calc(0px - var(--spinner-size))"
    />
  );
}

export const Container = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="3d"
    w="320px"
    h="300px"
    ml="40px"
    position="relative"
  >
    {children}
  </Box>
));

function Loader() {
  return (
    <Container>
      <ThreeDSpinner />
    </Container>
  );
}

export default Loader;
