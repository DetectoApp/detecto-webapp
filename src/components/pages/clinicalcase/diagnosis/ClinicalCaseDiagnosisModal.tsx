import {
  Flex,
  ModalProps,
  Text,
  Image,
  Box,
  Modal,
  ModalContent,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ClinicalCase, Quiz, QuizAnswer } from '../../../../types/types';
import { Stepper } from '../../../../components/layout/Stepper';
import { ClinicalCaseAvatar } from '../../../../components/ClinicalCaseAvatar';
import supabase from '../../../../supabase';
import { useCaseExplorationStore } from '../../../../store';

import ExamIcon from '../../../../assets/exam_icon.svg';

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
      <ModalContent position="relative" bg="white">
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
  const [availableQuizzes, setAvailableQuizzes] = useState<
    (Quiz & { answers: QuizAnswer[] })[]
  >([]);
  const givenQuizAnswers = useCaseExplorationStore(s => s.quizAnswers);
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
      if (quizIndex === availableQuizzes.length) onLastConfirm();
      else setQuizIndex(i => i++);
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
        <Image src={'todo'} mt="30px" maxW="95%" />
      </Box>
    );
  }

  return (
    <Flex align="center" direction="column">
      <Stepper steps={availableQuizzes} currentStep={quizIndex} />
      <Text>{currentQuiz.question}</Text>
      {currentQuiz.answers.map(a => {
        return (
          <Button
            onClick={() => setQuizAnswer(currentQuiz.id.toString(), a)}
            disabled={!!currentQuizAnswer?.id && currentQuizAnswer.id !== a.id}
          >
            {a.question}
          </Button>
        );
      })}
      <Button onClick={onConfirmButton} disabled={!currentQuizAnswer}>
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
  return (
    <Flex align="center" direction="column">
      <Text>Caso completato</Text>
      <Flex position="relative" flexGrow={1}>
        <ClinicalCaseAvatar
          avatar={clinicalCase.avatar}
          w="236px"
          position="absolute"
          bottom="0"
          right="50%"
          transform="translateX(50%)"
        />
      </Flex>
      {step === 'answers' ? (
        <Flex direction="column">
          <Flex mt={2} mb={4} w="100%" align="center" gap="2">
            <Button variant="risen_secondary" w="64px" h="64px">
              <Image src={ExamIcon} />
            </Button>
            <Text variant="bold_28_1p">Risoluzione del caso</Text>
          </Flex>{' '}
          <Box
            backgroundColor="secondary.1000"
            borderColor="primary"
            borderWidth="4px"
            p="4"
            mb="4"
            borderRadius="16px"
          >
            <Text variant="regular_20_1p">CACCASBURO</Text>
            <Flex ml="auto" gap="2">
              <Button
                onClick={() => {
                  alert('YEYE');
                }}
              >
                Ignora
              </Button>
              <Button
                onClick={() => {
                  alert('YEYE');
                }}
                variant="risen_secondary"
              >
                PRESCRIVI
              </Button>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Flex mt={2} mb={4} w="100%" align="center" gap="2">
          YEYEYEYYEYEY
        </Flex>
      )}
      <Button onClick={onChangeTab}>Vai da mammeta</Button>
    </Flex>
  );
};
