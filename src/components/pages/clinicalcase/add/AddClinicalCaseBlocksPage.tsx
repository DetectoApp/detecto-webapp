import { Button, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import CrossIcon from '../../../../assets/cross_icon.svg';
import { CollapsableCard } from '../../../layout/CollapsableCard';
import { ClinicalCaseFormType } from './AddClinicalCase';

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
    <VStack my="4">
      <CollapsableCard
        headerComponent={isExpanded => (
          <Flex
            justify="space-between"
            align="center"
            w="100%"
            padding=".75rem 1rem"
            bg="red"
          >
            <Text variant="button" textTransform="uppercase">
              Pino
            </Text>
            <Image
              w="2rem"
              h="2rem"
              style={{
                transform: isExpanded ? 'rotateX(180deg)' : '',
                transition: '500ms linear all',
              }}
              src="PINO"
            />
          </Flex>
        )}
      >
        <Flex padding="1.5rem 1.25rem">
          <Grid templateColumns="repeat(3, 1fr)" gap={2} w="100%">
            <Flex direction="column" align="center">
              <Button w="4rem" h="4rem">
                <Image src="PINO" w="2.5rem" h="2.5rem" />
              </Button>
              <Text w="100%" textAlign="center" mt=".5rem">
                Pino1
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Button w="4rem" h="4rem">
                <Image src="PINO" w="2.5rem" h="2.5rem" />
              </Button>
              <Text w="100%" textAlign="center" mt=".5rem">
                Pino1
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Button w="4rem" h="4rem">
                <Image src="PINO" w="2.5rem" h="2.5rem" />
              </Button>
              <Text w="100%" textAlign="center" mt=".5rem">
                Pino1
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </CollapsableCard>
    </VStack>
  );
};
