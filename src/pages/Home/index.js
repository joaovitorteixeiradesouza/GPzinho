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
import Category1 from '../../img/Desenvolvimento.jpg';
import Category2 from '../../img/Design.jpg';
import Category3 from '../../img/Infraestrutura.jpg';
import Category4 from '../../img/Planejamento.jpg';
import Staff1 from '../../img/Joao_Vitor.JPG';
import Staff2 from '../../img/Fabio.jpeg';
import Staff3 from '../../img/George.jpeg';
import Staff4 from '../../img/Elissandro.jpeg';
import Staff5 from '../../img/Maykon.jpeg';
import Staff6 from '../../img/Vivian.jpeg';
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
        <section className={StylesHome.home_categories}>
            <h1>
                Construa seu projeto com diferentes <span>Categorias:</span>
            </h1>
            <div className={StylesHome.categories}>
              <div className={StylesHome.category}>
                <img src={Category1} alt="Desenvolvimento"></img>
                <h2>Desenvolvimento</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Category2} alt="Design"></img>
                <h2>Design</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Category3} alt="Infraestrutura"></img>
                <h2>Infraestrutura</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Category4} alt="Planejamento"></img>
                <h2>Planejamento</h2>
              </div>
            </div>
        </section>
        <section className={StylesHome.home_Team}>
            <h1>
                Equipe de Desenvolvimento
            </h1>
            <div className={StylesHome.Teams}>
              <div className={StylesHome.Team}>
                <img src={Staff1} alt="João Vitor"></img>
                <h2>João Vitor</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Staff2} alt="Fabio"></img>
                <h2>Fabio</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Staff3} alt="George"></img>
                <h2>George</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Staff4} alt="Elissandro"></img>
                <h2>Elissandro</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Staff5} alt="Maykon"></img>
                <h2>Maykon</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Staff6} alt="Vivian"></img>
                <h2>Vivian</h2>
              </div>
            </div>
        </section>
        <section className={StylesHome.home_Frase}>
            <h1>
                Frase do dia
            </h1>
            <p>
              "Como um mestre de orquestra, um gestor de projetos harmoniza
              talentos e recursos, transformando desafios
              em sinfonias de sucesso."
            </p>
        </section>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;