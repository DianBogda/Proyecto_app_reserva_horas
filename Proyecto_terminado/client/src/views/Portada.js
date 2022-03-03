import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import logo_base2 from '../assets/img/logo_base2.png';
import extension from '../assets/img/extension.jpg';
import lifting from '../assets/img/lifting.jpg';
import microblading from '../assets/img/microblading.jpg';
import WhatsApp_Logo from '../assets/img/WhatsApp_Logo.png';
import Facebook_logo from '../assets/img/Facebook_logo.png';
import instagram_logo from '../assets/img/instagram_logo.png';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Portada = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();
    // console.log(cookies.usertoken);

    const [btnActive, setBtnActive] = useState(false);

    const [login, setLogin] = useState(cookies.usertoken !== undefined ? true : false);

    const showDiv = () =>{
        setBtnActive(!btnActive);
    }

    const logout = () =>{
        removeCookie('usertoken')
        // alert('Cookie eliminada')
        setLogin(false);
        window.location.href = '/';
    }

    return (
        <div className='wrapper'>
            <header>
                <img className='logo espejo' src={logo_base2} alt='Logo'/> 
                {login ? <>
                    <Button className='logout default' onClick={() => navigate("/admin/dashboard")}>Administración</Button>
                    <Button className='logout default' onClick={() => logout()}>Cerrar Sesión</Button>
                    <Button className='logout default reserva' onClick={() => navigate("/user/dashboard")}>Reservas</Button>
                </> : <>
                <Button className='admbtn default' onClick={() => navigate("/admin/dashboard")} >Administración</Button>
                <Button className='logbtn default' onClick={() => navigate("/user/login")} >Acceso</Button>
                <Button className='regbtn default registro' onClick={() => navigate("/user/register")}>Registro</Button>
                </> }
            </header>   
            <div className='nav_bar'>
                <Button className='contbtn default' onClick={showDiv}>Contáctanos</Button>
                {btnActive &&
                <div className='contact'>
                    <img className='whatsapp' src={WhatsApp_Logo} alt='WhatsApp' />
                    <p>Escríbenos por WhatsApp</p>
                    <a href='tel:+56912345678'>+ 56 9 12345678</a>
                </div>}
            </div> 
            <div className='body'>
                <h1 className='titulo efecto-espejo'>Servicios Pestañas</h1>
                <img className='servicios ext espejito' src={extension} alt='Extensión pestañas'/>
                <Button className='exten default'>Extensión de Pestañas</Button>
                <img className='servicios espejito' src={lifting} alt='Lifting Pestañas'/>
                <Button className='lift default'>Lifting de Pestañas</Button>
                <h1 className='titulo efecto-espejo'>Servicios Cejas</h1>
                <img className='servicios espejito' src={microblading} alt='Microblading'/>
                <Button className='micro default'>Microblading</Button>
            </div>
            <nav className='nav_bar_rrss'>
                <a className='rrssbtn default a' href='https://www.facebook.com/'><img className='rrss' src={Facebook_logo} alt='Facebook' />Facebook</a>
                <a className='rrssbtn default a' href='https://www.instagram.com/'><img className='rrss insta' src={instagram_logo} alt='Instagram' />Instagram</a>
            </nav>                   
        </div>
      )
}

export default Portada;