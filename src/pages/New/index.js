import './style.scss';
import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiPlusCircle} from 'react-icons/fi';


export default function New() {
    function handleRegisterClient(e){
        e.preventDefault();
        alert('hellou')
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
                        <select >  
                            <option key='1' value="volvo">Volvo</option>
                            <option key='2'  value="saab">Saab</option>
                            <option key='3'  value="fiat">Fiat</option>
                            <option key='4'  value="audi">Audi</option>
                        </select>
                       

                        <label>Assunto:</label>
                        <select>  
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                        </select>
                       
                        <label> Status:</label>
                        <div className="statusRadio">
                            <input  type="radio"  id="open"  name="radio" value="Aberto" />
                            <label htmlFor="open"> Em aberto</label>
                            
                            <input  type="radio" id="progress"  name="radio" value="progresso" />
                            <label htmlFor="progress" > Em progresso</label>
                            
                            <input  type="radio"  id="solved"  name="radio" value="atendido" />
                            <label htmlFor="solved"> Resolvido</label>
                        </div>


                        <label> Complemento:</label>
                        <textarea type="text" placeholder="Descreva seu problema(opcional)." rows='5' collumn="60" />

                        <button type="submit"> Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
