import './App.css';
import React, { useState } from 'react';
import SocketContext from './context/socket-context';
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import DefaultRoutes from './routes/DefaultRoutes';

function App() {

  const [socket] = useState(io.connect('/'));

  return (
    <SocketContext.Provider value={{socket: socket}}>
      <Routes>
        <Route path={'admin/*'} element={ <AdminRoutes />}/>
        <Route path={'/*'} element={<DefaultRoutes />}/>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
