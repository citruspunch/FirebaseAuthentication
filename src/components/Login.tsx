import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  Fieldset,
  Field,
  InputGroup,
  Link,
  Box,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { LuUser } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formBackground = useColorModeValue('gray.100', 'gray.900');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      setError("Error signing in with Google");
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      setError("Error signing in with Github");
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" p={12} bg={formBackground} borderRadius={8} boxShadow="lg" w="500px" maxW="90%">
        <Heading fontWeight={"bold"} fontSize={50} mb={8}>
          Login
        </Heading>
        <Field.Root mb={6} required>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuUser />}>
            <Input
              placeholder="usuario@gmail.com"
              type="email"
              mb={3}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <Field.ErrorText>This field is required</Field.ErrorText>
          <Field.HelperText>We'll never share your email.</Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            Password <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="**********"
            type="password"
            mb={1}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>

        <Link
          as={RouterLink} // Use React Router's Link
          to="/reset-password"
          color="teal.500"
          mb={4}
          alignSelf="flex-end"
        >
          Reset Password
        </Link>

        {error && (
          <Box bg="red.200" color="red.700" p={3} borderRadius={4} mb={4}>
            {error}
          </Box>
        )}

        <Button colorPalette="teal" mb={2} onClick={handleLogin}>
          Log In
        </Button>
        <Flex alignItems="center" my={4}>
          <hr style={{ flex: 1, border: "none", borderTop: "1px solid #ccc" }} />
          <span style={{ margin: "0 10px", color: "#666" }}>or</span>
          <hr style={{ flex: 1, border: "none", borderTop: "1px solid #ccc" }} />
        </Flex>
        <Button colorPalette="blue" mb={2} onClick={handleGoogleLogin}>
          <FaGoogle />Sign in with Google
        </Button>
        <Button colorPalette="gray" mb={2} onClick={handleGithubLogin}>
          <FaGithub /> Sign in with Github
        </Button>
        <Flex justifyContent="center" mt={2}>
          <span style={{ marginRight: "5px", color: "#666" }}>Don't have an account?</span>
          <Link
            as={RouterLink}
            to="/register"
            color="teal.500"
            fontWeight="bold"
          >
            Register
          </Link>
        </Flex>
        <Fieldset.Root display="flex" alignItems="center" mt={4}>
          <ColorModeButton />
        </Fieldset.Root>
      </Flex>
    </Flex>
  );
};

export default Login;
