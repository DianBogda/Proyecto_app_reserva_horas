import React, { useState, useEffect } from 'react';
import logo_base2 from '../assets/img/logo_base2.png';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import 'moment/locale/es';

const MainAdmin = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

    const [login, setLogin] = useState(cookies.usertoken !== undefined ? true : false); 
    
    const [reserva, setReserva] = useState([]);
    const [citas, setCitas] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const logout = () =>{
        removeCookie('usertoken')
        // alert('Cookie eliminada')
        setLogin(false);
        window.location.href = '/';
    }
    
    useEffect(() => {
        axios.get('/api/admin/spa')
            .then(res => {
                // console.log(res)
                setCitas(res.data.citas.map(s => {
                    return {
                        title: s.servicio,
                        date: s.date
                    }
                }))
                setReserva(res.data.citas)
                setLoaded(true)
            })
    }, [])

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    return(
        <div className='wrapper'>
            {loaded && <>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes admin'>Amely Pestañas y Cejas</h2>
            </header>   
            <div className='nav_bar'>  
                <Button className='link default' onClick={logout}>Cerrar Sesión</Button>                 
                <Link className='link' to={'/'}>Portada</Link>
            </div> 
            <div className='calendar'>
                <Button className='serviciosbtn default' onClick={() => navigate('/admin/reservas_list1')}>Extensión de Pestañas</Button> 
                <Button className='serviciosbtn default' onClick={() => navigate('/admin/reservas_list2')}>Lifting de Pestañas</Button>
                <Button className='serviciosbtn default' onClick={() => navigate('/admin/reservas_list3')}>Microblading</Button>
                <FullCalendar
                timeZone='local'
                locale='es'
                plugins={[ dayGridPlugin, interactionPlugin ]}                
                dateClick={handleDateClick}
                initialView="dayGridMonth"
                hiddenDays= {[ 0 ]}
                editable={true} 
                events={citas}            
                />        
            </div>
            <div className='nav_bar_rrss'>
                <Button className='rrssbtn default' onClick={() => navigate('/admin/user_list')}>Ver Lista de Clientas</Button>                   
            </div>   
            </>}                
        </div>
    )
}

export default MainAdmin;
