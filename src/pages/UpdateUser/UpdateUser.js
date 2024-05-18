import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Styles from "./UpdateUser.module.css"
import UserForm from '../../User/UserForm';
import Loading from "../../components/Loading/Loading";
import PasswordForm from "../../Password/PasswordForm";
import bcrypt from 'bcryptjs';

function UpdateUser(){
    const [user, setUser] = useState([]);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    
    const history = useNavigate();
    const { token_User } = useAuth();

    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;

    
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction ? `/api/users/${userEmail}` : `http://localhost:5000/users/${userEmail}`;

    useEffect(() => {

        setTimeout(() => {
            fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
        })
        .catch((err) => console.log(err))
        }, 300);

    }, [userEmail]);

    function editPost(user) {

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
            alert('Usuário atualizado!');
            window.location.reload();
        })
        .catch((err) => console.log(err))
    }

    const updatePassword = async(user) => {

        user.password = await bcrypt.hash(user.password, 10);

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
            alert('Senha atualizada!');
            window.location.reload();
        })
        .catch((err) => console.log(err))
    }


    function togglePasswordForm() {
        setShowPasswordForm(!showPasswordForm);
    }


    return(
    <>
        <NavBar></NavBar>
        <Container>
            {user.nome ? (
            <div className={Styles.user_container}>
                <h1>Editar Perfil</h1>
                <p>Atualize as suas informações pessoais</p>
                <UserForm handleSubmit={editPost} btnText="Editar Perfil" userData={user} userID={user.id}></UserForm>
                <div className={Styles.user_form_container}>
                                <h2>Altere sua senha:</h2>
                                <button className={Styles.btn} onClick={togglePasswordForm}>
                                    {!showPasswordForm ? 'Alterar Senha' : 'Fechar'}
                                </button>
                                <div className={Styles.project_info}>
                                    {
                                        showPasswordForm && (
                                            <PasswordForm 
                                            handleSubmit={updatePassword}
                                            btnText="Alterar Senha"
                                            projectData={user}
                                            senhaOld={user.password}
                                            projectID={user.id}></PasswordForm>
                                        )
                                    }
                                </div>
                            </div>
            </div>) : (<Loading></Loading>)}
            
        </Container>
        <Footer></Footer>
    </>
    );
}

export default UpdateUser;