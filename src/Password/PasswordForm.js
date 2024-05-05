import {useEffect, useState} from 'react';

import Input from '../components/Form/Input/Input';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from '../User/UserForm.module.css';
import bcrypt from 'bcryptjs';

function PasswordForm({handleSubmit, btnText, userData, senhaOld}){

    const [user, setUser] = useState(userData || {});
    const [password2, setPassword2] = useState(userData || {});
    const userEmail = JSON.parse(localStorage.getItem("user_token")).id;
    const passwordOld = senhaOld;

    const submit = async (e) => {
        e.preventDefault();
        
        if (!user.password | !password2.passwordNew | !password2.passwordConf) {
            alert("Preencha todos os campos.");
            return;
        }

        const passwordMatch = await bcrypt.compare(user.password, passwordOld);

        if (!passwordMatch) {
            alert('A senha atual digitada não é a senha atual cadastrada anteriormente.');
            return;
        }

        if (password2.passwordNew != password2.passwordConf) {
            alert("As senhas são diferentes.");
            return;
        }

        user.password = password2.passwordNew;
        
        handleSubmit(user);
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleChangePassword(e) {
        setPassword2({...password2, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={Styles.form}>
            <Input
            type="password" 
            text="Senha Atual" 
            name="password" 
            placeholder="Insira sua senha atual"
            handleOnChange={handleChange}
            ></Input>
            <Input
            type="password" 
            text="Nova Senha" 
            name="passwordNew" 
            placeholder="Insira a nova senha"
            handleOnChange={handleChangePassword}></Input>
            <Input
            type="password" 
            text="Confirmação de senha" 
            name="passwordConf" 
            placeholder="Confirme sua nova senha"
            handleOnChange={handleChangePassword}></Input>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default PasswordForm;