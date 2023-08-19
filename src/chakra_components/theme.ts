import { extendTheme } from '@chakra-ui/react';
import { Button } from './Button';
import { Text } from './Text';
import { Input } from './Input';
import { Select } from './Select';

export const theme = extendTheme({
  colors: {
    white: '#FFFFFF',
    primary: '#3750CC',
    secondary: {
      500: '#B4F7EC',
      1000: '#6AEFD9',
    },
    tertiary: '#1E1B3A',
    accent: '#FFD95C',
    error: '#FF5C6B',
    interactions: {
      500: '#F2F2F2',
      1000: '#D1D1D1',
    },
  },
  components: {
    Button,
    Text,
    Select,
    Input,
  },
});
