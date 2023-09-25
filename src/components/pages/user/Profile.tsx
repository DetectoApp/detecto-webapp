import { Button, Flex, VStack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { ClinicalCaseAvatarBoxed } from '../../../components/ClinicalCaseAvatar';
import { CustomInput } from '../../../components/inputs/CustomInput';
import { useAuth } from '../../../components/providers/AuthProvider';
import { AvatarTypes, RegisterFormData } from '../../../types/types';

export default function Profile() {
  const schema = Yup.object<RegisterFormData>({
    email: Yup.string().required('Controlla il campo!'),
    password: Yup.string().required('Controlla il campo!'),
    firstname: Yup.string().required('Controlla il campo!'),
    surname: Yup.string().required('Controlla il campo!'),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
  } = useFormik<RegisterFormData>({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      surname: '',
    },
    validationSchema: schema,
    onSubmit: async input => {
      const { error } = await edit({
        email: input.email!,
        password: input.password!,
        data: {
          firstname: input.firstname!,
          surname: input.surname!,
          role: 'DOCTOR',
        },
      });

      toast({
        title: error?.message || 'Task added!',
        position: 'top',
        status: error ? 'error' : 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const toast = useToast();

  const { edit, logout } = useAuth();

  return (
    <Flex mt="10" direction="column" flexGrow={1}>
      <ClinicalCaseAvatarBoxed
        avatar={AvatarTypes.ADOLESCENT}
        w="136px"
        h="136px"
        mt="8"
        mb="4"
        mx="auto"
      />

      <form onSubmit={handleSubmit}>
        <VStack mt="10" gap="2">
          <CustomInput
            label="Email"
            h="100%"
            placeholder="email"
            autoComplete="email"
            name="email"
            errorText={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />
          <CustomInput
            label="Password"
            h="100%"
            placeholder="password"
            type="password"
            autoComplete="new-password"
            name="password"
            errorText={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />

          <Button
            variant="risen_secondary"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Salvaaggio..."
          >
            Salva
          </Button>
        </VStack>
      </form>

      <Button onClick={logout} mb="2" mt="auto">
        Log out
      </Button>

      <Button onClick={logout} variant="risen_error" mb="8">
        ELIMINA ACCOUNT
      </Button>
    </Flex>
  );
}
