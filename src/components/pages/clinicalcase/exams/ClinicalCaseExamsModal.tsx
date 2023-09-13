import { ListItemButton, ModalContainer } from '../../../ModalComponents';
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  ModalProps,
  Select,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { ClinicalCase } from '../../../../types/types';
import {
  InstrumentalExam,
  OneOfExam,
  LaboratoryExam,
  ObjectiveExam,
} from '../../../../types/examTypes';
import supabase from '../../../../supabase';
import { ExamTypes } from '../../../../types/enums';
import { useCaseExplorationStore } from '../../../../store';

import TalkIcon from '../../../../assets/talk_icon.svg';
import ExamIcon from '../../../../assets/exam_icon.svg';
import BackIcon from '../../../../assets/back.svg';

const initialQuestion =
  'Vuoi effettuare l’esame? Se si premi prescrivi.\n\nRicorda che gli esami possono essere anche svianti e non correlati al caso.';
const ignoredString = 'Hai ignorato l’esame.';

const ClinicalCaseExamsModalList = ({
  setExam,
  clinicalCase,
}: {
  setExam: (
    exam: OneOfExam & { type: ExamTypes; answer: string; title: string }
  ) => void;
  clinicalCase: ClinicalCase;
}) => {
  const [examFilter, setExamFilter] = useState<ExamTypes | undefined>(
    undefined
  );

  const [availableExams, setAvailableExams] = useState<
    (OneOfExam & { type: ExamTypes; answer: string; title: string })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const examStatuses = useCaseExplorationStore(s => s.examStatuses);

  useEffect(() => {
    const fetchExams = async () => {
      const exams: (OneOfExam & {
        type: ExamTypes;
        answer: string;
        title: string;
      })[] = [];

      const { data: instrumentalExam, error: instrumentalExamError } =
        await supabase
          .from<InstrumentalExam>('instrumental_exam')
          .select('*')
          .eq('clinical_case', clinicalCase.id);

      if (instrumentalExamError) {
        console.log(instrumentalExamError);
      } else
        exams.push(
          ...instrumentalExam.map(e => ({
            ...e,
            type: ExamTypes.InstrumentalExam,
            title: e.exam_name,
            answer: e.details,
          }))
        );

      const { data: laboratoryExam, error: laboratoryExamError } =
        await supabase
          .from<LaboratoryExam>('laboratory_exam')
          .select('*')
          .eq('clinical_case', clinicalCase.id);

      if (laboratoryExamError) {
        console.log(laboratoryExamError);
      } else
        exams.push(
          ...laboratoryExam.map(e => ({
            ...e,
            type: ExamTypes.LaboratoryExam,
            title: e.exam_name,
            answer: e.details,
          }))
        );

      const { data: objectiveExam, error: objectiveExamError } = await supabase
        .from<ObjectiveExam>('objective_exam')
        .select('*')
        .eq('clinical_case', clinicalCase.id);

      if (objectiveExamError) {
        console.log(objectiveExamError);
      } else
        exams.push(
          ...objectiveExam.map(e => ({
            ...e,
            type: ExamTypes.ObjectiveExam,
            title: e.body_district,
            answer: e.details,
          }))
        );

      setAvailableExams(exams);
      setLoading(false);
    };

    fetchExams();
  }, [clinicalCase]);

  const filteredExams = useMemo(() => {
    if (examFilter) return availableExams.filter(t => t.type === examFilter);
    else return availableExams;
  }, [examFilter, availableExams]);

  if (loading) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  return (
    <>
      <Select
        placeholder="ExamType"
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
                    examStatus === 'IGNORED'
                      ? 'error'
                      : examStatus === 'OPENED'
                      ? 'secondary.500'
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
  exam: OneOfExam & { type: ExamTypes; answer: string; title: string };
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
          {examStatus === 'OPENED'
            ? exam.answer
            : examStatus === 'IGNORED'
            ? ignoredString
            : initialQuestion}
        </Text>
      </Box>

      <Flex ml="auto" gap="2">
        <Button onClick={() => setExamStatus(exam.type + exam.id, 'IGNORED')}>
          Ignora
        </Button>
        <Button
          onClick={() => {
            setExamStatus(exam.type + exam.id, 'OPENED');
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
  clinicalCase,
  ...modalProps
}: { clinicalCase: ClinicalCase } & Omit<ModalProps, 'children'>) => {
  const [exam, setExam] = useState<
    (OneOfExam & { type: ExamTypes; answer: string; title: string }) | undefined
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
        <ClinicalCaseExamsModalList
          setExam={setExam}
          clinicalCase={clinicalCase}
        />
      )}
    </ModalContainer>
  );
};
