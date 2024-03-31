import {Link} from 'react-router-dom';
import Container from "../Container/Container";
import Styles from './NavBar.module.css';
import Logo from '../../img/Empresario.png';
import Button from "../Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const { signout } = useAuth();
    const navigate = useNavigate();  

    return(
        <nav className={Styles.navbar}>
            <Container>
                <Link>
                    <img src={Logo} alt="Gestor de Projetos" className={Styles.classImg}></img>
                </Link>       
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