import { Button, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { CustomInput } from '../../../components/inputs/CustomInput';
import { useAuth } from '../../../components/providers/AuthProvider';
import { RegisterFormData } from '../../../types/types';
import { useQueryParams } from '../../../components/hooks/useQueryParams';

export default function Register() {
  const query = useQueryParams();

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
    values,
  } = useFormik<RegisterFormData>({
    initialValues: {
      email: query.get('email') ?? '',
      password: '',
      firstname: '',
      surname: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async input => {
      const { error } = await register({
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
      if (!error) {
        navigate('/');
      }
    },
  });

  const toast = useToast();

  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex mt="10" direction="column">
      <Text variant="page_title_sm" mb="8">
        Registrati
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack mt="10" gap="2">
          <CustomInput
            label="Email"
            name="email"
            h="100%"
            placeholder="Email"
            autoComplete="email"
            errorText={touched.email && errors.email}
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />
          <CustomInput
            label="Password"
            name="password"
            h="100%"
            placeholder="password"
            type="password"
            autoComplete="new-password"
            errorText={touched.password && errors.password}
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />
          <CustomInput
            label="Nome"
            name="firstname"
            h="100%"
            placeholder="nome"
            autoComplete="firstname"
            errorText={touched.firstname && errors.firstname}
            onChange={handleChange}
            value={values.firstname}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />
          <CustomInput
            label="Cognome"
            name="surname"
            h="100%"
            placeholder="cognome"
            type="password"
            autoComplete="new-password"
            errorText={touched.surname && errors.surname}
            onChange={handleChange}
            value={values.surname}
            onBlur={handleBlur}
            isDisabled={isSubmitting}
          />

          <Button
            variant="risen_secondary"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Caricamento..."
          >
            Registrati
          </Button>
        </VStack>
      </form>
      <Text mt="1" w="100%" textAlign="center" variant="body" color="black">
        Continuando, accetti i{' '}
        <Link to="/tos">
          <Text color="primary" display="inline">
            Termini e<br />
            Condizioni
          </Text>
        </Link>{' '}
        e la{' '}
        <Link to="/privacy">
          <Text color="primary" display="inline">
            Privacy Policy
          </Text>
        </Link>
      </Text>
    </Flex>
  );
}
