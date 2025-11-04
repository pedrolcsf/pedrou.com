import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function Typewriter({ text, speed = 50, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, delay]);

  return (
    <Text as="span">
      {displayedText}
      {currentIndex < text.length && (
        <Text as="span" color="brand.500" opacity={0.8}>
          |
        </Text>
      )}
    </Text>
  );
}

export default Typewriter;
