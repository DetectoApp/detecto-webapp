import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

export interface Step {
  id: number | string
}

export const Stepper = ({ steps }: { steps: Step[] }) => {
  return (
    <Flex h="2rem" gap="1rem">
      {steps.map(s => <Box bgColor="black" flexGrow={1} />)}
    </Flex>
  );
}
