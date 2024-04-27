import {useEffect, useState} from 'react';
import Input from '../components/Form/Input/Input';
import Select from '../components/Form/Select/Select';
import SumbitButton from '../components/Form/SubmitButton/SubmitButton';
import Styles from '../Project/ProjectForm.module.css';

function TeamForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState([projectData || {}]);
    const [funcoes, setFuncoes] = useState([]);
    const [equipe, setEquipe] = useState([]);

    useEffect(() => {
        
        fetch("http://localhost:5000/funcoes", {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setFuncoes(data)
        })
        .catch((err) => console.log(err));
    }, []);

    
    function onSubmit(e){
        e.preventDefault();

        if (equipe.funcao) {
            if (!equipe.nameColab | !equipe.funcao | equipe.funcao.id == "Selecione uma opção") {
                alert("Preencha todos os campos");
                return;
            }
        } else {
            if (!equipe.nameColab | !equipe.funcao) {
                alert("Preencha todos os campos");
                return;
            }
        }


        service[0].equipe.push(equipe);
        //projectData.services.push(service);
        handleSubmit(service);
    }

    function handleChange(e) {
        setEquipe({...equipe, [e.target.name]: e.target.value}
        );
    }

    function handleFuncoes(e) {
        setEquipe({...equipe, 
                funcao:{
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return(
        <form onSubmit={onSubmit} className={Styles.form}>
            <Input 
            type="text"
            text="Nome do colaborador"
            name="nameColab"
            placeholder="Insira o nome do colaborador"
            handleOnChange={handleChange}></Input>
            <Input 
            type="text"
            text="Imagem do colaborador"
            name="imgColab"
            placeholder="Caminho da imagem (URL)"
            handleOnChange={handleChange}></Input>
            <Select 
            name="funcao_id" 
            text="Selecione a função" 
            options={funcoes}
            handleOnChange={handleFuncoes}
            value={equipe.funcao ? equipe.funcao.id : ''}></Select>
            <SumbitButton text={btnText}></SumbitButton>
        </form>
    );
}

export default TeamForm;