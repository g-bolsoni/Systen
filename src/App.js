// import firebase from './services/firebaseConnection';
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, } from 'react-router-dom';
import Routes from './routes';
import UserProvider from './contexts/user';
import  {ToastContainer} from 'react-toastify'

export default function App() {
  return (
    <UserProvider >
      <BrowserRouter>
        <ToastContainer autoClose={3000}/>
        <Routes/>
      </BrowserRouter>
    </UserProvider>
  );
}