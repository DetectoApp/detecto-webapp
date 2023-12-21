import { VStack } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { ChoiceButtonGroup } from '../../../inputs/ChoiceButtonGroup';
import { CustomInput } from '../../../inputs/CustomInput';
import { ClinicalCaseFormType } from './AddClinicalCase';

export const AddClinicalCasePage1 = ({
  formik,
}: {
  formik: FormikProps<ClinicalCaseFormType>;
}) => {
  return (
    <VStack my="4">
      <CustomInput
        label="Name"
        mb="2"
        name="patient_name"
        errorText={formik.touched.patient_name && formik.errors.patient_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        placeholder="patient name"
      />

      <CustomInput
        label="Age"
        mb="2"
        name="age"
        type="number"
        errorText={formik.touched.age && formik.errors.age}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        placeholder="patient age"
      />

      <ChoiceButtonGroup
        values={[
          { id: 'M', text: 'Male' },
          { id: 'F', text: 'Female' },
        ]}
        currentChoiceValue={undefined}
        onSelect={console.log}
      />
    </VStack>
  );
};
