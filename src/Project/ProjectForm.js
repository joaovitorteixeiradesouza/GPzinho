import {useEffect, useState} from 'react'

import Input from '../components/Form/Input/Input';
import Select from '../components/Form/Select/Select';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [projectDataGeral, setProjectDataGeral] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/projects`, {
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

        
        fetch("http://localhost:5000/categories", {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();

        // Verificar se o projeto já existe com o mesmo nome
        const existingProject = projectDataGeral.find(
            (existingProject) => existingProject.name === project.name
        );
        if (existingProject) {
            alert('Um projeto com o mesmo nome já existe. Por favor, escolha outro nome.');
            return;
        }

        if (project.budget <= 0) {
            alert('O orçamento deve ser maior que zero.');
            return;
        }
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        },
        })
    }


    return(
        <form onSubmit={submit} className={Styles.form}>
            <Input
            type="text" 
            text="Nome do projeto" 
            name="name" 
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}></Input>
            <Input
            type="number" 
            text="Orçamento do projeto" 
            name="budget" 
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
            value={project.budget? project.budget : ''}></Input>
            <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}></Select>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default ProjectForm;