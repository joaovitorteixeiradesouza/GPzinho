import {parse, v4} from 'uuid';
import Styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import ProjectForm from '../../Project/ProjectForm';
import Message from '../../components/Message/Message';
import ServiceForm from '../../Service/ServiceForm';
import ServiceCard from '../../Service/ServiceCard';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Service from '../Service/Service';

function Project() {
    const {id} = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {

        setTimeout(() => {
            
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction ? `/api/projects/${id}` : `http://localhost:5000/projects/${id}`;
            fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
        }, 300);

    }, [id]);

    function editPost(project) {
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects/${project.id}` : `http://localhost:5000/projects/${project.id}`;

        setMessage('');

        // budget validation
        if(project.budget < project.cost) {
            alert('O orçamento não pode ser menor do que o custo do projeto');
            return false;
        }

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setServices(data.services)
            setShowProjectForm(!showProjectForm);
            alert('Projeto atualizado!');
            setShowServiceForm(false);
        })
        .catch((err) => console.log(err))
    }

    function createService(ServiceFormulario) {
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects/${project.id}` : `http://localhost:5000/projects/${project.id}`;
        setMessage('');

        // last service
        const lastService = ServiceFormulario;

        lastService.id = v4();

        const lastServiceCost = lastService.cost;
        
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // maximum value validation 
        if (newCost > parseFloat(project.budget)) {
            alert('Orçamento ultrapassado, verifique o valor do serviço');
            //project.services.pop();
            return false;
        }

        // add service cost to project total cost

        project.cost = newCost;
        lastService.projectID = project.id;
        lastService.equipe = [];
        project.services.push(lastService);

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
            alert('Tarefa adicionada com sucesso!');
        })
        .catch((err) => console.log(err))

    }

    function removeService(id, cost) {
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects/${projectUpdated.id}` : `http://localhost:5000/projects/${projectUpdated.id}`;

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            alert('Tarefa removida com sucesso!!')
        })
        .catch((err) => console.log(err))

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

    function generateReport() {
        const formattedDate = formatDate(project.date);
    
        // Construa o conteúdo do relatório em HTML
        const reportContent = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Relatório do Projeto: ${project.name}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1, h2 {
                        margin-bottom: 10px;
                    }
                    p {
                        margin: 5px 0;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Relatório do Projeto: ${project.name}</h1>
                <h2>Detalhes do Projeto</h2>
                <p><strong>Categoria:</strong> ${project.category.name}</p>
                <p><strong>Data de Conclusão:</strong> ${formattedDate}</p>
                <p><strong>Total de Orçamento:</strong> R$${project.budget}</p>
                <p><strong>Total Utilizado:</strong> R$${project.cost}</p>
                <h2>Tarefas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Custo</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${services.map(service => `
                            <tr>
                                <td>${service.name}</td>
                                <td>R$${service.cost}</td>
                                <td>${service.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
    
        // Crie um Blob com o conteúdo HTML
        const blob = new Blob([reportContent], { type: 'text/html' });
    
        // Crie um link para download do Blob
        const url = URL.createObjectURL(blob);
    
        // Crie um elemento <a> para acionar o download do relatório
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio_${project.name}.html`;
    
        // Adicione o link ao documento e clique nele para iniciar o download
        document.body.appendChild(link);
        link.click();
    
        // Remova o link do documento após o download
        document.body.removeChild(link);
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
                                <h1>Projeto: {project.name}</h1>
                                <div className={Styles.botoes_form}>
                                    <button className={Styles.btn} onClick={toggleProjectForm}>
                                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                    </button>
                                    <button className={Styles.btn} onClick={generateReport}>
                                        Gerar Relatório
                                    </button>
                                </div>
                                {!showProjectForm ? (
                                    <div className={Styles.project_info}>
                                        <p>
                                            <span>Categoria:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Data de Conclusão:</span> {formatDate(project.date)}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento:</span> R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={Styles.project_info}>
                                        <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição" 
                                        projectData={project}
                                        projectID={project.id}></ProjectForm>
                                    </div>
                                )}
                            </div>
                            <div className={Styles.service_form_container}>
                                <h2>Adicione uma tarefa:</h2>
                                <button className={Styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar tarefa' : 'Fechar'}
                                </button>
                                <div className={Styles.project_info}>
                                    {
                                        showServiceForm && (
                                            <ServiceForm 
                                            handleSubmit={createService}
                                            btnText="Adicionar tarefa"
                                            projectData={{}}
                                            projectID={project.id}></ServiceForm>
                                        )
                                    }
                                </div>
                            </div>
                            <h2>Tarefas</h2>
                            <Container customClass="start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                        id={service.id}
                                        projectID = {project.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}>

                                        </ServiceCard>
                                    ))
                                }
                                {services.length === 0 && <p>Não há tarefas cadastradas</p>}
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

export default Project;