import { VStack } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { CustomInput } from '../../../inputs/CustomInput';
import { ClinicalCaseFormType } from './AddClinicalCase';

export const AddClinicalCasePage2 = ({
  formik,
}: {
  formik: FormikProps<ClinicalCaseFormType>;
}) => {
  return (
    <VStack my="4" h="45">
      <CustomInput
        label="weight"
        mb="2"
        name="patient_weight"
        type="number"
        step="5"
        errorText={
          formik.touched.patient_weight && formik.errors.patient_weight
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        placeholder="patient weight"
      />

      <CustomInput
        label="height"
        mb="2"
        name="patient_height"
        type="number"
        step="5"
        errorText={
          formik.touched.patient_weight && formik.errors.patient_weight
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        placeholder="patient height"
      />
      <CustomInput
        label="brief description"
        mb="2"
        name="brief_description"
        type="textarea"
        errorText={
          formik.touched.brief_description && formik.errors.brief_description
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        placeholder="patient brief description"
      />
    </VStack>
  );
};
