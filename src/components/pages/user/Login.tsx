import { Button, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../components/inputs/CustomInput';
import { useAuth } from '../../../components/providers/AuthProvider';
import { UserLoginData } from '../../../types/types';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const toast = useToast();

  const { login } = useAuth();
  const navigate = useNavigate();

  const schema = Yup.object<UserLoginData>({
    email: Yup.string().required("Controlla il campo!"),
    password: Yup.string().required("Controlla il campo!"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting
  } = useFormik<UserLoginData>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async e => {

      const { error } = await login({
        email: e.email!,
        password: e.password!,
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
    }
  });


  return (
    <Flex mt="10" direction="column">
      <Text variant="page_title_sm" mb="8">
        Accedi
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack mt="10" gap="2">
          <CustomInput
            label="Email"
            h="100%"
                        placeholder="email"
            autoComplete="email"
            name="email" errorText={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <CustomInput
            label="Password"
            h="100%"
                        placeholder="password"
            type="password"
            autoComplete="current-password"
            name="password"
            errorText={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <Button
            variant="risen_secondary"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Caricamento..."
          >
            Accedi
          </Button>
        </VStack>
      </form>
    </Flex>
  );
}
