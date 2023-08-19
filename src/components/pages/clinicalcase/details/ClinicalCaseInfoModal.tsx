import {
  Flex,
  ModalProps,
  Text,
  Image,
  Box,
  FlexProps,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { ClinicalCase } from '../../../../types/types';
import {
  ClinicalCaseAvatar,
  ClinicalCaseAvatarBoxed,
} from '../../../ClinicalCaseAvatar';
import { ModalContainer } from '../../../ModalComponents';
import { ClinicalCaseGender } from '../../../../components/ClinicalCaseGender';

export const ClinicalCaseInfoModal = ({
  clinicalCase,
  ...modalProps
}: { clinicalCase: ClinicalCase } & Omit<ModalProps, 'children'>) => {
  return (
    <ModalContainer
      {...modalProps}
      titleIconUrl="/assets/patient_icon.svg"
      title="Info paziente"
      titleBackgroundColor="accent"
    >
      <Flex align="center" direction="column">
        <ClinicalCaseAvatarBoxed
          avatar={clinicalCase.avatar}
          h="136px"
          w="136px"
          marginBottom={2}
        />
        <ClinicalCaseGender gender={clinicalCase.gender} />
        <Text mb="6" variant="bold_28_1p">
          {clinicalCase.patient_name}
        </Text>
        <Flex w="100%" gap="2" mb="2">
          <InfoBox
            iconUrl="/assets/patient_icon.svg"
            title="Peso"
            flex="1"
            text={clinicalCase.patient_weight.toString()}
          />

          <InfoBox
            iconUrl="/assets/patient_icon.svg"
            title="Altezza"
            flex="1"
            text={clinicalCase.patient_height.toString()}
          />
        </Flex>
        <InfoBox
          iconUrl="/assets/patient_icon.svg"
          title="Dettagli"
          w="100%"
          text={clinicalCase.brief_description}
        />
      </Flex>
    </ModalContainer>
  );
};

const InfoBox = ({
  iconUrl,
  title,
  text,
  ...props
}: {
  iconUrl: string;
  title: string;
  text: string;
} & Omit<FlexProps, 'children'>) => {
  return (
    <Flex direction="column" {...props}>
      <Flex direction="row" align="center" gap="2" mb="2">
        <Image src={iconUrl} />
        <Text variant="H1">{title}</Text>
      </Flex>
      <Box
        borderWidth="3px"
        borderColor="interactions.1000"
        borderRadius="16px"
        p="4"
      >
        <Text variant="regular_20_1p_140p">{text}</Text>
      </Box>
    </Flex>
  );
};
