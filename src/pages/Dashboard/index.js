import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../contexts/user'

export default function Dashboard() {
    const { signOut } = useContext(UserContext);
    return (
        <div>
            Página de Dashboard
            <button onClick={() => signOut()} > Logout </button>
        </div>
    )
}
