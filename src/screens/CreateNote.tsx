import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box,
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Textarea, 
    Stack,
    Heading,
    } from '@chakra-ui/react';
import { postNote } from '../services/api.ts';	

export default function CreateNotes() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        postNote(title, content, localStorage.getItem('token'));
        console.log('Nota criada:', { title, content, token: localStorage.getItem('token') });     
        setTitle('');
        setContent('');
        navigate('/viewNotes');
      };

      const Nota = () => { 
        navigate('/viewNotes'); 
       };
    return (
        <Box maxW="600px" mx="auto" mt="6">
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Create New Note
      </Heading>
      <Stack spacing="4">
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of the note"
          />
        </FormControl>
        <FormControl id="content">
          <FormLabel>note content</FormLabel>
          <Textarea 
            type="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the note content"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
            Save Note
        </Button>  
        <Button colorScheme="red" onClick={Nota}>            
            Notes
        </Button>
      </Stack>
    </Box>      
    )
}