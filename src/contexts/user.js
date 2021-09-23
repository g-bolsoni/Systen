import {createContext, useState, useEffect} from 'react';
import firebase  from '../services/firebaseConnection';

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setloadingAuth] = useState(false); // fazer loading no botão
    const [loading, setLoading] = useState(true); //loading geral
    // verrificação de usuário logado
    useEffect(() => {
        async function loadStorage(){
            const storgeUser = await localStorage.getItem('SystemUser');
            console.log(storageUser)
            if( !!storgeUser ){
                console.log('aquit')
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

        }).catch(error => {
            console.log(error);
            setloadingAuth(false);
        })
    };
    //CADASTRAR USER
    async function signUp(email,password, name){
        setloadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
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

            }).catch(error => {
                console.log(error);
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
