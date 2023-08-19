import {
  Box,
  Button,
  Checkbox,
  Image,
  Input,
  Select,
  Skeleton,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRealtime } from 'react-supabase';
import supabase from '../../../supabase';
import {
  AllOfTalk,
  PreviousVisit,
  Relationship,
  Symptom,
} from '../../../types/talkTypes';
import { ClinicalCase } from '../../../types/types';
import { BodyDistrict, SpecialistType, TalkTypes } from '../../../types/enums';
import { CustomInput } from '../../../components/inputs/CustomInput';

type ClinicalCaseTalkInput = AllOfTalk & {
  talkType: TalkTypes;
};

export default function AddClinicalCaseTalk() {
  const [talk, setTalk] = useState<Partial<ClinicalCaseTalkInput>>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    setLoading(true);

    let tableName = '';
    let talkData:
      | Omit<Symptom, 'id'>
      | Omit<PreviousVisit, 'id'>
      | Omit<Relationship, 'id'>
      | null = null;
    switch (talk.talkType) {
      case TalkTypes.PreviousVisit:
        tableName = 'previous_visit';
        talkData = {
          specialist_type: talk.specialist_type!,
          diagnosis_short: talk.diagnosis_short!,
          diagnosis_reason: talk.diagnosis_reason!,
          is_misleading: talk.is_misleading!,
          clinical_case: talk.clinical_case!,
        };
        break;
      case TalkTypes.Relationship:
        tableName = 'relationship';
        talkData = {
          family_member_grade: talk.family_member_grade!,
          health_state: talk.health_state!,
          details: talk.details!,
          is_misleading: talk.is_misleading ?? false,
          clinical_case: talk.clinical_case!,
        };
        break;
      case TalkTypes.Symptom:
        tableName = 'symptom';
        talkData = {
          body_district: talk.body_district!,
          symptom: talk.symptom!,
          symptom_details: talk.symptom_details!,
          media: talk.media!,
          is_misleading: talk.is_misleading ?? false,
          clinical_case: talk.clinical_case!,
        };
        break;
    }

    const { data, error } = await supabase.from(tableName).insert([talkData]);
    setLoading(false);

    toast({
      title: error?.message || 'Task added!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
    if (!error) setTalk({});
  };

  const [result, reexecute] = useRealtime<ClinicalCase>('clinical_case');
  const { data: clinicalCases, error, fetching } = result;

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
        <Image src={'todo'} mt="30px" maxW="95%" />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack my="4" h="45">
        <Select
          placeholder="clinicalCase"
          onChange={e => {
            console.log(e);
            setTalk(c => ({
              ...c,
              clinical_case: (e.target as any).selectedOptions[0].value,
            }));
          }}
        >
          {clinicalCases.map(c => (
            <option value={c.id}>{c.patient_name}</option>
          ))}
        </Select>
        <Select
          placeholder="talkType"
          onChange={e => {
            console.log(e);
            setTalk(c => ({
              ...c,
              talkType: (e.target as any).selectedOptions[0].value as TalkTypes,
            }));
          }}
        >
          {(Object.keys(TalkTypes) as Array<keyof typeof TalkTypes>).map(
            key => (
              <option value={TalkTypes[key]}>{key}</option>
            )
          )}
        </Select>

        <Checkbox
          isChecked={talk.is_misleading}
          onChange={e =>
            setTalk(c => ({ ...c, is_misleading: e.target.checked }))
          }
          disabled={loading}
        />

        {talk.talkType === TalkTypes.PreviousVisit ? (
          <>
            <Select
              placeholder="specialist_type"
              onChange={e => {
                console.log(e);
                setTalk(c => ({
                  ...c,
                  specialist_type: (e.target as any).selectedOptions[0]
                    .value as SpecialistType,
                }));
              }}
            >
              {(
                Object.keys(SpecialistType) as Array<
                  keyof typeof SpecialistType
                >
              ).map(key => (
                <option value={SpecialistType[key]}>{key}</option>
              ))}
            </Select>
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="diagnosis_short"
              value={talk.diagnosis_short}
              onChange={e =>
                setTalk(c => ({ ...c, diagnosis_short: e.target.value }))
              }
              disabled={loading}
            />
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="diagnosis_reason"
              value={talk.diagnosis_reason}
              onChange={e =>
                setTalk(c => ({ ...c, diagnosis_reason: e.target.value }))
              }
              disabled={loading}
            />
          </>
        ) : talk.talkType === TalkTypes.Relationship ? (
          <>
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="family_member_grade"
              value={talk.family_member_grade}
              onChange={e =>
                setTalk(c => ({ ...c, family_member_grade: e.target.value }))
              }
              disabled={loading}
            />
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="health_state"
              value={talk.health_state}
              onChange={e =>
                setTalk(c => ({ ...c, health_state: e.target.value }))
              }
              disabled={loading}
            />
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="details"
              value={talk.details}
              onChange={e => setTalk(c => ({ ...c, details: e.target.value }))}
              disabled={loading}
            />
          </>
        ) : (
          <>
            <Select
              placeholder="body_district"
              onChange={e => {
                console.log(e);
                setTalk(c => ({
                  ...c,
                  body_district: (e.target as any).selectedOptions[0]
                    .value as BodyDistrict,
                }));
              }}
            >
              {(
                Object.keys(BodyDistrict) as Array<keyof typeof BodyDistrict>
              ).map(key => (
                <option value={BodyDistrict[key]}>{key}</option>
              ))}
            </Select>
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="symptom"
              value={talk.symptom}
              onChange={e => setTalk(c => ({ ...c, symptom: e.target.value }))}
              disabled={loading}
            />
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="symptom_detail"
              value={talk.symptom_details}
              onChange={e =>
                setTalk(c => ({ ...c, symptom_details: e.target.value }))
              }
              disabled={loading}
            />
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
                            placeholder="media"
              value={talk.media}
              onChange={e => setTalk(c => ({ ...c, media: e.target.value }))}
              disabled={loading}
            />
          </>
        )}

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
