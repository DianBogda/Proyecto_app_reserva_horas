import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import AdminLogin from '../components/AdminLogin';
import MainAdmin from '../views/MainAdmin';
import UserList from '../components/UserList';
import CitasDetails1 from '../components/CitasDetails1';
import CitasDetails2 from '../components/CitasDetails2';
import CitasDetails3 from '../components/CitasDetails3';

const AdminRoutes = () => {

    const [cookies] = useCookies();

    function RequireAuth({ children, redirectTo }) {
        let isAuthenticated = false
        if(cookies.usertoken !== undefined){
            isAuthenticated = jwt_decode(cookies.usertoken).admin ? true : false;
        }        
        // console.log(isAuthenticated)
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }

    return(
        <div className="App">
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/dashboard"
                element={
                    <RequireAuth redirectTo="/admin/login">
                        <MainAdmin />
                    </RequireAuth>
                }/>
                <Route path="/user_list"
                element={
                    <RequireAuth redirectTo="/admin/login">
                        <UserList />
                    </RequireAuth>
                }/>
                <Route path="/reservas_list1"
                element={
                    <RequireAuth redirectTo="/admin/login">
                        <CitasDetails1 />
                    </RequireAuth>
                }/>
                <Route path="/reservas_list2"
                element={
                    <RequireAuth redirectTo="/admin/login">
                        <CitasDetails2 />
                    </RequireAuth>
                }/>
                <Route path="/reservas_list3"
                element={
                    <RequireAuth redirectTo="/admin/login">
                        <CitasDetails3 />
                    </RequireAuth>
                }/>
            </Routes>
        </div>
    )
}

export default AdminRoutes;

