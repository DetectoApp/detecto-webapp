import {
  ClinicalCaseDataType,
  OneOfExamDataType,
  OneOfTalkDataType,
} from '@/supabase/queries';
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalProps,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CrossIcon from '../../../../assets/cross_icon.svg';
import DiagnosisIcon from '../../../../assets/diagnosis_icon.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';
import { ClinicalCaseAvatar } from '../../../../components/ClinicalCaseAvatar';
import { ExpandableLogoContainer } from '../../../../components/ModalComponents';
import { ChoiceButtonGroup } from '../../../../components/inputs/ChoiceButtonGroup';
import { Stepper } from '../../../../components/layout/Stepper';
import { getString } from '../../../../intl';
import {
  ExamStatus,
  TalkStatus,
  useCaseExplorationStore,
} from '../../../../store';
import { ExamTypes, TalkTypes } from '../../../../types/enums';

export const ClinicalCaseDiagnosisModal = ({
  clinicalCase,
  availableTalks,
  playedTalks,
  availableExams,
  playedExams,
  availableDiagnosisQuestions,
  playedDiagnosisQuestions,
  ...modalProps
}: {
  clinicalCase: ClinicalCaseDataType;
  availableTalks:
    | (OneOfTalkDataType & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[]
    | null;
  playedTalks: TalkStatus[];
  availableExams:
    | (OneOfExamDataType & { type: ExamTypes; answer: string; title: string })[]
    | null;
  playedExams: ExamStatus[];
  availableDiagnosisQuestions: any[] | null;
  playedDiagnosisQuestions: any[];
} & Partial<Omit<ModalProps, 'children'>>) => {
  const [page, setPage] = useState<'diagnosisquestion' | 'finished'>(
    'diagnosisquestion'
  );

  const getPanelToRender = () => {
    switch (page) {
      case 'diagnosisquestion':
        return (
          <DiagnosisQuestionDiagnosisStep
            availableDiagnosisQuestions={availableDiagnosisQuestions}
            playedDiagnosisQuestions={playedDiagnosisQuestions}
            onLastConfirm={() => setPage('finished')}
          />
        );
      case 'finished':
        return (
          <FinishedDiagnosisStep
            clinicalCase={clinicalCase}
            availableExams={availableExams}
            playedExams={playedExams}
            availableTalks={availableTalks}
            playedTalks={playedTalks}
            availableDiagnosisQuestions={availableDiagnosisQuestions}
            playedDiagnosisQuestions={playedDiagnosisQuestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen onClose={() => {}} {...modalProps} size="full">
      <ModalContent position="relative" bg="white" minH="100vh">
        {getPanelToRender()}
      </ModalContent>
    </Modal>
  );
};

const DiagnosisQuestionDiagnosisStep = ({
  availableDiagnosisQuestions,
  playedDiagnosisQuestions,
  onLastConfirm,
}: {
  availableDiagnosisQuestions: any[] | null;
  playedDiagnosisQuestions: any[];
  onLastConfirm: () => void;
}) => {
  const navigate = useNavigate();

  const [diagnosisquestionIndex, setDiagnosisQuestionIndex] =
    useState<number>(0);
  const currentDiagnosisQuestion =
    availableDiagnosisQuestions?.[diagnosisquestionIndex];

  const { setDiagnosisQuestionStatus, diagnosisquestionStatus } =
    useCaseExplorationStore(s => {
      return {
        setDiagnosisQuestionStatus: s.setDiagnosisQuestionAnswer,
        diagnosisquestionStatus: s.diagnosisquestionAnswers,
      };
    });

  const currentDiagnosisQuestionStatus = currentDiagnosisQuestion
    ? diagnosisquestionStatus[currentDiagnosisQuestion?.id]
    : undefined;

  const onConfirmButton = () => {
    if (currentDiagnosisQuestionStatus) {
      if (diagnosisquestionIndex + 1 === availableDiagnosisQuestions?.length)
        onLastConfirm();
      else setDiagnosisQuestionIndex(i => i + 1);
    }
  };

  if (!availableDiagnosisQuestions || !availableDiagnosisQuestions.length) {
    return (
      <Box alignItems="center">
        <Text variant="page_title" mt="30px">
          Nessun elemento appartenente alla selezione
        </Text>
      </Box>
    );
  }

  return (
    <Flex align="center" direction="column" h="100%" pb="5" pt="8" px="8">
      <Flex gap="30px" w="100%" align="center">
        <Image w="64px" h="64px" src={CrossIcon} onClick={() => navigate(-1)} />
        <Stepper
          steps={availableDiagnosisQuestions ?? []}
          currentStep={diagnosisquestionIndex}
          grow="1"
        />
      </Flex>
      <Text mt="12">{currentDiagnosisQuestion?.question}</Text>

      {currentDiagnosisQuestion ? (
        <ChoiceButtonGroup
          values={currentDiagnosisQuestion.answers}
          currentChoiceValue={currentDiagnosisQuestionStatus}
          onSelect={value =>
            setDiagnosisQuestionStatus(
              currentDiagnosisQuestion.id.toString(),
              value
            )
          }
        />
      ) : null}
      <Button
        mt="auto"
        ml="auto"
        onClick={onConfirmButton}
        isDisabled={!currentDiagnosisQuestionStatus}
      >
        Conferma
      </Button>
    </Flex>
  );
};

const FinishedDiagnosisStep = ({
  clinicalCase,
  availableTalks,
  playedTalks,
  availableExams,
  playedExams,
  availableDiagnosisQuestions,
  playedDiagnosisQuestions,
}: {
  clinicalCase: ClinicalCaseDataType;
  availableTalks:
    | (OneOfTalkDataType & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[]
    | null;
  playedTalks: TalkStatus[];
  availableExams:
    | (OneOfExamDataType & { type: ExamTypes; answer: string; title: string })[]
    | null;
  playedExams: ExamStatus[];
  availableDiagnosisQuestions: any[] | null;
  playedDiagnosisQuestions: any[];
}) => {
  return (
    <Flex align="center" direction="column" h="100%" pb="5" pt="8" px="8">
      <Text variant="page_title">Caso completato</Text>
      <ClinicalCaseAvatar
        avatar={clinicalCase.avatar ?? 'ERROR'}
        mt="5"
        flexGrow="1"
        maxHeight="30vh"
        objectFit="cover"
        mb="2"
      />
      <ExpandableLogoContainer
        title="Risoluzione del caso"
        titleIconUrl={DiagnosisIcon}
        titleBackgroundColor="white"
        w="100%"
        mb="2"
      >
        <Text variant="regular_20_1p">
          {clinicalCase.case_details?.solution ?? 'TODO MANCA A DB'}
        </Text>
        <Flex ml="auto" gap="2">
          <Button
            variant="risen"
            onClick={() => {
              alert('TODO');
            }}
          >
            NON CHIARO
          </Button>
          <Button
            variant="risen"
            onClick={() => {
              alert('TODO');
            }}
          >
            CHIARO
          </Button>
        </Flex>
      </ExpandableLogoContainer>

      <Text variant="page_title_sm" mb="4" mt="6">
        Parla col paziente
      </Text>

      {playedTalks.map(talkStatus => {
        const talk = availableTalks?.find(talk => talk.id === talkStatus.id);
        return (
          <ExpandableLogoContainer
            title={talk?.title ?? ''}
            titleIconUrl={TalkIcon}
            titleBackgroundColor="white"
            w="100%"
            mb="2"
          >
            <Text variant="regular_20_1p">
              {talkStatus.status === 'OPENED'
                ? talk?.answer
                : getString('ignoredTalk')}
            </Text>
            <Text variant="regular_20_1p">
              {talk?.is_misleading ? 'MISLEADING' : 'NON MISLEADING'}
            </Text>
          </ExpandableLogoContainer>
        );
      })}

      <Text variant="page_title_sm" mb="4" mt="6">
        Prescrivi Esami
      </Text>

      {playedExams.map(examStatus => {
        const exam = availableExams?.find(exam => exam.id === examStatus.id);
        return (
          <ExpandableLogoContainer
            title={exam?.title ?? ''}
            titleIconUrl={ExamIcon}
            titleBackgroundColor="secondary.1000"
            w="100%"
            mb="2"
          >
            <Text variant="regular_20_1p">
              {examStatus.status === 'OPENED'
                ? exam?.answer
                : getString('ignoredExam')}
            </Text>
            <Text variant="regular_20_1p">
              {exam?.is_misleading ? 'MISLEADING' : 'NON MISLEADING'}
            </Text>
          </ExpandableLogoContainer>
        );
      })}

      <Text variant="page_title_sm" mb="4" mt="6">
        DiagnosisQuestion
      </Text>

      {playedDiagnosisQuestions.map(diagnosisquestionStatus => {
        const diagnosisquestion = availableDiagnosisQuestions?.find(
          diagnosisquestion =>
            diagnosisquestion.id === diagnosisquestionStatus.diagnosisquestion
        );
        return (
          <ExpandableLogoContainer
            title={diagnosisquestion?.question ?? ''}
            titleIconUrl={DiagnosisIcon}
            titleBackgroundColor="error"
            w="100%"
            mb="2"
          >
            <Text variant="regular_20_1p">{diagnosisquestionStatus.text}</Text>
            <Text variant="regular_20_1p">
              {diagnosisquestionStatus.is_correct ? 'CORRETTA' : 'NON CORRETTA'}
            </Text>
          </ExpandableLogoContainer>
        );
      })}
      <Flex mt="5" justify="space-between" w="100%">
        <Link to="/">
          <Button variant="risen_secondary">TERMINA</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
