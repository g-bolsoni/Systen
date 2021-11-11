import React, {useState, useContext} from 'react';
import './style.scss';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify'

import {UserContext} from '../../contexts/user';
import { Link } from 'react-router-dom';


import {FiSettings, FiUpload} from 'react-icons/fi';
import avatar from '../../assets/avatar.png';

import Header from '../../components/Header';
import Title from '../../components/Title';

export default function Profile() {
    const {user, setUser ,signOut, storageUser} = useContext(UserContext);

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setimageAvatar] = useState(null);

    async function handleSave (e){
        e.preventDefault();
        if(imageAvatar === null && name !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name:name
            }).then(()=>{
                let data = {
                    ...user,
                    name: name
                };
                setUser(data);
                storageUser(data);
            })
            toast.success('Alterações realizadas com sucesso !');
        }else
        if(imageAvatar !== null && name !== ''){
            handdleUpload();
            toast.success('Alterações realizadas com sucesso !');

        }
    }
    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'image/png'){   
                setimageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                toast.error(`É necessário enviar uma imagem em formato PNG ou JPEG`);
                setimageAvatar(null)
                return null;
            }
        }
    }
    async function handdleUpload(){
        const currentUid = user.uid;
        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async () => {
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url)=>{
                let urlPicture = url;
                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlPicture,
                    name: name
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlPicture,
                        name: name
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }
    return (
        <div className="profile_container">
            <Header/>
            <div className="content">
                <Title name="Meu perfil" >
                    <FiSettings color="#000" size={25}/>
                </Title>
                <div className="container">
                    <form className="form_profile" onSubmit={handleSave}>
                        <label className="label_avatar">
                            <span><FiUpload color="#fff" size={25}/></span>
                            <input type="file" accept="image/*" onChange={handleFile} />
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
                        <button type="submit" >Salvar</button>
                       
                    </form>
                </div>
                <div className="container">
                    <Link to='/' className="logout-btn" onClick={() => signOut()}>Sair</Link>
                </div>
            </div>
        </div>
    )
}
