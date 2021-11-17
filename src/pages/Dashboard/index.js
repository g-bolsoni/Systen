import './style.scss'
import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';

import {FiMessageSquare,FiPlus, FiSearch, FiEdit2} from 'react-icons/fi';
export default function Dashboard() {
    const [called, setCalled] = useState([])
    return (
        <div className="dad_container">
            <Header/>
            <div className="content">
                <Title name="Chamados" >
                    <FiMessageSquare color="#000" size={25}/>
                </Title>
                {called.length !== 0 ? (
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
                                <tr>
                                    <td data-label="Cliente">Escola</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{background:'#5cb85c'}}>Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action"style={{background:'#3583f6'}}>
                                            <FiSearch color="#fff" size={17}/>
                                        </button>
                                        <button className="action"style={{background:'#f6a935'}}>
                                            <FiEdit2 color="#fff" size={17}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                )}
            </div>
        </div>
    )
}
