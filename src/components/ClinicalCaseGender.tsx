import { Gender } from '../types/types';
import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import Male from '../assets/male.svg';
import Female from '../assets/female.svg';

export const ClinicalCaseGender = ({
  gender,
  ...props
}: { gender: Gender } & ImageProps) => {
  switch (gender) {
    case Gender.male:
      return <Image {...props} src={Male} />;
    case Gender.female:
      return <Image {...props} src={Female} />;
    default:
      return <Image {...props} src={Female} />;
  }
};
