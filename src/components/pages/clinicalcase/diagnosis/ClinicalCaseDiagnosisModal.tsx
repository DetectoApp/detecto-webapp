import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalProps,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { ClinicalCaseAvatar } from '../../../../components/ClinicalCaseAvatar';
import { Stepper } from '../../../../components/layout/Stepper';
import { useCaseExplorationStore } from '../../../../store';
import supabase from '../../../../supabase';
import { ClinicalCase, Quiz, QuizAnswer } from '../../../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { PercentageBarItem } from '../../../../components/layout/PercentageBar';
import { ExpandableLogoContainer } from '../../../../components/ModalComponents';
import CrossIcon from '../../../../assets/cross_icon.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';
import DiagnosisIcon from '../../../../assets/diagnosis_icon.svg';

export const ClinicalCaseDiagnosisModal = ({
  clinicalCase,
  ...modalProps
}: { clinicalCase: ClinicalCase } & Partial<Omit<ModalProps, 'children'>>) => {
  const [page, setPage] = useState<
    'quiz' | 'finishedScores' | 'finishedAnswers'
  >('quiz');

  const getPanelToRender = () => {
    switch (page) {
      case 'quiz':
        return (
          <QuizDiagnosisStep
            clinicalCase={clinicalCase}
            onLastConfirm={() => setPage('finishedScores')}
          />
        );
      case 'finishedScores':
        return (
          <FinishedDiagnosisStep
            clinicalCase={clinicalCase}
            step="scores"
            onChangeTab={() => {
              setPage('finishedAnswers');
            }}
          />
        );
      case 'finishedAnswers':
        return (
          <FinishedDiagnosisStep
            clinicalCase={clinicalCase}
            step="answers"
            onChangeTab={() => {
              setPage('finishedScores');
            }}
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
  clinicalCase,
  onLastConfirm,
}: {
  clinicalCase: ClinicalCase;
  onLastConfirm: () => void;
}) => {
  const navigate = useNavigate();

  const [availableQuizzes, setAvailableQuizzes] = useState<
    (Quiz & { answers: QuizAnswer[] })[]
  >([]);

  const { quizAnswers, setQuizAnswer } = useCaseExplorationStore(s => ({
    quizAnswers: s.quizAnswers,
    setQuizAnswer: s.setQuizAnswer,
  }));

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes: (Quiz & { answers: QuizAnswer[] })[] = [];

      const { data, error } = await supabase
        .from<Quiz>('quiz')
        .select('*')
        .eq('clinical_case', clinicalCase.id);

      if (error) {
        console.log(error);
        return;
      }

      for (const q of data) {
        const { data: answers, error } = await supabase
          .from<QuizAnswer>('quiz_answer')
          .select('*')
          .eq('quiz', q.id);

        if (error) {
          console.log(error);
        } else {
          quizzes.push({ ...q, answers });
        }
      }

      setAvailableQuizzes(quizzes);
      setLoading(false);
    };

    fetchQuizzes();
  }, [clinicalCase]);

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const currentQuiz = availableQuizzes[quizIndex];
  const currentQuizAnswer = quizAnswers[currentQuiz?.id.toString()];

  const onConfirmButton = () => {
    if (currentQuizAnswer) {
      if (quizIndex === availableQuizzes.length - 1) onLastConfirm();
      else setQuizIndex(i => i + 1);
    }
  };

  if (loading) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!availableQuizzes.length) {
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
        <Stepper steps={availableQuizzes} currentStep={quizIndex} grow="1" />
      </Flex>
      <Text mt="12">{currentQuiz.question}</Text>
      <Flex align="center" direction="column" mt="10" gap="2" w="100%">
        {currentQuiz.answers.map(a => {
          return (
            <Button
              key={a.id}
              width="100%"
              onClick={() => setQuizAnswer(currentQuiz.id.toString(), a)}
              disabled={!!currentQuizAnswer}
              variant={
                !currentQuizAnswer || currentQuizAnswer.id !== a.id
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
        disabled={!currentQuizAnswer}
      >
        Conferma
      </Button>
    </Flex>
  );
};

const FinishedDiagnosisStep = ({
  step,
  onChangeTab,
  clinicalCase,
}: {
  step: 'scores' | 'answers';
  onChangeTab: () => void;
  clinicalCase: ClinicalCase;
}) => {
  const caseExplorationStatus = useCaseExplorationStore();
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
      {step === 'answers' ? (
        <ExpandableLogoContainer
          title="Risoluzione del caso"
          titleIconUrl={DiagnosisIcon}
          titleBackgroundColor="white"
          w="100%"
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
      ) : (
        <Flex
          direction="column"
          w="100%"
          align="center"
          gap="6"
          zIndex="1"
          borderRadius="24px"
          borderColor="primary"
          borderWidth="4px"
          p="20px 24px 20px 40px"
        >
          <PercentageBarItem
            title="pertinenza delle domande"
            percentage={69}
            iconSrc={TalkIcon}
          />
          <PercentageBarItem
            title="pertinenza degli esami"
            percentage={69}
            iconSrc={ExamIcon}
            percentageBarProps={{
              innerProps: { bgColor: 'secondary.1000' },
            }}
          />
          <PercentageBarItem
            title="pertinenza della diagnosi"
            percentage={69}
            iconSrc={DiagnosisIcon}
            percentageBarProps={{
              innerProps: { bgColor: 'error' },
            }}
          />
        </Flex>
      )}
      <Flex mt="5" justify="space-between" w="100%">
        <Button variant="risen" onClick={onChangeTab}>
          {step === 'answers' ? 'GUARDA IL PUNTEGGIO' : 'CONTROLLA LE RISPOSTE'}
        </Button>
        <Link to="/">
          <Button variant="risen_secondary">TERMINA</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
