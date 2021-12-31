import './style.scss';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams} from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiPlusCircle} from 'react-icons/fi';
import { toast } from 'react-toastify';


export default function New() {
    const { id } = useParams();
    const history = useHistory();

    const [loadCustomer, setLoadCustomer] = useState(true);//load 
    const [customers, setCustomers] = useState([]);//get user
    const [customerSelected, setCustomerSelected] = useState(0); //limite de user
    const [topic, setTopic] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complement, setComplement] = useState('');

    const [ idCustomer, setIdCustomer ] = useState(false);

    const { user } = useContext( UserContext );
    
    async function handleRegisterClient(e){
        e.preventDefault();
        if(idCustomer){
            await firebase.firestore().collection('called')
            .doc(id)
            .update({
                client: customers[customerSelected].name_fantasia,
                clientId: customers[customerSelected].id,
                topic: topic,
                status: status,
                complement: complement,
                userId: user.uid
            })
            .then(()=> {
                toast.success('Chamado editado com sucesso');
                setCustomerSelected(0);
                setComplement('');
                history.push('/dashboard')
            })
            .catch(err => {
                console.log(err);
                toast.error('Algo está errado !')
            })
            return;
        }
       await firebase.firestore().collection('called').add({
            created: new Date(),
            client: customers[customerSelected].name_fantasia,
            clientId: customers[customerSelected].id,
            topic: topic,
            status: status,
            complement: complement,
            userId: user.uid
       })
       .then(()=>{
           toast.success('Chamado cadastrado.');
           toast.success('Ufaa, deu tudo certo !');
           setComplement('');
           setCustomerSelected(0);
       })
       .catch(err =>{
           console.log(err);
           toast.error('Algo está errado, tente novamente')
       })
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
                if(id){
                    loadId(lista);
                }
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
    }, [id, loadId])
    async function loadId(lista){
        await firebase.firestore().collection('called').doc(id).get()
        .then((snapshot) => {
            setTopic(snapshot.data().topic);
            setStatus(snapshot.data().status);
            setComplement(snapshot.data().complement);

            let index = lista.findIndex(item => item.id === snapshot.data().clientId);
            setCustomerSelected(index);
            setIdCustomer(true);

        })
        .catch(err => {
            console.log(err);
            setIdCustomer(false);

        });
    }
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
                            <option value="Suporte">Suporte</option>
                            <option value="Visita">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>
                       
                        <label> Status:</label>
                        <div className="statusRadio">
                            <input  type="radio"  id="open"  name="radio" value="Aberto" onChange={e => setStatus(e.target.value)} 
                            checked={ status === 'Aberto' ? true : false}/>
                            <label htmlFor="open"> Em aberto</label>
                            
                            <input  type="radio" id="progress"  name="radio" value="Progresso" onChange={e => setStatus(e.target.value)}
                            checked={ status === 'Progresso' ? true : false} />
                            <label htmlFor="progress" > Em progresso</label>
                            
                            <input  type="radio"  id="solved"  name="radio" value="Resolvido" onChange={e => setStatus(e.target.value)}
                            checked={ status === 'Resolvido' ? true : false} />
                            <label htmlFor="solved"> Resolvido</label>
                        </div>


                        <label> Complemento:</label>
                        <textarea type="text" placeholder="Descreva seu problema(opcional)." value={complement}
                        onChange={e => setComplement(e.target.value)} rows='5' collumn="60" />

                        <button type="submit" href="/dashboard"> Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
