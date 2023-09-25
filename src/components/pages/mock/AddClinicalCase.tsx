import { useAuth } from '../../../components/providers/AuthProvider';
import { Button, Input, Select, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import supabase from '../../../supabase';
import {
  AvatarTypes,
  CaseStatus,
  ClinicalCase,
  Gender,
  Specialization,
} from '../../../types/types';
import { CustomInput } from '../../../components/inputs/CustomInput';

export default function AddClinicalCase() {
  const [clinicalCase, setClinicalCase] = useState<Partial<ClinicalCase>>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    setLoading(true);
    const { data, error } = await supabase
      .from('clinical_case')
      .insert([{ ...clinicalCase, author: user?.id }]);
    setLoading(false);

    toast({
      title: error?.message || 'Task added!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
    if (!error) setClinicalCase({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack my="4" h="45">
        <CustomInput
          label="PLACEHOLDERLABEL"
          h="100%"
          placeholder="patient name"
          value={clinicalCase.patient_name}
          onChange={e =>
            setClinicalCase(c => ({ ...c, patient_name: e.target.value }))
          }
          isDisabled={loading}
        />

        <CustomInput
          label="PLACEHOLDERLABEL"
          type="number"
          h="100%"
          placeholder="patient age"
          value={clinicalCase.age}
          onChange={e =>
            setClinicalCase(c => ({ ...c, age: e.target.valueAsNumber }))
          }
          isDisabled={loading}
        />

        <Select
          placeholder="Uhlala"
          onChange={e => {
            console.log(e);
            setClinicalCase(c => ({
              ...c,
              gender: (e.target as any).selectedOptions[0].value as Gender,
            }));
          }}
        >
          {(Object.keys(Gender) as Array<keyof typeof Gender>).map(key => (
            <option value={Gender[key]}>{key}</option>
          ))}
        </Select>

        <CustomInput
          label="PLACEHOLDERLABEL"
          type="number"
          h="100%"
          placeholder="patient weight"
          value={clinicalCase.patient_weight}
          onChange={e =>
            setClinicalCase(c => ({
              ...c,
              patient_weight: e.target.valueAsNumber,
            }))
          }
          isDisabled={loading}
        />
        <CustomInput
          label="PLACEHOLDERLABEL"
          type="number"
          h="100%"
          placeholder="patient height"
          value={clinicalCase.patient_height}
          onChange={e =>
            setClinicalCase(c => ({
              ...c,
              patient_height: e.target.valueAsNumber,
            }))
          }
          isDisabled={loading}
        />

        <CustomInput
          label="PLACEHOLDERLABEL"
          h="100%"
          placeholder="brief desc"
          value={clinicalCase.brief_description}
          onChange={e =>
            setClinicalCase(c => ({ ...c, brief_description: e.target.value }))
          }
          isDisabled={loading}
        />

        <Select
          placeholder="specialization"
          onChange={e => {
            console.log(e);
            setClinicalCase(c => ({
              ...c,
              specialization: (e.target as any).selectedOptions[0]
                .value as Specialization,
            }));
          }}
        >
          {(
            Object.keys(Specialization) as Array<keyof typeof Specialization>
          ).map(key => (
            <option value={Specialization[key]}>{key}</option>
          ))}
        </Select>

        <Select
          placeholder="status"
          onChange={e => {
            console.log(e);
            setClinicalCase(c => ({
              ...c,
              case_status: (e.target as any).selectedOptions[0]
                .value as CaseStatus,
            }));
          }}
        >
          {(Object.keys(CaseStatus) as Array<keyof typeof CaseStatus>).map(
            key => (
              <option value={CaseStatus[key]}>{key}</option>
            )
          )}
        </Select>
        <Select
          placeholder="avatar"
          onChange={e => {
            console.log(e);
            setClinicalCase(c => ({
              ...c,
              avatar: (e.target as any).selectedOptions[0].value as AvatarTypes,
            }));
          }}
        >
          {(Object.keys(AvatarTypes) as Array<keyof typeof AvatarTypes>).map(
            key => (
              <option value={AvatarTypes[key]}>{key}</option>
            )
          )}
        </Select>

        <Button
          colorScheme="blue"
          px="10"
          h="100%"
          type="submit"
          isLoading={loading}
          loadingText="Adding"
        >
          Add
        </Button>
      </VStack>
    </form>
  );
}
