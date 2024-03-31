import Styles from '../Project/ProjectCard.module.css';
import Logo from '../img/Empresario.png';
import {BsFillTrashFill} from 'react-icons/bs';

function TeamCard({id, name, funcao, handleRemove}) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, name);
    }

    return (
        <div className={Styles.project_card}>
            <img src={Logo} alt="Empresário"></img>
            <h4>{name}</h4>
            <p>
                Função: {funcao}
            </p>
            <div className={Styles.project_card_actions}>
                <button onClick={remove}>
                 <BsFillTrashFill></BsFillTrashFill>
                 Excluir
                </button>
            </div>
        </div>
    );
}

export default TeamCard;