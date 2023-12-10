import { Flex, Button } from '@chakra-ui/react';
import React from 'react';

export type ChoiceButtonGroupValue = any & { id: any; text: string };

export const ChoiceButtonGroup = (props: {
  values: ChoiceButtonGroupValue[];
  currentChoiceValue: ChoiceButtonGroupValue | undefined;
  onSelect: (value: ChoiceButtonGroupValue) => void;
}) => {
  return (
    <Flex align="center" direction="column" mt="10" mb="4" gap="2" w="100%">
      {props.values.map(a => {
        return (
          <Button
            key={a.id}
            width="100%"
            onClick={() => props.onSelect(a)}
            isDisabled={
              !!props.currentChoiceValue && props.currentChoiceValue.id !== a.id
            }
            variant={
              !props.currentChoiceValue || props.currentChoiceValue.id !== a.id
                ? 'risen'
                : 'risen_secondary'
            }
          >
            {a.text}
          </Button>
        );
      })}
    </Flex>
  );
};
