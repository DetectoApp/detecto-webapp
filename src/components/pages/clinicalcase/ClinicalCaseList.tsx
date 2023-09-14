import supabase from '../../../supabase';
import { Box, Button, Flex, Grid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalCase } from '../../../types/types';
import { ClinicalCaseAvatarBoxed } from '../../ClinicalCaseAvatar';

export default function ClinicalCaseList() {
  const [clinicalCases, setClinicalCase] = useState<ClinicalCase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchClinicalCases = async () => {
      const { data, error: clinicalCaseError } = await supabase
        .from<ClinicalCase>('clinical_case')
        .select(
          `*, case_details:case_details_id(*, specialization:specialization_id(*))`
        );
      if (clinicalCaseError) {
        console.log(clinicalCaseError);
      }
      setClinicalCase(data ?? []);
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
                  {clinicalCase.case_details?.specialization.name ??
                    'TODO MANCA A DB'}
                </Text>
              </Flex>
            </Flex>
          </Button>
        ))}
      </Grid>
    </Flex>
  );
}
