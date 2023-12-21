import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

export const CollapsableCard = (props: {
  headerComponent: (isExpanded: boolean) => React.ReactElement;
  children: React.ReactElement;
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  return (
    <Flex
      direction="column"
      borderRadius="10px"
      border="4px solid"
      borderColor="primary"
      backgroundColor="white"
    >
      <Flex
        w="100%"
        onClick={() => setExpanded(e => !e)}
        borderRadius="6px"
        outline="4px solid"
        outlineColor="primary"
        backgroundColor="white"
        transition="background-color 0.3s"
        _hover={{
          backgroundColor: 'interactions.500',
        }}
      >
        {props.headerComponent(isExpanded)}
      </Flex>
      {isExpanded ? props.children : null}
    </Flex>
  );
};
