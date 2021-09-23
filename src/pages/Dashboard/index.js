import { useContext } from 'react';
import { UserContext } from '../../contexts/user'

import Header from '../../components/Header'

export default function Dashboard() {
    const { signOut } = useContext(UserContext);
    return (
        <div>
            <Header/>
            Página de Dashboard
            <button onClick={() => signOut()} > Logout </button>
        </div>
    )
}
