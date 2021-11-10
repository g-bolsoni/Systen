import {createContext, useState, useEffect} from 'react';
import firebase  from '../services/firebaseConnection';
import { toast } from 'react-toastify'

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setloadingAuth] = useState(false); // fazer loading no botão
    const [loading, setLoading] = useState(true); //loading geral
    // Verificação de usuário logado
    useEffect(() => {
        async function loadStorage(){
            const storgeUser = await localStorage.getItem('SystemUser');
            if( !!storgeUser ){
                setUser(JSON.parse(storgeUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage()
    }, []);
    //Login User 
    async function signIn(email,password){
        setloadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid =  value.user.uid;

            const userProfile = await firebase.firestore().collection('users').doc(uid).get();
            let data ={
                uid: uid,
                name: userProfile.data().name,
                email: value.user.email,
                avatarUrl: userProfile.data().avatarUrl,
            };
            setUser(data);
            storageUser(data);
            setloadingAuth(false); 
            toast.success(` Bem vindo ${data.name}`)

        }).catch(error => {
            console.log(error);
            toast.error(`Algo de errado não está certo,verifique...`)
            toast.error(`\n${error}`)
            setloadingAuth(false);
        })
    };
    //CADASTRAR USER
    async function signUp(email,password,name){
        setloadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            /*criuar no bd*/
            await firebase.firestore().collection('users')
            .doc(uid).set({
                name: name,
                avatarUrl: null,
            })
            .then(()=>{
                let data ={
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null,
                };
                setUser(data);
                storageUser(data);
                setloadingAuth(false);
                toast.success(`Bem vindo a Plataforma ${data.name} `)

            }).catch(error => {
                console.log(error);
                toast.error(`Parece que não está tudo certo !\n${error}`)
                setloadingAuth(false);

            })
        })
    };
    function storageUser(data){
        localStorage.setItem('SystemUser',JSON.stringify(data));
    };
    //lOGOUT USER 
    async function signOut(){
        await firebase.auth().signOut();
        await localStorage.removeItem('SystemUser');
        setUser(null)
    };
    return (
        <UserContext.Provider value={
            {signed:
                !!user,
                user,
                loading,
                loadingAuth,
                signUp,
                signOut,
                signIn
            }
        }>
            {children }
        </UserContext.Provider>
    )
}
