import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider.tsx';

// Este componente é responsável por proteger as rotas
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();  // Verifica se o usuário está autenticado

  // Se o usuário nao estiver autenticado, verifica se existe um token no localStorage
  if (!isAuthenticated) {
    const token = localStorage.getItem('token');
    // Se o token existir, atualiza o estado de autenticação no contexto
    if (token) {
      return <Outlet />;
    } else {
      // Caso contrário, redireciona para a página de login
      return <Navigate to="/login" />;
    }
  }
  // Se o usuário estiver autenticado, permite o acesso à rota protegida
  return <Outlet />;
} 

export default PrivateRoute;

