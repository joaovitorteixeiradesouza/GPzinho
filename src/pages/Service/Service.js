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
            const isProduction = process.env.NODE_ENV === 'production';
            const apiUrl = isProduction ? `/api/projects/${projectID}` : `http://localhost:5000/projects/${projectID}`;
            fetch(apiUrl, {
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
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects/${projectID}` : `http://localhost:5000/projects/${projectID}`;
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
    
        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            const foundService = data.services.find(service => service.id === serviceID);
            if (foundService) {
                setServicesForm(foundService);
                setTeam(foundService.equipe);
            } else {
                console.log("Serviço não encontrado");
            }
            setShowProjectForm(!showProjectForm);
            alert('Tarefa atualizada!');
        })
        .catch((err) => console.log(err))
    }
    

        function createTeam(ServiceFormulario) {
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects/${projectID}` : `http://localhost:5000/projects/${projectID}`;
        setMessage('');

        // last service
        const lastService = ServiceFormulario;

        lastService.id = v4();

        // update project 
        fetch(apiUrl, {
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
        if(window.confirm("Confirma a exclusão do colaborador?")){
            const isProduction = process.env.NODE_ENV === 'production';
            const apiUrl = isProduction ? `/api/projects/${project.id}` : `http://localhost:5000/projects/${project.id}`;
            const updatedServices = project.services.map(service => {
                if (service.id === serviceID) {
                    const updatedEquipe = service.equipe.filter(member => member.nameColab !== name);
                    return { ...service, equipe: updatedEquipe };
                }
                return service;
            });
        
            const projectUpdated = { ...project, services: updatedServices };
        
            fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectUpdated)
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                const foundService = data.services.find(service => service.id === serviceID);
                setServicesForm(foundService);
                setTeam(foundService.equipe);
                alert('Colaborador removido com sucesso!!');
            })
            .catch((err) => console.log(err));
            }
    }
    

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    function formatDate(dateString) {
        // Converta a string da data para um objeto Date
        const date = new Date(dateString);
    
        // Verifique se a data é válida
        if (isNaN(date.getTime())) {
            return "Data inválida";
        }
    
        // Extraia o dia, mês e ano da data
        const day = String(date.getDate() + 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adicionamos 1 porque os meses começam de zero
        const year = date.getFullYear();
    
        // Montar a data formatada no formato dd/mm/aaaa
        return `${day}/${month}/${year}`;
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
                                            <span>Nome da tarefa:</span> {servicesForm.name}
                                        </p>
                                        <p>
                                            <span>Custo da tarefa:</span> R${servicesForm.cost}
                                        </p>
                                        <p>
                                            <span>Data de conclusão da tarefa:</span> {formatDate(servicesForm.date)}
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
                                        img={colab.imgColab}
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