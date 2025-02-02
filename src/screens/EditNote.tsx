import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Heading } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditNote } from '../services/api.ts';   
import { buscarNotesid } from '../services/api.ts';

export default function ViewNote() {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {const BuscarNotes = async () => {
          const token = localStorage.getItem('token'); // Pega o token do localStorage
          try { 
            // Fazendo a requisição para a API de notas
            const response = await buscarNotesid(  token , id ); // Passa o token para a função
            setNotes(response); // Armazena as notas no estado
            console.log('Notas:', response);
          } catch (error) {
            console.error('Erro ao buscar notas:', error);
            setNotes([]); // Limpa as notas caso haja erro
          }
        };
        BuscarNotes(); // Chama a função assim que o componente for montado
      }, [id]);

    const handleSave  = ()  => {   
    navigate('/viewNotes'); // Redireciona para a lista de notas
  };

  if (!notes) {
    return <Heading>Nota não encontrada</Heading>;
  }

    return (
        <Box maxW="600px" mx="auto" mt="6">
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Editar Nota
      </Heading>
      <Stack spacing="4">
        <FormControl id="title">
          <FormLabel>Título</FormLabel>
          <Input
            type="text"
            value={notes.title}
            onChange={(e) => setNotes({ ...notes, title: e.target.value })}
          />
        </FormControl>
        <FormControl id="content">
          <FormLabel>Conteúdo</FormLabel>
          <Textarea
            value={notes.content}
            onChange={(e) => setNotes({ ...notes, content: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
    )
}