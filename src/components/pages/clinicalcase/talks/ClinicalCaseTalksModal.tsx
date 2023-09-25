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
  talks,
}: {
  setTalk: (
    talk: OneOfTalk & { type: TalkTypes; answer: string; title: string }
  ) => void;
  talks: (OneOfTalk & { type: TalkTypes; answer: string; title: string })[];
}) => {
  const [talkFilter, setTalkFilter] = useState<TalkTypes | undefined>(
    undefined
  );

  const talkStatuses = useCaseExplorationStore(s => s.talkStatuses);

  const filteredTalks = useMemo(() => {
    if (talkFilter) return talks.filter(t => t.type === talkFilter);
    else return talks;
  }, [talkFilter, talks]);

  return (
    <>
      <Select
        placeholder="Tutti"
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
                  variant={'risen'}
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
        <Button variant="risen" w="64px" h="64px">
          <Image src={TalkIcon} />
        </Button>
        <Text variant="bold_28_1p">{talk.title}</Text>
      </Flex>

      <Box
        backgroundColor="white"
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
          isDisabled={talkStatus === 'OPENED' || talkStatus === 'IGNORED'}
          onClick={() => setTalkStatus(talk.type + talk.id, 'IGNORED')}
        >
          Ignora
        </Button>
        <Button
          isDisabled={talkStatus === 'OPENED' || talkStatus === 'IGNORED'}
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
  talks,
  ...modalProps
}: {
  talks:
    | (OneOfTalk & {
        type: TalkTypes;
        answer: string;
        title: string;
      })[];
} & Omit<ModalProps, 'children'>) => {
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
        <ClinicalCaseTalksModalList setTalk={setTalk} talks={talks} />
      )}
    </ModalContainer>
  );
};
