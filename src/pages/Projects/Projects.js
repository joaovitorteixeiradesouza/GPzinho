import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import Message from "../../components/Message/Message";
import LinkButton from "../../components/LinkButton/LinkButton";
import ProjectCard from "../../Project/ProjectCard";
import Loading from "../../components/Loading/Loading";
import { useState, useEffect } from "react";

function Projects(){
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState();
    const { token_User } = useAuth();

    const location = useLocation();

    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;

    let message = '';

    if (location.state) {
        message = location.state.message;
    } 

    useEffect(() => {
        setTimeout(() => {    
            fetch(`http://localhost:5000/projects?user_email=${userEmail}`, {
                method: 'GET',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }).then((resp) => resp.json())
            .then((data) => {  
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
            }, 300)    
    }, [userEmail]);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto removido com sucesso!');
        })
        .catch((err) => console.log(err))
    }

    return(
        <>
            <NavBar></NavBar>
            <Container>
                <div className={Styles.project_container}>
                    <div className={Styles.title_container}>
                        <h1>Meus Projetos</h1>
                        <LinkButton to='/newproject' text='Criar Projeto'></LinkButton>
                    </div>
                    {message && 
                        <Message msg={message} type="success" ></Message>
                    }
                    {projectMessage && 
                        <Message msg={projectMessage} type="success" ></Message>
                    }
                    <Container customClass="start">
                        {projects.length > 0 &&
                        projects.map((project) => (
                            <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}></ProjectCard>
                        ))}
                        {!removeLoading && <Loading></Loading>}
                        {removeLoading && projects.length === 0 &&
                            <p>Não há projetos cadastrados!</p>
                        }
                        
                    </Container>
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
}

export default Projects;