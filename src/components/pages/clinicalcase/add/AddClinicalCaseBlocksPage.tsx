import { VStack } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { CustomInput } from '../../../inputs/CustomInput';
import { ClinicalCaseFormType } from './AddClinicalCase';
import CrossIcon from '../../../../assets/cross_icon.svg';

const getMockOptions = async () => {
  return ['a', 'b'];
};

export interface FormInputConfig {
  name: string;
  type: 'textarea' | 'toggle' | 'select';
  options?: string[] | (() => string[]) | (() => Promise<string[]>);
  defaultValue?: any;
}

export interface BlockConfig {
  name: string;
  icon: any;
  displayName: string;
  formInputs: FormInputConfig[];
}

const configs: BlockConfig[] = [
  {
    name: 'sympthom',
    icon: CrossIcon,
    displayName: 'Sintomo',
    formInputs: [
      { name: 'body_district', type: 'select', options: getMockOptions },
      { name: 'sympthom', type: 'select', options: getMockOptions },
      { name: 'description', type: 'textarea', defaultValue: '' },
      { name: 'is_misleading', type: 'toggle' },
    ],
  },
];

export const AddClinicalCaseBlocksPage = ({
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
