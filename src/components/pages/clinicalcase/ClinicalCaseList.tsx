import {
  ClinicalCaseAvatar,
  ClinicalCaseAvatarBoxed,
} from '../../ClinicalCaseAvatar';
import { ClinicalCase } from '../../../types/types';
import {
  Box,
  VStack,
  Image,
  Skeleton,
  Text,
  Flex,
  Button,
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRealtime } from 'react-supabase';

export default function ClinicalCaseList() {
  const [result, reexecute] = useRealtime<ClinicalCase>('clinical_case');
  const { data: clinicalCases, error, fetching } = result;

  const navigate = useNavigate();

  if (fetching) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!clinicalCases || !clinicalCases.length) {
    return (
      <Box alignItems="center">
        <Text variant="page_title" mt="30px">
          Nessun elemento appartenente alla selezione
        </Text>
      </Box>
    );
  }

  return (
    <Flex direction="column">
      <Text variant="page_title" mb="6" mt="8">
        Ecco tutti i tuoi casi clinici
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} w="100%">
        {clinicalCases.map(clinicalCase => (
          <Button
            height="auto"
            p={3}
            borderRadius="24px"
            onClick={() => {
              navigate(`/case/${clinicalCase.id}`);
            }}
            key={clinicalCase.id}
          >
            <Flex direction="column" w="100%">
              <ClinicalCaseAvatarBoxed
                avatar={clinicalCase.avatar}
                mb="2"
                h="166px"
                w="100%"
              />
              <Text variant="bold_24_1p" mb={2}>
                {clinicalCase.patient_name}
              </Text>
              <Flex
                align="center"
                justify="center"
                borderWidth="4px"
                borderColor="primary"
                borderRadius="8px"
                height="40px"
              >
                <Text variant="specialty_name_list">
                  {clinicalCase.specialization}
                </Text>
              </Flex>
            </Flex>
          </Button>
        ))}
      </Grid>
    </Flex>
  );
}
