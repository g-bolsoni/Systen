import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom'

import './style.scss';
import logo from '../../assets/logo.png';

import { UserContext } from '../../contexts/user';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loadingAuth} = useContext(UserContext);
    
    function handleSubmit(e) {
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn( email, password);
        }
    }
    return (
        <div className="page-comom container-SignIn">
            <div className='login'>
                <div className='login_area' >
                    <img src={logo} alt="systen_logo"/>
                </div>
                <form className="form_signIn" onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@email.email.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <input type="password" placeholder="*******" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="submit">{loadingAuth ? 'Loanding ... ': "Acessar"}</button>
                </form>
                <Link to="/register"><span>Criar uma conta</span></Link>

            </div>
        </div>
    )
}
