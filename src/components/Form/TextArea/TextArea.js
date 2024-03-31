import Styles from './TextArea.module.css';

function TextArea({type, text, name, placeholder, handleOnChange, value}) {
    return(
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea 
            type={type}
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange} 
            value={value}
            maxLength='600'
            ></textarea>
        </div>
    );
}

export default TextArea;