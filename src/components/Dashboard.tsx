import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formBackground = useColorModeValue('gray.100', 'gray.900');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      else {
        setError("An unknown error occurred");
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
        <Heading fontWeight="bold" fontSize={40} mb={6}>
          Dashboard
        </Heading>
        <Text fontSize="lg" mb={4}>
          Welcome, <strong>{auth.currentUser?.email || "User"}</strong>
        </Text>
        {error && (
          <Box bg="red.100" color="red.700" p={3} borderRadius={4} mb={4}>
            {error}
          </Box>
        )}
        <Button colorPalette="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Dashboard;