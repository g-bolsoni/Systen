import React from 'react';
import { FiX} from 'react-icons/fi';
import './style.scss';

export default function Modal({topic,close}){
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}> <FiX size={23} color="#000"/></button>
                <div>
                    <h2> Detalhes do chamado</h2>
                    <div className="row">
                        <span> Cliente: <p>{topic.client}</p></span>
                    </div> 

                    <div className="row">
                        <span> Assunto: <p>{topic.topic}</p></span>
                        <span> Cadastrado em: <p>{topic.createdFormat}</p></span>
                    </div>

                    <div className="row">
                        <span> Status: <p style={{color: "#fff", background: topic.status === 'Aberto' ? '#5cb85c' : (topic.status === 'Progresso' ? '#2954ff' : '#8C8C8C' )}}>{topic.status}</p></span>
                    </div>

                    {topic.complement !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>{topic.complement}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

;