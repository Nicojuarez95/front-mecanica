import React, { useState } from 'react';
import { Link as Anchor } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    LoadStart()
    axios.post('http://localhost:8080/admin/signin', { name, password })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        // Guardar el token en el local storage
        LoadRemove()
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        // Redirigir a la página principal u otra página después del inicio de sesión
        window.location.href = '/'
      })
      .catch(error => {
        LoadRemove()
        console.error('Error de inicio de sesión:', error);
      });
  };

  return (
    <div  class="flex justify-center items-center" id='contLog'>
      <h2>Ingresar como administrador</h2>
      <div  class="mb-3" id='body'>
        <label htmlFor="name" class="form-label">Usuario</label>
        <input
          type="text"
          id="name"
          class="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div  class="mb-3" id='body'>
        <label htmlFor="password" class="form-label">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          class="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} className="btnLog" style={{border:"none", padding:"5px", background:"#afafff", borderRadius:"5px", color:"white"}}>Iniciar Sesión</button>
      <Anchor to={'/'} style={{textDecoration:"none", color:"black", marginTop:"5%"}}>Volver a todos los libros</Anchor>
    </div>
  );
}