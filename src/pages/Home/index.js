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
import Desenvolvimento from '../../img/Desenvolvimento.jpg';
import Design from '../../img/Design.jpg';
import Infraestrutura from '../../img/Infraestrutura.jpg';
import Planejamento from '../../img/Planejamento.jpg';
import Joao_Vitor from '../../img/Joao_Vitor.JPG';
import Elissandro from '../../img/Elissandro.jpg';
import Vivian from '../../img/Elissandro.jpg';
import Maykon from '../../img/Elissandro.jpg';
import Fabio from '../../img/Elissandro.jpg';
import George from '../../img/Elissandro.jpg';
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
                <img src={Desenvolvimento} alt="Desenvolvimento"></img>
                <h2>Desenvolvimento</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Design} alt="Design"></img>
                <h2>Design</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Infraestrutura} alt="Infraestrutura"></img>
                <h2>Infraestrutura</h2>
              </div>
              <div className={StylesHome.category}>
                <img src={Planejamento} alt="Planejamento"></img>
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
                <img src={Elissandro} alt="Elissandro"></img>
                <h2>Elissandro</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Fabio} alt="Fabio"></img>
                <h2>Fabio</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={George} alt="George"></img>
                <h2>George</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Joao_Vitor} alt="João Vitor"></img>
                <h2>João Vitor</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Maykon} alt="Maykon"></img>
                <h2>Maykon</h2>
              </div>
              <div className={StylesHome.Team}>
                <img src={Vivian} alt="Vivian"></img>
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