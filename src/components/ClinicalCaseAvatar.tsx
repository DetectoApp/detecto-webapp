import { AvatarTypes } from '../types/types';
import React from 'react';
import { Flex, FlexProps, Image, ImageProps, flexbox } from '@chakra-ui/react';

export const ClinicalCaseAvatar = ({
  avatar,
  ...props
}: { avatar: AvatarTypes } & ImageProps) => {
  switch (avatar) {
    case AvatarTypes.ADOLESCENT:
      return <Image {...props} src="/assets/female_avatar.svg" />;
    case AvatarTypes.ADULT:
      return <Image {...props} src="/assets/female_avatar.svg" />;
    case AvatarTypes.STAGIONATO:
      return <Image {...props} src="/assets/female_avatar.svg" />;
    default:
      return <Image {...props} src="/assets/female_avatar.svg" />;
  }
};

export const ClinicalCaseAvatarBoxed = ({
  avatar,
  imageProps,
  ...props
}: { imageProps?: ImageProps; avatar: AvatarTypes } & FlexProps) => (
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
