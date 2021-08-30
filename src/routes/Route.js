import {useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { UserContext } from '../contexts/user';
export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest 
}){
    const {signed,loading } = useContext(UserContext);

    if(!loading){
        return(
            <div> Loading...</div>
        )
    }
    if(!signed && isPrivate){
        return <Redirect to="/"/>
    }
    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }
    return(
        <Route 
            {...rest}
            render={ props => (
                <Component {...props} />
            )}
        />
    )
}