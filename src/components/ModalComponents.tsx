import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
  StackProps,
  Text,
  ThemingProps,
  VStack,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import CrossIcon from '../assets/cross_icon.svg';

export interface ExpandableLogoContainerProps {
  titleIconUrl: string;
  title: string;
  titleBackgroundColor: string;
  children: ReactNode;
  onClose?: () => void;
}

export const ExpandableLogoContainer = ({
  titleIconUrl,
  title,
  titleBackgroundColor,
  children,
  onClose,
  ...stackProps
}: ExpandableLogoContainerProps & StackProps) => {
  return (
    <VStack {...stackProps}>
      <Flex
        w="100%"
        borderRadius="24px"
        borderColor="primary"
        borderWidth="4px"
        backgroundColor={titleBackgroundColor}
        align="center"
        p="20px 24px 20px 40px"
        position="relative"
        top="12"
        mt="-12"
      >
        <Image w="12" h="12" src={titleIconUrl} mr="2" />
        <Text variant="bold_24_1p" mr="auto">
          {title}
        </Text>
        {onClose ? <Image src={CrossIcon} onClick={onClose} /> : null}
      </Flex>
      <Flex
        w="100%"
        borderRadius="24px"
        borderColor="primary"
        borderWidth="4px"
        paddingTop="50px"
        direction="column"
        bg="white"
      >
        <Flex py="4" px="9" direction="column">
          {children}
        </Flex>
      </Flex>
    </VStack>
  );
};

export const ModalContainer = ({
  titleIconUrl,
  title,
  children,
  titleBackgroundColor,
  ...modalProps
}: ExpandableLogoContainerProps & ModalProps) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent position="relative" bg="transparent">
        <ExpandableLogoContainer
          {...{
            titleIconUrl,
            title,
            children,
            titleBackgroundColor,
            onClose: modalProps.onClose,
          }}
        />
      </ModalContent>
    </Modal>
  );
};

export const ListItemButton = ({
  iconUrl,
  title,
  onClick,
  pallino,
  variant,
}: {
  iconUrl: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  pallino: string | undefined;
  variant?: ThemingProps<'button'>['variant'];
}) => {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <Button
        variant={variant ?? 'risen_secondary'}
        h="104px"
        w="104px"
        position="relative"
      >
        {pallino ? (
          <Box
            position="absolute"
            top="0"
            right="0"
            transform="translate(50%, -50%)"
            w="5"
            h="5"
            borderRadius="50%"
            backgroundColor={pallino}
            borderColor="primary"
            borderWidth="4px"
            borderStyle="solid"
          />
        ) : null}
        <Image src={iconUrl} />
      </Button>
      <Text variant="H1" mt="3">
        {title}
      </Text>
    </Flex>
  );
};
