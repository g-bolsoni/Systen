// import firebase from './services/firebaseConnection';
import {BrowserRouter, } from 'react-router-dom';
import Routes from './routes'
export default function App() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}