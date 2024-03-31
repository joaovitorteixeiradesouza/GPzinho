import {parse, v4} from 'uuid';
import Styles from './Service.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import ProjectForm from '../../Project/ProjectForm';
import Message from '../../components/Message/Message';
import ServiceForm from '../../Service/ServiceForm';
import TeamForm from '../../Team/TeamForm';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import TeamCard from '../../Team/TeamCard';
import LinkButton from '../../components/LinkButton/LinkButton';

function Service() {
    const {projectID, serviceID} = useParams();

    const [project, setProject] = useState([]);
    const [servicesForm, setServicesForm] = useState([]);
    const [team, setTeam] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${projectID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            const foundService = data.services.find(service => service.id === serviceID);
                if (foundService) {
                    setServicesForm(foundService);
                    setTeam(foundService.equipe);
                } else {
                    console.log("Serviço não encontrado");
                }
        })
        .catch((err) => console.log(err))
        }, 300);

    }, [projectID]);

    function editPost(service) {
        setMessage('');
        const lastCostService =  project.services.find((cost) => cost.id == serviceID)

    
        // Verificar se o custo do serviço ultrapassa o orçamento do projeto
        if (parseFloat(service.cost) > (parseFloat(project.budget) - (parseFloat(project.cost) - parseFloat(lastCostService.cost)))) {
            alert('O custo do serviço não pode ser maior do que o orçamento do projeto');
            return false;
        }
    
        // Remover o serviço existente com base no serviceID
        const servicesUpdated = project.services.filter(
            (service) => service.id !== serviceID
        )
        // Adicionar o novo serviço à lista de serviços
        servicesUpdated.push(service);

        const projectUpdated = project;

        // Atualizar o custo total do projeto
        const newCost = servicesUpdated.reduce((total, s) => total + parseFloat(s.cost), 0);
       
        projectUpdated.services = servicesUpdated;
        project.cost = newCost;
    
        fetch(`http://localhost:5000/projects/${projectID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(!showProjectForm);
            alert('Tarefa atualizada!');
            window.location.reload();
        })
        .catch((err) => console.log(err))
    }
    

        function createTeam(ServiceFormulario) {
        setMessage('');

        // last service
        const lastService = ServiceFormulario;

        lastService.id = v4();

        // update project 
        fetch(`http://localhost:5000/projects/${projectID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false);
            alert('Colaborador adicionado com sucesso!');
        })
        .catch((err) => console.log(err))

    }

    function removeTeam(serviceID, name) {
        const updatedServices = project.services.map(service => {
            if (service.id === serviceID) {
                const updatedEquipe = service.equipe.filter(member => member.nameColab !== name);
                return { ...service, equipe: updatedEquipe };
            }
            return service;
        });
    
        const projectUpdated = { ...project, services: updatedServices };
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated);
            alert('Colaborador removido com sucesso!!');
            window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            <NavBar></NavBar>
            <Container>
                {project.name ? (
                    <div className={Styles.project_details}>
                        <Container customClass="column">
                            {message && <Message type={type} msg={message}></Message>}
                            <div className={Styles.details_container}>
                                <h1>Tarefa: {servicesForm.name}</h1>
                                <div className={Styles.botoes_form}>
                                    <button className={Styles.btn} onClick={toggleProjectForm}>
                                        {!showProjectForm ? 'Editar Tarefa' : 'Fechar'}
                                    </button>
                                    <LinkButton to={`/project/${projectID}`} text='Voltar'></LinkButton>
                                </div>
                                {!showProjectForm ? (
                                    <div className={Styles.project_info}>
                                        <p>
                                            <span>Nome da Tarefa:</span> {servicesForm.name}
                                        </p>
                                        <p>
                                            <span>Custo da tarefa:</span> R${servicesForm.cost}
                                        </p>
                                        <p>
                                            <span>Descrição da tarefa:</span> {servicesForm.description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={Styles.project_info}>
                                        <ServiceForm 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição" 
                                        projectData={servicesForm}
                                        projectID={projectID}></ServiceForm>
                                    </div>
                                )}
                            </div>
                            <div className={Styles.service_form_container}>
                                <h2>Adicione a Equipe:</h2>
                                <button className={Styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar Equipe' : 'Fechar'}
                                </button>
                                <div className={Styles.project_info}>
                                    {
                                        showServiceForm && (
                                            <TeamForm 
                                            handleSubmit={createTeam}
                                            btnText="Adicionar Equipe"
                                            projectData={servicesForm}></TeamForm>
                                        )
                                    }
                                </div>
                            </div>
                            <h2>Equipe</h2>
                            <Container customClass="start">
                                {team.length > 0 &&
                                    team.map((colab, index) => (
                                        <TeamCard
                                        id={serviceID}
                                        name={colab.nameColab}
                                        funcao={colab.funcao.name}
                                        key={index}
                                        handleRemove={removeTeam}>

                                        </TeamCard>
                                    ))
                                }
                                {servicesForm.equipe.length === 0 && <p>Não há colaboradores cadastrados</p>}
                            </Container>
                        </Container>
                    </div>
                ) : (
                    <Loading></Loading>
                )}
            </Container>
            <Footer></Footer>
        </>
    );
}

export default Service;