import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Styles from "./Contact.module.css";
import Container from "../../components/Container/Container";

function Contact(){
    return(
    <>
        <NavBar></NavBar>
        <Container>
            <div className={Styles.container_contact}>
                Contatos
            </div>
        </Container>
        <Footer></Footer>
    </>
    );
}

export default Contact;