import React, { useContext} from 'react';
import './style.scss'

import { UserContext } from '../../contexts/user';
import { Link } from 'react-router-dom';
import {FiHome,FiUser,FiSettings} from "react-icons/fi";
import avatar from '../../assets/avatar.png'


export default function Header() {
    const { user } = useContext(UserContext); //importa os dados do user
    // console.log(`user ${user}` ) 
    // console.log('user avatar ' + user.avatarUrl)
    // const [checked, setChecked] = React.useState(false);
    // const checkbox =  document.getElementById('hamburguer');

    
    // const  hamburguerClass = checked ? "active hamburguer" : "hamburguer" ;
    
    //Fazer o toogle da class


    return (
        <div className=" sidebar_header ">   
                <div className="avatar_user">
                    <img src={user.avatarUrl == null ? avatar : user.avatarUrl  } alt="user_image" className="user_image"/> 
                    {/* <img src={ avatar } alt="user_image" className="user_image"/> */}
                </div>
                <div className="categorys">
                    <ul className="list_header">
                        <Link to="/dashboard"><li> <FiHome color="#f9f9f9" size={24} /><span>Chamados </span></li></Link>
                        <Link to="/customers"><li><FiUser color="#f9f9f9" size={24} /><span>Clientes</span></li></Link>
                        <Link to="/profile"><li><FiSettings color="#f9f9f9" size={24} /><span>Configurações</span></li></Link>
                    </ul>
                </div>
        {/* <input type="checkbox" id="hamburguer" defaultChecked={checked} onChange={() => setChecked(!checked)} style={{"display": "none"}} />
        <label htmlFor="hamburguer">
            <div className={ hamburguerClass } ></div>
        </label> */}
        </div>

    )
}
