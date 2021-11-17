import './style.scss';
import { useState, useContext, useEffect } from 'react';
import {user} from '../../contexts/user';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiPlusCircle} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { id } from 'prelude-ls';


export default function New() {
    const [loadCustomer, setLoadCustomer] = useState(true);//load 
    const [customers, setCustomers] = useState([]);//get user
    const [customerSelected, setCustomerSelected] = useState(0); //limite de user
    const [topic, setTopic] = useState('suport');
    const [status, setStatus] = useState('open');
    const [complement, setComplement] = useState('');
    
    function handleRegisterClient(e){
        e.preventDefault();
        alert('hellou')
    }
    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('custumers')
            .get()
            .then(snapshot =>{
                let lista = [];
                snapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        name_fantasia: doc.data().name_fantasia
                    })
                });
                if(lista.length === 0){
                    toast.error('Nenhuma empresa encontrada');
                    setLoadCustomer(false);
                    setCustomers([
                        {
                            id:1,
                            name_fantasia:  ''
                        }
                    ]);
                    return;
                }
                setCustomers(lista);
                setLoadCustomer(false);
            })
            .catch(err => {
                console.log(err);
                setLoadCustomer(false);
                setCustomers([
                    {
                        id:1,
                        name_fantasia:  ''
                    }
                ]);
            });
        }
        loadCustomers();    
    }, [])
    
    return (
        <div className="dad_container">
            <Header/>
            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>
                <div className="container">
                    <form className="form_profile New" onSubmit={handleRegisterClient}>
                        <label>Cliente:</label>
                        {loadCustomer ? (
                            <input type="text" disabled={true} value="Carregando clientes ... " />
                        ) : (
                            <select value={customerSelected} onChange={e => setCustomerSelected(e.target.value)}>  
                                {customers.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index} onChange={e => setCustomerSelected(e.target.value)}>{item.name_fantasia}</option>   
                                    )
                                })}
                            </select>
                        )}
                       

                        <label>Assunto:</label>
                        <select value={topic} onChange={e => setTopic(e.target.value)}>  
                            <option value="suport">Suporte</option>
                            <option value="visit">Visita Tecnica</option>
                            <option value="finance">Financeiro</option>
                        </select>
                       
                        <label> Status:</label>
                        <div className="statusRadio">
                            <input  type="radio"  id="open"  name="radio" value="open" onChange={e => setStatus(e.target.value)} 
                            checked={ status === 'open' ? true : false}/>
                            <label htmlFor="open"> Em aberto</label>
                            
                            <input  type="radio" id="progress"  name="radio" value="progress" onChange={e => setStatus(e.target.value)}
                            checked={ status === 'progress' ? true : false} />
                            <label htmlFor="progress" > Em progresso</label>
                            
                            <input  type="radio"  id="solved"  name="radio" value="solved" onChange={e => setStatus(e.target.value)}
                            checked={ status === 'solved' ? true : false} />
                            <label htmlFor="solved"> Resolvido</label>
                        </div>


                        <label> Complemento:</label>
                        <textarea type="text" placeholder="Descreva seu problema(opcional)." value={complement}
                        onChange={e => setComplement(e.target.value)} rows='5' collumn="60" />

                        <button type="submit"> Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
