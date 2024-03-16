import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';
import Styles from './Footer.module.css';

function Footer(){
    return(
        <footer className={Styles.footer}>
            <ul className={Styles.social_list}>
                <li>
                    <FaFacebook></FaFacebook>
                </li>
                <li>
                    <FaInstagram></FaInstagram>
                </li>
                <li>
                    <FaLinkedin></FaLinkedin>
                </li>
            </ul>
            <p className={Styles.copy_right}><span>GPzinho</span> &copy; 2024</p>
        </footer>
    );
}

export default Footer;