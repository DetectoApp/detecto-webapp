import { Gender } from '../types/types';
import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';

export const ClinicalCaseGender = ({
  gender,
  ...props
}: { gender: Gender } & ImageProps) => {
  switch (gender) {
    case Gender.male:
      return <Image {...props} src="/assets/male.svg" />;
    case Gender.female:
      return <Image {...props} src="/assets/female.svg" />;
    default:
      return <Image {...props} src="/assets/female.svg" />;
  }
};
