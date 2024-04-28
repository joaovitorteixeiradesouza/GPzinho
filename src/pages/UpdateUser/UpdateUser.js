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

function UpdateUser(){
    const [user, setUser] = useState([]);
    
    const history = useNavigate();
    const { token_User } = useAuth();

    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/users/${userEmail}`, {
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

        fetch(`http://localhost:5000/users/${userEmail}`, {
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

    return(
    <>
        <NavBar></NavBar>
        <Container>
            {user.nome ? (
            <div className={Styles.user_container}>
                <h1>Editar Perfil</h1>
                <p>Atualize as suas informações pessoais</p>
                <UserForm handleSubmit={editPost} btnText="Editar Perfil" userData={user} userID={user.id}></UserForm>
            </div>) : (<Loading></Loading>)}
        </Container>
        <Footer></Footer>
    </>
    );
}

export default UpdateUser;