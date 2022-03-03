import React, { useState, useEffect } from 'react';
import logo_base2 from '../assets/img/logo_base2.png';
import Datetime from 'react-datetime';
import 'moment/locale/es';
import { Button } from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const EditarReservas = (props) => {

    const {id} = useParams();

    const navigate = useNavigate();
    
    const [reserva, setReserva] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [errorsObject, setErrorsObject] = useState({
        errDate: "",
        errServicio: ""  
    });

    useEffect(() => {
        axios.get('/api/spa/' + id)
            .then(res => {
                console.log(res)
                setReserva(res.data.cita);
                setLoaded(true);
            })
    }, [])

    const editarCita = (e) => {
        e.preventDefault();
        axios.put('/api/spa/' + id, reserva)
        .then(res => {
            console.log(res);
            navigate('/user/dashboard')
        })
        .catch(err =>{
            const errorResponse = err.response.data.errors;
            setErrorsObject(errorResponse);
        });
    }

    const handleDateTimeChange = (d) => {
        setReserva({...reserva, ['date']: d})        
    }

    return(
        <div className='wrapper'>
            {loaded && <>
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
                <form className='form' onSubmit={editarCita}>
                    <div className="lbl_res">        
                        <label>Fecha y hora:</label>
                        {errorsObject['date'] ? <p className="err_log_res">{errorsObject['date'].message}</p>: ''}
                        <Datetime className="date" locale="es" timeZone='local' dateFormat='DD/MM/YYYY' timeFormat='h:mm a' value={moment(reserva.date)} onChange={handleDateTimeChange} inputProps={{readOnly:true, required: true}}/>                     
                    </div>              
                    <label htmlFor="servicio" className="lbl_reg_log_sel">Servicios:</label>
                    {errorsObject['servicio'] ? <p className="err_log">{errorsObject['servicio'].message}</p>: ''}
                    <select name="servicio" className="inp_reg_log_sel" value={reserva.servicio} onChange={(e) => setReserva({...reserva, ['servicio']: e.target.value})} required>                    
                        <option value="Extensión de Pestañas">Extensión de Pestañas</option>
                        <option value="Lifting de Pestañas">Lifting de Pestañas</option>
                        <option value="Microblading">Microblading</option>
                    </select>
                    <div className='nav_bar_btn'>
                        <Button className='rrssbtn default' type='submit'>Modifica tu Reserva</Button>
                    </div>
                </form>
            </div>
            </> }        
        </div>
    )
}

export default EditarReservas;