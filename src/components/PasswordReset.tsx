import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../FirebaseConfig';
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Text,
  Field,
  InputGroup,
  Link,
} from "@chakra-ui/react";
import { LuUser } from 'react-icons/lu';
import { Link as RouterLink } from "react-router-dom";
import { useColorModeValue } from './ui/color-mode';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const formBackground = useColorModeValue('gray.100', 'gray.900');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage("Error sending password reset email.");
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        p={12}
        bg={formBackground}
        borderRadius={8}
        boxShadow="lg"
        w="500px"
        maxW="90%"
      >
        <Heading fontWeight="bold" fontSize={40} mb={6}>
          Reset Password
        </Heading>
        <form onSubmit={handlePasswordReset}>
          <Field.Root mb={6} required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          {message && (
            <Box bg="green.200" color="green.700" p={3} borderRadius={4} mb={4}>
              {message}
            </Box>
          )}
          <Button colorPalette="teal" type="submit" mb={4} w="100%">
            Send Reset Email
          </Button>
        </form>
        <Flex justifyContent="center" mt={4}>
          <Text mr={2} color="gray.500">
            Remember your password?
          </Text>
          <Link
            as={RouterLink}
            to="/login"
            color="teal.500"
            fontWeight="bold"
          >
            Login
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PasswordReset;