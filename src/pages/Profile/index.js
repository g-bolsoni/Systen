import React, {useState, useContext} from 'react';
import './style.scss';

import {UserContext} from '../../contexts/user';
import { Link } from 'react-router-dom';


import {FiSettings, FiUpload} from 'react-icons/fi';
import avatar from '../../assets/avatar.png';

import Header from '../../components/Header';
import Title from '../../components/Title';

export default function Profile() {
    const {user, signOut} = useContext(UserContext)
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    return (
        <div className="profile_container">
            <Header/>
            <div className="content">
                <Title name="Meu perfil" >
                    <FiSettings color="#000" size={25}/>
                </Title>
                <div className="container">
                    <form className="form_profile">
                        <label className="label_avatar">
                            <span><FiUpload color="#fff" size={25}/></span>
                            <input type="file" accept="image/*" />
                            {avatarUrl === null ?
                                <img src={avatar} width={200} height={200} alt="user foto"/>
                                :
                                <img src={avatarUrl} width={200} height={200} alt="user foto"/>
                            }
                        </label>
                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>E-mail</label>
                        <input type="email" value={email} disabled={true} />
                        <Link to="/" role="button">Salvar</Link>
                       
                    </form>
                </div>
                <div className="container">
                    <Link to='/' className="logout-btn" onClick={() => signOut()}>Sair</Link>
                </div>
            </div>
        </div>
    )
}
