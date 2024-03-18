import Styles from './SubmitButton.module.css'

function SumbitButton({text}) {
    return(
        <div>
            <button className={Styles.btn}>{text}</button>
        </div>
    );
}

export default SumbitButton;