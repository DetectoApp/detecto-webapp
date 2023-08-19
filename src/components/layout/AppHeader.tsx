import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export default function AppHeader() {
  const { user } = useAuth();
  return (
    <Flex pt="8" justify="space-between" align="center" minH="110px">
      <Link to="/">
        <Image h="45px" src={'/assets/detecto.svg'} />
      </Link>
      <Flex align="center">
        {user ? (
          <Link to="/profile">
            <Text variant="button">{user.email}</Text>
          </Link>
        ) : (
          <>
            <Link to="login">
              <Text mr="4" variant="button">
                Login
              </Text>
            </Link>
            <Link to="register">
              <Button w="156px">Register</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
