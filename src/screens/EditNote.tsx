import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Heading } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function EditNote() {
    const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    // Aqui você pode carregar as notas de uma fonte de dados, localStorage ou backend
    const savedNotes: Note[] = [
      { id: 1, title: 'Primeira Nota', content: 'Conteúdo da primeira nota.' },
      { id: 2, title: 'Segunda Nota', content: 'Conteúdo da segunda nota.' },
    ];

    const noteToEdit = savedNotes.find((note) => note.id === parseInt(id!));
    if (noteToEdit) {
      setNote(noteToEdit);
    }
  }, [id]);

  const handleSave = () => {
    // Salve as alterações aqui, seja em um backend ou localStorage
    console.log('Nota atualizada:', note);
    navigate('/viewNotes'); // Redireciona para a lista de notas
  };

  if (!note) {
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
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </FormControl>
        <FormControl id="content">
          <FormLabel>Conteúdo</FormLabel>
          <Textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
    )
}