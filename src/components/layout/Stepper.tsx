import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const Stepper = ({
  steps,
  currentStep,
  ...flexProps
}: {
  steps: any[];
  currentStep: number;
} & FlexProps) => {
  return (
    <Flex gap="30px" {...flexProps}>
      {steps.map((_, index) => (
        <Box
          h="9px"
          borderRadius="4.5px"
          bgColor={
            index === currentStep ? 'secondary.1000' : 'interactions.500'
          }
          flexGrow={1}
        />
      ))}
    </Flex>
  );
};
