import loading from '../../img/loading.svg';
import Styles from './Loading.module.css';

function Loading() {
    return (
        <div className={Styles.loader_container}>
            <img src={loading} alt="Loading" className={Styles.loader}></img>
        </div>
    );
}

export default Loading;