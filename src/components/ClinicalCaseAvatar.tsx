import { AvatarTypes } from '../types/types';
import React from 'react';
import { Flex, FlexProps, Image, ImageProps } from '@chakra-ui/react';
import FemaleAvatar from '../assets/female_avatar.svg';

export const ClinicalCaseAvatar = ({
  avatar,
  ...props
}: { avatar: string } & ImageProps) => {
  switch (avatar) {
    case AvatarTypes.ADOLESCENT:
      return <Image {...props} src={FemaleAvatar} />;
    case AvatarTypes.ADULT:
      return <Image {...props} src={FemaleAvatar} />;
    case AvatarTypes.STAGIONATO:
      return <Image {...props} src={FemaleAvatar} />;
    default:
      return <Image {...props} src={FemaleAvatar} />;
  }
};

export const ClinicalCaseAvatarBoxed = ({
  avatar,
  imageProps,
  ...props
}: { imageProps?: ImageProps; avatar: string } & FlexProps) => (
  <Flex
    bgColor="accent"
    align="center"
    justify="center"
    borderWidth="4px"
    borderColor="primary"
    borderRadius="16px"
    {...props}
  >
    <ClinicalCaseAvatar
      avatar={avatar}
      height="80%"
      mt="auto"
      {...imageProps}
    />
  </Flex>
);
