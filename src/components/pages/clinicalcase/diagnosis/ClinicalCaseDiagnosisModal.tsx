import {
  Flex,
  ModalProps,
  Text,
  Image,
  Box,
  FlexProps,
  Modal,
  ModalContent,
} from '@chakra-ui/react';
import React from 'react';
import { ClinicalCase } from '../../../../types/types';
import { ClinicalCaseGender } from '../../../ClinicalCaseGender';
import { Stepper } from '../../../../components/layout/Stepper';

export const ClinicalCaseDiagnosisModal = ({
  clinicalCase,
  ...modalProps
}: { clinicalCase: ClinicalCase } & Omit<ModalProps, 'children'>) => {
  return (

    <Modal isOpen onClose={() => { }} size="full">
      <ModalContent position="relative" bg="white">
        <Flex align="center" direction="column">
          <Stepper steps={[{ id: "yey" }, { id: "wow" }, { id: "yayaya" }]} />
          <Text>Di quale patologia stiamo parlando,<br />
            in questo caso specifico?</Text>
          <ClinicalCaseGender gender={clinicalCase.gender} />
        </Flex>
        <Flex>
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
        </Flex><Flex><InfoBox
          iconUrl="/assets/patient_icon.svg"
          title="Dettagli"
          w="100%"
          text={clinicalCase.brief_description}
        />
        </Flex>
      </ModalContent>
    </Modal>
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
