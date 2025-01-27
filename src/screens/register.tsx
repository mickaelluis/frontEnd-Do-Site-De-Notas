import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react'

import { registerUser } from '../services/api.ts';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await registerUser(email, password, name);
      setLoading(false);
      const token = data.token;
      localStorage.setItem('token', token);
      navigate('/viewNotes');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Sign up and start enjoying
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
             placeholder="Senha"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Link href={'http://localhost:3000 '}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          </Link>
          {error && <Text color="red.500">{error}</Text>}
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            type="submit"
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Register;