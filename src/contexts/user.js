import {createContext, useState, useEffect} from 'react'
import firebase  from '../services/firebaseConnection'

export const UserContext = createContext({})
export default function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setloadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        return () => {
            async function loadStorage(){
                const storgeUser = await localStorage.getItem('SystemUser');
                if(storgeUser){
                    setUser(JSON.parse(storgeUser));
                    setLoading(false);
                }
                setLoading(false);
            }
            loadStorage()

        }
    }, [])

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
    }
    function storageUser(data){
        localStorage.setItem('SystemUser',JSON.stringify(data));
    }
    async function signOut(){
        await firebase.auth().signOut();
        await localStorage.removeItem('SystemUser');
        setUser(null)
    }
    return (
        <UserContext.Provider value={
            {signed:
                !!user,
                user,
                loading,
                signUp,
                signOut
            }
        }>
            {children }
        </UserContext.Provider>
    )
}
