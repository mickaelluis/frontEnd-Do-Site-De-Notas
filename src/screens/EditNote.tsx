import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Heading } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditNote } from '../services/api.ts';   
import { BuscarNotaPeloId } from '../services/api.ts';

export default function ViewNote() {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
            
      try {
        const response = await BuscarNotaPeloId(id, token); // Pega o token e o ID da nota
        setNotes(response); // Armazena a nota no estado
      } catch (error) {
        console.error('Erro ao buscar nota:', error);
      }
    };
  
    if (id) {
      fetchNote(); // Chama a função assim que o componente for montado
    }
  }, [id]);

  const handleSave = async ( id, title, body ) => {
    const token = localStorage.getItem('token');  // ou 'token' dependendo de como você armazenou
    try {
      await EditNote(id, title, body, token);
      // Redirecionar ou atualizar a interface após o sucesso
      navigate('/viewnotes');  // ou a rota que preferir
    } catch (error) {
      console.error("Erro ao salvar a nota:", error);
    }
  };

  if (!notes) {
    return <div>Carregando...</div>;
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
            value={notes.body}
            onChange={(e) => setNotes({ ...notes, body: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={() => handleSave(notes._id,notes.title, notes.body )}>
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
    )
}