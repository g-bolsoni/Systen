import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route';


import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Profile from '../pages/Profile';
import New from '../pages/New';

export default function Routes() {
    return (
        <BrowserRouter>   
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/register" component={SignUp}/>
                <Route exact path="/dashboard" component={Dashboard} isPrivate/>
                <Route exact path="/customers" component={Customers} isPrivate/>
                <Route exact path="/profile" component={Profile} isPrivate/>
                <Route exact path="/new" component={New} isPrivate/>
            </Switch>
        </BrowserRouter>
    )
}
