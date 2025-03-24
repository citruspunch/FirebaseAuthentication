import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../FirebaseConfig';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Link,
  Field,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { useColorModeValue } from './ui/color-mode';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formBackground = useColorModeValue('gray.100', 'gray.900');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
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
        <Heading fontWeight="bold" fontSize={50} mb={8}>
          Register
        </Heading>
        <form onSubmit={handleRegister}>
          <Field.Root mb={6} required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="usuario@gmail.com"
                type="email"
                mb={3}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="**********"
              type="password"
              mb={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          {error && (
            <Box bg="red.200" color="red.700" p={3} borderRadius={4} mb={4}>
              {error}
            </Box>
          )}
          <Button colorPalette="teal" type="submit" mb={4} w="100%">
            Register
          </Button>
        </form>
        <Flex justifyContent="center" mt={4}>
          <Text mr={2} color="gray.500">
            Already have an account?
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

export default Register;