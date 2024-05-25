import {useEffect, useState} from 'react';
import Input from '../components/Form/Input/Input';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from '../Project/ProjectForm.module.css';
import TextArea from '../components/Form/TextArea/TextArea';

function ServiceForm({handleSubmit, btnText, projectData, projectID}) {
    const [service, setService] = useState(projectData || {});
    const [projectDataGeral, setProjectDataGeral] = useState([]);
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction ? `/api/projects/${projectID}` : `http://localhost:5000/projects/${projectID}`;
    
    useEffect(() => {

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjectDataGeral(data)
        })
        .catch((err) => console.log(err))

        
    }, []);


    function onSubmit(e){
        e.preventDefault();

        if (!service.name | !service.cost | !service.description | !service.date) {
            alert("Preencha todos os campos");
            return;
        }

        // Verificar se a tarefa já existe com o mesmo nome
        const existingProject = projectDataGeral.services.find(
            (existingProject) => existingProject.name === service.name
        );
        const serviceOld = projectDataGeral.services.find( (servicesOld) => servicesOld.id == service.id)
        if (serviceOld == undefined){
            if (existingProject) {
                alert('Uma tarefa com o mesmo nome já existe. Por favor, escolha outro nome.');
                return;
            }
        } else {
            if (service.name != serviceOld.name){
                if (existingProject) {
                    alert('Uma tarefa com o mesmo nome já existe. Por favor, escolha outro nome.');
                    return;
                }
                
            }
        }
        
        if (service.cost <= 0) {
            alert('O custo da tarefa deve ser maior que zero.');
            return;
        }

        const dateProject = new Date(projectDataGeral.date);
        const dataService = new Date(service.date);

        if (isNaN(dataService.getTime())) {
            alert('Data inválida.');
            return;
        }

        const dateCurrent = new Date()

        if (dataService < dateCurrent) {
            if (dataService.getDay() + 1 == dateCurrent.getDay() && dataService.getMonth() == dateCurrent.getMonth() && dataService.getFullYear() == dateCurrent.getFullYear()) {
                
            } else {
                alert('Não pode ser inserida uma data de conclusão que já aconteceu.');
                return;
            }
        }

        if (dataService > dateProject) {
            alert('Data de conclusão da tarefa não pode ser maior que a data de conclusão do projeto.');
            return;
        }

        handleSubmit(service);
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={onSubmit} className={Styles.form}>
            <Input 
            type="text"
            text="Nome da tarefa"
            name="name"
            placeholder="Insira o nome da tarefa"
            handleOnChange={handleChange}
            value={service.name ? service.name : ''}></Input>
            <Input 
            type="number"
            text="Custo da tarefa"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            value={service.cost ? service.cost : ''}></Input>
            <Input
            type="date" 
            text="Data de conclusão da tarefa" 
            name="date" 
            placeholder="Insira a data final"
            handleOnChange={handleChange}
            value={service.date? service.date : ''}></Input>
            <TextArea 
            type="text"
            text="Descrição da tarefa"
            name="description"
            placeholder="Descreva a tarefa"
            handleOnChange={handleChange}
            value={service.description ? service.description : ''}></TextArea>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default ServiceForm;