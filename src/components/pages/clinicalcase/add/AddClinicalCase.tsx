import { Button, Flex, Image, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import CrossIcon from '../../../../assets/cross_icon.svg';
import supabase from '../../../../supabase';
import { ClinicalCase, Gender } from '../../../../types/types';
import { Stepper } from '../../../layout/Stepper';
import { useAuth } from '../../../providers/AuthProvider';
import { AddClinicalCasePage1 } from './AddClinicalCasePage1';
import { AddClinicalCasePage2 } from './AddClinicalCasePage2';
import { AddClinicalCaseBlocksPage } from './AddClinicalCaseBlocksPage';
import { AddClinicalCaseFinalPage } from './AddClinicalCaseFinalPage';

export type ClinicalCaseFormType = Omit<
  ClinicalCase,
  'id' | 'author' | 'case_status' | 'avatar'
>;

const schema = Yup.object<ClinicalCaseFormType>({
  patient_name: '',
  age: Yup.number().required('Controlla il campo!'),
  gender: Yup.string().required('Controlla il campo!'),
  patient_weight: Yup.number().required('Controlla il campo!'),
  patient_height: Yup.number().required('Controlla il campo!'),
  brief_description: Yup.string().required('Controlla il campo!'),
});

export default function AddClinicalCase() {
  const toast = useToast();
  const { user } = useAuth();

  const formik = useFormik<ClinicalCaseFormType>({
    initialValues: {
      patient_name: '',
      age: 18,
      gender: Gender.male,
      patient_weight: 60,
      patient_height: 175,
      brief_description: '',
    },
    validationSchema: schema,
    onSubmit: async input => {
      alert({ ...input, author: user?.id });
    },
  });

  const steps = [
    <AddClinicalCasePage1 formik={formik} />,
    <AddClinicalCasePage2 formik={formik} />,
    <AddClinicalCaseBlocksPage formik={formik} />,
    <AddClinicalCaseFinalPage formik={formik} />,
  ];

  const [stepIndex, setStepIndex] = useState<number>(0);

  return (
    <Flex align="center" direction="column" h="100%" px="8" py="4">
      <Flex gap="30px" w="100%" align="center">
        <Image w="64px" h="64px" src={CrossIcon} />
        <Stepper steps={steps} currentStep={stepIndex} grow="1" />
      </Flex>
      {steps[stepIndex]}
      <Button
        disabled={stepIndex === steps.length - 1}
        onClick={() => {
          console.log(stepIndex, stepIndex + 1);
          setStepIndex(s => s + 1);
        }}
      >
        next
      </Button>
      <Button
        disabled={stepIndex === 0}
        onClick={() => {
          setStepIndex(s => s - 1);
        }}
      >
        previous
      </Button>
    </Flex>
  );
}
