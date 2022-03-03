import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo_base2 from '../assets/img/logo_base2.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

const UserList = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data.users)
                setLoaded(true);
            });
    }, [])

    return(
        <div className='wrapper'>
            {loaded &&
            <>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes admin'>Amely Pestañas y Cejas</h2>
            </header>   
            <nav className='nav_bar'>
                <Link className='link' to={'/'}>Portada</Link>
            </nav> 
            <div>
                <h3 className='encabezado espejo_encab'>Lista de Clientas:</h3>
                <table>
                    <thead>
                        <tr>
                            <th className='cabeza'>Nombre</th>
                            <th className='cabeza'>Apellido</th>
                            <th className='cabeza'>Teléfono</th>
                            <th className='cabeza'>Correo Electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ?
                        users.map((user, index) => {
                            return(
                                <tr key={index}>
                                    <td className='cuerpo'>{user.firstName}</td>
                                    <td className='cuerpo'>{user.lastName}</td>
                                    <td className='cuerpo'>{user.phone}</td>
                                    <td className='cuerpo'>{user.email}</td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td>No hay usuarios registrados</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className='nav_bar_rrss'>
                <Button className='rrssbtn default' onClick={() => navigate('/admin/dashboard')}>Ver Citas en Calendario</Button>
            </div>
            </> }               
        </div>
    )
}

export default UserList;