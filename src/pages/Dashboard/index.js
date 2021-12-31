import './style.scss'
import { useState,useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import {format} from 'date-fns'

import firebase from '../../services/firebaseConnection';
import {FiMessageSquare,FiPlus, FiSearch, FiEdit2, } from 'react-icons/fi';
import { toast } from 'react-toastify';


const listRef =  firebase.firestore().collection('called').orderBy('created', 'desc');

export default function Dashboard() {
    const [called, setCalled] = useState([]);//Chamados
    const [loading, setLoading] = useState(true); //exibe a mensagem de carregando os chamados
    const [loadingMore, setLoadingMore] = useState(false); // buscar mais chamados
    const [isEmpty, setIsEmpty] = useState(false); // verifica se possui algum chamado cadastrado
    const [lastDocs, setLastDocs] = useState(); // o ultimo documento buscado

    const [isModalVisible, setIsModalVisible] = useState(false);//verifica se o modal esta aberto ou não
    const [detail, setDetail] = useState();// verifica os dados do modal


    useEffect(()=>{
        async function loadCalled(){
            await listRef.limit(5)
            .get()
            .then((snapshot)=>{
                updateState(snapshot)
            })
            .catch(err => {
                console.log(err);
                setLoadingMore(false);
            })
    
            setLoading(false);
        }
        loadCalled();
        return () => {}
    },[ ]);

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;
        if(!isCollectionEmpty){
            let list = [];
            snapshot.forEach(doc => {
                list.push({
                    id:doc.id,
                    topic: doc.data().topic,
                    client: doc.data().client,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormat:format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complement
                })
                //console.log(doc.data());
            });
            const lastDocSearch = snapshot.docs[snapshot.docs.length - 1] //o ultimo doc
            setCalled(called => [...called, ...list]);
            setLastDocs(lastDocSearch);            
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    };

    function tooglePostModal(item){
        setIsModalVisible(!isModalVisible); 
        setDetail(item);
    }
    if(loading){
        return( 
            <div className="dad_container">
                 <Header/>
                <div className="content">
                    <Title name="Chamados" >
                        <FiMessageSquare color="#000" size={25}/>
                    </Title>
                </div>
                <div className="container dashboard">
                    <span> Buscando chamados ...</span>
                </div>
            </div>
        )
    };
    async function handleMore() {
        setLoadingMore(true)
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot)
        })
        .catch(err => {
            console.log(err);
            toast.warning('Não há mais chamados');
        })
    };

    return (
        <div className="dad_container">
            <Header/>
            <div className="content">
                <Title name="Chamados" >
                    <FiMessageSquare color="#000" size={25}/>
                </Title>
                {called.length === 0 ? (
                    <div className="container dashboard">
                        <span> Nenhum chamado registrado </span>
                        <Link to="/new" className="new"><FiPlus size={25} color="#fff"/>Novo Chamado</Link>
                    </div>
                ):(
                    <div className="container active">
                        <Link to="/new" className="new"><FiPlus size={25} color="#fff"/>Novo Chamado</Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {called.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.client}</td>
                                            <td data-label="Assunto">{item.topic}</td>
                                            <td data-label="Status">
                                                <span className="badge" 
                                                    style={{background: item.status === 'Aberto' ? '#5cb85c' : (item.status === 'Progresso' ? '#2954ff' : '#8C8C8C' ) }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormat}</td>
                                            <td data-label="#">
                                                <button className="action" onClick={() =>{tooglePostModal(item)}
                                                }style={{background:'#3583f6'}}  >
                                                    <FiSearch color="#fff" size={17}/>
                                                </button>
                                                <button className="action" style={{background:'#f6a935'}} >
                                                    <FiEdit2 color="#fff" size={17}/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}> Buscando chamdos ...</h3>}
                        {!loadingMore && !isEmpty && <button className="more" onClick={handleMore}><FiSearch color="#fff" size={20}/> Buscar Mais </button>}
                    </div> 
                )}
            </div>
            {isModalVisible && (
                <Modal
                    topic={detail}
                    close={tooglePostModal}
                />
            )}
        </div>
    )
}
