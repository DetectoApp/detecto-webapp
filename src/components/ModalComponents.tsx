import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Image,
  Text,
  Box,
  Button,
  FlexProps,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export interface ModalContainerAuxProps {
  titleIconUrl: string;
  title: string;
  titleBackgroundColor: string;
}

export const ModalContainer = ({
  titleIconUrl,
  title,
  children,
  titleBackgroundColor,
  ...modalProps
}: ModalContainerAuxProps & ModalProps) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent position="relative" bg="transparent">
        <Flex
          borderRadius="24px"
          borderColor="primary"
          borderWidth="4px"
          backgroundColor={titleBackgroundColor}
          align="center"
          p="20px 24px 20px 40px"
          position="relative"
          top="48px"
        >
          <Image src={titleIconUrl} mr="2" />
          <Text variant="bold_24_1p" mr="auto">
            {title}
          </Text>
          <Image src="/assets/cross_icon.svg" onClick={modalProps.onClose} />
        </Flex>
        <Flex
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
      </ModalContent>
    </Modal>
  );
};

export const ListItemButton = ({
  iconUrl,
  title,
  onClick,
  pallino,
}: {
  iconUrl: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  pallino: string | undefined;
}) => {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <Button variant="risen_secondary" h="104px" w="104px" position="relative">
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