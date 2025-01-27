import React,  { ReactNode  ,createContext, useState, useContext } from 'react';

// Definimos uma interface para o contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;  // Controla se o usuário está logado ou não
  login: (token: string) => void; // Função para realizar login
  logout: () => void; // Função para realizar logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

  // Provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Verifica se o token de autenticação está salvo no localStorage.
    const token = localStorage.getItem('token');
    return !!token;  // Retorna "true" se o token existir, caso contrário, "false".
  });

  // Função para salvar o token e marcar o usuário como autenticado.
  const login = (token: string) => {
    localStorage.setItem('authToken', token);  // Salva o token no localStorage.
    setIsAuthenticated(true);  // Atualiza o estado para "logado".
  };

  // Função para remover o token e marcar o usuário como deslogado
  const logout = () => {
    localStorage.removeItem('authToken');  // Remove o token do localStorage
    setIsAuthenticated(false);  // Atualiza o estado para "deslogado"
  };

  return (
    // O valor do contexto é o estado de autenticação e as funções login e logout
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto em outros componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
