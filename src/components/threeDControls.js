import { Box, Text, Icon, VStack, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RiRotateLockLine, RiZoomInLine, RiHandMoveLine } from 'react-icons/ri';
import { colors } from '../utils/colors';

function ThreeDControls({ onReset, isInteracting }) {
  const [showHints] = useState(true);

  return (
    <Box
      position="absolute"
      bottom="20px"
      left="20px"
      right="20px"
      zIndex={10}
      pointerEvents="none"
      display={{ base: 'none', lg: 'block' }}
    >
      <AnimatePresence>
        {showHints && !isInteracting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              bg={colors.cardBg}
              backdropFilter="blur(12px)"
              borderRadius="16px"
              p={4}
              border="1px solid"
              borderColor={colors.cardBorder}
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
            >
              <VStack spacing={2} align="flex-start">
                <HStack spacing={3}>
                  <Icon as={RiHandMoveLine} color="brand.500" fontSize="18px" />
                  <Text fontSize="13px" color={colors.foreground} fontFamily="mono">
                    Arraste para rotacionar
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={RiZoomInLine} color="brand.500" fontSize="18px" />
                  <Text fontSize="13px" color={colors.foreground} fontFamily="mono">
                    Scroll para aproximar
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={RiRotateLockLine} color="brand.500" fontSize="18px" />
                  <Text fontSize="13px" color={colors.comment} fontFamily="mono" opacity={0.7}>
                    Auto-rotação pausa ao interagir
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <Box position="absolute" bottom="20px" right="20px" pointerEvents="auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            as="button"
            onClick={onReset}
            bg={colors.cardBg}
            backdropFilter="blur(12px)"
            borderRadius="12px"
            p={3}
            border="1px solid"
            borderColor={colors.cardBorder}
            _hover={{
              borderColor: 'brand.500',
              boxShadow: '0 0 20px rgba(255, 121, 198, 0.4)',
            }}
            transition="all 0.3s ease"
            cursor="pointer"
          >
            <Icon as={RiRotateLockLine} color="brand.500" fontSize="20px" />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default ThreeDControls;

