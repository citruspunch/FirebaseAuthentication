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
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { LuUser } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

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
      <Flex flexDirection="column" p={12} bg={formBackground} borderRadius={8} boxShadow="lg">
        <Heading fontSize={50} mb={6}>
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

        <Button colorPalette="teal" mb={2}>
          Log In
        </Button>
        <Button
          colorPalette="teal"
          mb={2}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button colorPalette="teal" mb={2} onClick={handleGoogleLogin}>
          Sign in with Google
        </Button>
        <Button colorPalette="teal" mb={2} onClick={handleGithubLogin}>
          Sign in with Github
        </Button>
        <Fieldset.Root display="flex" alignItems="center">
          <ColorModeButton />
        </Fieldset.Root>
      </Flex>
    </Flex>
  );
};

export default Login;
