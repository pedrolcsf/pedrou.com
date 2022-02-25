import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f8f8f2', '#282a36')(props)
    }
  })
}

const fonts = {
    heading: ""
}

const colors = {
    // example: '#88ccca'
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
}

const theme = extendTheme({ config, styles, fonts, colors })
export default theme
