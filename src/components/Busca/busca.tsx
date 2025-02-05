import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Button, Box, VStack, Text  } from '@chakra-ui/react';

const SearchBar = () => {
  // Estado para armazenar o valor da busca
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputValue.trim()) {
      setErrorMessage("");
      navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }else {    
        setErrorMessage("Digite algum valor.");
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {/* Barra de busca */}
        <Box display="flex" gap={2}>
          <Input
            placeholder="Digite para buscar..."
            type="text"
             value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
         
         {/* Exibir mensagem de erro, caso exista */}
         {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      </VStack>
    </Box>
  );
};

export default SearchBar;