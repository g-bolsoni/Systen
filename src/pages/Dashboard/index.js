import { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import Header from '../../components/Header';
export default function Dashboard() {
    return (
        <div>
            <Header/>
            Página de Dashboard
        </div>
    )
}
