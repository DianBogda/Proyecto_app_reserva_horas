import React, { useContext, useState } from 'react';
import logo_base2 from '../assets/img/logo_base2.png';
import Datetime from 'react-datetime';
import 'moment/locale/es';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocketContext from '../context/socket-context';

const Reservas = () => {

    const {socket} = useContext(SocketContext);

    const navigate = useNavigate();

    const valoresIniciales = {
        date: "",
        servicio: "Extensión de Pestañas"
    }

    const [errorsObject, setErrorsObject] = useState({
        errDate: "",
        errServicio: ""  
    });

    const [reservas, setReservas] = useState(valoresIniciales);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setReservas({...reservas, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setReservas(valoresIniciales)
        axios.post('/api/spa', reservas)
            .then((res) => {
                navigate('/user/dashboard')
                reservarHora(reservas)
            })
            .catch(err =>{
                const errorResponse = err.response.data.errors;
                setErrorsObject(errorResponse);
            });
    }

    const handleDateTimeChange = (d) => {
        // console.log(d);
        setReservas({...reservas, ['date']: d})
    }

    const reservarHora = (reserva) => {
        socket.emit('reservacion_hora', reserva);
    }


    return(
        <div className='wrapper'>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes edit'>¡Bienvenida!</h2>
            </header>   
            <nav className='nav_bar'>
                <Link className='link' to={'/user/dashboard'}>Reservas</Link>
                <Link className='link' to={'/'}>Portada</Link>                    
            </nav> 
            <div>
                <h3 className='encabezado espejo_encab'>Queremos que te sientas como en casa. Reserva una hora para alguno de nuestros servicios:</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="lbl_res">                                      
                        <label>Fecha y hora:</label>
                        {errorsObject['date'] ? <p className="err_log_res">{errorsObject['date'].message}</p>: ''} 
                        <Datetime className="date" locale="es" timeZone='local' dateFormat='DD/MM/YYYY' timeFormat='h:mm a' onChange={handleDateTimeChange} inputProps={{readOnly:true, placeholder:"DD/MM/AAAA, 12:00 am", required: true}}/>                    
                    </div>              
                    <label htmlFor="servicio" className="lbl_reg_log_sel">Servicios:</label>
                    {errorsObject['servicio'] ? <p className="err_log">{errorsObject['servicio'].message}</p>: ''}
                    <select name="servicio" className="inp_reg_log_sel" value={reservas.servicio} onChange={handleChange} required>                    
                        <option value="Extensión de Pestañas">Extensión de Pestañas</option>
                        <option value="Lifting de Pestañas">Lifting de Pestañas</option>
                        <option value="Microblading">Microblading</option>
                    </select>
                    <div className='nav_bar_btn'>
                        <Button className='rrssbtn default' type='submit'>Reserva tu hora aquí</Button>
                    </div>
                    </form>
            </div>  
        </div>
    )
}

export default Reservas;