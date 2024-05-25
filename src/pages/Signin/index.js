import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    handleSigninAsync();

  };

  const handleSigninAsync = async () => {
    try {  
      const res = await signin(email, senha);
      if (res) {
        setError(res);
        return;
      }

      navigate("/home");
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        // Tratar o erro, se necessário
    }
};


  return (
    <C.Container>
      <C.Label>LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
        <C.LabelSignup>
          <C.Senha>
            <Link to="/forgetPassword">Esqueceu Sua Senha?</Link>
          </C.Senha>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;