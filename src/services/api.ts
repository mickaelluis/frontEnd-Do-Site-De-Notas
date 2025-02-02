import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Altere para a URL da sua API

// Função para criar uma conta
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      name,
      email,
      password, 
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

// Função para logar uma conta
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response.status ) {
       Error('Credenciais inválidas');
    }else {
    console.error("Erro ao fazer login:", error);
    throw error; // Lança o erro para ser tratado no componente
  }
}};

export const postNote = async (title: string, content: string, token: string | null) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/notes`,  {
      'title': title,
      'body': content,
    }, {
      headers: {
        'x-access-token': token, // Enviando o token no cabeçalho
        'Content-Type': 'application/json', // Informando o tipo de conteúdo
      },
    }, 
  );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a nota:", error);
  }
}

export const getNotes = async (token: string | null) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/notes`, {
      headers: {
        'x-access-token': token, // Enviando o token no cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as notas:", error);
  }
}

export const deleteNote = async (noteId: string, token: string | null) => {
  try {
    await axios.delete(`${API_URL}/notes/${noteId}`, { // O ID da nota é passado na URL
      headers: {
        'x-access-token': token
      }
    });
    console.log('Nota deletada com sucesso');
  } catch (error) {
    console.error('Erro ao deletar a nota:', error);
    throw error;
  }
};

export const EditNote = async (noteId: string, title: string, content: string, token: string | null) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/notes/${noteId}`, {
      'title': title,
      'body': content,
    }, {
      headers: {
        'x-access-token': token, // Enviando o token no cabeçalho
        'Content-Type': 'application/json', // Informando o tipo de conteúdo
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar a nota:", error);
  }
}

export const buscarNotesid = async (noteId: string, token: string | null) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/notes/${noteId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    throw error;
  }
};