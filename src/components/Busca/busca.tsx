import React, { useState } from 'react';
import { Input, Button, Box, VStack, Text } from '@chakra-ui/react';

const SearchBar = () => {
  // Estado para armazenar o valor da busca
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para armazenar os resultados da busca
  const [results, setResults] = useState([]);

  // Lista de itens para simular uma busca
  const items = [
    'Maçã',
    'Banana',
    'Laranja',
    'Abacaxi',
    'Morango',
    'Uva',
    'Pera',
    'Melancia',
  ];

  // Função para lidar com a busca
  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredItems);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {/* Barra de busca */}
        <Box display="flex" gap={2}>
          <Input
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>

        {/* Exibir resultados da busca */}
        <Box>
          {results.length > 0 ? (
            results.map((result, index) => (
              <Text key={index} p={2} borderBottom="1px solid #eee">
                {result}
              </Text>
            ))
          ) : (
            <Text>Nenhum resultado encontrado.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default SearchBar;