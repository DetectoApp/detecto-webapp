import { Box, BoxProps, Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import React from 'react';

export type PercentageBarProps = {
  percentage: number;
  innerProps?: Omit<BoxProps, 'children'>;
} & BoxProps;

export const PercentageBar = ({
  percentage,
  innerProps,
  ...boxProps
}: PercentageBarProps) => {
  return (
    <Box
      h="20px"
      borderRadius="10px"
      bgColor="primary"
      w="100%"
      p="4px"
      {...boxProps}
    >
      <Box
        w={`${percentage}%`}
        h="100%"
        borderRadius="10px"
        bgColor="white"
        {...innerProps}
      />
    </Box>
  );
};

export type PercentageBarItemProps = {
  percentage: number;
  percentageBarProps?: Omit<PercentageBarProps, 'percentage'>;
  iconSrc: string;
  title: string;
} & FlexProps;

export const PercentageBarItem = ({
  percentage,
  percentageBarProps,
  iconSrc,
  title,
  ...flexProps
}: PercentageBarItemProps) => {
  return (
    <Flex w="100%" {...flexProps}>
      <Image w="16" h="16" mr="6" src={iconSrc} />
      <Flex flexGrow="1" direction="column" justify="space-between">
        <Text variant="button">{title}</Text>
        <PercentageBar {...percentageBarProps} percentage={percentage} />
      </Flex>
      <Text
        ml="2"
        w="16"
        mt="auto"
        textAlign="end"
        variant="button"
        fontSize="20px"
      >{`${percentage}%`}</Text>
    </Flex>
  );
};
