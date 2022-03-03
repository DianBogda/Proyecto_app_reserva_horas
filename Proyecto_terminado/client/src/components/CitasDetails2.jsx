import React, { useEffect, useState } from 'react';
import logo_base2 from '../assets/img/logo_base2.png';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';

const CitasDetails2 = () => {

    const navigate = useNavigate();

    const [reservas, setReservas] = useState();
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
        axios.get('/api/cita/2')
            .then(res => {
                // console.log(res)
                setReservas(res.data.cita)
                setLoaded(true);
            });
    }, [])

    const deleteCita2 = (_id) => {
        axios.delete('/api/admin/spa/' + _id)
        .then(res => {
            setReservas(reservas.filter(reserva => reserva._id !== _id));
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='wrapper'>
            {loaded &&
            <>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes lift'>Servicio Lifting de Pestañas</h2>
            </header>   
            <nav className='nav_bar'>                                   
                <Link className='link' to={'/'}>Portada</Link>
            </nav> 
            <div>
            <h3 className='encabezado espejo_encab'>Detalle de Reservas:</h3>
            <table>
                    <thead>
                        <tr>
                            <th className='cabeza'>Fecha y hora</th>
                            <th className='cabeza'>Nombre y Apellido Clienta</th>
                            <th className='cabeza'>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.length > 0 ?
                        reservas.map((reserva, index) => {
                            return(
                                <tr key={index}>
                                    <td className='cuerpo'>{moment(reserva.date).format('DD/MM/YYYY, h:mm a')}</td>
                                    <td className='cuerpo'>{ reserva.usuaria[0]?.firstName + ' ' + reserva.usuaria[0]?.lastName }</td>
                                    <td className='cuerpo'><Button className='eliminar default' onClick={() => {deleteCita2(reserva._id)}}>Eliminar</Button></td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td>No hay citas en este momento</td>
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

export default CitasDetails2;