// import firebase from './services/firebaseConnection';
import {BrowserRouter, } from 'react-router-dom';
import Routes from './routes';
import UserProvider from './contexts/user';
export default function App() {
  return (
    <UserProvider >
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </UserProvider>
  );
}