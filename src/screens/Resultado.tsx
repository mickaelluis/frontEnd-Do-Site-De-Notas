import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer, Link} from '@chakra-ui/react';
import AvatarComponent  from '../components/Avatar/avatar.tsx';    
import { useNavigate } from 'react-router-dom';
import  SearchBar  from '../components/Busca/busca.tsx';
import { deleteNote } from '../services/api.ts';
import { useLocation } from "react-router-dom"; 
import { Buscar } from '../services/api.ts';



export default function ViewNote() {
    const [notes, setNotes ] = useState([]); 
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query") || "";


      useEffect(() => {const fetchNotas = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await Buscar( params, token);
          setNotes(response);
        } catch (error) {
          console.error("Erro ao buscar notas", error);
        }
      };
  
      if (searchQuery) {
        fetchNotas();
      }
    }, [searchQuery]);

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
      navigate(`/edit-note/${noteId}`)   
    }

      return (
        <Box maxW="800px" mx="auto" mt="6" >
        <AvatarComponent />
        <SearchBar/>
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
          <p>Nenhum resultado encontrado.</p> // Mensagem para caso não tenha notas
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