import { createContext, useEffect, useState } from "react";
import bcrypt from 'bcryptjs';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [usersStorage, setUsersStorage] = useState([]);

  useEffect(() => {
      setTimeout(() => {
        fetch(`http://localhost:5000/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) => {
        setUsersStorage(data);
        const userToken = localStorage.getItem("user_token");

        if (userToken && usersStorage) {
          const hasUser = JSON.parse(usersStorage)?.filter(
            (user) => user.email === JSON.parse(userToken).email
          );

          if (hasUser) setUser(hasUser[0]);
        }
        })
        .catch((err) => console.log(err))
        }, 300);    
  }, []);

  const signin = async (email, password) => {
    try {
        // Busca o usuário pelo email
        const user = usersStorage.find((user) => user.email === email);

        // Se o usuário não existe
        if (!user) {
            return "Usuário não cadastrado";
        }

        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Gera um token aleatório
            const token = Math.random().toString(36).substring(2);

            // Salva o token no localStorage
            localStorage.setItem("user_token", JSON.stringify({ email, token }));

            // Atualiza o estado do usuário
            setUser({ email, password });

            // Retorna null para indicar login bem-sucedido
            return null;
        } else {
            // Senha incorreta
            return "E-mail ou senha incorretos";
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        // Tratar o erro, se necessário
        throw error;
    }
};
  const signup = async (nome, email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/users`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = await response.json();
      setUsersStorage(data);
      const hasUser = usersStorage?.some((user) => user.email === email);

      if (hasUser) {
        return "Já tem uma conta com esse E-mail";
      }

      // Criptografa a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        nome: nome,
        email: email,
        password: hashedPassword
    };
  
      fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
              
          })
          .then(
              (resp => resp.json())
          )
          .then((data) => {
              console.log(data);
              return;
          })
          .catch(err => console.log(err))
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      // Tratar o erro, se necessário
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