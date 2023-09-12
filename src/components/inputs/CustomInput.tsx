import {
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
  Text,
  Image,
  Flex,
  useStyleConfig,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorIcon,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import InfoIcon from '../../assets/info.svg';
export const CustomInput = (
  props: InputProps & {
    label: string;
    disabled?: boolean;
    helperText?: string;
    errorText?: string | boolean | null;
    info?: ReactNode;
  }
) => {
  const [type, setType] = useState<InputProps['type']>(props.type);
  useEffect(() => {
    setType(props.type);
  }, [props.type]);

  console.log({ props }, props.errorText);

  return (
    <FormControl isInvalid={props.isInvalid || !!props.errorText}>
      <InputGroup
        height={props.height ?? '56px'}
        position="relative"
        borderRadius="10px"
      >
        <FormLabel
          position="absolute"
          top="-10px"
          left="12px"
          variant="case_label"
          backgroundColor="white"
          zIndex={2}
        >
          {props.label}
        </FormLabel>
        <Input {...props} type={type} py="8px" height="100%" />
        <InputRightElement
          height="100%"
          width=""
          backgroundColor="transparent"
          p="0"
          m="0"
        >
          <Flex paddingX="8px" gap="16px" align="center" height="100%">
            {props.info ? (
              <Image src={InfoIcon} height="32px" minWidth="32px" />
            ) : null}
            {props.type === 'password' ? (
              <Image
                src={
                  type === 'password' ? '/assets/show.svg' : '/assets/hide.svg'
                }
                height="32px"
                minWidth="32px"
                onClick={() => {
                  setType(t => {
                    if (t === 'password') return 'text';
                    return 'password';
                  });
                }}
              />
            ) : null}
          </Flex>
        </InputRightElement>
      </InputGroup>
      {props.errorText ? (
        <FormErrorMessage>{props.errorText}</FormErrorMessage>
      ) : props.helperText ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
