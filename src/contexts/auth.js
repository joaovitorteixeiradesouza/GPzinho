import { createContext, useEffect, useState } from "react";
import bcrypt from 'bcryptjs';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersStorage, setUsersStorage] = useState([]);
  
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction ? '/api/data/users' : 'http://localhost:5000/users';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsersStorage(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken && usersStorage) {
      const { id } = JSON.parse(userToken);
      const user = usersStorage.find((user) => user.id === id);
      setUser(user);
    }
  }, [usersStorage]);

  const signin = async (email, password) => {
    try {
      const user = usersStorage.find((user) => user.email === email);

      if (!user) {
        return "Usuário não cadastrado";
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ id: user.id, token }));
        setUser(user);
        return null;
      } else {
        return "E-mail ou senha incorretos";
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      throw error;
    }
  };

  const signup = async (nome, email, password) => {
    try {
      const hasUser = usersStorage.some((user) => user.email === email);

      if (hasUser) {
        return "Já existe uma conta com esse e-mail";
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        nome: nome,
        email: email,
        password: hashedPassword
      };

      await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      return null;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
