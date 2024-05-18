import {useEffect, useState} from 'react'

import Input from '../components/Form/Input/Input';
import Select from '../components/Form/Select/Select';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [projectDataGeral, setProjectDataGeral] = useState([]);
    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;

    useEffect(() => {
        const isProduction = process.env.NODE_ENV === 'production';
        const apiUrl = isProduction ? `/api/projects?user_email=${userEmail}` : `http://localhost:5000/projects?user_email=${userEmail}`;
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
        
        const isProduction2 = process.env.NODE_ENV === 'production';
        const apiUrl2 = isProduction2 ? `/api/categories` : `http://localhost:5000/categories`;
        fetch(apiUrl2, {
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
        if (project.category) {
            if (!project.name | !project.budget | !project.category | project.category.id == "Selecione uma opção" | !project.date) {
                alert("Preencha todos os campos");
                return;
            }
        } else {
            if (!project.name | !project.budget | !project.category | !project.date) {
                alert("Preencha todos os campos");
                return;
            }
        }

        // Verificar se o projeto já existe com o mesmo nome
        const existingProject = projectDataGeral.find(
            (existingProject) => existingProject.name === project.name
        );
        
        const ProjectOld = projectDataGeral.find( (projectsOld) => projectsOld.id == project.id)
        
        if (ProjectOld == undefined) {
            if (existingProject) {
                alert('Um projeto com o mesmo nome já existe. Por favor, escolha outro nome.');
                return;
            }    
        } else {
            if (project.name != ProjectOld.name){
                if (existingProject) {
                    alert('Um projeto com o mesmo nome já existe. Por favor, escolha outro nome.');
                    return;
                }
            }
        }
        
        if (project.budget <= 0) {
            alert('O orçamento deve ser maior que zero.');
            return;
        }

        const dateProject = new Date(project.date);

        if (isNaN(dateProject.getTime())) {
            alert('Data inválida.');
            return;
        }

        const dateCurrent = new Date()

        if (dateProject < dateCurrent) {
            alert('Data não pode ser menor que a data atual');
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
            <Input
            type="date" 
            text="Data de conclusão do projeto" 
            name="date" 
            placeholder="Insira a data final"
            handleOnChange={handleChange}
            value={project.date? project.date : ''}></Input>
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