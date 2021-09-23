import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user';

import './style.scss';
import logo from '../../assets/logo.png';

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {signUp, loadingAuth} = useContext(UserContext)
    
    function handleSubmit(e) {
        e.preventDefault()
        if(name !== ''  && email !== '' && password !== ''){
            signUp( email, password, name);
        }
    }

    return (
        <div className="page-comom container-SignUp">
            <div className='login'>
              
                <div className='login_area' >
                    <img src={logo} alt="systen_logo"/>
                </div>
                <form className="form_signIn" onSubmit={handleSubmit}>
                    <h1> Cadastrar-se</h1>
                    <input type="text" placeholder="Nome" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="text" placeholder="E-mail" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <input type="password" placeholder="Senha" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="submit">{loadingAuth ? 'Loanding ... ': "Cadastrar"}</button>
                </form>
                <Link to="/"><span>Já possuo uma conta</span></Link>

            </div>
        </div>
    )
}
