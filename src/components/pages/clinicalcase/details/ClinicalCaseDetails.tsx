import { Box, Button, Flex, Image, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackIcon from '../../../../assets/back.svg';
import CrossIcon from '../../../../assets/cross_icon.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import PatientIcon from '../../../../assets/patient_icon.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';
import { useCaseExplorationStore } from '../../../../store';
import {
  fetchCase,
  fetchExams,
  fetchQuizzes,
  fetchTalks,
} from '../../../../supabase/queries';
import { ExamTypes, TalkTypes } from '../../../../types/enums';
import { OneOfExam } from '../../../../types/examTypes';
import { OneOfTalk } from '../../../../types/talkTypes';
import { ClinicalCase, Quiz, QuizAnswer } from '../../../../types/types';
import { ClinicalCaseAvatar } from '../../../ClinicalCaseAvatar';
import { ClinicalCaseDiagnosisModal } from '../diagnosis/ClinicalCaseDiagnosisModal';
import { ClinicalCaseExamsModal } from '../exams/ClinicalCaseExamsModal';
import { ClinicalCaseTalksModal } from '../talks/ClinicalCaseTalksModal';
import { ClinicalCaseInfoModal } from './ClinicalCaseInfoModal';

export default function ClinicalCaseDetails() {
  const { id } = useParams<{ id: string }>();

  const [
    { clinicalCase, availableExams, availableTalks, availableQuizzes },
    setClinicalCase,
  ] = useState<{
    clinicalCase: ClinicalCase | null;
    availableExams:
      | (OneOfExam & { type: ExamTypes; answer: string; title: string })[]
      | null;
    availableTalks:
      | (OneOfTalk & { type: TalkTypes; answer: string; title: string })[]
      | null;
    availableQuizzes:
      | (Quiz & {
          answers: QuizAnswer[];
        })[]
      | null;
  }>({
    clinicalCase: null,
    availableTalks: null,
    availableExams: null,
    availableQuizzes: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [modalShowing, setModalShowing] = useState<
    'talk' | 'exam' | 'info' | 'diagnosis' | undefined
  >(undefined);

  useEffect(() => {
    const getData = async (id: string) => {
      setLoading(true);
      const clinicalCase = await fetchCase(id);
      const availableTalks = await fetchTalks(id);
      const availableExams = await fetchExams(id);
      const availableQuizzes = await fetchQuizzes(id);
      setClinicalCase({
        clinicalCase,
        availableExams,
        availableTalks,
        availableQuizzes,
      });
      setLoading(false);
    };
    if (id) getData(id);
  }, [id]);

  const { playedTalks, playedExams, playedQuizzes } = useCaseExplorationStore(
    s => ({
      playedTalks: Object.values(s.talkStatuses),
      playedExams: Object.values(s.examStatuses),
      playedQuizzes: Object.values(s.quizAnswers),
    })
  );

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
            exams={availableExams!}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
      case 'talk':
        return (
          <ClinicalCaseTalksModal
            talks={availableTalks!}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
      case 'diagnosis':
        return (
          <ClinicalCaseDiagnosisModal
            availableTalks={availableTalks}
            playedTalks={playedTalks}
            availableExams={availableExams}
            playedExams={playedExams}
            availableQuizzes={availableQuizzes}
            playedQuizzes={playedQuizzes}
            clinicalCase={clinicalCase}
            isOpen
            onClose={() => setModalShowing(undefined)}
          />
        );
    }
  };

  const areAllCasesAnswered =
    playedTalks.length === availableTalks?.length &&
    playedExams.length === availableExams?.length;

  return (
    <Flex direction="column" pt="8" pb="5" flexGrow={1}>
      <Flex gap="2" mb="4" align="center">
        <Link to="/list">
          <Image w="64px" h="64px" src={CrossIcon} />
        </Link>
        <Text variant="patient_name_details" zIndex={1}>
          {clinicalCase.patient_name}
        </Text>
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
            py="4"
            flex="1"
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
            py="4"
            flex="1"
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
          <Text variant="bold_24_1p" textAlign="right">
            Vai alla diagnosi
          </Text>
          <Button
            onClick={() => setModalShowing('diagnosis')}
            isDisabled={!areAllCasesAnswered}
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
