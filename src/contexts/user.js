import {createContext, useState, useEffect} from 'react'
import firebase  from '../services/firebaseConnection'

export const UserContext = createContext({})
export default function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
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

    return (
        <UserContext.Provider value={
            {signed: !!user, user, loading}

        }>
            {children }
        </UserContext.Provider>
    )
}
