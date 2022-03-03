import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import UserLogin from '../components/UserLogin';
import Register from '../components/Register';
import Reservas from '../components/Reservas';
import Portada from '../views/Portada';
import UserView from '../views/Userview';
import EditarReservas from '../components/EditarReservas';

const DefaultRoutes = () => {

    const [cookies] = useCookies();

    function RequireAuth({ children, redirectTo }) {
        let isAuthenticated = false
        if(cookies.usertoken !== undefined){
            isAuthenticated = jwt_decode(cookies.usertoken).admin ? true : false;
        } else{
            return <Navigate to={redirectTo}/>
        }        
        // console.log(isAuthenticated)
        return isAuthenticated ? <Navigate to={'/admin/dashboard'}/> : children ;
    }

    return(
        <div className="App"> 
            <Routes>
                <Route path="/" element={<Portada />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/reservas"
                element={
                    <RequireAuth redirectTo="/user/login">
                        <Reservas  />
                    </RequireAuth>
                }/>
                <Route path="/user/dashboard"
                element={
                    <RequireAuth redirectTo="/user/login">
                        <UserView />
                    </RequireAuth>
                }/>
                <Route path="/user/edit/:id"
                element={
                    <RequireAuth redirectTo="/user/login">
                        <EditarReservas />
                    </RequireAuth>
                }/>
            </Routes>        
        </div>
    )
}

export default DefaultRoutes;