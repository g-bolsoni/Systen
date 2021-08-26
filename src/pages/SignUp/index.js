import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import logo from '../../assets/logo.png'
export default function SignIn() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault()
        alert('Clicou');
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
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/"><span>Já possuo uma conta</span></Link>

            </div>
        </div>
    )
}
