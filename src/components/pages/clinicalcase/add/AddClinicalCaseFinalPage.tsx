import { VStack } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { CustomInput } from '../../../inputs/CustomInput';
import { ClinicalCaseFormType } from './AddClinicalCase';

export const AddClinicalCaseFinalPage = ({
  formik,
}: {
  formik: FormikProps<ClinicalCaseFormType>;
}) => {
  return <VStack my="4">Pino</VStack>;
};
