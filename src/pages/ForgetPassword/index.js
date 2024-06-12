import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import emailjs from 'emailjs-com';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { forgetpassword } = useAuth();

  const handleSignup = () => {
    if (!email) {
      setError("Preencha o campo de E-mail");
      return;
    } 

    handleSignupAsync();
    
  };

  const handleSignupAsync = async () => {
    try {
        const res = await forgetpassword(email);
        if (res) {
          setError(res);
          return;
        }

        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/users?email=${email}` : `http://localhost:5000/users?email=${email}`;
        let password = '';
        let name_user = '';

        const serviceID = 'service_0jss568';
        const templateID = 'template_ygvyvze';
        const userID = 'M_ZyGZc0UBdYz4mMj';

        fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
            password = data[0].password;
            name_user = data[0].nome;

            const templateParams = {
                to_email: email, // o email do destinatário
                subject: 'Recuperação de Senha',
                message: 'Clique no link para resetar a senha: Link', 
                to_name: name_user,
                from_name: 'GPzinho'
            };

            try {
                const result = emailjs.send(serviceID, templateID, templateParams, userID);
                alert('Verifique o seu e-mail para resetar a sua senha.');
                navigate("/");
            } catch (error) {
                console.error('Erro durante o envio de e-mail:', error);
            }  
        })
        .catch((err) => console.log(err))

                
    } catch (error) {
        console.error('Erro durante o envio:', error);
        // Tratar o erro, se necessário
    }
};

  return (
    <C.Container>
      <C.Label>Esqueceu Sua Senha?</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="E-mail para recuperar a sua senha"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Confirmar" onClick={handleSignup} />
        <C.LabelSignin>
          Lembrou?
          <C.Strong>
            <Link to="/">&nbsp;Volte</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default ForgetPassword;