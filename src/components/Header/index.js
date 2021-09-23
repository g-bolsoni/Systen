import React, { useContext} from 'react';
import './style.scss'
import { UserContext } from '../../contexts/user';
import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png'
import home from '../../assets/home.svg'
import people from '../../assets/people.svg'
import settings from '../../assets/settings.svg'

export default function Header() {
    const { user } = useContext(UserContext); //importa os dados do user 
    console.log(user)
    return (
        <div className=" sidebar_header ">
            <div className="avatar_user">
                <img src={user.avatarUrl !== null ? user.avatarUrl : avatar } alt="user_image" className="user_image"/> 
            </div>
            <div className="categorys">
                <ul className="list_header">
                    <Link to="/dashboard"><li> <img src={home} alt="calls_icon" className="calls_icon"/><span>Chamados </span></li></Link>
                    <Link to=""><li><img src={people} alt="clients_icon" className="clients_icon"/><span>Clientes</span></li></Link>
                    <Link to=""><li><img src={settings} alt="settings_image" className="settings_image"/><span>Configurações</span></li></Link>
                </ul>
            </div>
        </div>
    )
}
