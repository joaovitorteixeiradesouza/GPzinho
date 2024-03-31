import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Styles from "./Contact.module.css";
import Container from "../../components/Container/Container";
import Input from "../../components/Form/Input/Input";
import TextArea from "../../components/Form/TextArea/TextArea";
import SumbitButton from "../../components/Form/SubmitButton/SubmitButton";
import Image1 from "../../img/Telefone.png";
import Image2 from "../../img/Localizacao.png";
import Image3 from "../../img/Horario.png";

function Contact(){
    return(
    <>
        <NavBar></NavBar>
        <Container>
            <div className={Styles.container_contact}>
                <div className={Styles.informacoes}>
                    <div>
                        <span>
                            <img src={Image1}></img>
                            <p className={Styles.titulo}>LIGUE PARA NÓS</p>
                        </span>
                        <span>
                            <p>(11) 98017-4347, (11) 3322-2200</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <img src={Image2}></img>
                            <p className={Styles.titulo}>LOCALIZAÇÃO</p>
                        </span>
                        <span>
                            <p>Av. Tiradentes, 615 - Bom Retiro, São Paulo - SP, 01101-010</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <img src={Image3}></img>
                            <p className={Styles.titulo}>HORÁRIO COMERCIAL</p>
                        </span>
                        <span>
                            <p>Seg-Sex ..... 10h - 20h, Sáb, Dom ..... Fechado</p>
                        </span>
                    </div>
                </div>
                <div className={Styles.card_Form}>
                    <h1>Entre em contato conosco</h1>
                    <form>
                        <Input 
                        type="text"
                        text="Remetente"
                        name="name"
                        placeholder="Insira seu e-mail"></Input>
                        <Input 
                        type="text"
                        text="Assunto"  
                        name="subject"
                        placeholder="Insira o assunto"></Input>
                        <TextArea 
                        type="text"
                        text="Conteúdo do E-mail"
                        name="description"
                        placeholder="Escreva o conteúdo do E-mail"></TextArea>
                        <SumbitButton text="Enviar"></SumbitButton>
                    </form>
                </div>
            </div>
        </Container>
        <Footer></Footer>
    </>
    );
}

export default Contact;