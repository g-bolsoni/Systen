import React, {useState} from 'react'
import './style.scss';
import {toast} from 'react-toastify';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiUser} from 'react-icons/fi';


export default function Customers() {
    const [name_fantasia, setName_fantasia] = useState('');
    const [cnpn_client, setCnpn_client] = useState('');
    const [adress, setAdress] = useState('');

    async function handleClient(e){
        e.preventDefault()
        if(name_fantasia !== '' && cnpn_client !== '' && adress !== ''){
            await firebase.firestore().collection('custumers')
            .add({
                name_fantasia : name_fantasia,
                cnpn_client: cnpn_client,
                adress: adress
            }).then(()=>{
                setName_fantasia('');
                setCnpn_client('');
                setAdress('');
                toast.info('Empresa cadastrada com sucesso!')
            })
            .catch((err)=>{
                console.log(`Cadastro de usuário ${err}`);
                toast.error('Algo deu errado, tente novamente')
            })
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    return (
        <div className="dad_container">
            <Header/>
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
                <div className="container">
                    <form className="form_profile" onSubmit={handleClient}>
                        <label> Nome Fantasia:</label>
                        <input placeholder="Nome da Empresa" type="text" value={name_fantasia} onChange={(e)=> setName_fantasia(e.target.value)} />

                        <label>CNPJ:</label>
                        <input placeholder="CNPJ da Empresa" type="text" value={cnpn_client} onChange={(e)=> setCnpn_client(e.target.value)} />

                        <label> Endereço:</label>
                        <input placeholder="Endereço da Empresa" type="text" value={adress} onChange={(e)=> setAdress(e.target.value)} />

                        <button type="submit">  Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
