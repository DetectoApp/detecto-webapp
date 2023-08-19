import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';
import { getColor, mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode('blue.500', 'blue.300')(props),
    errorBorderColor: ec || mode('red.500', 'red.300')(props),
  };
}

const variantFilled = definePartsStyle(props => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: '4px solid',
      borderColor: 'interactions.500',
      backgroundColor: "white",
      bg: mode('gray.100', 'whiteAlpha.50')(props),
      _hover: {
        bg: mode('gray.200', 'whiteAlpha.100')(props),
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        bg: 'transparent',
        borderColor: getColor(theme, fc),
      },
    },
    icon: {
      color: getColor(theme, fc)
    },
  };
});

export const Select = defineMultiStyleConfig({
  baseStyle: {
    field: {
      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    filled: variantFilled,
  },
  defaultProps: {
    size: 'md',
    variant: 'filled',
  },
});
