import React from 'react';
import AppRoutes from './router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme/theme.ts';

const App = () => {
    return (
    <ChakraProvider theme={theme}>
        <AppRoutes />
    </ChakraProvider>
    );
};

export default App;