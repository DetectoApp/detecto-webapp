import { Box, Button, Flex, Image, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackIcon from '../../../../assets/back.svg';
import CrossIcon from '../../../../assets/cross_icon.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import PatientIcon from '../../../../assets/patient_icon.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';
import supabase from '../../../../supabase';
import { ClinicalCase } from '../../../../types/types';
import { ClinicalCaseAvatar } from '../../../ClinicalCaseAvatar';
import { ClinicalCaseDiagnosisModal } from '../diagnosis/ClinicalCaseDiagnosisModal';
import { ClinicalCaseExamsModal } from '../exams/ClinicalCaseExamsModal';
import { ClinicalCaseTalksModal } from '../talks/ClinicalCaseTalksModal';
import { ClinicalCaseInfoModal } from './ClinicalCaseInfoModal';

export default function ClinicalCaseDetails() {
  const { id } = useParams<{ id: string }>();
  const [clinicalCase, setClinicalCase] = useState<ClinicalCase | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [modalShowing, setModalShowing] = useState<
    'talk' | 'exam' | 'info' | 'diagnosis' | undefined
  >(undefined);

  useEffect(() => {
    const fetchCase = async () => {
      const { data: clinicalCase, error } = await supabase
        .from('clinical_case')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setClinicalCase(clinicalCase);
      }

      setLoading(false);
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!clinicalCase) {
    return (
      <Box alignItems="center">
        <Text variant="page_title" mt="30px">
          Nessun elemento appartenente alla selezione
        </Text>
      </Box>
    );
  }

  const getModalToRender = () => {
    switch (modalShowing) {
      case 'info':
        return (
          <ClinicalCaseInfoModal
            clinicalCase={clinicalCase}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
      case 'exam':
        return (
          <ClinicalCaseExamsModal
            clinicalCase={clinicalCase}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
      case 'talk':
        return (
          <ClinicalCaseTalksModal
            clinicalCase={clinicalCase}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
      case 'diagnosis':
        return (
          <ClinicalCaseDiagnosisModal
            clinicalCase={clinicalCase}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
    }
  };

  return (
    <Flex direction="column" pt="8" pb="5" flexGrow={1}>
      <Flex gap="2" mb="4" align="center">
        <Link to="/list">
          <Image w="64px" h="64px" src={CrossIcon} />
        </Link>
        <Text variant="patient_name_details">{clinicalCase.patient_name}</Text>
      </Flex>
      <Flex position="relative" flexGrow={1}>
        <ClinicalCaseAvatar
          avatar={clinicalCase.avatar}
          w="236px"
          position="absolute"
          bottom="0"
          right="50%"
          transform="translateX(50%)"
        />
        <Flex direction="row" gap="2" mx="auto" mt="auto">
          <Button
            onClick={() => setModalShowing('talk')}
            py="2"
            w="328px"
            h="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1"
          >
            <Image src={TalkIcon} w="64px" h="64px" />
            <Text variant="bold_24_1p" textTransform="none">
              Parla col paziente
            </Text>
          </Button>
          <Button
            variant="risen_secondary"
            onClick={() => setModalShowing('exam')}
            py="2"
            w="328px"
            h="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1"
          >
            <Image src={ExamIcon} w="64px" h="64px" />
            <Text variant="bold_24_1p" textTransform="none">
              Prescrivi esami
            </Text>
          </Button>
        </Flex>
      </Flex>

      <Box position="relative" h="4px" my="4">
        <Box
          position="absolute"
          w="100vw"
          h="4px"
          bgColor="primary"
          top="0"
          right="50%"
          transform="translateX(50%)"
        />
      </Box>
      <Flex w="100%" justify="space-between">
        <Flex gap="2" align="center">
          <Button
            onClick={() => setModalShowing('info')}
            variant="risen_accent"
            w="156px"
            h="104px"
          >
            <Image src={PatientIcon} w="64px" h="64px" />
          </Button>
          <Text variant="bold_24_1p">Info paziente</Text>
        </Flex>
        <Flex gap="2" align="center">
          <Text variant="bold_24_1p">Vai alla diagnosi</Text>
          <Button
            onClick={() => setModalShowing('diagnosis')}
            variant="risen_error"
            w="156px"
            h="104px"
          >
            <Image
              src={BackIcon}
              w="64px"
              h="64px"
              transform="rotate(180deg)"
            />
          </Button>
        </Flex>
      </Flex>
      {getModalToRender()}
    </Flex>
  );
}
