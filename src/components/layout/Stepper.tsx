import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

export const Stepper = ({ steps, currentStep }: { steps: any[], currentStep: number }) => {
  return (
    <Flex h="2rem" gap="1rem">
      {steps.map((_, index) => <Box bgColor={index === currentStep ? "green" : "black"} flexGrow={1} />)}
    </Flex>
  );
}
