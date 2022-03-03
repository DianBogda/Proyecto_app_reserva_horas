import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Modal = (props) => {

    const navigate = useNavigate();

    const sendEmail = () => {
        axios.post('/api/spa/confirmarCita', {id: props.data.id})
            .then(res => {
                // console.log(res)
                Swal.fire('Cita confirmada');                
                props.handleClose();
            })
            .catch(err => {
                Swal.fire('Error en la confirmación');
            })
    }

    return(
        <div className="model-container">            
            <h3 className="mch3">Quiero modificar la cita seleccionada</h3>            
            {props.data !== undefined ? <>
                <h2 className="mch2">{props.data.title}</h2>
                <h2 className="mch2">{moment(props.data.date).format('DD/MM/YYYY, h:mm a')}</h2>                                
            </> : ""}
            <Button onClick={sendEmail} className='mbtn default'>Confirmar Cita</Button>
            <Button className='mbtn default' onClick={() => navigate('/user/edit/'+ props.data.id)}>Modificar Cita</Button>
            <Button className='mbtn default' onClick={() => {props.eliminarCita(props.data.id)}}>Cancelar Cita</Button>
            <Button className='modal-btn default' onClick={props.handleClose}>Cerrar Modal</Button>
        </div>
    )
}

export default Modal;