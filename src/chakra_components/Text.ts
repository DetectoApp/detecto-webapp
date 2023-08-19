import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontFamily: 'DM Sans, Comic Sans, Arial',
    color: 'primary',
  },

  variants: {
    CTA: {
      fontWeight: 'bold',
      fontSize: '70px',
      letterSpacing: -0.01,
      lineHeight: 1,
    },
    page_title: {
      fontWeight: 'bold',
      fontSize: '48px',
      letterSpacing: -0.01,
      lineHeight: 1,
    },
    page_title_sm: {
      fontWeight: 'bold',
      fontSize: '40px',
      letterSpacing: -0.01,
      lineHeight: 1,
    },
    H1: {
      fontWeight: 'bold',
      fontSize: '22px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
    H2: {
      fontWeight: 'bold',
      fontSize: '20px',
      letterSpacing: 0,
      lineHeight: 1,
    },
    button: {
      fontWeight: 'bold',
      fontSize: '16px',
      letterSpacing: 0.01,
      lineHeight: 1,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      letterSpacing: 0,
      lineHeight: 1,
    },
    body: {
      fontWeight: 'regular',
      fontSize: '16px',
      letterSpacing: 0.01,
      lineHeight: 1.4,
    },
    categories: {
      fontWeight: 'bold',
      fontSize: '12px',
      letterSpacing: 0.005,
      lineHeight: 1,
      textTransform: 'uppercase',
    },
    case_label: {
      fontWeight: 'medium',
      fontSize: '14px',
      letterSpacing: 0,
      lineHeight: 1.3,
    },
    case_label_filled: {
      fontWeight: 'bold',
      fontSize: '14px',
      letterSpacing: 0,
      lineHeight: 1.3,
    },
    bold_24_1p: {
      fontWeight: 'bold',
      fontSize: '24px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
    bold_28_1p: {
      fontWeight: 'bold',
      fontSize: '28px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
    regular_20_1p: {
      fontWeight: 'regular',
      fontSize: '20px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
    regular_20_1p_140p: {
      fontWeight: 'regular',
      fontSize: '20px',
      letterSpacing: 0.01,
      lineHeight: 1.4,
    },
    patient_name_details: {
      fontWeight: 'bold',
      fontSize: '40px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
    specialty_name_list: {
      fontWeight: 'bold',
      fontSize: '20px',
      letterSpacing: 0.01,
      lineHeight: 1,
    },
  },

  defaultProps: {
    variant: 'body',
  },
});
