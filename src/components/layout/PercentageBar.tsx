import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const PercentageBar = ({
  percentage,
  innerProps,
  ...boxProps
}: { percentage: number; innerProps: BoxProps } & BoxProps) => {
  return (
    <Box {...boxProps}>
      <Box w={`${percentage}%`} h="100%" {...innerProps} />
    </Box>
  );
};
