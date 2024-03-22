import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import * as C from "./styles";
import Footer from "../../components/Footer/Footer";
import StylesHome from "./Home.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";
import Savings from '../../img/Banner.png';
import Container from "../../components/Container/Container";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <section className={StylesHome.home_container}>
            <h1>
                Bem-vindo ao <span>GPzinho</span>
            </h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar Projeto'></LinkButton>
            <img src={Savings} alt="Gestor de Projetos"></img>
        </section>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;