import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Styles from "./NewProject.module.css"
import ProjectForm from '../../Project/ProjectForm';

function NewProject(){

    const history = useNavigate();
    const { token_User } = useAuth();

    function createPost(project){

        // initialize cost and services
        project.cost = 0;
        project.services = [];

        const userEmail = JSON.parse(localStorage.getItem("user_token")).email;

        project.user_email = userEmail;

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(
            (resp => resp.json())
        )
        .then((data) => {
            console.log(data)
            //redirect
            history('/projects', { state: {message: 'Projeto criado com sucesso!!'}})
        })
        .catch(err => console.log(err))

    }
    return(
    <>
        <NavBar></NavBar>
        <Container>
            <div className={Styles.newproject_container}>
                <h1>Criar Projeto</h1>
                <p>Crie o seu projeto para depois adicionar as suas tarefas</p>
                <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"></ProjectForm>
            </div>
        </Container>
        <Footer></Footer>
    </>
    );
}

export default NewProject;