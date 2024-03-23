import Styles from '../Project/ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';

function ServiceCard({id, name, cost, description, handleRemove}) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }

    return (
        <div className={Styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span>R${cost}
            </p>
            <p>
                {description}
            </p>
            <div className={Styles.project_card_actions}>
                <Link to={`/service/${id}`}>
                    <BsPencil></BsPencil> Editar
                </Link>
                <button onClick={remove}>
                 <BsFillTrashFill></BsFillTrashFill>
                 Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;