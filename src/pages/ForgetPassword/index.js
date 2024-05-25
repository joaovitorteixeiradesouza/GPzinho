import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForgetPassword = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
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
    
        alert("Senha enviada para seu E-mail com sucesso!");
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
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