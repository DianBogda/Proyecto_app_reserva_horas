import React, { useState } from 'react';
import axios from 'axios';
import logo_base2 from '../assets/img/logo_base2.png';
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        errEmail: "",
        errPassword: ""
    });

    const actualizarLoginForm = e => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
        if ( name === "password" ){
            if ( value.length < 6 ){
                setErrors({
                    ...errors, 
                    errPassword: "*La contraseña debe tener al menos 6 caracteres"
                });
            } else {
                setErrors({
                    ...errors, 
                    errPassword: ""        
                });
            } 
        };
    }

    const loginUser = e => {
        e.preventDefault();
        axios.post('/api/user/login' , inputs)
            .then(res => {
                console.log(res)
                setInputs({
                    email: "",
                    password: "",
                });
                window.location.href = '/admin/dashboard';
            })
    }

    return(
        <div className='wrapper'>
            <header>
                <img className='logo_otros espejo_otros' src={logo_base2} alt='Logo'/> 
                <h2 className='mensajes admin'>Amely Pestañas y Cejas</h2>
            </header>   
            <nav className='nav_bar'>
                <Link className='link' to={'/'}>Portada</Link>
            </nav> 
            <div>
                <h3 className='encabezado espejo_encab'>Acceso Administración:</h3>
                <form className='form' onSubmit={loginUser}>
                    <div className="lbl_reg_log">
                        <label>Correo Electrónico:</label>
                        <input className="inp_reg_log" type="email" name="email" value={inputs.email} onChange={actualizarLoginForm} required/>                
                    </div>
                    <div className="lbl_reg_log">
                        <label>Constraseña:</label>       
                        <input className="inp_reg_log" type="password" name="password" value={inputs.password} onChange={actualizarLoginForm} required/>
                        {
                        errors &&
                        <p className="err_log">{errors.errPassword}</p>
                        }
                    </div>
                    <div className='nav_bar_btn'>
                        <Button type="submit" className='rrssbtn default'>Verificar Citas</Button>
                    </div>
                </form>
            </div>                
        </div>
    )
}

export default Login;