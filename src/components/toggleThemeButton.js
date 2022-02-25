import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

const ToggleThemeButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ z: -20, y: -5, opacity: 0 }}
        animate={{ z: 0, y: 0, opacity: 1 }}
        exit={{ z: 20, y: 5, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="toggle theme"
          bg={useColorModeValue('#6272a4', '#ffb86c')}
          color={useColorModeValue('#f8f8f2', '#282a36')}
          icon={useColorModeValue(<RiMoonLine />, <RiSunLine />)}
          onClick={toggleColorMode}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default ToggleThemeButton
