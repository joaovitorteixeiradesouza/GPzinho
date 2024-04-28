import {useEffect, useState} from 'react';

import Input from '../components/Form/Input/Input';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from './UserForm.module.css'

function UserForm({handleSubmit, btnText, userData}){

    const [user, setUser] = useState(userData || {});
    const [projectDataGeral, setProjectDataGeral] = useState([]);
    const [email2, setEmail2] = useState(userData || {});
    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;

    useEffect(() => {

        fetch(`http://localhost:5000/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjectDataGeral(data);
        })
        .catch((err) => console.log(err))

    
    }, []);

    const submit = (e) => {
        e.preventDefault();
        
        if (!user.nome | !user.email | !email2.email) {
            alert("Preencha todos os campos.");
            return;
        }

        if (user.email != email2.email) {
            alert("Os E-mails são diferentes.");
            return;
        }
        
        // Verificar se o email já existe 
        const existingProject = projectDataGeral.find(
            (existingProject) => existingProject.email === user.email
        );
        
        const ProjectOld = projectDataGeral.find( (projectsOld) => projectsOld.id == user.id)
        
        if (ProjectOld == undefined) {
            if (existingProject) {
                alert('Um usuário com o mesmo e-mail já existe. Por favor, escolha outro email.');
                return;
            }    
        } else {
            if (user.email != ProjectOld.email){
                if (existingProject) {
                    alert('Um usuário com o mesmo e-mail já existe. Por favor, escolha outro e-mail.');
                    return;
                }
            }
        }

        handleSubmit(user);
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleChangeEmail(e) {
        setEmail2({...email2, 'email': e.target.value})
    }

    return(
        <form onSubmit={submit} className={Styles.form}>
            <Input
            type="text" 
            text="Nome Completo" 
            name="nome" 
            placeholder="Insira o seu nome completo"
            handleOnChange={handleChange}
            value={user.nome ? user.nome : ''}></Input>
            <Input
            type="text" 
            text="E-mail" 
            name="email" 
            placeholder="Insira o seu E-mail"
            handleOnChange={handleChange}
            value={user.email? user.email : ''}></Input>
            <Input
            type="text" 
            text="Confirmação de E-mail" 
            name="emailConf" 
            placeholder="Confirme seu E-mail"
            handleOnChange={handleChangeEmail}
            value={email2.email? email2.email : ''}></Input>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default UserForm;