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
  PreviousVisit,
  OneOfTalk,
  Relationship,
  Symptom,
} from '../../../../types/talkTypes';
import supabase from '../../../../supabase';
import { TalkTypes } from '../../../../types/enums';
import { useCaseExplorationStore } from '../../../../store';
import BackIcon from '../../../../assets/back.svg';
import TalkIcon from '../../../../assets/talk_icon.svg';

const initialQuestion =
  'Chiedi al paziento le informazioni giuste che possono aiutarti a risolvere il suo problema';
const ignoredString = 'Hai deciso di ignorare questa domanda';

const ClinicalCaseTalksModalList = ({
  setTalk,
  clinicalCase,
}: {
  setTalk: (
    talk: OneOfTalk & { type: TalkTypes; answer: string; title: string }
  ) => void;
  clinicalCase: ClinicalCase;
}) => {
  const [talkFilter, setTalkFilter] = useState<TalkTypes | undefined>(
    undefined
  );

  const [availableTalks, setAvailableTalks] = useState<
    (OneOfTalk & { type: TalkTypes; answer: string; title: string })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const talkStatuses = useCaseExplorationStore(s => s.talkStatuses);

  useEffect(() => {
    const fetchTalks = async () => {
      const talks: (OneOfTalk & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[] = [];

      const { data: previousVisit, error: previousVisitError } = await supabase
        .from<PreviousVisit>('previous_visit')
        .select('*')
        .eq('clinical_case', clinicalCase.id);

      if (previousVisitError) {
        console.log(previousVisitError);
      } else
        talks.push(
          ...previousVisit.map(e => ({
            ...e,
            type: TalkTypes.PreviousVisit,
            title: e.specialist_type,
            answer: e.diagnosis_short,
          }))
        );

      const { data: relationship, error: relationshipError } = await supabase
        .from<Relationship>('relationship')
        .select('*')
        .eq('clinical_case', clinicalCase.id);

      if (relationshipError) {
        console.log(relationshipError);
      } else
        talks.push(
          ...relationship.map(e => ({
            ...e,
            type: TalkTypes.Relationship,
            title: e.family_member_grade + e.health_state,
            answer: e.details,
          }))
        );

      const { data: symptom, error: symptomError } = await supabase
        .from<Symptom>('symptom')
        .select('*')
        .eq('clinical_case', clinicalCase.id);

      if (symptomError) {
        console.log(symptomError);
      } else
        talks.push(
          ...symptom.map(e => ({
            ...e,
            type: TalkTypes.Symptom,
            title: e.body_district,
            answer: e.symptom_details,
          }))
        );

      setAvailableTalks(talks);
      setLoading(false);
    };

    fetchTalks();
  }, [clinicalCase]);

  const filteredTalks = useMemo(() => {
    if (talkFilter) return availableTalks.filter(t => t.type === talkFilter);
    else return availableTalks;
  }, [talkFilter, availableTalks]);

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
        placeholder="TalkType"
        onChange={e => {
          console.log(e);
          setTalkFilter(
            (e.target as any).selectedOptions[0].value as TalkTypes
          );
        }}
      >
        {(Object.keys(TalkTypes) as Array<keyof typeof TalkTypes>).map(key => (
          <option value={TalkTypes[key]}>{key}</option>
        ))}
        <option value={undefined}>Tutti</option>
      </Select>

      <Flex wrap="wrap" mt={8}>
        {!filteredTalks.length ? (
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
            {filteredTalks.map(talk => {
              const talkStatus = talkStatuses[talk.type + talk.id];
              return (
                <ListItemButton
                  key={talk.type + talk.id}
                  pallino={
                    talkStatus === 'IGNORED'
                      ? 'error'
                      : talkStatus === 'OPENED'
                      ? 'secondary.500'
                      : undefined
                  }
                  onClick={() => {
                    setTalk(talk);
                  }}
                  iconUrl={TalkIcon}
                  title={talk.title}
                />
              );
            })}
          </Grid>
        )}
      </Flex>
    </>
  );
};

const TalkModalDetail = ({
  talk,
  setTalk,
}: {
  talk: OneOfTalk & { type: TalkTypes; answer: string; title: string };
  setTalk: (talk: undefined) => void;
}) => {
  const { talkStatus, setTalkStatus } = useCaseExplorationStore(s => ({
    talkStatus: s.talkStatuses[talk.type + talk.id],
    setTalkStatus: s.setTalkStatus,
  }));
  console.log({ talkStatus, talk });
  return (
    <>
      <Image
        mt={2}
        mr="auto"
        h="48px"
        src={BackIcon}
        onClick={() => {
          setTalk(undefined);
        }}
      />
      <Flex mt={2} mb={4} w="100%" align="center" gap="2">
        <Button variant="risen_secondary" w="64px" h="64px">
          <Image src={TalkIcon} />
        </Button>
        <Text variant="bold_28_1p">{talk.title}</Text>
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
          {talkStatus === 'OPENED'
            ? talk.answer
            : talkStatus === 'IGNORED'
            ? ignoredString
            : initialQuestion}
        </Text>
      </Box>

      <Flex ml="auto" gap="2">
        <Button
          disabled={talkStatus === 'OPENED' || talkStatus === 'IGNORED'}
          onClick={() => setTalkStatus(talk.type + talk.id, 'IGNORED')}
        >
          Ignora
        </Button>
        <Button
          disabled={talkStatus === 'OPENED' || talkStatus === 'IGNORED'}
          onClick={() => {
            setTalkStatus(talk.type + talk.id, 'OPENED');
          }}
          variant="risen_secondary"
        >
          CHIEDI
        </Button>
      </Flex>
    </>
  );
};

export const ClinicalCaseTalksModal = ({
  clinicalCase,
  ...modalProps
}: { clinicalCase: ClinicalCase } & Omit<ModalProps, 'children'>) => {
  const [talk, setTalk] = useState<
    (OneOfTalk & { type: TalkTypes; answer: string; title: string }) | undefined
  >(undefined);

  return (
    <ModalContainer
      {...modalProps}
      titleIconUrl={TalkIcon}
      title="Parla col paziente"
      titleBackgroundColor="white"
    >
      {talk ? (
        <TalkModalDetail talk={talk} setTalk={setTalk} />
      ) : (
        <ClinicalCaseTalksModalList
          setTalk={setTalk}
          clinicalCase={clinicalCase}
        />
      )}
    </ModalContainer>
  );
};
