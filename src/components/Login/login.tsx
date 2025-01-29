import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { loginUser } from '../../services/api.ts'; // Importando a função de login da API

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Para fazer o redirecionamento de rota

  const handleSubmit = async () => {
    setLoading(false); // Inicia o estado de carregamento
    setError(''); // Limpa o erro anterior, se houver
    try {
      // Faz a requisição de login
       const response = await loginUser(email, password);
      // Salva o token no localStorage (ou outro mecanismo de armazenamento)
      const token = response.token;
      const name = response.name;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      // Atualiza o estado de autenticação no contexto
      setLoading(true);
      navigate('/newNotes'); // Redireciona o usuário para a página "newNotes"
    } catch (error: any) {
      // Verifica se a resposta tem um erro do backend (por exemplo, credenciais erradas)
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'Erro ao fazer login.'); // Exibe o erro retornado pela API
      } else {
        setError('incorrect email or password.'); // Exibe outro tipo de erro
      }
      setLoading(false); // Desativa o estado de carregamento mesmo com erro
    }
    // Redireciona para a rota desejada (exemplo: newNotes)
  };

  const Cancel = () => { 
    navigate('/'); // Redireciona o usuário para a página
   };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            To take advantage of all our features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input  
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={handleSubmit}
                isLoading={loading}
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
                <Button
                onClick={Cancel}
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel
                </Button>
              {error && <Text color="red.500">{error}</Text>}
            </Stack>           
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;