import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#fff', '#282a36')(props),
    },
  }),
};

const fonts = {
  heading: '',
};

const colors = {
  // example: '#88ccca'
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config, styles, fonts, colors,
});
export default theme;
