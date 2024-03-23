import {useState} from 'react';
import Input from '../components/Form/Input/Input';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from '../Project/ProjectForm.module.css';

function ServiceForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState([]);
    
    function onSubmit(e){
        e.preventDefault();

        // Verificar se o projeto já existe com o mesmo nome
        const existingProject = projectData.services.find(
            (existingProject) => existingProject.name === service.name
        );
        if (existingProject) {
            alert('Uma tarefa com o mesmo nome já existe. Por favor, escolha outro nome.');
            return;
        }
        
        if (service.cost <= 0) {
            alert('O custo da tarefa deve ser maior que zero.');
            return;
        }

        projectData.services.push(service);
        handleSubmit(projectData);
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
            handleOnChange={handleChange}></Input>
            <Input 
            type="number"
            text="Custo da tarefa"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}></Input>
            <Input 
            type="text"
            text="Descrição da tarefa"
            name="description"
            placeholder="Descreva a tarefa"
            handleOnChange={handleChange}></Input>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default ServiceForm;