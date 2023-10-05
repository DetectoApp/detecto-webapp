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
import { Stepper } from '../../../../components/layout/Stepper';
import { getString } from '../../../../intl';
import {
  ExamStatus,
  TalkStatus,
  useCaseExplorationStore,
} from '../../../../store';
import { ExamTypes, TalkTypes } from '../../../../types/enums';
import { OneOfExam } from '../../../../types/examTypes';
import { OneOfTalk } from '../../../../types/talkTypes';
import { ClinicalCase, Quiz, QuizAnswer } from '../../../../types/types';

export const ClinicalCaseDiagnosisModal = ({
  clinicalCase,
  availableTalks,
  playedTalks,
  availableExams,
  playedExams,
  availableQuizzes,
  playedQuizzes,
  ...modalProps
}: {
  clinicalCase: ClinicalCase;
  availableTalks:
    | (OneOfTalk & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[]
    | null;
  playedTalks: TalkStatus[];
  availableExams:
    | (OneOfExam & { type: ExamTypes; answer: string; title: string })[]
    | null;
  playedExams: ExamStatus[];
  availableQuizzes:
    | (Quiz & {
        answers: QuizAnswer[];
      })[]
    | null;
  playedQuizzes: QuizAnswer[];
} & Partial<Omit<ModalProps, 'children'>>) => {
  const [page, setPage] = useState<'quiz' | 'finished'>('quiz');

  const getPanelToRender = () => {
    switch (page) {
      case 'quiz':
        return (
          <QuizDiagnosisStep
            availableQuizzes={availableQuizzes}
            playedQuizzes={playedQuizzes}
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
            availableQuizzes={availableQuizzes}
            playedQuizzes={playedQuizzes}
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

const QuizDiagnosisStep = ({
  availableQuizzes,
  playedQuizzes,
  onLastConfirm,
}: {
  availableQuizzes:
    | (Quiz & {
        answers: QuizAnswer[];
      })[]
    | null;
  playedQuizzes: QuizAnswer[];
  onLastConfirm: () => void;
}) => {
  const navigate = useNavigate();

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const currentQuiz = availableQuizzes?.[quizIndex];

  const { setQuizStatus, quizStatus } = useCaseExplorationStore(s => {
    return {
      setQuizStatus: s.setQuizAnswer,
      quizStatus: s.quizAnswers,
    };
  });

  const currentQuizStatus = currentQuiz
    ? quizStatus[currentQuiz?.id]
    : undefined;

  const onConfirmButton = () => {
    if (currentQuizStatus) {
      if (quizIndex + 1 === availableQuizzes?.length) onLastConfirm();
      else setQuizIndex(i => i + 1);
    }
  };

  if (!availableQuizzes || !availableQuizzes.length) {
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
          steps={availableQuizzes ?? []}
          currentStep={quizIndex}
          grow="1"
        />
      </Flex>
      <Text mt="12">{currentQuiz?.question}</Text>
      <Flex align="center" direction="column" mt="10" mb="4" gap="2" w="100%">
        {currentQuiz?.answers.map(a => {
          return (
            <Button
              key={a.id}
              width="100%"
              onClick={() => setQuizStatus(currentQuiz.id.toString(), a)}
              isDisabled={
                !!currentQuizStatus && currentQuizStatus.id !== a.id
                //TODO
              }
              variant={
                !currentQuizStatus || currentQuizStatus.id !== a.id
                  ? 'risen'
                  : 'risen_secondary'
              }
            >
              {a.text}
            </Button>
          );
        })}
      </Flex>
      <Button
        mt="auto"
        ml="auto"
        onClick={onConfirmButton}
        isDisabled={!currentQuizStatus}
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
  availableQuizzes,
  playedQuizzes,
}: {
  clinicalCase: ClinicalCase;
  availableTalks:
    | (OneOfTalk & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[]
    | null;
  playedTalks: TalkStatus[];
  availableExams:
    | (OneOfExam & { type: ExamTypes; answer: string; title: string })[]
    | null;
  playedExams: ExamStatus[];
  availableQuizzes:
    | (Quiz & {
        answers: QuizAnswer[];
      })[]
    | null;
  playedQuizzes: QuizAnswer[];
}) => {
  return (
    <Flex align="center" direction="column" h="100%" pb="5" pt="8" px="8">
      <Text variant="page_title">Caso completato</Text>
      <ClinicalCaseAvatar
        avatar={clinicalCase.avatar}
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
        Quiz
      </Text>

      {playedQuizzes.map(quizStatus => {
        const quiz = availableQuizzes?.find(
          quiz => quiz.id === quizStatus.quiz
        );
        return (
          <ExpandableLogoContainer
            title={quiz?.question ?? ''}
            titleIconUrl={DiagnosisIcon}
            titleBackgroundColor="error"
            w="100%"
            mb="2"
          >
            <Text variant="regular_20_1p">{quizStatus.text}</Text>
            <Text variant="regular_20_1p">
              {quizStatus.is_correct ? 'CORRETTA' : 'NON CORRETTA'}
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
