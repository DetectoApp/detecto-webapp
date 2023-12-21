import {
  Box,
  Button,
  Flex,
  Grid,
  Skeleton,
  Text,
  Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import { CaseStatus, ClinicalCase } from '../../../types/types';
import { ClinicalCaseAvatarBoxed } from '../../ClinicalCaseAvatar';
import { ClinicalCaseDataType, fetchCases } from '../../../supabase/queries';

export default function ClinicalCaseList() {
  const [{ cases, draftCases }, setClinicalCase] = useState<{
    cases: ClinicalCaseDataType[];
    draftCases: ClinicalCaseDataType[];
  }>({ cases: [], draftCases: [] });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchClinicalCases = async () => {
      const cases = await fetchCases();
      const savedCases =
        cases?.filter(c => c.case_status === CaseStatus.SAVED) ?? [];
      const draftCases =
        cases?.filter(c => c.case_status === CaseStatus.DRAFT) ?? [];
      setClinicalCase({ cases: savedCases, draftCases });
      setLoading(false);
    };

    fetchClinicalCases();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!cases.length && !draftCases.length) {
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
        {cases.map(clinicalCase => (
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
                avatar={clinicalCase.avatar ?? 'ERROR'}
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
                  {clinicalCase.case_details?.specialization?.name ??
                    'TODO MANCA A DB'}
                </Text>
              </Flex>
            </Flex>
          </Button>
        ))}
      </Grid>
      <Text variant="page_title" mb="6" mt="8">
        Ecco tutti i casi clinici in bozza
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} w="100%">
        {draftCases.map(clinicalCase => (
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
                avatar={clinicalCase.avatar ?? 'ERROR'}
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
                  {clinicalCase.case_details?.specialization?.name ??
                    'TODO MANCA A DB'}
                </Text>
              </Flex>
            </Flex>
          </Button>
        ))}

        <Button
          height="auto"
          p={3}
          borderRadius="24px"
          onClick={() => {
            navigate(`/demoadd`);
          }}
        >
          <Flex direction="column" w="100%" mb="auto">
            <Flex
              align="center"
              justify="center"
              borderWidth="4px"
              borderColor="primary"
              borderRadius="16px"
              mb="2"
              h="166px"
              w="100%"
            >
              <Image src="TODO" height="80%" mt="auto" />
            </Flex>
            <Text variant="bold_24_1p" mb="auto">
              Crea caso clinico
            </Text>
          </Flex>
        </Button>
      </Grid>
    </Flex>
  );
}
