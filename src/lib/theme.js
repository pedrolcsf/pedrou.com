import { extendTheme } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  global: () => ({
    body: {
      bg: '#0a0a0f',
      color: '#f8f8f2',
      scrollBehavior: 'smooth',
      overflowX: 'hidden',
    },
    '*::placeholder': {
      color: '#6272a4',
    },
    '*': {
      borderColor: 'rgba(255, 121, 198, 0.1)',
    },
  }),
};

const fonts = {
  heading: '"Space Grotesk", "Ubuntu Condensed", sans-serif',
  body: '"Inter", "Ubuntu", sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
};

const colors = {
  brand: {
    50: '#ffc4e3',
    100: '#ff79c6',
    200: '#ff6bcb',
    300: '#ff56d0',
    400: '#ff40d5',
    500: '#ff79c6',
    600: '#e66aa8',
    700: '#cc5b8a',
    800: '#b34c6c',
    900: '#993d4e',
  },
  dracula: {
    dark: '#282a36',
    darker: '#1a1b26',
    purple: '#bd93f9',
    pink: '#ff79c6',
    green: '#50fa7b',
    yellow: '#f1fa8c',
    orange: '#ffb86c',
    red: '#ff5555',
    cyan: '#8be9fd',
    foreground: '#f8f8f2',
    comment: '#6272a4',
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  disableColorMode: true,
};

const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const theme = extendTheme({
  config,
  breakpoints,
  styles,
  fonts,
  colors,
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        gradient: () => ({
          bg: 'linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%)',
          color: 'white',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 30px rgba(255, 121, 198, 0.5)',
          },
        }),
        neon: () => ({
          bg: 'transparent',
          color: '#ff79c6',
          border: '2px solid',
          borderColor: '#ff79c6',
          _hover: {
            bg: 'rgba(255, 121, 198, 0.1)',
            boxShadow: '0 0 20px rgba(255, 121, 198, 0.6)',
            borderColor: '#bd93f9',
          },
        }),
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: '0.02em',
      },
    },
  },
});

export default theme;
