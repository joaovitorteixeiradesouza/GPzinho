import {Link} from 'react-router-dom';
import Container from "../Container/Container";
import Styles from './NavBar.module.css';
import Logo from '../../img/Empresario.png';
import Button from "../Button";
import useAuth from "../../hooks/useAuth";
import LinkButton from '../LinkButton/LinkButton';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function NavBar(){
    const { signout } = useAuth();
    const navigate = useNavigate();  
    const [user, setUser] = useState([]);
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


    return(
        <nav className={Styles.navbar}>
            <Container>
                <div className={Styles.perfil}>
                    <Link>
                        <img src={Logo} alt="Gestor de Projetos" className={Styles.classImg}></img>
                    </Link>       
                    <h1 className={Styles.nome}>{user.nome}</h1><br/>
                    <LinkButton to='/updateuser' text='Editar Perfil'></LinkButton>
                </div>
                <ul className={Styles.list}>
                    <li className={Styles.item}>
                        <Link to="/Home">Home</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                    <li className={Styles.item}>
                    <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                        Sair
                    </Button>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default NavBar;