import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  ModalProps,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useCaseExplorationStore } from '../../../../store';
import { ExamTypes } from '../../../../types/enums';
import { ListItemButton, ModalContainer } from '../../../ModalComponents';

import { OneOfExamDataType } from '@/supabase/queries';
import BackIcon from '../../../../assets/back.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';
import { getString } from '../../../../intl';

const ClinicalCaseExamsModalList = ({
  setExam,
  exams,
}: {
  setExam: (
    exam: OneOfExamDataType & { type: ExamTypes; answer: string; title: string }
  ) => void;
  exams: (OneOfExamDataType & {
    type: ExamTypes;
    answer: string;
    title: string;
  })[];
}) => {
  const [examFilter, setExamFilter] = useState<ExamTypes | undefined>(
    undefined
  );

  const examStatuses = useCaseExplorationStore(s => s.examStatuses);

  const filteredExams = useMemo(() => {
    if (examFilter) return exams.filter(t => t.type === examFilter);
    else return exams;
  }, [examFilter, exams]);

  return (
    <>
      <Select
        placeholder="Tutti"
        onChange={e => {
          console.log(e);
          setExamFilter(
            (e.target as any).selectedOptions[0].value as ExamTypes
          );
        }}
      >
        {(Object.keys(ExamTypes) as Array<keyof typeof ExamTypes>).map(key => (
          <option value={ExamTypes[key]}>{key}</option>
        ))}
        <option value={undefined}>Tutti</option>
      </Select>

      <Flex wrap="wrap" mt={8}>
        {!filteredExams.length ? (
          <Box alignItems="center">
            <Text variant="page_title" mt="30px">
              Nessun elemento appartenente alla selezione
            </Text>
          </Box>
        ) : (
          <Grid
            templateColumns="repeat(3, 1fr)"
            columnGap={2}
            rowGap={8}
            w="100%"
          >
            {filteredExams.map(exam => {
              const examStatus = examStatuses[exam.type + exam.id];
              return (
                <ListItemButton
                  key={exam.type + exam.id}
                  pallino={
                    examStatus
                      ? examStatus.status === 'IGNORED'
                        ? 'error'
                        : 'secondary.500'
                      : undefined
                  }
                  onClick={() => {
                    setExam(exam);
                  }}
                  iconUrl={TalkIcon}
                  title={exam.title}
                />
              );
            })}
          </Grid>
        )}
      </Flex>
    </>
  );
};

const ExamModalDetail = ({
  exam,
  setExam,
}: {
  exam: OneOfExamDataType & { type: ExamTypes; answer: string; title: string };
  setExam: (exam: undefined) => void;
}) => {
  const { examStatus, setExamStatus } = useCaseExplorationStore(s => ({
    examStatus: s.examStatuses[exam.type + exam.id],
    setExamStatus: s.setExamStatus,
  }));

  return (
    <>
      <Image
        mt={2}
        mr="auto"
        h="48px"
        src={BackIcon}
        onClick={() => {
          setExam(undefined);
        }}
      />
      <Flex mt={2} mb={4} w="100%" align="center" gap="2">
        <Button variant="risen_secondary" w="64px" h="64px">
          <Image src={ExamIcon} />
        </Button>
        <Text variant="bold_28_1p">{exam.title}</Text>
      </Flex>

      <Box
        backgroundColor="secondary.1000"
        borderColor="primary"
        borderWidth="4px"
        p="4"
        mb="4"
        borderRadius="16px"
      >
        <Text variant="regular_20_1p">
          {examStatus
            ? examStatus.status === 'OPENED'
              ? exam.answer
              : getString('ignoredExam')
            : getString('examQuestion')}
        </Text>
      </Box>

      <Flex ml="auto" gap="2">
        <Button
          isDisabled={!!examStatus}
          onClick={() =>
            setExamStatus(exam.type + exam.id, {
              id: exam.id,
              status: 'IGNORED',
            })
          }
        >
          Ignora
        </Button>
        <Button
          isDisabled={!!examStatus}
          onClick={() => {
            setExamStatus(exam.type + exam.id, {
              id: exam.id,
              status: 'OPENED',
            });
          }}
          variant="risen_secondary"
        >
          PRESCRIVI
        </Button>
      </Flex>
    </>
  );
};

export const ClinicalCaseExamsModal = ({
  exams,
  ...modalProps
}: {
  exams: (OneOfExamDataType & {
    type: ExamTypes;
    answer: string;
    title: string;
  })[];
} & Omit<ModalProps, 'children'>) => {
  const [exam, setExam] = useState<
    | (OneOfExamDataType & { type: ExamTypes; answer: string; title: string })
    | undefined
  >(undefined);

  return (
    <ModalContainer
      {...modalProps}
      titleIconUrl={ExamIcon}
      title="Prescrivi esami"
      titleBackgroundColor="secondary.1000"
    >
      {exam ? (
        <ExamModalDetail exam={exam} setExam={setExam} />
      ) : (
        <ClinicalCaseExamsModalList setExam={setExam} exams={exams} />
      )}
    </ModalContainer>
  );
};
