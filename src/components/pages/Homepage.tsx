import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { getEmailError } from '../../utils/validation';
import { CustomInput } from '../inputs/CustomInput';
import { useAuth } from '../providers/AuthProvider';

export default function Homepage() {
  const { logout } = useAuth();

  const schema = Yup.object<{ email: string }>({
    email: Yup.string().required("Controlla il campo!"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting
  } = useFormik<{ email: string }>({
    initialValues: {
      email: "",

    },
    validationSchema: schema,
    onSubmit: async e => { }
  });


  return (
    <Flex direction="column" mt="8">
      <Text mb="12" variant="CTA">
        Allena la logica clinica
        <br />
        dei tuoi studenti
        <br />
        in modo semplice.
      </Text>
      <VStack w="327px">
        <CustomInput label="Email" mb="2" name="email" errorText={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting} />
        <Button variant="risen_secondary" w="100%">
          REGISTER
        </Button>
      </VStack>
      <Flex mt="12" wrap="wrap" gap="4">
        <Link to="/list">
          <Button>CaseList</Button>
        </Link>
        <Link to="/demoadd">
          <Button>Case Demo Add</Button>
        </Link>
        <Link to="/demoadd/exam">
          <Button>Exam Demo Add</Button>
        </Link>
        <Link to="/demoadd/talk">
          <Button>Talk Demo Add</Button>
        </Link>
        <Button onClick={logout}>Logout</Button>
      </Flex>
    </Flex>
  );
}
