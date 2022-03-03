import React, { useState } from 'react';
import axios from 'axios';
import logo_base2 from '../assets/img/logo_base2.png';
import { Button } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const [errorsObject, setErrorsObject] = useState({
        errFirstName: "",
        errLastName: "",
        errPhone: "",
        errEmail: "",
        errPassword: "",
        errConfirmPassword: ""        
    });

    const [inputs, setInputs] = useState(initialValues);

    const handleSubmit = (e) => {
        // console.log(inputs);
        e.preventDefault();
        axios.post('/api/user', inputs)
            .then(res => {
                // console.log(res);
                setInputs(initialValues);
                navigate('/user/login');
            })
            .catch(err =>{
                const errorResponse = err.response.data.errors;
                setErrorsObject(errorResponse);
            });
        }

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs({...inputs, [name]: value})

        if ( name === "firstName" ){
            if ( value.length < 3 ){
                setErrorsObject({
                    ...errorsObject, 
                    errFirstName: "*Nombre debe tener al menos 3 caracteres."
                });
            } else {
                setErrorsObject({
                    ...errorsObject, 
                    errFirstName: ""            
                });
            }  
        };

        if ( name === "lastName" ){
            if ( value.length < 3 ){
                setErrorsObject({
                    ...errorsObject, 
                    errLastName: "*Apellido debe tener al menos 3 caracteres."
                });
            } else {
                setErrorsObject({
                    ...errorsObject, 
                    errLastName: ""            
                });
            }  
        };

        if ( name === "password" ){
            if ( value.length < 6 ){
                setErrorsObject({
                    ...errorsObject, 
                    errPassword: "*Contraseña debe tener al menos 6 caracteres."
                });
            } else {
                setErrorsObject({
                    ...errorsObject, 
                    errPassword: ""            
                });
            }  
        };

        if (name === 'confirmPassword') {
            if (inputs.password !== value) {
                setErrorsObject({
                    ...errorsObject,
                    errConfirmPassword: "*Constraseña y su confirmación deben ser iguales."
                });
            } else {
                setErrorsObject({
                    ...errorsObject,
                    errConfirmPassword: ''
                });
            }
        }
    }

    return(
        <div className='wrapper'>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes regis'>Formulario de Registro</h2>
            </header>   
            <nav className='nav_bar'>
                <Link className='link' to={'/'}>Portada</Link>
            </nav> 
            <div>
            <h3 className='encabezado espejo_encab'>¡Queremos conocerte!</h3>
            <form className='form' onSubmit={handleSubmit}>
            <div className="lbl_reg_log">
                    <label>Nombre:</label>
                    <input className="inp_reg_log" type='text' name='firstName' value={inputs.firstName} onChange={handleChange} required/>
                    {
                    errorsObject &&
                    <p className="err_log">{errorsObject.errFirstName}</p>
                    }
                    {errorsObject['firstName'] ? <p className="err_log">{errorsObject['firstName'].message}</p>: ''}             
                </div>
                <div className="lbl_reg_log">
                    <label>Apellido:</label>
                    <input className="inp_reg_log" type='text' name='lastName' value={inputs.lastName} onChange={handleChange} required/>
                    {
                    errorsObject &&
                    <p className="err_log">{errorsObject.errLastName}</p>
                    }
                    {errorsObject['lastName'] ? <p className="err_log">{errorsObject['lastName'].message}</p>: ''}             
                </div>
                <div className="lbl_reg_log">
                    <label>Teléfono:</label>
                    <input className="inp_reg_log" type='text' placeholder='+56 9 12345678' name='phone' value={inputs.phone} onChange={handleChange} required/>
                    {errorsObject['phone'] ? <p className="err_log">{errorsObject['phone'].message}</p>: ''}
                </div>
                <div className="lbl_reg_log">
                    <label>Correo Electrónico:</label>
                    <input className="inp_reg_log" type='email' name='email' value={inputs.email} onChange={handleChange} required/>
                    {errorsObject['email'] ? <p className="err_log">{errorsObject['email'].message}</p>: ''}
                </div>
                <div className="lbl_reg_log">
                    <label>Contraseña:</label>                    
                    <input className="inp_reg_log" type='password' name='password' value={inputs.password} onChange={handleChange} required/>
                    {
                    errorsObject &&
                    <p className="err_log">{errorsObject.errPassword}</p>
                    }
                    {errorsObject['password'] ? <p className="err_log">{errorsObject['password'].message}</p>: ''}
                </div>
                <div className="lbl_reg_log">
                    <label>Confirmar Contraseña:</label>                    
                    <input className="inp_reg_log" type='password' name='confirmPassword' value={inputs.confirmPassword} onChange={handleChange} required/>
                    {
                    errorsObject &&
                    <p className="err_log">{errorsObject.errConfirmPassword}</p>
                    }
                </div>
                <div className='nav_bar_btn'>
                    <Button type="submit" className='rrssbtn default'>Registrate aquí</Button>
                </div>
            </form>
            </div>                
        </div>
    )
}

export default Register;