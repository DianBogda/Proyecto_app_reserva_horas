import React, { useContext, useEffect, useState } from 'react';
import logo_base2 from '../assets/img/logo_base2.png';
import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import 'moment/locale/es';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';
import SocketContext from '../context/socket-context';
import moment from 'moment';

const UserView = (props) => {

    const {socket} = useContext(SocketContext);

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

    const [login, setLogin] = useState(cookies.usertoken !== undefined ? true : false);

    const [reservas, setReservas] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [activeEvent, setActiveEvent] = useState("");

    const [eventObject, setEventObject] = useState();

    const [show, setShow] = useState(false);

    const logout = () =>{
        removeCookie('usertoken')
        setLogin(false);
        window.location.href = '/';
    }

    socket.on('hora_reservada', data => {
        console.log('hora_reservada', data, reservas);
        const citas = [...reservas, {id: data._id, title: data.servicio, date: data.date}];
        setReservas(citas);
        Swal.fire("Otra clienta ha reservado; " + "Servicio: " + data.servicio + " " + "Fecha y hora: " + moment(data.date).format('DD/MM/YYYY, h:mm a'));
    });

    useEffect(() => {
        axios.get('/api/spa')
            .then(res => {
                // console.log(res)
                setReservas(res.data.citas.map(s => {
                    return {
                        id: s._id,
                        title: s.servicio,
                        date: s.date                        
                    }
                }))
                setLoaded(true)
            })
    }, [])

    useEffect(() => {
        // console.log('Este es el activeEvent ' + activeEvent);
        reservas.map(s => {
            // console.log(s)
            if(s.id === activeEvent){
                // console.log('eventActive encontrado')
                setEventObject(s)
            }
        })
        setShow(!show);
    }, [activeEvent])

    const handleEventClick = (info) => {
        // console.log(info.event._def.publicId);
        setActiveEvent(info.event._def.publicId);
    }

    const eventClosed = () => {
        setShow(false);
        setEventObject({});
        setActiveEvent("");
    }

    const eliminarCita = (id) => {
        axios.delete('/api/spa/' + id)
            .then(res => {
                Swal.fire('Estoy eliminando la cita seleccionada');
                setReservas(reservas.filter(reserva => reserva.id !== id));
                eventClosed();                
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div className='wrapper'>
            {loaded && <>
                {!show ? 
                <Modal data={eventObject} handleClose={eventClosed} eliminarCita={eliminarCita}/> : ""}
              <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes user'>Aquí tus citas</h2>
            </header>   
            <div className='nav_bar'>
                <Button className='link default' onClick={logout}>Cerrar Sesión</Button>
                <Button className='link default' onClick={() => navigate('/user/reservas')}>Reservar</Button> 
                <Link className='link' to={'/'}>Portada</Link>
            </div> 
            <div className='calendar'>                
                <FullCalendar
                timeZone='local'
                locale='es'
                plugins={[ dayGridPlugin, interactionPlugin ]}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                hiddenDays={[ 0 ]}                
                editable={true}
                events={reservas}            
                />        
            </div>
            <div className='nav_bar_rrss'>
                <h3>Haz click en el evento para ver los detalles</h3>
            </div> 
            </>}                  
    </div>
    )
}

export default UserView;