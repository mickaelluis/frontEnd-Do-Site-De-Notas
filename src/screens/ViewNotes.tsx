import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer, Link} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../services/api.ts';
import AvatarComponent  from '../components/Avatar/avatar.tsx';    
import { deleteNote } from '../services/api.ts';  	

export default function ViewNote() {
    const [notes, setNotes ] = useState([]); 
    const navigate = useNavigate();
      useEffect(() => {const fetchNotes = async () => {
        const token = localStorage.getItem('token'); // Pega o token do localStorage
        try {
          // Fazendo a requisição para a API de notas
          const response = await getNotes(  token ); // Passa o token para a função
          setNotes(response); // Armazena as notas no estado
          console.log('Notas:', response);
        } catch (error) {
          console.error('Erro ao buscar notas:', error);
          setNotes([]); // Limpa as notas caso haja erro
        }
      };
      fetchNotes(); // Chama a função assim que o componente for montado
    }, []);


     // Função para excluir uma nota
     const handleDelete = async (noteId: string) => {
      const token = localStorage.getItem('token'); // Pegando o token
      try {
        await deleteNote(noteId, token); // Chama a função deleteNote da API com o ID correto
        setNotes(notes.filter((note) => note._id !== noteId)); // Remove a nota deletada do estado
      } catch (error) {
        console.error('Erro ao deletar a nota:', error);
      }
    };

    // Funçao para editar a nota
    const EditNote = async (noteId: string ) => {
      navigate(`/user/${noteId}`)   
    }

      return (
        <Box maxW="800px" mx="auto" mt="6" >
        <AvatarComponent />
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Suas Notas
      </Heading>
      <Stack spacing={4}>
        { Array.isArray(notes) && notes.length > 0 ? ( // Verifica se há notas
        notes.map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="md" shadow="md">
            <Heading as="h3" size="md"> {note.title} </Heading>
            <Text mt={2}> {note.body} </Text>
            <Flex justify="flex-end" mt={2}>
              <Button colorScheme="blue" size="sm" onClick={() => EditNote(note._id)}>
                Editar
              </Button>
              <Spacer />
              <Button  colorScheme="red" size="sm"  onClick={() => handleDelete(note._id)}>
                Excluir
              </Button>
            </Flex>           
          </Box>         
        ))) : (
          <p>Nenhuma nota encontrada</p> // Mensagem para caso não tenha notas
        )} 
        <Link href={'http://localhost:3000/newNotes'} size="sm" > 
        <Button  colorScheme="green" size="sm" >
               Criar novas notas
        </Button>
        </Link>
      </Stack>
    </Box>
      )
}